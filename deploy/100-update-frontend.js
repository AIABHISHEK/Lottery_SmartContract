const { ethers } = require("hardhat");
const fs = require("fs");
const FRONTEND_ADDRESS_FILE = "../lotteryFrontend/lottery_frontend/constants/contractAddress.json"
const FRONTEND_ABI_FILE = "../lotteryFrontend/lottery_frontend/constants/abi.json"

module.exports = async () => {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Updating front");
        updateContractAddresses();
        updateContractABI();
    }
}

async function updateContractAddresses() {
    const lotteryContract = await ethers.getContract("Lottery");
    const chainID = network.config.chainId.toString();
    const currentAddress = JSON.parse(fs.readFileSync(FRONTEND_ADDRESS_FILE, "utf8"));
    if (chainID in currentAddress) {
        if(!currentAddress[chainID].includes(lotteryContract.address)) {
            currentAddress[chainID].push(lotteryContract.address);
        }
    }
    else{
        currentAddress[chainID] = [lotteryContract.address];
    }
    fs.writeFileSync(FRONTEND_ADDRESS_FILE, JSON.stringify(currentAddress));
    console.log("Updated contract address file");
}

async function updateContractABI() {
    const lotteryContract = await ethers.getContract("Lottery");
    fs.writeFileSync(FRONTEND_ABI_FILE, lotteryContract.interface.format(ethers.utils.FormatTypes.json));
    console.log("Updated contract abi file");
}
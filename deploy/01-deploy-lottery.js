const { ethers, network } = require("hardhat");
const { developmentChains, networkConfig } = require("../helper-hardhat-config");
require("dotenv").config();

module.exports = async function main({ getNamedAccouts, deployments }) {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    let vrfCoordinatorV2Address, subscriptionId, VRFCoordinatorV2Mock;
    const chainId = network.config.chainId;
    console.log(chainId);
    if (chainId == 31337) {
        VRFCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock");
        vrfCoordinatorV2Address = VRFCoordinatorV2Mock.address;
        const transactionResponse = await VRFCoordinatorV2Mock.createSubscription();
        const transactionReceipt = await transactionResponse.wait(1);
        subscriptionId = transactionReceipt.events[0].args.subId;
        await VRFCoordinatorV2Mock.fundSubscription(subscriptionId, ethers.utils.parseEther("5"));
    }
    else {
        vrfCoordinatorV2Address = networkConfig[chainId]["vrfCoordinatorV2"];

        subscriptionId = networkConfig[chainId]["subscriptionId"]
    }
    const entranceFee = networkConfig[chainId]["entranceFee"]
    const gasLane = networkConfig[chainId]["gasLane"]
    // subscriptionId = networkConfig[chainId]["subcriptionId"];
    const callbackGasLimit = networkConfig[chainId]["callbackGasLimit"]
    const interval = networkConfig[chainId]["interval"];
    const args = [vrfCoordinatorV2Address, entranceFee, gasLane, subscriptionId, callbackGasLimit, interval]
    log(vrfCoordinatorV2Address + "  - > this is address");
    const lottery = await deploy("Lottery", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    });
    log(`Lottery deployed at ${lottery.address}`);
    
    
    const lotteryContract = await ethers.getContractAt("Lottery", lottery.address);

    // Call the desired function
    

    console.log(lotteryContract);
    // if (!developmentChains.includes(network.name) && ETHERSCAN_API_KEY);
    // await verify(lottery.address, args);
};
module.exports.tags = ["all", "lottery"];
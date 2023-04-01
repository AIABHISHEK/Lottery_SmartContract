//deploy mocks only if we are on the development chain for vrf Coordinator
const { network } = require("hardhat");
const { ethers } = require("hardhat");
const BASE_FEE = ethers.utils.parseEther("0.25") // link per request
const GAS_PRICE_LINK = 1e9;
module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId
    if (chainId == 31337) {
        log("local network deploying mocks");
        //deploy mock
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: [BASE_FEE, GAS_PRICE_LINK]
        });
        log("mOck deployed");
    }
};
module.exports.tags = ["all", "mocks"];
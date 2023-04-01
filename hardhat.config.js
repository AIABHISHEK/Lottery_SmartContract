/** @type import('hardhat/config').HardhatUserConfig */

// require("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-etherscan")
require("@nomiclabs/hardhat-waffle")
// require("hardhat")
require("hardhat-contract-sizer")
require("hardhat-deploy");
require("hardhat-gas-reporter")
require("solidity-coverage")
require("dotenv").config()

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

module.exports = {
  solidity: "0.8.17",
  defaultNetwork:"hardhat",
  networks:{
    hardhat: {
      chainId: 31337,
      blockConfirmations:1,
    },
    goerli: {
      chainId: 5,
      accounts:[GOERLI_PRIVATE_KEY],
      blockConfirmations: 3,
      url:GOERLI_RPC_URL,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  player: {
    default: 1,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  }
};

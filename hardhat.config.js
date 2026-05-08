require("@nomicfoundation/hardhat-ethers");
require("dotenv").config();

const PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY || "0x" + "0".repeat(64);

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: { enabled: true, runs: 200 },
      viaIR: true,
    },
  },
  networks: {
    // Mạng local để test không cần tốn gas
    hardhat: {
      chainId: 31337,
    },
    // LUKSO Mainnet (chainId 42)
    lukso: {
      url: "https://rpc.mainnet.lukso.network",
      chainId: 42,
      accounts: [PRIVATE_KEY],
    },
    // LUKSO Testnet (chainId 4201) – dùng để thử nghiệm
    luksoTestnet: {
      url: "https://rpc.testnet.lukso.network",
      chainId: 4201,
      accounts: [PRIVATE_KEY],
    },
  },
  paths: {
    sources:   "./contracts",
    tests:     "./test",
    cache:     "./cache",
    artifacts: "./artifacts",
  },
};

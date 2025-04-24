require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  paths: {
    sources: "./contract", // 👈 this now avoids node_modules
    tests: "./test",
    artifacts: "./artifacts"
  }
};

require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.24",
  networks: {
    swisstronik: {
      url: "https://json-rpc.testnet.swisstronik.com/",
      accounts: [`0xPRIVATE_KEY`] // Replace YOUR_PRIVATE_KEY with your actual private key
    }
  }
};

require("@nomiclabs/hardhat-waffle");

const ALCHEMY_API_KEY = "G7xa3K-VF0am4tJ8UHjXhDZMQis8lSX6";
const RINKEBY_PRIVATE_KEY = "c21dfca384c8c0c6bba2f98bbeb95b39942407dc868ba641585ed8abf94a4bed";

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
  solidity: "0.8.6",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [`${RINKEBY_PRIVATE_KEY}`]
    },
    hardhat: {
      // environnement local pour tester A changer
      chainId: 1337
    }
  }
};
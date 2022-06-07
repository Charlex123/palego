// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const BEP20USDT = await hre.ethers.getContractFactory("BEP20USDT");
  const BEP20usdt = await BEP20USDT.deploy();

  await BEP20usdt.deployed();

  console.log("BEP20USDT deployed to:", BEP20usdt.address);

  
// Make sure the MetaDefi contract is included by requireing it.
// const MetaDefi = artifacts.require("MetaDefi");
// const MetaDefiSale = artifacts.require("MetaDefiSale");
// const Stake = artifacts.require("Stake");
// // THis is an async function, it will accept the Deployer account, the network, and eventual accounts.
// module.exports = async function (deployer, network, accounts) {
//   // await while we deploy the MetaDefi
//   await deployer.deploy(MetaDefi);
//   await deployer.deploy(MetaDefiSale);
//   await deployer.deploy(Stake,MetaDefi.address);
// //   const MetaDefi = await MetaDefi.deployed()
// };
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

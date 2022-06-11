var TRCPalego = artifacts.require("./TRCPalego.sol");
var Migrations = artifacts.require("./Migrations.sol");
// const TRC20USDTcontractaddres =  "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";

module.exports = function(deployer) {
  deployer.deploy(TRCPalego);
  deployer.deploy(Migrations);
};
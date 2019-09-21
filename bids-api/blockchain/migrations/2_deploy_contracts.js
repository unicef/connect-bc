var PassportLogic = artifacts.require("./PassportLogic.sol");
var PassportLogicRegistry = artifacts.require("./PassportLogicRegistry.sol");
var PassportFactory = artifacts.require("./PassportFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(PassportLogic);
  deployer.deploy(PassportLogicRegistry);
  deployer.deploy(PassportFactory);
};

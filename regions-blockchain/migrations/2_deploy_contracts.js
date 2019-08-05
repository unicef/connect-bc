var Region = artifacts.require("./Region.sol");

module.exports = function(deployer) {
  // Example deployment of the smart contract
  // Parameters include: country, number of schools, area of region, smart contracts on multi-sig, and signature confirmations required for multi-sig activity
  deployer.deploy(Region, "Canada", 500, 5000, ["0x1927c5861acc57edce10c94081e4a2eedb2ec9c2", "0xf41972e074f44eadee96ef859d057984b2aa8bfa"], 2);
};

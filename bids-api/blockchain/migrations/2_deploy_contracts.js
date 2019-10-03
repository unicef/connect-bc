const PassportLogic = artifacts.require('PassportLogic');
const PassportLogicRegistry = artifacts.require('PassportLogicRegistry');
const PassportFactory = artifacts.require('PassportFactory');

const InternetContract = artifacts.require('InternetContract');

module.exports = (deployer, _, accounts) => {
  console.log(accounts[0])
  // The `accounts` variable holds Ethereum addresses provided by the Truffle framework.
  // In a live application you should provide your own addresses by modifying `truffle-config.js` and adding a
  // provider, which would be able to import your accounts using private keys or mnemonics.
  // See this example at https://github.com/trufflesuite/truffle/tree/develop/packages/truffle-hdwallet-provider
  const ownerAddress = accounts[0];

  deployer.deploy(PassportLogic, {
      from: ownerAddress,
    })
    // PassportLogicRegistry takes the initial passport logic version (0.1) with the logic contract's address in the constructor.
    .then(() => deployer.deploy(PassportLogicRegistry, '0.1', PassportLogic.address, {
      from: ownerAddress,
    }))
    // PassportFactory just takes the PassportLogicRegistry address so that it would know what
    // registry to assign to new passports.
    .then(() => deployer.deploy(InternetContract, PassportLogicRegistry.address, {
    // .then(() => deployer.deploy(PassportFactory, PassportLogicRegistry.address, {
      from: ownerAddress,
    })
    .then(response => {
      console.log('Success!')
    })
    );

    // deployer.deploy(InternetContract)
}
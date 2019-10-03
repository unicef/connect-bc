pragma solidity >=0.4.21 <0.6.0;

import "./openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "./openzeppelin-solidity/contracts/ownership/HasNoEther.sol";
import "./openzeppelin-solidity/contracts/ownership/HasNoTokens.sol";
import "./Passport.sol";

contract InternetContract is Ownable, HasNoEther, HasNoTokens {
  IPassportLogicRegistry private registry;

  Passport public region;
  Passport public internetServiceProvider;
  uint256 public minimumSpeedGuarantee;
  uint256 public contractStartDate;
  uint256 public contractEndDate;
  
  event InternetContractCreated(
    address indexed region,
    address indexed internetServiceProvider,
    uint256 minimumSpeedGuarantee,
    uint256 contractStartDate,
    uint256 contractEndDate,
    address indexed owner
  );

  // This will be required by the region smart contract for sure...
  // Not sure how this person will claim ownership... so we will see what happens lol
  function createPassport(address _passportAddress) public returns (Passport) {
    Passport pass = new Passport(registry);
    pass.transferOwnership(_passportAddress); // owner needs to call claimOwnership()
    emit PassportCreated(pass, _passportAddress);
    return pass;
  }

  function createContract(
    Passport _region,
    Passport _internetServiceProvider,
    uint256 _minimumSpeedGuarantee,
    uint256 _contractStartDate,
    uint256 _contractEndDate
  ) public onlyOwner {
    region = _region;
    internetServiceProvider = _internetServiceProvider;
    minimumSpeedGuarantee = _minimumSpeedGuarantee;
    contractStartDate = _contractStartDate;
    contractEndDate = _contractEndDate;
    emit InternetContractCreated(
      _region,
      _internetServiceProvider,
      _minimumSpeedGuarantee,
      _contractStartDate,
      _contractEndDate,
      msg.sender
    );
  }

    /**
    * @dev This event will be emitted every time a new passport is created
    * @param passport representing the address of the passport created
    * @param owner representing the address of the passport owner
    */
    event PassportCreated(address indexed passport, address indexed owner);

    /**
    * @dev This event will be emitted every time a passport logic registry is changed
    * @param oldRegistry representing the address of the old passport logic registry
    * @param newRegistry representing the address of the new passport logic registry
    */
    event PassportLogicRegistryChanged(address indexed oldRegistry, address indexed newRegistry);

    constructor(IPassportLogicRegistry _registry) public {
        _setRegistry(_registry);
    }

    function setRegistry(IPassportLogicRegistry _registry) public onlyOwner {
        emit PassportLogicRegistryChanged(registry, _registry);
        _setRegistry(_registry);
    }

    function getRegistry() external view returns (address) {
        return registry;
    }
    function _setRegistry(IPassportLogicRegistry _registry) internal {
        require(address(_registry) != 0x0);
        registry = _registry;
    }

}

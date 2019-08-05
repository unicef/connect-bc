pragma solidity ^0.5.0;
import "./roles/WhitelistedRole.sol";
import "./MultiSigWallet.sol";
import './math/SafeMath.sol';
/**
 * @title Region
 * @dev Region is responsible for creating fundable region.  The region will have money / funds sent to it
 * and the funds will be managed by a ConditionalEscrow smart contract.  This smart contract will only release
 * funds when a specific condition is met (still TBD).  The Region smart contract also inherits a WhitelistedRole
 * smart contract and with this contract, the Region smart contract can control who is sending funds to
 * the region.
 */
contract Region is MultiSigWallet, WhitelistedRole {
    using SafeMath for uint256;
    string public nameOfRegion;
    address public regionCreatedBy;
    uint256 public numberOfSchools;
    uint256 public totalAreaOfRegion;
    mapping(address => uint256) private _deposits;
    constructor (
        string memory _nameOfRegion,
        uint256 _numberOfSchools,
        uint256 _totalAreaOfRegion,
        address[] memory ownersOfMultiSigWallet,
        uint signaturesRequiredForMultiSigWallet
    ) MultiSigWallet(
        ownersOfMultiSigWallet,
        signaturesRequiredForMultiSigWallet
    ) public {
        nameOfRegion = _nameOfRegion;
        numberOfSchools = _numberOfSchools;
        totalAreaOfRegion = _totalAreaOfRegion;
        regionCreatedBy = msg.sender;
    }
    function depositsOf(
        address payee
    ) public view returns (uint256) {
        return _deposits[payee];
    }
    function()
        external
        onlyWhitelisted
        payable
    {
        if (msg.value > 0) {
            emit Deposit(msg.sender, msg.value);
            uint256 amount = msg.value;
            _deposits[msg.sender] = _deposits[msg.sender].add(amount);
        }
    }
}

pragma solidity ^0.4.24;

import "../lifecycle/DestructibleProxy.sol";

contract DestructibleProxyMock is DestructibleProxy {
    function() payable public {}

    function pause() public {
        _setPaused(true);
    }

    function unpause() public {
        _setPaused(false);
    }
}
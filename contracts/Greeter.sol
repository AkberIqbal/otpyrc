//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract Greeter {
    string greeting;

    constructor(string memory _greeting) {
        console.log("Deploying a Greeter with greeting:", _greeting);
        // console.log("Greeter ABI:", Greeter.abi);
        greeting = _greeting;
    }

    // This is a very basic smart contract. When deployed, it sets a Greeting variable and exposes a function (greet) that can be called to return the greeting.
    function greet() public view returns (string memory) {
        return greeting;
    }

    // It also exposes a function that allows a user to update the greeting (setGreeting). When deployed to the Ethereum blockchain, these methods will be available for a user to interact with.
    function setGreeting(string memory _greeting) public {
        console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
        greeting = _greeting;
    }
}

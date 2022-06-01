// SPDX-License-Identifier: MIT

pragma solidity ^0.5.16;

import "./MetaDefi.sol";

contract MetaDefiSale {
    using SafeMath for uint256;
    address admin;
    MetaDefi public tokenContract;
    uint256 public tokenPrice;
    uint256 public tokensSold;

    mapping(address => uint256) private _balanceOf;
    event Sell(address _buyer, uint256 _amount);

    function MetaDefiTokenSale(MetaDefi _tokenContract, uint256 _tokenPrice) public {
        admin = msg.sender;
        tokenContract = _tokenContract;
        tokenPrice = _tokenPrice;
    }

    function buyTokens(uint256 _amount) public payable returns(uint){
        // require(msg.value > 0,"You must have more eth to buy");
        uint256 tokensToBuy = _amount.mul(tokenPrice);
        require(tokenContract.balanceOf(address(this)) >= tokensToBuy,"Token Sale balance must be gt amount to buy");
        require(tokenContract.transfer(msg.sender, tokensToBuy));
        
        tokensSold += tokensToBuy;

        emit Sell(msg.sender, tokensToBuy);
        return msg.value;
    }

    function userBalance() public payable returns(uint, uint, uint){
        return (
            _balanceOf[msg.sender],
            tokenContract.balanceOf(msg.sender),
            msg.value
            );
    }

    function tokenSaleBalance() public view returns(uint){
        return (
            tokenContract.balanceOf(address(this))
            );
    }

    function endSale() public {
        require(msg.sender == admin);
        require(tokenContract.transfer(admin, tokenContract.balanceOf(address(this))));

        // UPDATE: Let's not destroy the contract here
        // Just transfer the balance to the admin
        payable(admin).transfer(address(this).balance);
    }
}
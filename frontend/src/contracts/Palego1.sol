// SPDX-License-Identifier:GPL-3.0

pragma solidity >0.5.16;

interface IBEP20 {
  function transfer(address recipient, uint256 amount) external returns (bool);

  event Transfer(address indexed from, address indexed to, uint256 value);

}

// contract Context {
//   // Empty internal constructor, to prevent people from mistakenly deploying
//   // an instance of this contract, which should be used via inheritance.
//   constructor () internal { }

//   function _msgSender() internal view returns (address payable) {
//     return msg.sender;
//   }

//   function _msgData() internal view returns (bytes memory) {
//     this; // silence state mutability warning without generating bytecode - see https://github.com/ethereum/solidity/issues/2691
//     return msg.data;
//   }
// }

// contract Ownable is Context {
//   address private _owner;

//   event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

//   /**
//    * @dev Initializes the contract setting the deployer as the initial owner.
//    */
//   constructor () internal {
//     address msgSender = _msgSender();
//     _owner = msgSender;
//     emit OwnershipTransferred(address(0), msgSender);
//   }

//   /**
//    * @dev Returns the address of the current owner.
//    */
//   function owner() public view returns (address) {
//     return _owner;
//   }

//   /**
//    * @dev Throws if called by any account other than the owner.
//    */
//   modifier onlyOwner() {
//     require(_owner == _msgSender(), "Ownable: caller is not the owner");
//     _;
//   }

//   /**
//    * @dev Leaves the contract without owner. It will not be possible to call
//    * `onlyOwner` functions anymore. Can only be called by the current owner.
//    *
//    * NOTE: Renouncing ownership will leave the contract without an owner,
//    * thereby removing any functionality that is only available to the owner.
//    */
//   function renounceOwnership() public onlyOwner {
//     emit OwnershipTransferred(_owner, address(0));
//     _owner = address(0);
//   }

//   /**
//    * @dev Transfers ownership of the contract to a new account (`newOwner`).
//    * Can only be called by the current owner.
//    */
//   function transferOwnership(address newOwner) public onlyOwner {
//     _transferOwnership(newOwner);
//   }

//   /**
//    * @dev Transfers ownership of the contract to a new account (`newOwner`).
//    */
//   function _transferOwnership(address newOwner) internal {
//     require(newOwner != address(0), "Ownable: new owner is the zero address");
//     emit OwnershipTransferred(_owner, newOwner);
//     _owner = newOwner;
//   }
// }


library SafeMath {
  /**
   * @dev Returns the addition of two unsigned integers, reverting on
   * overflow.
   *
   * Counterpart to Solidity's `+` operator.
   *
   * Requirements:
   * - Addition cannot overflow.
   */
  function add(uint256 a, uint256 b) internal pure returns (uint256) {
    uint256 c = a + b;
    require(c >= a, "SafeMath: addition overflow");

    return c;
  }

  /**
   * @dev Returns the subtraction of two unsigned integers, reverting on
   * overflow (when the result is negative).
   *
   * Counterpart to Solidity's `-` operator.
   *
   * Requirements:
   * - Subtraction cannot overflow.
   */
  function sub(uint256 a, uint256 b) internal pure returns (uint256) {
    return sub(a, b, "SafeMath: subtraction overflow");
  }

  /**
   * @dev Returns the subtraction of two unsigned integers, reverting with custom message on
   * overflow (when the result is negative).
   *
   * Counterpart to Solidity's `-` operator.
   *
   * Requirements:
   * - Subtraction cannot overflow.
   */
  function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
    require(b <= a, errorMessage);
    uint256 c = a - b;

    return c;
  }

  /**
   * @dev Returns the multiplication of two unsigned integers, reverting on
   * overflow.
   *
   * Counterpart to Solidity's `*` operator.
   *
   * Requirements:
   * - Multiplication cannot overflow.
   */
  function mul(uint256 a, uint256 b) internal pure returns (uint256) {
    // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
    // benefit is lost if 'b' is also tested.
    // See: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/522
    if (a == 0) {
      return 0;
    }

    uint256 c = a * b;
    require(c / a == b, "SafeMath: multiplication overflow");

    return c;
  }

  /**
   * @dev Returns the integer division of two unsigned integers. Reverts on
   * division by zero. The result is rounded towards zero.
   *
   * Counterpart to Solidity's `/` operator. Note: this function uses a
   * `revert` opcode (which leaves remaining gas untouched) while Solidity
   * uses an invalid opcode to revert (consuming all remaining gas).
   *
   * Requirements:
   * - The divisor cannot be zero.
   */
  function div(uint256 a, uint256 b) internal pure returns (uint256) {
    return div(a, b, "SafeMath: division by zero");
  }

  /**
   * @dev Returns the integer division of two unsigned integers. Reverts with custom message on
   * division by zero. The result is rounded towards zero.
   *
   * Counterpart to Solidity's `/` operator. Note: this function uses a
   * `revert` opcode (which leaves remaining gas untouched) while Solidity
   * uses an invalid opcode to revert (consuming all remaining gas).
   *
   * Requirements:
   * - The divisor cannot be zero.
   */
  function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
    // Solidity only automatically asserts when dividing by 0
    require(b > 0, errorMessage);
    uint256 c = a / b;
    // assert(a == b * c + a % b); // There is no case in which this doesn't hold

    return c;
  }

  /**
   * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
   * Reverts when dividing by zero.
   *
   * Counterpart to Solidity's `%` operator. This function uses a `revert`
   * opcode (which leaves remaining gas untouched) while Solidity uses an
   * invalid opcode to revert (consuming all remaining gas).
   *
   * Requirements:
   * - The divisor cannot be zero.
   */
  function mod(uint256 a, uint256 b) internal pure returns (uint256) {
    return mod(a, b, "SafeMath: modulo by zero");
  }

  /**
   * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
   * Reverts with custom message when dividing by zero.
   *
   * Counterpart to Solidity's `%` operator. This function uses a `revert`
   * opcode (which leaves remaining gas untouched) while Solidity uses an
   * invalid opcode to revert (consuming all remaining gas).
   *
   * Requirements:
   * - The divisor cannot be zero.
   */
  function mod(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
    require(b != 0, errorMessage);
    return a % b;
  }
}

contract Palego is IBEP20{
    using SafeMath for uint256;
    address investor;
    uint timeNow = block.timestamp;
    address owner;
    uint minimuminvestAmount;
    uint minimuminvestDuration = timeNow + 7 * 1 days;
    IBEP20 BEP20USDT = IBEP20(address(0x55d398326f99059fF775485246999027B3197955));
    
    struct userInvestDetail{
        uint rewardTime;
        uint investmentDuration;
        uint investmentAmount;
        uint currentinvestmentReward;
        uint investmentRewardPerDay;
        uint totalinvestmentReward;
        uint percentagerewardperday;
        uint totalReward;
        string packageName;
        bool hasStake;
        bool unStaked;
        uint refCount;
        address referrer;
        bool wasReferrered;
        mapping(address => Referral) Referrals;
    }

    struct Referral {
        address referral;
        address referredby;
        address[] referrals;
    }

    mapping(address => uint256) private _balanceOf;
    mapping(address => userInvestDetail) private userDetails;
    address[] private userAddresses;

    constructor (address ownerAddress) {
        owner = ownerAddress;
        investor = msg.sender; 
        minimuminvestAmount = 20;
    }

    event StakedEvent(address indexed investor,uint investment_duration, uint investment_amount, uint investmentrewardperDay, uint totalinvestmentReward, uint total_reward, bool hasStake, bool unStaked);
    event UpdateStakedEvent(address indexed investor,uint investment_duration, uint newStakeAmount, bool hasStake);
    event UpgradeEvent(address indexed investor,uint investment_duration, uint investment_amount, uint investmentrewardperDay, uint totalinvestment_reward, uint total_reward, address ref_Errer, bool hasStake, bool unStaked);
    // event UnstakeEvent(address indexed unstaker, uint unstakeFee, uint _amtUnstaked);
    event UpdateRewardevent(uint investmentrewardperDay, uint investmentrewardperHour, uint currentinvestmentReward);
    event WithdrawalEvent(address indexed Withdrawer, uint total_Reward, uint WithdrawTime);

    function hasInvested(address _investor) public view returns(bool) {
        if(userDetails[_investor].hasStake == true) return true;
        return false;
    }

    function wasRef_errered(address _investor) public view returns(bool) {
        if(userDetails[_investor].wasReferrered == true) return true;
        return false;
    }

    function getInvestorAccount() public view returns(address) {
        return investor;
    }
   
    function myUSDTBalance() public view returns(uint) {
        return _balanceOf[investor];
    }
    
    function getReferrer() public view returns(address) {
        return userDetails[investor].referrer;
    }

    function refStake(address referrer, uint investment_amount, uint investment_duration) public payable returns(uint) {
        require(_balanceOf[investor] >= investment_amount, "investor must have enough tokens to invest");
        require(investor == msg.sender, "Only account owner can invest");
        require(investor != address(0), "Investor cannot be a zero address");
        require(referrer != address(0), "Referrer cannot be a zero address");
        require(referrer != investor,"You cannot refer yourself");
        require(hasInvested(referrer) != false, "Referrer have to invest first");
        
        if(userDetails[investor].hasStake == true) {
            revert("You currently have an investment running, you can only upgrade");
        }

        if(investment_duration == 7 || investment_duration == 20 || investment_duration == 30 || investment_duration == 90 || investment_duration == 180) {
            
            uint interest_RatePerDay;
            string memory package_name; 

            if(investment_duration == 7) {
                interest_RatePerDay = investment_amount.mul(15).div(1000);
                package_name = "Meta Blue";
            }
            else if(investment_duration == 20) {
                interest_RatePerDay = investment_amount.mul(16).div(1000);
                package_name = "Meta Yellow";
            }
            else if(investment_duration == 30) {
                interest_RatePerDay = investment_amount.mul(17).div(1000);
                package_name = "Meta Purple";
            }
            else if(investment_duration == 90) {
                interest_RatePerDay = investment_amount.mul(18).div(1000);
                package_name = "Meta White";
            }
            else if(investment_duration == 180) {
                interest_RatePerDay = investment_amount.mul(2).div(100);
                package_name = "Meta Green";
            }

            userDetails[investor].rewardTime = timeNow + investment_duration * 1 days;
            userDetails[investor].investmentDuration = investment_duration;
            userDetails[investor].investmentRewardPerDay = interest_RatePerDay;
            userDetails[investor].totalinvestmentReward = interest_RatePerDay.mul(investment_duration);
            userDetails[investor].totalReward = investment_amount.add(userDetails[investor].totalinvestmentReward);
            userDetails[investor].referrer = referrer;
            userDetails[investor].packageName = package_name;
            userDetails[investor].investmentAmount = investment_amount;
            userDetails[investor].wasReferrered = true;
            userDetails[investor].hasStake = true;
            userDetails[investor].unStaked = false;

            userAddresses.push(investor);
            }else {
                revert("invalid investment period");
            }

            // updateusertokenbalance
            BEP20USDT.transfer(address(this), investment_amount);
            
            uint investmentrewardperDay = userDetails[investor].investmentRewardPerDay;
            uint total_reward = userDetails[investor].totalReward;
            uint totalinvestment_reward = userDetails[investor].totalinvestmentReward;
            address ref_Errer = userDetails[investor].referrer;
            emit UpgradeEvent(investor, investment_duration, investment_amount, investmentrewardperDay, totalinvestment_reward, total_reward, ref_Errer, true, false);
            return (userAddresses.length) -1;
    }
    
    function transfer(address recipient, uint256 amount) external returns (bool) {
    _transfer(investor, recipient, amount);
    return true;
  }

function _transfer(address sender, address recipient, uint256 amount) internal {
    require(sender != address(0), "BEP20: transfer from the zero address");
    require(recipient != address(0), "BEP20: transfer to the zero address");

    // _balances[sender] = _balances[sender].sub(amount, "BEP20: transfer amount exceeds balance");
    // _balances[recipient] = _balances[recipient].add(amount);
    emit Transfer(sender, recipient, amount);
  }

    function invest(uint investment_amount, uint investment_duration) public payable returns(uint) {
        require(investment_duration >= minimuminvestDuration, "Minimum investment is 20USDT");
        require(investment_amount >= minimuminvestAmount, "Minimum investment is 20USDT");
        require(_balanceOf[investor] >= investment_amount, "Investor must have enough tokens to stake");
        require(investor == msg.sender, "Only account owner can stake");
        require(investor != address(0), "Investor cannot be a zero address");

        

        if(userDetails[investor].hasStake == true) {
            revert("You currently have an investment running, you can only upgrade");
        }
        if(investment_duration == 7 || investment_duration == 20 || investment_duration == 30 || investment_duration == 90 || investment_duration == 180) {
        
        uint interest_RatePerDay;
        string memory package_name; 

        if(investment_duration == 7) {
            interest_RatePerDay = investment_amount.mul(15).div(1000);
            package_name = "Meta Blue";
        }
        else if(investment_duration == 20) {
            interest_RatePerDay = investment_amount.mul(16).div(1000);
            package_name = "Meta Yellow";
        }
        else if(investment_duration == 30) {
            interest_RatePerDay = investment_amount.mul(17).div(1000);
            package_name = "Meta Purple";
        }
        else if(investment_duration == 90) {
            interest_RatePerDay = investment_amount.mul(18).div(1000);
            package_name = "Meta White";
        }
        else if(investment_duration == 180) {
            interest_RatePerDay = investment_amount.mul(2).div(100);
            package_name = "Meta Green";
        }

        userDetails[investor].rewardTime = timeNow + investment_duration * 1 days;
        userDetails[investor].investmentDuration = investment_duration;
        userDetails[investor].investmentRewardPerDay = interest_RatePerDay;
        userDetails[investor].totalinvestmentReward = interest_RatePerDay.mul(investment_duration);
        userDetails[investor].totalReward = investment_amount.add(userDetails[investor].totalinvestmentReward);
        userDetails[investor].packageName = package_name;
        userDetails[investor].investmentAmount = investment_amount;
        userDetails[investor].hasStake = true;
        userDetails[investor].wasReferrered = false;
        userDetails[investor].unStaked = false;

        userAddresses.push(investor);
        }else {
            revert("invalid investment period");
        }
        
        // updateusertokenbalance
        BEP20USDT.transfer(address(this), investment_amount);
        uint investmentrewardperDay = userDetails[investor].investmentRewardPerDay;
        uint total_reward = userDetails[investor].totalReward;
        uint totalinvestment_reward = userDetails[investor].totalinvestmentReward;
        emit StakedEvent(investor, investment_duration, investment_amount, investmentrewardperDay, totalinvestment_reward, total_reward, true, false);
        return (userAddresses.length) -1;
    }

    function getuserCount() public view returns (uint) {
        return userAddresses.length;
    }

    function getstakeDetails(address user_address) public view returns(uint rewardTime, uint stakeAmount, uint stakeDuration, uint investmentRewardPerDay, uint totalinvestmentReward, uint totalReward, string memory packageName) {
        require(hasInvested(user_address) != false, "You have to invest first");
        require(investor != address(0), "Staker cannot be a zero");

        return (
            userDetails[user_address].rewardTime,
            userDetails[user_address].investmentAmount,
            userDetails[user_address].investmentDuration,
            userDetails[user_address].investmentRewardPerDay,
            userDetails[user_address].totalReward,
            userDetails[user_address].totalinvestmentReward,
            userDetails[user_address].packageName
            );
    }

    function getrefDetails(address user_address) public view returns(address referrer, uint refCount) {
        require(hasInvested(user_address) != false, "You have to invest first");
        require(user_address != address(0), "Staker cannot be a zero");

        return (
            userDetails[user_address].referrer,
            userDetails[user_address].refCount
            );
    }

    function upgradeStake(uint topup_amount, uint investment_duration) public returns (bool) {
        require(hasInvested(investor) != false, "You have to invest first");
        require(investor != address(0), "Staker cannot be a zero");

        // uint oldStakeAmount = userDetails[investor].investmentAmount;
        uint newStakeAmount = userDetails[investor].investmentAmount.add(topup_amount);
        uint investment_duration_seconds = timeNow + investment_duration * 1 days;
        // get minimum amount to uprade with

        // require(_balanceOf[investor] < topup_amount, "cannot invest more than your what you have");
        // require(_balanceOf[investor] <= oldStakeAmount, "cannot upgrade to a lower level");
        if(investment_duration_seconds <= userDetails[investor].investmentDuration) {
            revert("cannot upgrade to the same level or a lower level");
        }
        if(investment_duration == 7 || investment_duration == 20 || investment_duration == 30 || investment_duration == 90 || investment_duration == 180) {
        
        uint interest_RatePerDay;
        string memory package_name; 

        if(investment_duration == 7) {
            interest_RatePerDay = newStakeAmount.mul(15).div(1000);
            package_name = "Meta Blue";
        }
        else if(investment_duration == 20) {
            interest_RatePerDay = newStakeAmount.mul(16).div(1000);
            package_name = "Meta Yellow";
        }
        else if(investment_duration == 30) {
            interest_RatePerDay = newStakeAmount.mul(17).div(1000);
            package_name = "Meta Purple";
        }
        else if(investment_duration == 90) {
            interest_RatePerDay = newStakeAmount.mul(18).div(1000);
            package_name = "Meta White";
        }
        else if(investment_duration == 180) {
            interest_RatePerDay = newStakeAmount.mul(2).div(100);
            package_name = "Meta Green";
        }

        userDetails[investor].rewardTime = timeNow + investment_duration * 1 days;
        userDetails[investor].investmentDuration = investment_duration;
        userDetails[investor].investmentRewardPerDay = interest_RatePerDay;
        userDetails[investor].totalinvestmentReward = interest_RatePerDay.mul(investment_duration);
        userDetails[investor].totalReward = newStakeAmount.add(userDetails[investor].totalinvestmentReward);
        userDetails[investor].packageName = package_name;
        userDetails[investor].investmentAmount = newStakeAmount;
        userDetails[investor].hasStake = true;
        
        userAddresses.push(investor);
        }else {
            revert("invalid invest period");
        }

        // update userBalance()
        BEP20USDT.transfer(address(this), newStakeAmount);
        emit UpdateStakedEvent(investor, investment_duration, newStakeAmount, true);
        return true;
    }

    function getCurrentReward() public returns(uint) {
        require(hasInvested(investor) != false, "You have to invest first");
        uint investmentrewardperDay = userDetails[investor].investmentRewardPerDay; 
        uint investmentrewardperHour = investmentrewardperDay.div(22);
        userDetails[investor].currentinvestmentReward += investmentrewardperHour;
        uint _current_investmentReward = userDetails[investor].currentinvestmentReward;
        emit UpdateRewardevent(investmentrewardperDay, investmentrewardperHour, _current_investmentReward);
        return _current_investmentReward;
    }

    function withdrawStake() public payable returns(bool) {
        require(hasInvested(investor) != false);
        if(timeNow >= userDetails[investor].rewardTime) {
            uint total_Reward = userDetails[investor].totalReward;
            uint WithdrawTime = timeNow;
            address Withdrawer = investor;
            if(wasRef_errered(investor) == true)  {
                uint refBonus = total_Reward.mul(10).div(100);
                address referrer = userDetails[investor].referrer;

                _balanceOf[referrer].add(refBonus);
                // transfer(referrer, refBonus);
            }

            _balanceOf[investor].add(total_Reward);

            // if();
            // update userBalance
            BEP20USDT.transfer(investor, total_Reward);

            emit WithdrawalEvent(Withdrawer, total_Reward, WithdrawTime);
            return true;
        }else {
            revert("Withdrawal Time Not Reached");
        }
        
    }

    // function unStakeToken() public returns(uint) {
    //     require(hasInvested(investor) != false);
    //     userDetails[investor].unStaked = true;

    //     address uninvest = investor;
    //     uint unstakeFee = userDetails[investor].investmentAmount.mul(12).div(100);
    //     uint investment_amount = userDetails[investor].investmentAmount;
    //     uint _current_investmentReward = userDetails[investor].currentinvestmentReward;
    //     uint _amtUnstaked = investment_amount.add(_current_investmentReward);
    //     delete userDetails[investor];

    //     // update userBalance
    //     BEP20USDT.transfer(investor, _amtUnstaked);
    //     emit UnstakeEvent(unstaker, unstakeFee, _amtUnstaked);
    //     return unstakeFee;
    // }
}
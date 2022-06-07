// SPDX-License-Identifier:GPL-3.0

pragma solidity^0.5.16;


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

contract Palego{
    using SafeMath for uint256;
    address investor;
    uint timeNow = block.timestamp;
    address public owner;
    
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
    address[] private userAddresses; 

    constructor (address ownerAddress) {
        owner = ownerAddress;
    }

    event StakedEvent(address indexed investor,uint investment_duration, uint investment_amount, uint investmentrewardperDay, uint totalstakeReward, uint total_reward, bool hasStake, bool unStaked);
    event UpdateStakedEvent(address indexed investor,uint investment_duration, uint newStakeAmount, bool hasStake);
    event UpgradeEvent(address indexed investor,uint investment_duration, uint investment_amount, uint investmentrewardperDay, uint totalinvestment_reward, uint total_reward, address ref_Errer, bool hasStake, bool unStaked);
    event UnstakeEvent(address indexed unstaker, uint unstakeFee, uint _amtUnstaked);
    event UpdateRewardevent(uint investmentrewardperDay, uint investmentrewardperHour, uint currentstakeReward);
    event WithdrawlEvent(address indexed Withdrawer, uint total_Reward, uint WithdrawTime);

    function hasStaked(address _investor) public view returns(bool) {
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
        require(hasStaked(referrer) != false, "Referrer have to invest first");
        
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
            userDetails[investor].totalstakeReward = interest_RatePerDay.mul(investment_duration);
            userDetails[investor].totalReward = investment_amount.add(userDetails[investor].totalstakeReward);
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
            tokenContract.transfer(address(this), investment_amount);
            
            uint investmentrewardperDay = userDetails[investor].investmentRewardPerDay;
            uint total_reward = userDetails[investor].totalReward;
            uint totalinvestment_reward = userDetails[investor].totalstakeReward;
            address ref_Errer = userDetails[investor].referrer;
            emit UpgradeEvent(investor, investment_duration, investment_amount, investmentrewardperDay, totalinvestment_reward, total_reward, ref_Errer, true, false);
            return (userAddresses.length) -1;
    }
    
    function stake(uint investment_amount, uint investment_duration) public payable returns(uint) {
        // require(_balanceOf[investor] >= investment_amount, "staker must have enough tokens to stake");
        require(investor == msg.sender, "Only account owner can stake");
        require(investor != address(0), "Staker cannot be a zero address");

        

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
        userDetails[investor].totalstakeReward = interest_RatePerDay.mul(investment_duration);
        userDetails[investor].totalReward = investment_amount.add(userDetails[investor].totalstakeReward);
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
        tokenContract.transfer(address(this), investment_amount);
        uint investmentrewardperDay = userDetails[investor].investmentRewardPerDay;
        uint total_reward = userDetails[investor].totalReward;
        uint totalinvestment_reward = userDetails[investor].totalstakeReward;
        emit StakedEvent(investor, investment_duration, investment_amount, investmentrewardperDay, totalinvestment_reward, total_reward, true, false);
        return (userAddresses.length) -1;
    }

    function getuserCount() public view returns (uint) {
        return userAddresses.length;
    }

    function getstakeDetails(address user_address) public view returns(uint rewardTime, uint stakeAmount, uint stakeDuration, uint investmentRewardPerDay, uint totalstakeReward, uint totalReward, string memory packageName) {
        require(hasStaked(user_address) != false, "You have to invest first");
        require(investor != address(0), "Staker cannot be a zero");

        return (
            userDetails[user_address].rewardTime,
            userDetails[user_address].investmentAmount,
            userDetails[user_address].investmentDuration,
            userDetails[user_address].investmentRewardPerDay,
            userDetails[user_address].totalReward,
            userDetails[user_address].totalstakeReward,
            userDetails[user_address].packageName
            );
    }

    function getrefDetails(address user_address) public view returns(address referrer, uint refCount) {
        require(hasStaked(user_address) != false, "You have to invest first");
        require(user_address != address(0), "Staker cannot be a zero");

        return (
            userDetails[user_address].referrer,
            userDetails[user_address].refCount
            );
    }

    function upgradeStake(uint topup_amount, uint investment_duration) public returns (bool) {
        require(hasStaked(investor) != false, "You have to invest first");
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
        userDetails[investor].totalstakeReward = interest_RatePerDay.mul(investment_duration);
        userDetails[investor].totalReward = newStakeAmount.add(userDetails[investor].totalstakeReward);
        userDetails[investor].packageName = package_name;
        userDetails[investor].investmentAmount = newStakeAmount;
        userDetails[investor].hasStake = true;
        
        userAddresses.push(investor);
        }else {
            revert("invalid invest period");
        }

        // update userBalance()
        tokenContract.transfer(address(this), newStakeAmount);
        emit UpdateStakedEvent(investor, investment_duration, newStakeAmount, true);
        return true;
    }

    function getCurrentReward() public returns(uint) {
        require(hasStaked(investor) != false, "You have to invest first");
        uint investmentrewardperDay = userDetails[investor].investmentRewardPerDay; 
        uint investmentrewardperHour = investmentrewardperDay.div(22);
        userDetails[investor].currentstakeReward += investmentrewardperHour;
        uint _current_investmentReward = userDetails[investor].currentstakeReward;
        emit UpdateRewardevent(investmentrewardperDay, investmentrewardperHour, _current_investmentReward);
        return _current_investmentReward;
    }

    function withdrawStake() public payable returns(bool) {
        require(hasStaked(investor) != false);
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
            tokenContract.transfer(investor, total_Reward);

            emit WithdrawalEvent(Withdrawer, total_Reward, WithdrawTime);
            return true;
        }else {
            revert("Withdrawal Time Not Reached");
        }
        
    }

    function unStakeToken() public returns(uint) {
        require(hasStaked(investor) != false);
        userDetails[investor].unStaked = true;

        address uninvest = investor;
        uint unstakeFee = userDetails[investor].investmentAmount.mul(12).div(100);
        uint investment_amount = userDetails[investor].investmentAmount;
        uint _current_investmentReward = userDetails[investor].currentstakeReward;
        uint _amtUnstaked = investment_amount.add(_current_investmentReward);
        delete userDetails[investor];

        // update userBalance
        tokenContract.transfer(investor, _amtUnstaked);
        emit UnstakeEvent(unstaker, unstakeFee, _amtUnstaked);
        return unstakeFee;
    }
}
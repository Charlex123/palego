// SPDX-License-Identifier:GPL-3.0

pragma solidity^0.8.0;

import "./MetaDefi.sol";


contract Stake{
    using SafeMath for uint256;
    address staker;
    uint timeNow = block.timestamp;
    MetaDefi public tokenContract;
    constructor(MetaDefi _tokenContract) {
        tokenContract = _tokenContract;
        staker = msg.sender; 
    }

    struct userStakeDetail{
        uint rewardTime;
        uint stakeDuration;
        uint stakeAmount;
        uint currentstakeReward;
        uint stakeRewardPerDay;
        uint totalstakeReward;
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
    mapping(address => userStakeDetail) private userDetails;
    address[] private userAddresses;

    event StakedEvent(address indexed staker, uint stake_duration, uint stake_amount, uint stakerewardperDay, uint totalstakeReward, uint total_reward, bool hasStake, bool unStaked);
    event UpdateStakedEvent(address indexed staker, uint stake_duration, uint newStakeAmount, bool hasStake);
    event UpgradeEvent(address indexed staker, uint stake_duration, uint stake_amount, uint stakerewardperDay, uint totalstake_reward, uint total_reward, address ref_Errer, bool hasStake, bool unStaked);
    event UnstakeEvent(address indexed unstaker, uint unstakeFee, uint _amtUnstaked);
    event UpdateRewardevent(uint stakerewardperDay, uint stakerewardperHour, uint currentstakeReward);
    event WithdrawlEvent(address indexed Withdrawer, uint total_Reward, uint WithdrawTime);

    function hasStaked(address _staker) public view returns(bool) {
        if(userDetails[_staker].hasStake == true) return true;
        return false;
    }

    function wasRef_errered(address _staker) public view returns(bool) {
        if(userDetails[_staker].wasReferrered == true) return true;
        return false;
    }

    function getStakerAccount() public view returns(address) {
        return staker;
    }
   
    function myTokenBalance() public view returns(uint) {
        return _balanceOf[staker];
    }
    
    function getReferrer() public view returns(address) {
        return userDetails[staker].referrer;
    }

    function refStake(address referrer, uint stake_amount, uint stake_duration) public payable returns(uint) {
        require(_balanceOf[staker] >= stake_amount, "staker must have enough tokens to stake");
        require(staker == msg.sender, "Only account owner can stake");
        require(staker != address(0), "Staker cannot be a zero address");
        require(referrer != address(0), "Referrer cannot be a zero address");
        require(referrer != staker, "You cannot refer yourself");
        require(hasStaked(referrer) != false, "Referrer have to stake first");
        
        if(userDetails[staker].hasStake == true) {
            revert("You currently have a stake running, you can only upgrade");
        }

        if(stake_duration == 7 || stake_duration == 20 || stake_duration == 30 || stake_duration == 90 || stake_duration == 180) {
            
            uint interest_RatePerDay;
            string memory package_name; 

            if(stake_duration == 7) {
                interest_RatePerDay = stake_amount.mul(15).div(1000);
                package_name = "Meta Blue";
            }
            else if(stake_duration == 20) {
                interest_RatePerDay = stake_amount.mul(16).div(1000);
                package_name = "Meta Yellow";
            }
            else if(stake_duration == 30) {
                interest_RatePerDay = stake_amount.mul(17).div(1000);
                package_name = "Meta Purple";
            }
            else if(stake_duration == 90) {
                interest_RatePerDay = stake_amount.mul(18).div(1000);
                package_name = "Meta White";
            }
            else if(stake_duration == 180) {
                interest_RatePerDay = stake_amount.mul(2).div(100);
                package_name = "Meta Green";
            }

            userDetails[staker].rewardTime = timeNow + stake_duration * 1 days;
            userDetails[staker].stakeDuration = stake_duration;
            userDetails[staker].stakeRewardPerDay = interest_RatePerDay;
            userDetails[staker].totalstakeReward = interest_RatePerDay.mul(stake_duration);
            userDetails[staker].totalReward = stake_amount.add(userDetails[staker].totalstakeReward);
            userDetails[staker].referrer = referrer;
            userDetails[staker].packageName = package_name;
            userDetails[staker].stakeAmount = stake_amount;
            userDetails[staker].wasReferrered = true;
            userDetails[staker].hasStake = true;
            userDetails[staker].unStaked = false;

            userAddresses.push(staker);
            }else {
                revert("invalid stake period");
            }

            // updateusertokenbalance
            tokenContract.transfer(address(this), stake_amount);
            
            uint stakerewardperDay = userDetails[staker].stakeRewardPerDay;
            uint total_reward = userDetails[staker].totalReward;
            uint totalstake_reward = userDetails[staker].totalstakeReward;
            address ref_Errer = userDetails[staker].referrer;
            emit UpgradeEvent(staker, stake_duration, stake_amount, stakerewardperDay, totalstake_reward, total_reward, ref_Errer, true, false);
            return (userAddresses.length) -1;
    }
    
    function stake(uint stake_amount, uint stake_duration) public payable returns(uint) {
        // require(_balanceOf[staker] >= stake_amount, "staker must have enough tokens to stake");
        require(staker == msg.sender, "Only account owner can stake");
        require(staker != address(0), "Staker cannot be a zero address");

        

        if(userDetails[staker].hasStake == true) {
            revert("You currently have a stake running, you can only upgrade");
        }
        if(stake_duration == 7 || stake_duration == 20 || stake_duration == 30 || stake_duration == 90 || stake_duration == 180) {
        
        uint interest_RatePerDay;
        string memory package_name; 

        if(stake_duration == 7) {
            interest_RatePerDay = stake_amount.mul(15).div(1000);
            package_name = "Meta Blue";
        }
        else if(stake_duration == 20) {
            interest_RatePerDay = stake_amount.mul(16).div(1000);
            package_name = "Meta Yellow";
        }
        else if(stake_duration == 30) {
            interest_RatePerDay = stake_amount.mul(17).div(1000);
            package_name = "Meta Purple";
        }
        else if(stake_duration == 90) {
            interest_RatePerDay = stake_amount.mul(18).div(1000);
            package_name = "Meta White";
        }
        else if(stake_duration == 180) {
            interest_RatePerDay = stake_amount.mul(2).div(100);
            package_name = "Meta Green";
        }

        userDetails[staker].rewardTime = timeNow + stake_duration * 1 days;
        userDetails[staker].stakeDuration = stake_duration;
        userDetails[staker].stakeRewardPerDay = interest_RatePerDay;
        userDetails[staker].totalstakeReward = interest_RatePerDay.mul(stake_duration);
        userDetails[staker].totalReward = stake_amount.add(userDetails[staker].totalstakeReward);
        userDetails[staker].packageName = package_name;
        userDetails[staker].stakeAmount = stake_amount;
        userDetails[staker].hasStake = true;
        userDetails[staker].wasReferrered = false;
        userDetails[staker].unStaked = false;

        userAddresses.push(staker);
        }else {
            revert("invalid stake period");
        }
        
        // updateusertokenbalance
        tokenContract.transfer(address(this), stake_amount);
        uint stakerewardperDay = userDetails[staker].stakeRewardPerDay;
        uint total_reward = userDetails[staker].totalReward;
        uint totalstake_reward = userDetails[staker].totalstakeReward;
        emit StakedEvent(staker, stake_duration, stake_amount, stakerewardperDay, totalstake_reward, total_reward, true, false);
        return (userAddresses.length) -1;
    }

    function getuserCount() public view returns (uint) {
        return userAddresses.length;
    }

    function getstakeDetails(address user_address) public view returns(uint rewardTime, uint stakeAmount, uint stakeDuration, uint stakeRewardPerDay, uint totalstakeReward, uint totalReward, string memory packageName) {
        require(hasStaked(user_address) != false, "You have to stake first");
        require(staker != address(0), "Staker cannot be a zero");

        return (
            userDetails[user_address].rewardTime,
            userDetails[user_address].stakeAmount,
            userDetails[user_address].stakeDuration,
            userDetails[user_address].stakeRewardPerDay,
            userDetails[user_address].totalReward,
            userDetails[user_address].totalstakeReward,
            userDetails[user_address].packageName
            );
    }

    function getrefDetails(address user_address) public view returns(address referrer, uint refCount) {
        require(hasStaked(user_address) != false, "You have to stake first");
        require(user_address != address(0), "Staker cannot be a zero");

        return (
            userDetails[user_address].referrer,
            userDetails[user_address].refCount
            );
    }

    function upgradeStake(uint topup_amount, uint stake_duration) public returns (bool) {
        require(hasStaked(staker) != false, "You have to stake first");
        require(staker != address(0), "Staker cannot be a zero");

        // uint oldStakeAmount = userDetails[staker].stakeAmount;
        uint newStakeAmount = userDetails[staker].stakeAmount.add(topup_amount);
        uint stake_duration_seconds = timeNow + stake_duration * 1 days;
        // get minimum amount to uprade with

        // require(_balanceOf[staker] < topup_amount, "cannot stake more than your what you have");
        // require(_balanceOf[staker] <= oldStakeAmount, "cannot upgrade to a lower level");
        if(stake_duration_seconds <= userDetails[staker].stakeDuration) {
            revert("cannot upgrade to the same level or a lower level");
        }
        if(stake_duration == 7 || stake_duration == 20 || stake_duration == 30 || stake_duration == 90 || stake_duration == 180) {
        
        uint interest_RatePerDay;
        string memory package_name; 

        if(stake_duration == 7) {
            interest_RatePerDay = newStakeAmount.mul(15).div(1000);
            package_name = "Meta Blue";
        }
        else if(stake_duration == 20) {
            interest_RatePerDay = newStakeAmount.mul(16).div(1000);
            package_name = "Meta Yellow";
        }
        else if(stake_duration == 30) {
            interest_RatePerDay = newStakeAmount.mul(17).div(1000);
            package_name = "Meta Purple";
        }
        else if(stake_duration == 90) {
            interest_RatePerDay = newStakeAmount.mul(18).div(1000);
            package_name = "Meta White";
        }
        else if(stake_duration == 180) {
            interest_RatePerDay = newStakeAmount.mul(2).div(100);
            package_name = "Meta Green";
        }

        userDetails[staker].rewardTime = timeNow + stake_duration * 1 days;
        userDetails[staker].stakeDuration = stake_duration;
        userDetails[staker].stakeRewardPerDay = interest_RatePerDay;
        userDetails[staker].totalstakeReward = interest_RatePerDay.mul(stake_duration);
        userDetails[staker].totalReward = newStakeAmount.add(userDetails[staker].totalstakeReward);
        userDetails[staker].packageName = package_name;
        userDetails[staker].stakeAmount = newStakeAmount;
        userDetails[staker].hasStake = true;
        
        userAddresses.push(staker);
        }else {
            revert("invalid stake period");
        }

        // update userBalance()
        tokenContract.transfer(address(this), newStakeAmount);
        emit UpdateStakedEvent(staker, stake_duration, newStakeAmount, true);
        return true;
    }

    function getCurrentReward() public returns(uint) {
        require(hasStaked(staker) != false, "You have to stake first");
        uint stakerewardperDay = userDetails[staker].stakeRewardPerDay; 
        uint stakerewardperHour = stakerewardperDay.div(22);
        userDetails[staker].currentstakeReward += stakerewardperHour;
        uint _current_stakeReward = userDetails[staker].currentstakeReward;
        emit UpdateRewardevent(stakerewardperDay, stakerewardperHour, _current_stakeReward);
        return _current_stakeReward;
    }

    function withdrawStake() public payable returns(bool) {
        require(hasStaked(staker) != false);
        if(timeNow >= userDetails[staker].rewardTime) {
            uint total_Reward = userDetails[staker].totalReward;
            uint WithdrawTime = timeNow;
            address Withdrawer = staker;
            if(wasRef_errered(staker) == true)  {
                uint refBonus = total_Reward.mul(10).div(100);
                address referrer = userDetails[staker].referrer;

                _balanceOf[referrer].add(refBonus);
                // transfer(referrer, refBonus);
            }

            _balanceOf[staker].add(total_Reward);

            // if();
            // update userBalance
            tokenContract.transfer(staker, total_Reward);

            emit WithdrawlEvent(Withdrawer, total_Reward, WithdrawTime);
            return true;
        }else {
            revert("Withdrawal Time Not Reached");
        }
        
    }

    function unStakeToken() public returns(uint) {
        require(hasStaked(staker) != false);
        userDetails[staker].unStaked = true;

        address unstaker = staker;
        uint unstakeFee = userDetails[staker].stakeAmount.mul(12).div(100);
        uint stake_amount = userDetails[staker].stakeAmount;
        uint _current_stakeReward = userDetails[staker].currentstakeReward;
        uint _amtUnstaked = stake_amount.add(_current_stakeReward);
        delete userDetails[staker];

        // update userBalance
        tokenContract.transfer(staker, _amtUnstaked);
        emit UnstakeEvent(unstaker, unstakeFee, _amtUnstaked);
        return unstakeFee;
    }
}
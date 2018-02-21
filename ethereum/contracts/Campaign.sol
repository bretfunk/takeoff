pragma solidity ^0.4.19;

contract CampaignFactory {
  address public takeoff;
  address[] public campaigns;

  function CampaignFactory() {
    takeoff = msg.sender;
  }

  function createCampaign(string _description, uint _moneyGoal, uint _timeGoal) {
    address newCampaign = new Campaign(_description, _moneyGoal, _timeGoal, takeoff, msg.sender);
    campaigns.push(newCampaign);
  }

  function allCampaigns() public view returns (address[]) {
    return campaigns;
  }
  }

  contract Campaign {
    address public takeoff;
    // the owner is the escrow
    address public owner;
    string public description;
    uint public moneyGoal;
    uint public timeGoal;
    Contributor[] public contributors;
    uint public balance;
    uint public start;

    struct Contributor {
      address _address;
      uint _amountGiven;
    }

    function Campaign(string _description, uint _moneyGoal, uint _timeGoal, address _takeoff, address _owner) public  {
      takeoff = _takeoff;
      owner = _owner;
      description = _description;
      moneyGoal = _moneyGoal;
      timeGoal = _timeGoal * 1 days;
      start = now;
    }

    function contribute() public payable {
      balance += msg.value;
      contributors.push(Contributor(msg.sender, msg.value));
    }

    modifier timeCheck() {
      require((start + timeGoal) < now);
      _;
    }

    function disburseFunds() public payable timeCheck {
      uint fee = balance / 100;
      if (balance >= moneyGoal) {
        // get out 2% fee and gas money
        owner.transfer(fee);
        balance = balance - (fee * 2);
        owner.transfer(balance);
        balance = 0;
      } else {
        for(uint i = 0; i < contributors.length; i++) {
          // get out 2% fee and gas money
          contributors[i]._address.transfer(contributors[i]._amountGiven / 100);
        }
        takeoff.transfer(fee);
        balance = 0;
      }
    }

    function getSummary() public view returns (
      address, string, uint, uint, uint, uint
    ) {
      return (
    owner,
    description,
    moneyGoal,
    timeGoal,
    balance,
    start
      );
    }

    // function ownerBalance() public view returns(uint) {
    //     return owner.balance;
    // }

    // function takeoffBalance() public view returns(uint) {
    //     return takeoff.balance;
    // }
  }

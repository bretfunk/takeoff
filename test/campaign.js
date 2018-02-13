//if you make changes to the contract you have to recompile
const assert = require('assert');
const ganache = require('ganache-cli')
const provider = ganache.provider();
const Web3 = require('web3')
const web3 = new Web3(provider);
const compiledFactory = require('../ethereum/build/CampaignFactory.json')
const compiledCampaign = require('../ethereum/build/Campaign.json')

let accounts;
let factory;
let campaign;
let campaignAddress;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode} )
    .send({ from: accounts[0], gas: '1000000' })

  factory.setProvider(provider);

  //create campaign
  await factory.methods.createCampaign(
    "test campaign to raise money", 5000000, -1
  ).send({ from: accounts[1], gas: 3000000 })

  campaignAddress = await factory.methods.campaigns(0).call()
  //
  campaign = await new web3.eth.Contract(
    JSON.parse(compiledCampaign.interface
    ), campaignAddress);

  await campaign.setProvider(provider);
  //console.log(campaign);
})

describe('Campaign', async () => {
  it('has all accounts', async () => {
    assert.equal(accounts.length, 10);
  })

  it('has a factory', async () => {
    assert.ok(await factory);
  })

  it('has a campaign', async () => {
    assert.ok(await campaign);
  })

  it('factory has a list of campaigns', async () => {
    const allCampaigns = await factory.methods.allCampaigns().call();
    assert.equal(allCampaigns.length, 1);
  })

  const oneEther = web3.utils.toWei('1', 'ether')

  it('contributor can contribute to a campaign', async () => {
    await campaign.methods.contribute().send({
      from: accounts[2],
      gas: '1000000',
      value: oneEther
    })

    const balance = await campaign.methods.balance().call()
    assert.equal(balance, oneEther)
  })

  it('campaign can disburse funds with achieved goal', async () => {
    await campaign.methods.contribute().send({
      from: accounts[2],
      gas: '1000000',
      value: oneEther
    })

    await campaign.methods.contribute().send({
      from: accounts[3],
      gas: '1000000',
      value: oneEther
    })

    const balance = await campaign.methods.balance().call()
    assert.equal(balance, oneEther * 2)

    await campaign.methods.disburseFunds().send({
      from: accounts[0],
      gas: '3000000'
    })

    const startBalance = await web3.utils.toWei('10', 'ether');
    const afterDisbursion = await web3.eth.getBalance(accounts[1])
    assert(afterDisbursion > startBalance);
  })

  it('campaign can disburse funds with unachieved goal', async () => {
    await campaign.methods.contribute().send({
      from: accounts[2],
      gas: '1000000',
      value: '1000000'
    })

    await campaign.methods.contribute().send({
      from: accounts[3],
      gas: '1000000',
      value: '1000000'
    })

    const balance = await campaign.methods.balance().call()
    assert.equal(balance, 2000000)

    await campaign.methods.disburseFunds().send({
      from: accounts[0],
      gas: '3000000'
    })

    const startBalance = await web3.utils.toWei('10', 'ether');
    const bobAfterDisbursion = await web3.eth.getBalance(accounts[2])
    const aliceAfterDisbursion = await web3.eth.getBalance(accounts[3])

    assert(await bobAfterDisbursion > startBalance);
    assert(await aliceAfterDisbursion > startBalance);

  })

  it('disbursion cannot happen before time limit', async () => {
    //need new campaign to test time, tests above were set at -1 days to trick async await
      await factory.methods.createCampaign(
        "test campaign to raise money", 5000000, 5
      ).send({ from: accounts[1], gas: 3000000 })

    campaignAddress = await factory.methods.campaigns(1).call()
    //
    campaign = await new web3.eth.Contract(
      JSON.parse(compiledCampaign.interface
      ), campaignAddress);

    await campaign.setProvider(provider);

    await campaign.methods.contribute().send({
      from: accounts[2],
      gas: '1000000',
      value: oneEther
    })

    await campaign.methods.contribute().send({
      from: accounts[3],
      gas: '1000000',
      value: oneEther
    })

    const balance = await campaign.methods.balance().call()
    assert.equal(balance, oneEther * 2)

    try {
    await campaign.methods.disburseFunds().send({
      from: accounts[0],
      gas: '3000000'
    })
      assert(false)
    } catch(err) {
      assert(err)
    }
  })
})


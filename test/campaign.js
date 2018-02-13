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
    "test campaign to raise money", 5000000, 5
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

  it('contributor can contribute to a campaign', async () => {
    await campaign.methods.contribute().send({
      from: accounts[2],
      gas: '1000000'
    })

    //correct way to access values?
    //const balance = campaign.values.balance().call()
    //assert.equal(balance, 1000000)

    //const contributors = campaign.methods.contributors().get()
    ////got zero params expected one?
    //assert.equal(contributors.length, 1);
  })

  it('', async () => {

  })

  it('', async () => {

  })

  it('', async () => {

  })

  it('', async () => {

  })
})


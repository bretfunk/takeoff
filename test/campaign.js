//if you make changes to the contract you have to recompile
const assert = require('assert');
const ganache = require('ganache-cli')
const provider = ganache.provider();
const Web3 = require('web3')
const web3 = new Web3(provider);
const compiledFactory = require('../ethereum/build/CampaignFactory.json')

let accounts;
let factory;
let campaign;

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

  const campaignAddress = await factory.methods.campaigns(0).call()
  //campaign.setProvider(provider);
})

describe('Campaign', async () => {
  it('has all accounts', async () => {
    assert.equal(accounts.length, 10);
  })

  it('has a factory', async () => {
    assert.ok(factory);
  })

  it('has a campaign', async () => {
    assert.ok(campaign);
  })
})


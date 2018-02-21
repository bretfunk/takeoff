const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json')

//specifys account used and api
const provider = new HDWalletProvider(
  'tooth rescue frown bicycle road during cup story spoil engage obey area',
  'https://rinkeby.infura.io/e3WxBxB5xl7JfaOJvj5t'
);

const web3 = new Web3(provider);

//cannot use await outside of a function so write an arbitray function
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
  .deploy({ data: compiledFactory.bytecode })
  .send({ gas: '1000000', from: accounts[0] })

  console.log('Contract deployed to', result.options.address);
};
deploy();


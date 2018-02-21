import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  web3 = new Web3(window.web3.currentProvider);
} else {
  //make own provider
  const provider = new Web3.providers.HttpProvider(
    //infura link is not sensitive
    'https://rinkeby.infura.io/e3WxBxB5xl7JfaOJvj5t',
  );
  web3 = new Web3(provider);
}

export default web3;

import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
'0x686Defb69c3393b0E03175C5dc33167a2Bd0Ac6D'
);

export default instance;


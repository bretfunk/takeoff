import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
'0x9DfFec289A3B2717C80956c0FE30969F57a33534'
);

export default instance;


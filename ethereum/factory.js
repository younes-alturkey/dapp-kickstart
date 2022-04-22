import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x931c98d31D59C33C26Af98b17a3Dff9a64b413c2"
);

export default instance;

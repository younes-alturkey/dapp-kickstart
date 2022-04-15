import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x356Dfcd662d73E5E15913EdFBEae0fc522b423EA"
);

export default instance;

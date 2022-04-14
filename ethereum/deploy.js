require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");

const { SEED_PHRASE, INFURA_ENDPOINT } = process.env;

const provider = new HDWalletProvider(
  SEED_PHRASE,
  // remember to change this to your own phrase!
  INFURA_ENDPOINT
  // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};
deploy();

("Attempting to deploy from account 0x2ea8c3B2C60AacC249A3734498CE0272D0FF890d");
("Contract deployed to 0x356Dfcd662d73E5E15913EdFBEae0fc522b423EA");

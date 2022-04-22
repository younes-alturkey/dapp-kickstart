import { useState } from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
import Campagin from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

export default ({ address }) => {
  const [val, setVal] = useState("0");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    try {
      const accounts = await web3.eth.getAccounts();
      const campaign = Campagin(address);
      await campaign.methods
        .contribute()
        .send({ from: accounts[0], value: web3.utils.toWei(val, "ether") });
    } catch (err) {
      setErr(err.message);
    }
    setLoading(false);
    Router.replaceRoute(`/campaigns/${address}`);
  };
  return (
    <Form onSubmit={onSubmit} error={!!err}>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          label="ether"
          labelPosition="right"
        />
      </Form.Field>
      <Button primary loading={loading}>
        Contribute
      </Button>
      <Message error header="Oops!" content={err}></Message>
    </Form>
  );
};

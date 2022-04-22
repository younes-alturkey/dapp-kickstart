import Layout from "../../../components/Layout";
import { Form, Button, Message, Input } from "semantic-ui-react";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import { Link, Router } from "../../../routes";
import { useState } from "react";

export default function NewRequest({ address }) {
  const [desc, setDesc] = useState("");
  const [val, setVal] = useState("");
  const [reci, setReci] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrMsg("");
    try {
      const accounts = await web3.eth.getAccounts();
      const campaign = Campaign(address);
      await campaign.methods
        .createRequest(desc, web3.utils.toWei(val, "ether"), reci)
        .send({ from: accounts[0] });

      Router.pushRoute(`/campaigns/${address}/requests`);
    } catch (err) {
      setErrMsg(err.message);
    }
    setLoading(false);
  };

  return (
    <Layout>
      <Link href={`/campaigns/${address}/requests`}>
        <a>Back</a>
      </Link>
      <h3>Create Request</h3>
      <Form onSubmit={onSubmit} error={!!errMsg}>
        <Form.Field>
          <label>Description</label>
          <Input value={desc} onChange={(e) => setDesc(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Value in Ether</label>
          <Input value={val} onChange={(e) => setVal(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Recipient</label>
          <Input value={reci} onChange={(e) => setReci(e.target.value)} />
        </Form.Field>
        <Message error header="Oops!" content={errMsg}></Message>

        <Button primary loading={loading}>
          Create
        </Button>
      </Form>
    </Layout>
  );
}

NewRequest.getInitialProps = async (props) => {
  const { address } = props.query;
  return { address };
};

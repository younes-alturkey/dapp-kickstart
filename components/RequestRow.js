import { Table, Button } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";
import { useState } from "react";
import { Router } from "../routes";

export default ({ id, address, requestsCount, request, approversCount }) => {
  const { Row, Cell } = Table;
  const { description, value, recipient, approvalCount } = request;
  const [approveLoading, setApproveLoading] = useState(false);
  const [finalizeLoading, setFinalizeLoading] = useState(false);
  const [err, setErr] = useState("");
  const readyToFinalize = request.approvalCount > approversCount / 2;

  const onApprove = async () => {
    setApproveLoading(true);
    try {
      const accounts = await web3.eth.getAccounts();
      const campagin = Campaign(address);
      await campagin.methods.approveRequest(id).send({ from: accounts[0] });
    } catch (err) {
      setErr(err.message);
    }
    setApproveLoading(false);
    Router.pushRoute(`/campaigns/${address}/requests`);
  };

  const onFinalize = async () => {
    setFinalizeLoading(true);
    try {
      const accounts = await web3.eth.getAccounts();
      const campagin = Campaign(address);
      await campagin.methods.finalizeRequest(id).send({ from: accounts[0] });
    } catch (err) {
      setErr(err.message);
    }
    setFinalizeLoading(false);
  };

  return (
    <Row
      disabled={request.complete}
      positive={readyToFinalize && !request.complete}
    >
      <Cell>{id}</Cell>
      <Cell>{description}</Cell>
      <Cell>{web3.utils.fromWei(value, "ether")}</Cell>
      <Cell>
        {recipient.substring(0, 6) +
          "..." +
          recipient.substring(recipient.length - 4, recipient.length)}
      </Cell>
      <Cell>
        {approvalCount}/{approversCount}
      </Cell>
      <Cell>
        {!readyToFinalize && (
          <Button
            color="green"
            basic
            onClick={onApprove}
            loading={approveLoading}
          >
            Approve
          </Button>
        )}
      </Cell>
      <Cell>
        {!request.complete && (
          <Button
            color="teal"
            basic
            onClick={onFinalize}
            loading={finalizeLoading}
          >
            Finalize
          </Button>
        )}
      </Cell>
    </Row>
  );
};

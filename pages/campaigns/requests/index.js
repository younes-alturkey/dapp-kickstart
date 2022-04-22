import Layout from "../../../components/Layout";
import { Button, Table } from "semantic-ui-react";
import { Link } from "../../../routes";
import Campaign from "../../../ethereum/campaign";
import RequestRow from "../../../components/RequestRow";

export default function RequestsIndex({
  address,
  requestsCount,
  requests,
  approversCount,
}) {
  const { Header, Row, HeaderCell, Body } = Table;
  return (
    <Layout>
      <h3>Requests</h3>
      <div>Found {requestsCount} requests.</div>
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval Count</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
        <Body>
          {requests &&
            requests.map((req, index) => {
              return (
                <RequestRow
                  key={index}
                  id={index}
                  address={address}
                  request={req}
                  approversCount={approversCount}
                />
              );
            })}
        </Body>
      </Table>
      <Link route={`/campaigns/${address}/requests/new`}>
        <a>
          <Button primary floated="right" style={{ marginBottom: 10 }}>
            Add Request
          </Button>
        </a>
      </Link>
    </Layout>
  );
}

RequestsIndex.getInitialProps = async (props) => {
  const { address } = props.query;
  const campaign = Campaign(address);
  const requestsCount = await campaign.methods.getRequestsCount().call();
  const approversCount = await campaign.methods.approversCount().call();

  const requests = await Promise.all(
    Array(parseInt(requestsCount))
      .fill()
      .map((_, index) => {
        return campaign.methods.requests(index).call();
      })
  );

  return { address, requestsCount, requests, approversCount };
};

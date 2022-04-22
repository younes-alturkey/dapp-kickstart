import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import { Button, Card, Grid } from "semantic-ui-react";
import ContributeForm from "../../components/ContributeForm";
import web3 from "../../ethereum/web3";
import { Link } from "../../routes";

export default function ShowCampaign(props) {
  const {
    minimumContribution,
    balance,
    requestsCount,
    approversCount,
    manager,
    address,
  } = props;

  const items = [
    {
      header:
        manager.substring(0, 6) +
        "..." +
        manager.substring(manager.length - 4, manager.length),
      description:
        "The manager created this campaign and can create requests to withdraw money.",
      meta: "Address of Manager",
    },
    {
      header: minimumContribution,
      description:
        "You must contribute this much wei in order to become an approver.",
      meta: "Minimum Contrinution (wei)",
    },
    {
      header: requestsCount,
      description:
        "A request tries to withdraw money from the contract. Requests submitted to approvers.",
      meta: "Number of Requests",
    },
    {
      header: approversCount,
      description: "Number of people who contributed to this campaign.",
      meta: "Number of Approvers",
    },
    {
      header: web3.utils.fromWei(balance, "ether"),
      description: "The balance is how much money this campaign has to spend.",
      meta: "Campaign Balance (ether)",
    },
  ];
  return (
    <Layout>
      <h1>Show Campaign</h1>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            <Card.Group items={items} />
          </Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm address={address} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Link route={`/campaigns/${address}/requests`}>
              <a>
                <Button primary>View Requests</Button>
              </a>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
}

ShowCampaign.getInitialProps = async (props) => {
  const campaign = Campaign(props.query.address);
  const summary = await campaign.methods.getSummary().call();
  return {
    address: props.query.address,
    minimumContribution: summary[0],
    balance: summary[1],
    requestsCount: summary[2],
    approversCount: summary[3],
    manager: summary[4],
  };
};

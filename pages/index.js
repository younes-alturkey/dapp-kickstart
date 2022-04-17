import "semantic-ui-css/semantic.min.css";
import { Component } from "react";
import factory from "../ethereum/factory";
import { Card, Button } from "semantic-ui-react";
import Layout from "../components/Layout";

const items = [
  {
    header: "Project Report - April",
    description:
      "Leverage agile frameworks to provide a robust synopsis for high level overviews.",
    meta: "ROI: 30%",
  },
  {
    header: "Project Report - May",
    description:
      "Bring to the table win-win survival strategies to ensure proactive domination.",
    meta: "ROI: 34%",
  },
  {
    header: "Project Report - June",
    description:
      "Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.",
    meta: "ROI: 27%",
  },
];

class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return {
      campaigns,
    };
  }

  renderCampaigns() {
    const items = this.props.campaigns.map((addr) => {
      return {
        header: addr,
        description: <a>View Campaign</a>,
        fluid: true,
      };
    });

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <h3>Open Campaign</h3>
          {this.renderCampaigns()}
          <Button content="Create Campaign" icon="add circle" primary />
        </div>
      </Layout>
    );
  }
}

export default CampaignIndex;

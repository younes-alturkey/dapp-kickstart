import { Component } from "react";
import factory from "../ethereum/factory";
import { Card, Button } from "semantic-ui-react";
import Layout from "../components/Layout";
import { Link } from "../routes";

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
        description: (
          <Link route={`/campaigns/${addr}`}>
            <a>View Campaign</a>
          </Link>
        ),
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
          <Link route="/campaigns/new">
            <a className="item">
              <Button
                floated="right"
                content="Create Campaign"
                icon="add circle"
                primary
              />
            </a>
          </Link>

          {this.renderCampaigns()}
        </div>
      </Layout>
    );
  }
}

export default CampaignIndex;

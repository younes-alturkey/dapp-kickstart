import { Component } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";

class CampaignNew extends Component {
  state = {
    minimumContribution: "",
    errorMessage: "",
    loading: false,
  };

  handleChange = (event) => {
    this.setState({ minimumContribution: event.target.value });
  };

  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: "" });
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({ from: accounts[0] });

      Router.pushRoute("/");
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <h1>Create a Campaign</h1>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label="wei"
              labelPosition="right"
              placeholder="100"
              type="number"
              value={this.minimumContribution}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Button type="submit" primary loading={this.state.loading}>
            Submit
          </Button>
          <Message
            error
            header="Oops!"
            content={this.state.errorMessage}
          ></Message>
        </Form>
      </Layout>
    );
  }
}
export default CampaignNew;

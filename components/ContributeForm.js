import React, { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';
import axios from 'axios';

class ContributeForm extends Component {
  state = {
    value: '',
    error: '',
    loading: false
  }

  onSubmit = async event => {
    event.preventDefault();

    const campaign = Campaign(this.props.address)
    this.setState({ loading: true, error: '' })

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, 'ether')
      })
      this.sendToBackend(campaign, accounts[0]);
      Router.replaceRoute(`/campaigns/${this.props.address}`)
    } catch(error) {
      this.setState({ error: error.message });
    }
    this.setState({ loading: false, value: '' });
  }

  sendToBackend = async (campaign, user) => {
    const getCampaignInfo = await campaign.methods.getSummary().call();
    axios.post(`https://takeoff-backend2.herokuapp.com/api/v1/users/${user}`,
      {
      owner:        getCampaignInfo[0],
      description:  getCampaignInfo[1],
      moneyGoal:    web3.utils.fromWei(getCampaignInfo[2], 'ether'),
      timeGoal:     getCampaignInfo[3],
      balance:      web3.utils.fromWei(getCampaignInfo[4], 'ether'),
      start:        getCampaignInfo[5]
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.error}>
        <Form.Field>
          <label>Amount to Contribute</label>
          <Input
            value = {this.state.value}
            label="ether"
            labelPosition="right"
            onChange={event => this.setState({value: event.target.value})}
          />
        </Form.Field>
        <Message error header="Error!" content={this.state.error} />
        <Button
          color='black'
          loading={this.state.loading}
        >
          Contribute
        </Button>
      </Form>
    )
  }
}

export default ContributeForm;

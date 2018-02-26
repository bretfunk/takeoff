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

  sendToBackend = async (campaign, user) => {
    const getCampaignInfo = await campaign.methods.getSummary().call();
    const campaignInfo = {
      owner:        getCampaignInfo[0],
      description:  getCampaignInfo[1],
      moneyGoal:    getCampaignInfo[2],
      timeGoal:     getCampaignInfo[3],
      balance:      getCampaignInfo[4],
      start:        getCampaignInfo[5]
    }

    axios('localhost:8080/api/v1/users/123', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      credentials: 'same-origin',
        })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

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

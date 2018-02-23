import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class ContributeForm extends Component {

  state = {
    error: '',
    loading: false
  }

  onClick = async event => {
    event.preventDefault();

    const campaign = Campaign(this.props.address)
    this.setState({ loading: true, error: '' })

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.disburseFunds().send({
        from: accounts[0]
      })
    } catch(error) {
      this.setState({ error: error.message });
    }
    this.setState({ loading: false, value: '' });
  }

  render() {

  const button =
        <Button
          color='green'
          loading={this.state.loading}
          onClick={this.onClick}
          size='large'
        >
          Disburse Funds
        </Button>
    return (
      <div>
        {button}
      </div>
    )
  }
}

export default ContributeForm;

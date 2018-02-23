import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class New extends Component {
  state = {
    description: '',
    moneyGoal: '',
    timeGoal: '',
    errorMessage: '',
    loading: false
  }

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: '' })

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(
          this.state.description,
          this.state.moneyGoal,
          this.state.timeGoal
        ).send({
          from: accounts[0]
        })
      Router.pushRoute('/');
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  }

  render() {
    return (
      <Layout>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Description</label>
            <Input
              value={this.state.description}
              onChange={event =>
                  this.setState({ description: event.target.value })}
                />
                <label>Financial Goal</label>
                <Input
                  label="wei"
                  labelPosition="right"
                  value={this.state.moneyGoal}
                  onChange={event =>
                      this.setState({ moneyGoal: event.target.value })}
                    />
                    <label>Days Needed To Reach Financial Goal</label>
                    <Input
                      value={this.state.timeGoal}
                      onChange={event =>
                          this.setState({ timeGoal: event.target.value })}
                        />
                      </Form.Field>
                      <Message
                        error
                        header="Error"
                        content={this.state.errorMessage}
                      />
                      <Button
                        color='black'
                        loading={this.state.loading}
                      >
                        Create
                      </Button>
                    </Form>
                  </Layout>
    )
  }
}

export default New;

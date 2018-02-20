import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';

class Show extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();

    return {
      owner:        summary[0],
      description:  summary[1],
      moneyGoal:    summary[2],
      timeGoal:     summary[3],
      balance:      summary[4],
      start:        summary[5]
    }
  }

  renderData() {
    const {
      owner,
      description,
      moneyGoal,
      timeGoal,
      balance,
      start
    } = this.props;

    const items = [
      {
        header: owner,
        meta: "Address of Owner",
        description: "Manager owns the contract",
        style: { overflowWrap: 'break-word' }
      },
      {
        header: description,
        meta: "Description",
        description: "Description of the crowdfulding campaign",

        style: { overflowWrap: 'break-word' }
      },
      {
        header: moneyGoal,
        meta: "Money Goal (wei)",
        description: "Amount needed to start campaign.",
        style: { overflowWrap: 'break-word' }
      },
      {
        header: timeGoal,
        meta: "Time Goal",
        description: "Time needed to raise money",
        style: { overflowWrap: 'break-word' }
      },
      {
        header: balance,
        meta: "Amount Raised",
        description: "Amount raised so far",
        style: { overflowWrap: 'break-word' }
      },
      {
        header: start,
        meta: "Time the contract started",
        description: "Time remaining to raise money",
        style: { overflowWrap: 'break-word' }
      }
    ]

    return <Card.Group items={items} />;
      }

      render() {
        return(
          <Layout>
            <h1>Show</h1>
            {this.renderData()}
          </Layout>
        )
      }
      }

      export default Show;

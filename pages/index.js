import React, { Component } from 'react';
import { Card, Button, Icon } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout.js';
import { Link } from '../routes';
import Campaign from '../ethereum/campaign';
import Jumbotron from '../components/Jumbotron';
import web3 from '../ethereum/web3';

class CampaignIndex extends Component {
  static async getInitialProps() {
    const array = []
    const campaigns = await factory.methods.allCampaigns().call();
    for (let i = 0; i < campaigns.length; i++) {
      try {
        const campaign = await Campaign(campaigns[i]).methods.getSummary().call();
        const newCampaign = {
          owner:        campaign[0],
          description:  campaign[1],
          moneyGoal:    campaign[2],
          timeGoal:     campaign[3],
          balance:      campaign[4],
          start:        campaign[5]
        }
        array.push(newCampaign)
      } catch (err) {
        console.log(err);
      }
    }

    return { campaigns, array };
  }

  renderCampaigns() {
    const items = this.props.array.map((data, index) => {
      return {
        key: index,
        image: `https://picsum.photos/300/200?image=${ Math.ceil(Math.random() * 100)}`,
        header: data.description,
        meta: `Target Goal: ${web3.utils.fromWei(data.moneyGoal, 'ether')} ether \n Remaining: ${this.countdown(data.start, data.timeGoal)} hours`,
        description: (
          <Link route={`/campaigns/${this.props.campaigns[index]}`}>
            <a>View Campaign</a>
          </Link>
        ),
      }
    })
    return <Card.Group items={items} />;
  }

  countdown(start, target) {
    const startWithMilli = parseInt(start) * 1000
    const targetWithMilli = parseInt(target) * 1000
    const diff = startWithMilli + targetWithMilli - Date.now()
    const hoursLeft = diff / 60 / 60 / 1000
    return hoursLeft.toFixed(1)
  }

  render() {
    return (
      <Layout>
        <Jumbotron mainText="Takeoff" subText="Blockchain Crowdfunding Made Easy" />
        <h3>Open Campaigns</h3>
        <Link route="/campaigns/new">
          <a>
            <Button
              floated="right"
              content="Create Campaign"
              icon="add"
              color="black"
            />
          </a>
        </Link>

        {this.renderCampaigns()}
      </Layout>
    )
  }
}

export default CampaignIndex;

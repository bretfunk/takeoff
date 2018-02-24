import React, { Component } from 'react';
import { Card, Button, Icon } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout.js';
import { Link } from '../routes';
import Campaign from '../ethereum/campaign';
import Jumbotron from '../components/Jumbotron';
import web3 from '../ethereum/web3';
import Links from '../components/Links';

class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaignsArray = []
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
        campaignsArray.push(newCampaign)
      } catch (err) {
        console.log(err);
      }
    }
    return { campaigns, campaignsArray };
  }

  countdown(start, target) {
    const startWithMilli = parseInt(start) * 1000
    const targetWithMilli = parseInt(target) * 1000
    const diff = startWithMilli + targetWithMilli - Date.now()
    const hoursLeft = diff / 60 / 60 / 1000
    let output;
    hoursLeft < 0 ? output = 0 :  output = hoursLeft.toFixed(1)
    return
  }

  renderCampaigns() {
    let allItems = this.props.campaignsArray.map((data, index) => {
      return {
        key: index,
        image: `https://picsum.photos/300/200?image=${ Math.ceil(Math.random() * 100)}`,
        header: data.description,
        meta: `${this.countdown(data.start, data.timeGoal)} hours remaining`,
        description: (
          <Link route={`/campaigns/${this.props.campaigns[index]}`}>
            <a>View Campaign</a>
          </Link>
        ),
      }
    })

    allItems = allItems.splice(0, 3)

    const activeItems = allItems.filter((data) => {
      return data.meta.split(' ')[0] !== '0'
    })
    return <Card.Group items={activeItems} />;
  }

  render() {
    return (
      <div>
        <Layout>
          <h3>Open Campaigns</h3>
          {this.renderCampaigns()}
          <Link route="/campaigns/active">
            <Button
              primary
              style={{ marginTop: '15px' }}
            >
              All Active Campaigns
            </Button>
          </Link>
          <h3>Hot Campaigns</h3>
          {this.renderCampaigns()}
          <Link route="/campaigns/hot">
            <Button
              color="orange"
              style={{ marginTop: '15px' }}
            >
              All Hot Campaigns
            </Button>
          </Link>
          <h3>Editor's Choice</h3>
          {this.renderCampaigns()}
          <Link route="/campaigns/editors">
            <Button
              color="yellow"
              style={{ marginTop: '15px' }}
            >
              All Editor's Choice Campaigns
            </Button>
          </Link>
        </Layout>
      </div>
    )
  }
}

export default CampaignIndex;

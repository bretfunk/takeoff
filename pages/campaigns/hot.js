import React, { Component } from 'react';
import { Card, Icon } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import Layout from '../../components/Layout.js';
import { Link } from '../../routes';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';

class Hot extends Component {
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
    return output;
  }

  renderCampaigns() {
    let editorPicks = [];
    const allItems = this.props.campaignsArray.map((data, index) => {
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
    const activeItems = allItems.filter((data) => {
      return data.meta.split(' ')[0] !== '0'
    })

    for(let i = 0; i < 2; i++) {
      editorPicks.push(activeItems[Math.floor(Math.random()*activeItems.length)]);
    }
    return <Card.Group items={editorPicks} />;
  }

  render() {
    return (
      <Layout>
        <h3>Hot Campaigns</h3>
        {this.renderCampaigns()}
      </Layout>
    )
  }
}

export default Hot;

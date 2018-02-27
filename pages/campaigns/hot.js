import React, { Component } from 'react';
import { Segment, Header, Button, Card, Icon } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import Layout from '../../components/Layout.js';
import { Link } from '../../routes';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import usefulMethods from '../../usefulMethods';

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

  renderCampaigns() {
    let editorPicks = [];
    const allItems = this.props.campaignsArray.map((data, index) => {
      return {
        key: index,
        image: `https://picsum.photos/300/200?image=${ Math.ceil(Math.random() * 100)}`,
        header: data.description,
        meta: `${usefulMethods.countdown(data.start, data.timeGoal)} hours remaining`,
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

    for(let i = 0; i < 3; i++) {
      editorPicks.push(activeItems[Math.floor(Math.random()*activeItems.length)]);
    }
    return <Card.Group items={editorPicks} centered />;
  }

  render() {
    return (
      <Layout>
        <Header as='h1' textAlign="center">Hot Campaigns</Header>
        <Segment>
          {this.renderCampaigns()}
        </Segment>
      </Layout>
    )
  }
}

export default Hot;

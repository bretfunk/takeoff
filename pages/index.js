import React, { Component } from 'react';
import { Card, Button, Icon, Image } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout.js';
import { Link } from '../routes';
import Campaign from '../ethereum/campaign';

class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.allCampaigns().call();
    const campaign = await Campaign(campaigns[0])
    const campaignData = await campaign.methods.getSummary().call();

    const test = (campaigns) => {
      const promises = campaigns.map(async (address) => {
        return {
          myValue:  await address
          //Campaign(address)
        }
      });
      return Promise.all(promises);
    }

    return { campaigns, campaign, campaignData, test };
  }

  renderCampaigns() {
    debugger
    const items = this.props.campaigns.map(address => {
      return {
        //image: 'https://robohash.org/1',
        header: address,
        //meta: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        //fluid: true
      }
    })
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <Image
          src='https://wallscover.com/images/cool-6.jpg'
          //size='large'
          fluid
          centered
        />
        <h3>Open Campaigns</h3>
        <Link route="/campaigns/new">
          <a>
            <Button
              floated="right"
              content="Create Campaign"
              icon="add"
              primary
            />
          </a>
        </Link>

        {this.renderCampaigns()}
      </Layout>
    )
  }
}

export default CampaignIndex;

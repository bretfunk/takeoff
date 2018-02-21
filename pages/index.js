import React, { Component } from 'react';
import { Card, Button, Icon, Image } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout.js';
import { Link } from '../routes';
import Campaign from '../ethereum/campaign';

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
          //owner:        campaign[0],
          //description:  campaign[1],
          //moneyGoal:    campaign[2],
          //timeGoal:     campaign[3],
          //balance:      campaign[4],
          //start:        campaign[5]
      return {
        key: index,
        image: `https://robohash.org/${ Math.ceil(Math.random() * 100)}`,
        header: this.props.campaigns[index],
        meta: data.description,
        description: (
          <Link route={`/campaigns/${this.props.campaigns[index]}`}>
            <a>View Campaign</a>
          </Link>
        ),
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

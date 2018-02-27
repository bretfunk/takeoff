import React, { Component } from 'react';
import { Segment, Header, Image, Grid, Container, Card, Button, Icon } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout.js';
import { Link } from '../routes';
import Campaign from '../ethereum/campaign';
import Jumbotron from '../components/Jumbotron';
import web3 from '../ethereum/web3';
import Links from '../components/Links';
import Head from 'next/head';
import Heading from '../components/Header';
import usefulMethods from '../usefulMethods';

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

  renderCampaigns() {
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

    const randNum = Math.ceil(Math.random() * (activeItems.length - 3));
    let firstActiveItems = activeItems.splice(randNum, randNum + 3);
    firstActiveItems = firstActiveItems.splice(0, 3);
    return <Card.Group items={firstActiveItems} centered />;
  }

  render() {
    return (
      <div>
        <Head>
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
        </Head>
        <Container>
          <Heading />
          <Jumbotron mainText="Takeoff" subText="Blockchain Crowdfunding Made Easy" />
          <Grid>
            <Grid.Row>
              <Grid.Column width={14}>
                <Segment>
                  <Header as='h2' textAlign='center'> Hot Campaigns</Header>
                  {this.renderCampaigns()}
                  <Link route="/campaigns/hot">
                    <Button
                      primary
                      style={{ marginTop: '15px', marginLeft: '30px' }}
                    >
                      All Hot Campaigns
                    </Button>
                  </Link>
                </Segment>
                <Segment>
                  <Header as='h2' textAlign='center'> Editor's Choice</Header>
                  {this.renderCampaigns()}
                  <Link route="/campaigns/editors">
                    <Button
                      primary
                      style={{ marginTop: '15px', marginLeft: '30px' }}
                    >
                      All Editor's Choice Campaigns
                    </Button>
                  </Link>
                </Segment>
                <Segment>
                  <Header as='h2' textAlign='center'> New Campaigns</Header>
                  {this.renderCampaigns()}
                  <Link route="/campaigns/brand-new">
                    <Button
                      primary
                      style={{ marginTop: '15px', marginLeft: '30px' }}
                    >
                      All New Campaigns
                    </Button>
                  </Link>
                </Segment>
                <Segment>
                  <Header as='h2' textAlign='center'> All Active Campaigns</Header>
                  {this.renderCampaigns()}
                  <Link route="/campaigns/active">
                    <Button
                      primary
                      style={{ marginTop: '15px', marginLeft: '30px' }}
                    >
                      All Campaigns
                    </Button>
                  </Link>
                </Segment>
              </Grid.Column>
              <Grid.Column width={2}>
                <Links />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    )
  }
}

export default CampaignIndex;

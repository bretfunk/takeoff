import React, { Component } from 'react';
import { Card, Button, Icon } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import Layout from '../../components/Layout.js';
import { Link } from '../../routes';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import axios from 'axios';

class My extends Component {
  static async getInitialProps() {
    const accounts = await web3.eth.getAccounts();
    const campaigns = await axios.get(`https://takeoff-backend2.herokuapp.com/api/v1/user/${accounts[0]}`)
    const allCampaigns = await campaigns.data.map((data, index) => {
      return {
        key: index,
        header: data.description,
        meta: `${this.countdown(data.start, data.timeGoal)} hours remaining`,
        description: (
          <Link route={`/campaigns/${this.campaigns[index]}`}>
            <a>View Campaign</a>
          </Link>
        ),
      }
    })
    return { allCampaigns };
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


  renderCampaigns = async () => {
    let result;
    if (this.props.allCampaigns.length == 0) {
      result = "No Campaigns Found"
    } else {
      result =  <Card.Group items={allCampaigns} centered />;
    }
    return result;
  }

  render() {
    return (
      <Layout>
        <h1>My Campaigns</h1>
        {this.renderCampaigns}
      </Layout>
    )
  }
}

export default My;

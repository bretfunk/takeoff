import React, { Component } from 'react';
import { Segment, Header, Card, Button, Icon } from 'semantic-ui-react';
import Layout from '../../components/Layout.js';
import web3 from '../../ethereum/web3';
import axios from 'axios';
import usefulMethods from '../../usefulMethods';

class My extends Component {
  state = {
    allCampaigns: []
  }

  componentDidMount() {
    this.renderCampaigns()
  }

  renderCampaigns = () => {
    const accounts = web3.eth.getAccounts()
      .then((response) => {
        if (response.length == 0) {
          return "No account found"
        } else {
          axios.get(`https://takeoff-backend2.herokuapp.com/api/v1/user/${response[0]}`)
            .then((campaigns) => {
              const allCampaigns = campaigns.data.map((data, index) => {
                return {
                  key: index,
                  meta: `${usefulMethods.countdown(data.start, data.timeGoal)} hours remaining`,
                  image: `https://picsum.photos/300/200?image=${ Math.ceil(Math.random() * 100)}`,
                  header: data.description,
                }
              })
              this.setState({ allCampaigns })
            })
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <Layout>
        <Header as='h1' textAlign="center">Contributed</Header>
        <Segment>
          <Card.Group items={this.state.allCampaigns} centered />
        </Segment>
      </Layout>
    )
  }
}

export default My;

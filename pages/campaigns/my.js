import React, { Component } from 'react';
import { Header, Card, Button, Icon } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import Layout from '../../components/Layout.js';
import { Link } from '../../routes';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import axios from 'axios';

class My extends Component {
  state = {
    allCampaigns: []
  }

  //componentDidMount() {
    //this.renderCampaigns
  //}

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
                  image: `https://picsum.photos/300/200?image=${ Math.ceil(Math.random() * 100)}`,
                  header: data.description,
                }
              })
              this.setState({ allCampaigns })
              //return allCampaigns
              //return <Card.Group items={allCampaigns} centered />;
            })
          debugger
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    return <Card.Group items={this.state.allCampaigns} centered />;
  }

  render() {
    return (
      <Layout>
        <Header as='h1' textAlign="center">My Campaigns</Header>
        {this.renderCampaigns()}
      </Layout>
    )
  }
}

export default My;

import React, { Component } from 'react';
import { Container, Image, Card, Grid } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import DisburseFundsButton from '../../components/DisburseFundsButton';
import usefulMethods from '../../usefulMethods';

class Show extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();

    return {
      address: props.query.address,
      owner:        summary[0],
      description:  summary[1],
      moneyGoal:    summary[2],
      timeGoal:     summary[3],
      balance:      summary[4],
      start:        summary[5]
    }
  }

  renderData() {
    const {
      owner,
      description,
      moneyGoal,
      timeGoal,
      balance,
      start
    } = this.props;

    const items = [
      {
        header: owner,
        meta: "Address of Owner",
        style: { overflowWrap: 'break-word' }
      },
      {
        header: description,
        meta: "Description",
        style: { overflowWrap: 'break-word' }
      },
      {
        header: web3.utils.fromWei(moneyGoal, 'ether'),
        meta: "Money Goal (ether)",
        style: { overflowWrap: 'break-word' }
      },
      {
        header: `${timeGoal / 60 / 60 / 24} days`,
        meta: "Time Goal",
        style: { overflowWrap: 'break-word' }
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: "Ether Raised",
        style: { overflowWrap: 'break-word' }
      },
      {
        header: usefulMethods.countdown(start, timeGoal),
        meta: "Hours Remaining",
        style: { overflowWrap: 'break-word', color: 'red' }
      }
    ]

    return <Card.Group items={items} centered />;
  }

  render() {
    let button;

    usefulMethods.countdown(this.props.start, this.props.timeGoal) <= 0 ?
      button = <DisburseFundsButton address={this.props.address} /> :
      button = <ContributeForm address={this.props.address} />

      return(
        <Layout>
          <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={10}>
                {this.renderData()}
              </Grid.Column>
              <Grid.Column width={4}>
                <Grid.Row>
                  {button}
                </Grid.Row>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
        </Layout>
      )
  }
}

export default Show;

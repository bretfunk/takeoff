import React, { Component } from 'react';
import { Image, Card, Grid } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import DisburseFundsButton from '../../components/DisburseFundsButton';

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

  countdown(start, target) {
    const startWithMilli = parseInt(start) * 1000
    const targetWithMilli = parseInt(target) * 1000
    const diff = startWithMilli + targetWithMilli - Date.now()
    const hoursLeft = diff / 60 / 60 / 1000
    return hoursLeft.toFixed(1)
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
        header: this.countdown(start, timeGoal),
        meta: "Hours Remaining",
        style: { overflowWrap: 'break-word', color: 'red' }
      }
    ]

    return <Card.Group items={items} />;
  }

  render() {
    return(
      <Layout>
        <Grid>
          <Grid.Row>
            <Image
              src={`https://picsum.photos/600/400?image=${Math.ceil(Math.random() * 100)}`}
              centered
            >
            </Image>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={10}>
              {this.renderData()}
            </Grid.Column>
            <Grid.Column width={6}>
              <Grid.Row>
                <ContributeForm address={this.props.address} />
              </Grid.Row>
              <Grid.Row style={{ marginTop: '50px' }}>
                <DisburseFundsButton address={this.props.address} />
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    )
  }
}

export default Show;

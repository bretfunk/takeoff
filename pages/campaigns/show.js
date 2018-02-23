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

  dateFormat(date) {
    debugger
    const newDate = new Date(Date(date));
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return newDate.toLocaleDateString(`${navigator.language}`, options)
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
        //description: "Manager owns the contract",
        style: { overflowWrap: 'break-word' }
      },
      {
        header: description,
        meta: "Description",
        //description: "Description of the crowdfulding campaign",

        style: { overflowWrap: 'break-word' }
      },
      {
        header: web3.utils.fromWei(moneyGoal, 'ether'),
        meta: "Money Goal (ether)",
        //description: "Amount needed to start campaign.",
        style: { overflowWrap: 'break-word' }
      },
      {
        header: `${timeGoal / 60 / 60 / 12} days`,
        meta: "Time Goal",
        //description: "Time needed to raise money",
        style: { overflowWrap: 'break-word' }
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: "Ether Raised",
        //description: "Ether raised so far",
        style: { overflowWrap: 'break-word' }
      },
      {
        header: this.dateFormat(start),
        meta: "Time the contract started",
        //description: "Time remaining to raise money",
        style: { overflowWrap: 'break-word' }
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

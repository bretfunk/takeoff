import React, { Component } from 'react';
import { Image, Card, Grid } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import DisburseFundsButton from '../../components/DisburseFundsButton';

  const ipfsRobots = {
    1: 'QmfYYYg1Paby4mECH2yTsGBn2R6dozgKxQXyWyzpJnRw6Z',
    2: 'QmakNLERtb7EZqW52RXEq4XQehnCc3QuExoLKLVyswbpo5',
    3: 'QmTWBvURDMqSjQ5T1yq81MP4DfoM7nDSq8sMFdHFJYR5XX',
    4: 'QmSkxgvuB5Pc72guDbbEHbUtKsoAx9cqWba1nueAeFHELi',
    5: 'Qmb195T3ZNJ2WjdjGz2UqKAZZZwVeb3DwUarfwRUC9kzkc',
    6: 'QmeWWWQEypzoe8HQrUjTeLWf7WPfuQ47RKkTvTssKKYsug',
    7: 'QmNwHbZGsgCYcxQsabjcRn7MtRh3kvD5aYzMb4oXrwKaLr',
    8: 'QmcS4wbQtzW3NT9taTs8etjU8JaMxz1p1R5fVZ8dUfJiW9',
    9: 'QmSPGvxYbP9pA4snFqjwXuTrGgDRhvWAaPRj2AJWG6iUAT',
    10: 'QmfCvdhq5Qo8pDtS4YdVUj5WGKEPSf6hQPoSbxChM2q4i3'
  }

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
    const newDate = new Date(Date(date));
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return newDate.toLocaleDateString(`${navigator.language}`, options)
  }

  daysLeft(start, timeGoal) {
    const timeGoalWithMilli = parseInt(timeGoal) * 1000;
    const startTimeWithMilli = parseInt(start) * 1000;
    const goalDate = startTimeWithMilli + timeGoalWithMilli;
    const startDate = startTimeWithMilli;
    const distance = goalDate - startDate;
    return Math.ceil(distance / 60 / 60 / 1000);
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
        meta: "Owner Address",
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
        header: this.daysLeft(start, timeGoal),
        meta: "Hours left",
        style: { overflowWrap: 'break-word' }
      }
    ]

    return <Card.Group items={items} />;
  }

              //src='https://ipfs.io/ipfs/QmfYYYg1Paby4mECH2yTsGBn2R6dozgKxQXyWyzpJnRw6Z'
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

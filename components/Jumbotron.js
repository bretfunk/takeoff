import React, { Component } from 'react';
import { Image, Segment, Header } from 'semantic-ui-react';

class Jumbotron extends React.Component {
  render() {
    return (
      <Segment
        textAlign='center'
        size="huge"
        inverted
      >
        <Header
          size="huge"
        >
          <Header.Content>
            {this.props.mainText}
          </Header.Content>
        </Header>
        <Image
          src='https://wallscover.com/images/cool-6.jpg'
          size='huge'
          centered
        />
        <Header sub>
          <Header.Content>
            {this.props.subText}
          </Header.Content>
        </Header>
      </Segment>
    )
  }
}

export default Jumbotron;

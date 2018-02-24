import React, { Component } from 'react';
import { Grid, Container } from 'semantic-ui-react';
import Header from './Header';
import Head from 'next/head';
import Links from './Links';
import Jumbotron from './Jumbotron';
import { Router } from '../routes'

export default (props) => {
  return (
    <div>
        <Head>
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
        </Head>
        <Container>
          <Header />
          <Grid>
            <Grid.Row>
              <Grid.Column width={14}>
                {props.children}
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

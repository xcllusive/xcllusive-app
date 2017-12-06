import React, { Component } from 'react';

import { Table, Icon, Button, Input, Grid, Statistic } from 'semantic-ui-react';

import Header from '../../components/Header';
import AddModal from './AddModal';

const array = [
  {
    businessID: 'BS2000',
    businessName: 'New Business',
    contactName: 'John Johnson',
    logText: 'testing',
    followUpDate: '01/01/2018'
  },
  {
    businessID: 'BS2001',
    businessName: 'Business 1',
    contactName: 'Peter Park',
    logText: 'business spider man',
    followUpDate: '01/01/2019'
  },
  {
    businessID: 'BS2002',
    businessName: 'Business 2',
    contactName: 'Zoran Sarabaca',
    logText: 'Zorans business',
    followUpDate: '01/01/2017'
  },
  {
    businessID: 'BS2003',
    businessName: 'Business 3',
    contactName: 'Steve Jobs',
    logText: 'Apple',
    followUpDate: '01/12/2018'
  },
  {
    businessID: 'BS2004',
    businessName: 'Business 4',
    contactName: 'FileMaker',
    logText: 'Filemaker server 12',
    followUpDate: '01/02/2018'
  }
];

class BusinessListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };
  }

  _toggleModal(value) {
    console.log(this.state);
    this.setState({
      modalOpen: value
    });
  }

  render() {
    return (
      <div>
        <Grid verticalAlign={'middle'}>
          <Grid.Column floated={'left'}>
            <Header title="Business" />
          </Grid.Column>
          <Grid.Column floated={'right'} width={3}>
            <Button onClick={() => this._toggleModal(true)} color="blue">
              <Icon name="add" />
              New Business
            </Button>
          </Grid.Column>
          <Grid.Row />
        </Grid>
        <Statistic.Group size={'mini'} color="green" widths="6">
          <Statistic>
            <Statistic.Value>10</Statistic.Value>
            <Statistic.Label>Potencial Listinig</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>20</Statistic.Value>
            <Statistic.Label>Listinig Negotiation</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>30</Statistic.Value>
            <Statistic.Label>Sales Memo</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>40</Statistic.Value>
            <Statistic.Label>For Sale</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>50</Statistic.Value>
            <Statistic.Label>Sold</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>60</Statistic.Value>
            <Statistic.Label>Withdrawn</Statistic.Label>
          </Statistic>
        </Statistic.Group>
        <Grid centered>
          <Grid.Row>
            <Grid.Column textAlign="center" width={5}>
              <Input
                fluid
                action={{ icon: 'search' }}
                placeholder="Find Business..."
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <AddModal
          teste={this.state.modalOpen}
          funcao={() => this._toggleModal(false)}
        />
        <h2>
          <b>
            <div align="left"> FOR SALE </div>
          </b>
        </h2>
        <Table color="grey" celled inverted selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Business ID</Table.HeaderCell>
              <Table.HeaderCell>Business Name</Table.HeaderCell>
              <Table.HeaderCell>Contact Name</Table.HeaderCell>
              <Table.HeaderCell>Log Text</Table.HeaderCell>
              <Table.HeaderCell>Follow Up date</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {array.map(item => {
              return (
                <Table.Row active key={item.businessID}>
                  <Table.Cell>{item.businessID}</Table.Cell>
                  <Table.Cell>{item.businessName}</Table.Cell>
                  <Table.Cell>{item.contactName}</Table.Cell>
                  <Table.Cell>{item.logText}</Table.Cell>
                  <Table.Cell>{item.followUpDate}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default BusinessListPage;

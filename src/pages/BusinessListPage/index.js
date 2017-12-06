import React, { Component } from 'react';
import {
  Table,
  Icon,
  Modal,
  Form,
  Button,
  Input,
  Grid,
  Statistic
} from 'semantic-ui-react';

import Header from '../../components/Header';

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

const options = [
  { key: 1, text: 'Google', value: 'Google' },
  { key: 2, text: 'Sensis', value: 'Sensis' },
  { key: 3, text: 'Yahoo', value: 'Yahoo' }
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
        <Statistic.Group size={'small'} color="green" widths="6">
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
            <Grid.Column textAlign="center" width={10}>
              <Input
                fluid
                action={{ icon: 'search' }}
                placeholder="Find Business..."
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Modal open={this.state.modalOpen}>
          <Modal.Header align="center">New Business</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  required
                  label="Business name"
                  placeholder="Insert a business name"
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  required
                  label="First name"
                  placeholder="Insert a first name"
                />
                <Form.Input
                  required
                  label="Last name"
                  placeholder="Insert a last name"
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  required
                  label="Email"
                  placeholder="Insert an email"
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  label="Telephone"
                  placeholder="Insert a telephone"
                />
                <Form.Input
                  label="Telephone 2"
                  placeholder="Insert a second telephone"
                />
                <Form.Input
                  label="Telephone 3"
                  placeholder="Insert a third telephone"
                />
              </Form.Group>
              <Form.TextArea
                label="Notes"
                placeholder="Notes about the business..."
              />
              <div>
                <b>Source</b> *
              </div>
              <Form.Dropdown
                selection
                options={options}
                placeholder="Choose an option"
              />
              <Form.Group widths="equal">
                <Form.Input
                  label="Source Notes"
                  placeholder="Insert a source notes"
                />
              </Form.Group>
              <Form.Group>
                <Form.Button color="blue">
                  <Icon name="save" /> Create Business
                </Form.Button>
                <Form.Button
                  color="red"
                  onClick={() => this._toggleModal(false)}
                >
                  <Icon name="cancel" /> Cancel
                </Form.Button>
              </Form.Group>
            </Form>
          </Modal.Content>
        </Modal>
        <h2>
          <b>
            <div align="center"> FOR SALE </div>
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
              <Table.HeaderCell>Options</Table.HeaderCell>
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
                  <Table.Cell>
                    <Icon name="eye" />
                    <Icon name="pencil" />
                    <Icon name="trash" />
                  </Table.Cell>
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

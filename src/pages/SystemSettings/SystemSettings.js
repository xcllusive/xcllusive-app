import React, { Component } from 'react';

import {
  Table,
  Icon,
  Button,
  Input,
  Grid,
  Tab,
  Segment,
  Form,
  Radio
} from 'semantic-ui-react';

import Header from '../../components/Header';

import NewUserModal from './NewUserModal';

const array = [
  {
    ID: '1',
    name: 'Cayo',
    userType: 'Admin',
    listingAgent: 'No',
    buyer: 'Yes',
    business: 'Yes',
    preSale: 'Yes',
    resources: 'Yes',
    clientManager: 'Yes',
    systemSettings: 'Yes'
  },
  {
    ID: '2',
    name: 'Zoran',
    userType: 'Admin',
    listingAgent: 'No',
    buyer: 'Yes',
    business: 'Yes',
    preSale: 'Yes',
    resources: 'Yes',
    clientManager: 'Yes',
    systemSettings: 'Yes'
  },
  {
    ID: '3',
    name: 'Caroline',
    userType: 'Staff',
    listingAgent: 'Yes',
    buyer: 'No',
    business: 'Yes',
    preSale: 'Yes',
    resources: 'No',
    clientManager: 'No',
    systemSettings: 'No'
  },
  {
    ID: '4',
    name: 'Adolph',
    userType: 'Introducer',
    listingAgent: 'No',
    buyer: 'No',
    business: 'No',
    preSale: 'No',
    resources: 'Yes',
    clientManager: 'No',
    systemSettings: 'No'
  }
];
const panes = [
  {
    menuItem: 'Users',
    render: () => (
      <Tab.Pane className="Users" attached={false}>
        <Grid centered>
          <Grid.Column textAlign="center" width={5}>
            <Input
              fluid
              action={{ icon: 'search' }}
              placeholder="Find users..."
            />
          </Grid.Column>
        </Grid>
        <Grid centered>
          <Radio
            label="Admin"
            value="Admin"
            //name='radioGroup'
            //checked={this.state.value === 'Admin'}
            //onChange={this.handleChange}
          />
          <Radio
            label="Staff"
            value="Staff"
            //name='radioGroup'
            //checked={this.state.value === 'Staff'}
            //onChange={this.handleChange}
          />
          <Radio
            label="Introducer"
            value="Introducer"
            //name='radioGroup'
            //checked={this.state.value === 'Introducer'}
            //onChange={this.handleChange}
          />
        </Grid>
        <Table color="blue" celled inverted selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>User Type</Table.HeaderCell>
              <Table.HeaderCell>Listing Agent</Table.HeaderCell>
              <Table.HeaderCell>Buyer</Table.HeaderCell>
              <Table.HeaderCell>Business</Table.HeaderCell>
              <Table.HeaderCell>Pre Sale</Table.HeaderCell>
              <Table.HeaderCell>Resources</Table.HeaderCell>
              <Table.HeaderCell>Client Manager</Table.HeaderCell>
              <Table.HeaderCell>System Settings</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {array.map(user => {
              return (
                <Table.Row
                  active
                  key={user.ID}
                  /*onClick={() =>
                    this.props.history.push(
                      `${this.props.match.path}/${user.ID}`
                    )
                  }*/
                >
                  <Table.Cell>{user.ID}</Table.Cell>
                  <Table.Cell>{user.name}</Table.Cell>
                  <Table.Cell>{user.userType}</Table.Cell>
                  <Table.Cell>{user.listingAgent}</Table.Cell>
                  <Table.Cell>{user.buyer}</Table.Cell>
                  <Table.Cell>{user.business}</Table.Cell>
                  <Table.Cell>{user.preSale}</Table.Cell>
                  <Table.Cell>{user.resources}</Table.Cell>
                  <Table.Cell>{user.clientManager}</Table.Cell>
                  <Table.Cell>{user.systemSettings}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </Tab.Pane>
    )
  },
  {
    menuItem: 'Email Templates',
    render: () => (
      <Tab.Pane className="EmailTemplates" attached={false}>
        <Segment size="mini" inverted color="blue">
          <Header as="h7" textAlign="left">
            Users
          </Header>
        </Segment>
      </Tab.Pane>
    )
  }
];

class SystemSettingsPage extends Component {
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
        <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
        <Button onClick={() => this._toggleModal(true)} color="facebook">
          <Icon name="add" />
          New User
        </Button>
        <NewUserModal
          teste={this.state.modalOpen}
          funcao={() => this._toggleModal(false)}
        />
      </div>
    );
  }
}

export default SystemSettingsPage;

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

import UserList from './UserList';

class SystemSettingsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      panes: [
        {
          menuItem: 'Users',
          render: () => <UserList toggleModal={this._toggleModal} />
        },
        {
          menuItem: 'Email Templates',
          render: () => (
            <Tab.Pane attached={false}>
              <Segment size="mini" inverted color="blue">
                <Header as="h7" textAlign="left">
                  Users
                </Header>
              </Segment>
            </Tab.Pane>
          )
        }
      ]
    };
  }

  _toggleModal = () => {
    this.setState(prevState => ({
      modalOpen: !prevState.modalOpen
    }));
  };

  render() {
    return (
      <div>
        <Tab
          renderActiveOnly
          menu={{ secondary: true, pointing: true }}
          panes={this.state.panes}
        />
        <NewUserModal teste={this.state.modalOpen} funcao={this._toggleModal} />
      </div>
    );
  }
}

export default SystemSettingsPage;

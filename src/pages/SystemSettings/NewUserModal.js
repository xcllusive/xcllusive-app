import React, { Component } from 'react';
import { Modal, Form, Icon } from 'semantic-ui-react';

const officeRegion = [
  { key: '1', text: 'Sydney Office', value: '1' },
  { key: '2', text: 'Melbourne Office', value: '2' }
];

const listingAgent = [
  { key: '1', text: 'Yes', value: '1' },
  { key: '2', text: 'No', value: '2' }
];

const userType = [
  { key: '1', text: 'Admin', value: '1' },
  { key: '2', text: 'Staff', value: '2' },
  { key: '3', text: 'Introducer', value: '3' }
];

const buyerMenu = [
  { key: '1', text: 'Yes', value: '1' },
  { key: '2', text: 'No', value: '2' }
];

const businessMenu = [
  { key: '1', text: 'Yes', value: '1' },
  { key: '2', text: 'No', value: '2' }
];

const preSaleMenu = [
  { key: '1', text: 'Yes', value: '1' },
  { key: '2', text: 'No', value: '2' }
];

const resourceMenu = [
  { key: '1', text: 'Yes', value: '1' },
  { key: '2', text: 'No', value: '2' }
];

const clientManagerMenu = [
  { key: '1', text: 'Yes', value: '1' },
  { key: '2', text: 'No', value: '2' }
];

const systemSettingsMenu = [
  { key: '1', text: 'Yes', value: '1' },
  { key: '2', text: 'No', value: '2' }
];

class NewUserModal extends Component {
  render() {
    return (
      <Modal open={this.props.teste}>
        <Modal.Header align="center">New User</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group widths="equal">
              <Form.Input required label="Username" />
              <Form.Input required label="Password" />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input required label="First Name" />
              <Form.Input required label="Last Name" />
              <Form.Input required label="Email" />
              <Form.Input required label="Mobile Phone" />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Select
                required
                label="Office Region"
                options={officeRegion}
              />
              <Form.Select
                required
                label="Listing Agent"
                options={listingAgent}
              />
              <Form.Select required label="User Type" options={userType} />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Select required label="Buyer Menu" options={buyerMenu} />
              <Form.Select
                required
                label="Business Menu"
                options={businessMenu}
              />
              <Form.Select
                required
                label="Pre Sale Menu"
                options={preSaleMenu}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Select
                required
                label="Resources Menu"
                options={resourceMenu}
              />
              <Form.Select
                required
                label="Client Manager Menu"
                options={clientManagerMenu}
              />
              <Form.Select
                required
                label="System Settings Menu"
                options={systemSettingsMenu}
              />
            </Form.Group>
            <Form.Group>
              <Form.Button color="blue">
                <Icon name="save" />
                Create User
              </Form.Button>
              <Form.Button color="red" onClick={this.props.funcao}>
                <Icon name="cancel" />
                Cancel
              </Form.Button>
            </Form.Group>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

export default NewUserModal;

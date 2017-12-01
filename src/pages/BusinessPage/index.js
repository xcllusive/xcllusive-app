import React, { Component } from 'react';
import { Table, Icon, Modal, Form, Button } from 'semantic-ui-react';

import Header from '../../components/Header';

const array = [
  {
    businessName: 'John Lilki',
    contactName: 'September 14, 2013',
    logText: 'jhlilk22@yahoo.com',
    followUpDate: 'No'
  },
  {
    businessName: 'John Lilki',
    contactName: 'September 14, 2013',
    logText: 'jhlilk22@yahoo.com',
    followUpDate: 'No'
  },
  {
    businessName: 'John Lilki',
    contactName: 'September 14, 2013',
    logText: 'jhlilk22@yahoo.com',
    followUpDate: 'No'
  },
  {
    businessName: 'John Lilki',
    contactName: 'September 14, 2013',
    logText: 'jhlilk22@yahoo.com',
    followUpDate: 'No'
  },
  {
    businessName: 'John Lilki',
    contactName: 'September 14, 2013',
    logText: 'jhlilk22@yahoo.com',
    followUpDate: 'No'
  }
];

class BusinessPage extends Component {
  render() {
    return (
      <div>
        <Header title="Business" />
        <Modal trigger={<Button>New Business</Button>}>
          <Modal.Header>New Business</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Group widths="equal">
                <Form.Input label="First name" placeholder="First name" />
                <Form.Input label="Last name" placeholder="Last name" />
              </Form.Group>
              <Form.Group inline>
                <label>Size</label>
                <Form.Radio label="Small" value="sm" />
                <Form.Radio label="Medium" value="md" />
                <Form.Radio label="Large" value="lg" />
              </Form.Group>
              <Form.TextArea
                label="About"
                placeholder="Tell us more about you..."
              />
              <Form.Checkbox label="I agree to the Terms and Conditions" />
              <Form.Button>Submit</Form.Button>
            </Form>
          </Modal.Content>
        </Modal>
        <Table striped selectable basic="very">
          <Table.Header>
            <Table.Row>
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
                <Table.Row>
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

export default BusinessPage;

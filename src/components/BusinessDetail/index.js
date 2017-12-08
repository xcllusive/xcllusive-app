import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

const options = [
  { key: 1, text: 'Google', value: 'Google' },
  { key: 2, text: 'Sensis', value: 'Sensis' },
  { key: 3, text: 'Yahoo', value: 'Yahoo' }
];

class BusinessDetail extends Component {
  render() {
    return (
      <div>
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
            <Form.Input required label="Email" placeholder="Insert an email" />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input label="Telephone" placeholder="Insert a telephone" />
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
        </Form>
      </div>
    );
  }
}

export default BusinessDetail;

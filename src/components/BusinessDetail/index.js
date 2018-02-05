import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

const options = [
  { key: 1, text: 'Google', value: 'Google' },
  { key: 2, text: 'Sensis', value: 'Sensis' },
  { key: 3, text: 'Yahoo', value: 'Yahoo' }
]

class BusinessDetail extends Component {
  render () {
    return (
      <div>
        <Form.Group widths='equal'>
          <Form.Input required label='Business name' />
          <Form.Input required label='First name' />
          <Form.Input required label='Last name' />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input label='Telephone' />
          <Form.Input label='Telephone 2' />
          <Form.Input label='Fax' />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input required label='Email' />
          <Form.Dropdown label='Source' selection options={options} />
          <Form.Input label='Source Notes' />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.TextArea label='Notes' />
        </Form.Group>
      </div>
    )
  }
}

export default BusinessDetail

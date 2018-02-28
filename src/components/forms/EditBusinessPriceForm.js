import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withFormik } from 'formik'
import { Form, Header, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'

import Yup from 'yup'

class EditBusinessPriceForm extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const {
      values,
      handleChange,
      handleBlur,
      handleSubmit,
      errors,
      touched
    } = this.props

    return (
      <Grid celled divided='vertically'>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Grid.Row>
              <Grid.Column>
                <Header as='h2' >
                  Business Pricing
                </Header>
              </Grid.Column>
              <Grid.Column textAlign='right'>
                <Header as='h6'>
                  (For Sale)
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Form size='tiny' onSubmit={handleSubmit}>
                <Form.Group widths='equal'>
                  <Form.Input
                    label='Listed Price'
                    value={values.listedPrice}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                  { errors && touched}
                  <Form.Input label='Current Price' />
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Input label='Engagement Fee' />
                  <Form.Input label='Commission %' />
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Input label='Minimum Com $' />
                  <Form.Input label='Appraisal High $' />
                  <Form.Input label='Appraisal Low $' />
                </Form.Group>
              </Form>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column>
            <Header as='h2' textAlign='left'>
              Sales Information
            </Header>
            <Header as='h6' floated='right'>
              (Deposit and Sold)
            </Header>
            <Form size='tiny'>
              <Form.Group widths='equal'>
                <Form.Input label='Deposit Taken $' readOnly />
                <Form.Input label='Dep. Taken Date' readOnly />
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Input label='Commission $' readOnly />
                <Form.Input label='Settlement Date' readOnly />
                <Form.Input label='Sold Price' readOnly />
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Input label='Attached Purchaser' readOnly />
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.TextArea label='Search Notes' />
                <Form.TextArea label='Conclusion Notes' />
              </Form.Group>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

EditBusinessPriceForm.propTypes = {
  values: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  errors: PropTypes.object,
  touched: PropTypes.object
}

const mapPropsToValues = () => ({
  businessName: '',
  firstNameV: '',
  lastNameV: '',
  vendorPhone1: '',
  vendorPhone2: '',
  vendorPhone3: '',
  vendorEmail: '',
  businessSource: '',
  sourceNotes: '',
  description: '',
  businessNameSecondary: '',
  businessABN: ''

})

const validationSchema = Yup.object().shape({
  businessName: Yup.string()
    .required('Business name is required.')
    .max(120, 'Business name require max 120 characters.'),
  firstNameV: Yup.string()
    .required('First name is required.')
    .max(40, 'First name require max 40 characters.'),
  lastNameV: Yup.string()
    .required('Last name is required.')
    .max(40, 'Last name require max 40 characters.'),
  vendorPhone1: Yup.string()
    .max(15, 'Telephone 1 require max 15 characters.'),
  vendorPhone2: Yup.string()
    .max(15, 'Telephone 2 require max 15 characters.'),
  vendorPhone3: Yup.string()
    .max(15, 'Telephone 3 require max 15 characters.'),
  vendorEmail: Yup.string()
    .email('Invalid email address.')
    .required('Email is required.'),
  businessSource: Yup.string()
    .required('Source is required.'),
  sourceNotes: Yup.string()
    .max(40, 'Source Notes require max 40 characters.'),
  description: Yup.string()
    .required('Notes is required.')
    .max(2000, 'Source Notes require max 2000 characters.'),
  businessNameSecondary: Yup.string()
    .max(120, 'Source Notes require max 120 characters.'),
  businessABN: Yup.string()
    .max(11, 'ABN require max 11 integers.')
})

const handleSubmit = (values) => {
  console.log(values)
}

export default connect(null, null)(
  withFormik({
    mapPropsToValues,
    validationSchema,
    handleSubmit
  })(EditBusinessPriceForm)
)

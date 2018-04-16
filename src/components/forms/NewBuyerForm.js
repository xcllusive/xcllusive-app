import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Modal, Form, Icon, Button, Label } from 'semantic-ui-react'
import Yup from 'yup'

import { createBusiness } from '../../redux/ducks/business'
import { getBusinessRegister } from '../../redux/ducks/businessRegister'

class NewBusinessForm extends Component {
  componentWillMount () {
    this.props.getBusinessRegister(1)
  }

  _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
  }

  render () {
    const {
      modalOpen,
      toggleModal,
      values,
      handleChange,
      handleBlur,
      errors,
      touched,
      handleSubmit,
      isSubmitting,
      isValid,
      isLoading,
      sourceOptions,
      dropDownLoading
    } = this.props

    return (
      <Modal dimmer={'blurring'} open={modalOpen}>
        <Modal.Header align="center">New Buyer</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group widths="equal">
              <Form.Field>
                <Form.Input
                  required
                  label="First name"
                  name="firstName"
                  autoComplete="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.firstName &&
                  touched.firstName && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.firstName}
                  />
                )}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  required
                  label="Last name"
                  name="surname"
                  autoComplete="surname"
                  value={values.surname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.surname &&
                  touched.surname && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.surname}
                  />
                )}
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <Form.Input
                  required
                  label="Email"
                  name="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email &&
                  touched.email && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.email}
                  />
                )}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Street"
                  name="streetName"
                  autoComplete="streetName"
                  value={values.streetName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.streetName &&
                  touched.streetName && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.streetName}
                  />
                )}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Suburb"
                  name="suburb"
                  autoComplete="suburb"
                  value={values.suburb}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.suburb &&
                  touched.suburb && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.suburb}
                  />
                )}
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <Form.Input
                  label="State"
                  name="state"
                  autoComplete="state"
                  value={values.state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.state &&
                  touched.state && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.state}
                  />
                )}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Post Code"
                  name="postCode"
                  autoComplete="postCode"
                  value={values.postCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.postCode &&
                  touched.postCode && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.postCode}
                  />
                )}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Telephone"
                  name="telephone1"
                  autoComplete="telephone1"
                  value={values.telephone1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.telephone1 &&
                  touched.telephone1 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.telephone1}
                  />
                )}
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <Form.Select
                  required
                  label="Source"
                  options={sourceOptions}
                  name="businessSource"
                  autoComplete="businessSource"
                  loading={dropDownLoading}
                  disabled={dropDownLoading}
                  value={values.businessSource}
                  onChange={this._handleSelectChange}
                />
                {errors.businessSource &&
                  touched.businessSource && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.businessSource}
                  />
                )}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Price From"
                  name="priceFrom"
                  autoComplete="priceFrom"
                  value={values.priceFrom}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.priceFrom &&
                  touched.priceFrom && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.priceFrom}
                  />
                )}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Price To"
                  name="priceTo"
                  autoComplete="priceTo"
                  value={values.priceTo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.priceTo &&
                  touched.priceTo && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.priceTo}
                  />
                )}
              </Form.Field>
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="blue"
            disabled={isSubmitting || !isValid}
            loading={isLoading}
            onClick={handleSubmit}
          >
            <Icon name="save" />
            Create Buyer
          </Button>
          <Button color="red" onClick={toggleModal}>
            <Icon name="cancel" />
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

NewBusinessForm.propTypes = {
  toggleModal: PropTypes.func,
  modalOpen: PropTypes.bool,
  values: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  errors: PropTypes.object,
  touched: PropTypes.object,
  isSubmitting: PropTypes.bool,
  isValid: PropTypes.bool,
  isLoading: PropTypes.bool,
  handleSubmit: PropTypes.func,
  setFieldValue: PropTypes.func,
  sourceOptions: PropTypes.array,
  getBusinessRegister: PropTypes.func,
  dropDownLoading: PropTypes.bool
}

const mapPropsToValues = () => ({
  businessName: '',
  firstName: '',
  lastName: '',
  vendorPhone1: '',
  vendorPhone2: '',
  vendorPhone3: '',
  vendorEmail: '',
  businessSource: '',
  sourceNotes: '',
  description: ''
})

const validationSchema = Yup.object().shape({
  businessName: Yup.string()
    .required('Business name is required.')
    .max(120, 'Business name require max 120 characters.'),
  firstName: Yup.string()
    .required('First name is required.')
    .max(40, 'First name require max 40 characters.'),
  lastName: Yup.string()
    .required('Last name is required.')
    .max(40, 'Last name require max 40 characters.'),
  vendorPhone1: Yup.string().max(15, 'Telephone 1 require max 15 characters.'),
  vendorPhone2: Yup.string().max(15, 'Telephone 2 require max 15 characters.'),
  vendorPhone3: Yup.string().max(15, 'Telephone 3 require max 15 characters.'),
  vendorEmail: Yup.string()
    .email('Invalid email address.')
    .required('Email is required.'),
  businessSource: Yup.number().required('Source is required.'),
  sourceNotes: Yup.string().max(40, 'Source Notes require max 40 characters.'),
  description: Yup.string()
    .required('Notes is required.')
    .max(2000, 'Source Notes require max 2000 characters.')
})

const handleSubmit = (values, { props, setSubmitting }) => {
  props.createBusiness(values)
  setSubmitting(false)
}

const mapStateToProps = state => {
  return {
    isLoading: state.business.create.isLoading,
    sourceOptions: state.businessRegister.get.source.array,
    dropDownLoading: state.businessRegister.get.source.isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ createBusiness, getBusinessRegister }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withFormik({
    mapPropsToValues,
    validationSchema,
    handleSubmit
  })(NewBusinessForm)
)

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Modal, Form, Icon, Button, Label } from 'semantic-ui-react'
import Yup from 'yup'

import { updateBuyer } from '../../redux/ducks/buyer'
import { getBusinessRegister } from '../../redux/ducks/businessRegister'

class EditBuyerForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      state: [
        { key: 1, text: 'NSW', value: 'NSW' },
        { key: 2, text: 'QLD', value: 'QLD' },
        { key: 3, text: 'SA', value: 'SA' },
        { key: 4, text: 'TAS', value: 'TAS' },
        { key: 5, text: 'VIC', value: 'VIC' },
        { key: 6, text: 'WA', value: 'WA' }
      ]
    }
  }
  componentWillMount () {
    this.props.getBusinessRegister(1)
  }

  _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
  }

  render () {
    const { state } = this.state
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
        <Modal.Header align="center">Edit Buyer</Modal.Header>
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
                  <Label basic color="red" pointing content={errors.email} />
                )}
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <Form.Input
                  label="Email (optional)"
                  name="emailOptional"
                  autoComplete="emailOptional"
                  value={values.emailOptional}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.emailOptional &&
                  touched.emailOptional && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.emailOptional}
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
                  <Label basic color="red" pointing content={errors.suburb} />
                )}
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <Form.Select
                  label="State"
                  name="state"
                  options={state}
                  value={values.state}
                  onChange={this._handleSelectChange}
                />
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
            Update Buyer
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

EditBuyerForm.propTypes = {
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
  dropDownLoading: PropTypes.bool,
  buyer: PropTypes.object
}

const mapPropsToValues = props => {
  return {
    id: props.buyer ? props.buyer.id : '',
    firstName: props.buyer ? props.buyer.firstName : '',
    surname: '',
    email: '',
    businessSource: '',
    streetName: '',
    suburb: '',
    state: '',
    postCode: '',
    telephone1: '',
    priceFrom: '',
    priceTo: ''
  }
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required.')
    .max(40, 'First name require max 40 characters.'),
  surname: Yup.string()
    .required('Last name is required.')
    .max(40, 'Last name require max 40 characters.'),
  email: Yup.string()
    .email('Invalid email address.')
    .required('Email is required.'),
  businessSource: Yup.number().required('Source is required.'),
  postCode: Yup.number().typeError('You must type only number here!'),
  telephone1: Yup.number().typeError('You must type only number here!'),
  priceFrom: Yup.number().typeError('You must type only number here!'),
  priceTo: Yup.number().typeError('You must type only number here!')
})

const handleSubmit = (values, { props, setSubmitting }) =>
  props.updateBuyer(values).then(setSubmitting(false))

const mapStateToProps = state => ({
  isLoading: state.buyer.update.isLoading,
  sourceOptions: state.businessRegister.get.source.array,
  dropDownLoading: state.businessRegister.get.source.isLoading
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateBuyer, getBusinessRegister }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(
  withFormik({
    mapPropsToValues,
    validationSchema,
    handleSubmit
  })(EditBuyerForm)
)

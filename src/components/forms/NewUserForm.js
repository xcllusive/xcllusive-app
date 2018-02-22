import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Modal, Form, Label, Checkbox, Icon, Button } from 'semantic-ui-react'
import styled from 'styled-components'
import Yup from 'yup'

import { createUser } from '../../redux/ducks/user'

const dataRegion = [
  { key: 1, text: 'Sydney Office', value: 'Sydney Office' },
  { key: 2, text: 'Melbourne Office', value: 'Melbourne Office' },
  { key: 3, text: 'Gosford Office', value: 'Gosford Office' },
  { key: 4, text: 'Cowra Office', value: 'Cowra Office' },
  { key: 5, text: 'Camberra Office', value: 'Camberra Office' }
]

const listingAgent = [
  { key: 1, text: 'Yes', value: 1 },
  { key: 2, text: 'No', value: 0 }
]

const userType = [
  { key: 1, text: 'Admin', value: 'Admin' },
  { key: 2, text: 'Staff', value: 'Staff' },
  { key: 3, text: 'Introducer', value: 'Introducer' }
]

const state = [
  { key: 1, text: 'NSW', value: 'NSW' },
  { key: 2, text: 'QLD', value: 'QLD' },
  { key: 3, text: 'SA', value: 'SA' },
  { key: 4, text: 'TAS', value: 'TAS' },
  { key: 5, text: 'VIC', value: 'VIC' },
  { key: 6, text: 'WA', value: 'WA' }
]

const CheckboxFormatted = styled.div`
  padding-right: 1em`

class NewUserForm extends Component {
  componentWillReceiveProps (nextProps) {
    if (this.props.userCreated !== nextProps.userCreated) this.props.resetForm()
  }

  _handleChangeCheckBox = (e, { value }) => {
    this.props.setFieldValue(value, !this.props.values[value])
  }

  _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
  }

  render () {
    const {
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
      isValid,
      isLoading,
      modalOpen,
      toggleModal
    } = this.props
    return (
      <Modal
        dimmer={'blurring'}
        open={modalOpen}
      >
        <Modal.Header align='center'>New User</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group widths='equal'>
              <Form.Field>
                <Form.Input
                  required
                  label='Email'
                  name='email'
                  autoComplete='email'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email && <Label basic color='red' pointing content={errors.email} />}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  required
                  type='password'
                  label='Password'
                  name='password'
                  autoComplete='password'
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password && <Label basic color='red' pointing content={errors.password} />}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  required
                  label='First Name'
                  name='firstName'
                  autoComplete='firstName'
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.firstName && touched.firstName && <Label basic color='red' pointing content={errors.firstName} />}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  required
                  label='Last Name'
                  name='lastName'
                  autoComplete='lastName'
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.lastName && touched.lastName && <Label basic color='red' pointing content={errors.lastName} />}
              </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field>
                <Form.Input
                  label='Home Phone'
                  name='phoneHome'
                  autoComplete='phoneHome'
                  value={values.phoneHome}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.phoneHome && touched.phoneHome && <Label basic color='red' pointing content={errors.phoneHome} />}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label='Work Phone'
                  name='phoneWork'
                  autoComplete='phoneWork'
                  value={values.phoneWork}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.phoneWork && touched.phoneWork && <Label basic color='red' pointing content={errors.phoneWork} />}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label='Mobile Phone'
                  name='phoneMobile'
                  autoComplete='phoneMobile'
                  value={values.phoneMobile}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.phoneMobile && touched.phoneMobile && <Label basic color='red' pointing content={errors.phoneMobile} />}
              </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field>
                <Form.Select
                  label='State'
                  name='state'
                  options={state}
                  value={values.state}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label='Suburb'
                  name='suburb'
                  autoComplete='suburb'
                  value={values.suburb}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.suburb && touched.suburb && <Label basic color='red' pointing content={errors.suburb} />}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label='Street'
                  name='street'
                  autoComplete='street'
                  value={values.street}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.street && touched.street && <Label basic color='red' pointing content={errors.street} />}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label='Post Code'
                  name='postCode'
                  autoComplete='postCode'
                  value={values.postCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.postCode && touched.postCode && <Label basic color='red' pointing content={errors.postCode} />}
              </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field>
                <Form.Select
                  required
                  label='Office Region'
                  name='dataRegion'
                  options={dataRegion}
                  value={values.dataRegion}
                  onChange={this._handleSelectChange}
                />
                {errors.dataRegion && touched.dataRegion && <Label basic color='red' pointing content={errors.dataRegion} />}
              </Form.Field>
              <Form.Field>
                <Form.Select
                  required
                  label='Listing Agent'
                  name='listingAgent'
                  options={listingAgent}
                  value={values.listingAgent}
                  onChange={this._handleSelectChange}
                />
                {errors.listingAgent && touched.listingAgent && <Label basic color='red' pointing content={errors.listingAgent} />}
              </Form.Field>
              <Form.Field>
                <Form.Select
                  required
                  label='User Type'
                  name='userType'
                  options={userType}
                  value={values.userType}
                  onChange={this._handleSelectChange}
                />
                {errors.userType && touched.userType && <Label basic color='red' pointing content={errors.userType} />}
              </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field width={9}>
                <label>Menu Access:</label>
              </Form.Field>
              <Form.Field width={2}>
                <Checkbox
                  as={CheckboxFormatted}
                  label='Buyer'
                  value='buyerMenu'
                  checked={values.buyerMenu}
                  onChange={this._handleChangeCheckBox}
                />
              </Form.Field>
              <Form.Field width={2}>
                <Checkbox
                  as={CheckboxFormatted}
                  label='Business'
                  value='businessMenu'
                  checked={values.businessMenu}
                  onChange={this._handleChangeCheckBox}
                />
              </Form.Field>
              <Form.Field width={11}>
                <Checkbox
                  as={CheckboxFormatted}
                  label='Pre Sale'
                  value='preSaleMenu'
                  checked={values.preSaleMenu === true}
                  onChange={this._handleChangeCheckBox}
                />
              </Form.Field>
              <Form.Field width={10}>
                <Checkbox
                  as={CheckboxFormatted}
                  label='Resources'
                  value='resourcesMenu'
                  checked={values.resourcesMenu === true}
                  onChange={this._handleChangeCheckBox}
                />
              </Form.Field>
              <Form.Field width={14}>
                <Checkbox
                  as={CheckboxFormatted}
                  label='Client Manager'
                  value='clientManagerMenu'
                  checked={values.clientManagerMenu === true}
                  onChange={this._handleChangeCheckBox}
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  as={CheckboxFormatted}
                  name='systemSettingsMenu'
                  label='System Settings'
                  value='systemSettingsMenu'
                  checked={values.systemSettingsMenu === true}
                  onChange={this._handleChangeCheckBox}
                />
              </Form.Field>
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color='blue'
            disabled={isSubmitting || !isValid}
            loading={isLoading}
            onClick={handleSubmit}
          >
            <Icon name='save' />
            Create User
          </Button>
          <Button
            color='red'
            onClick={toggleModal}
          >
            <Icon name='cancel' />
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

NewUserForm.propTypes = {
  values: PropTypes.object,
  touched: PropTypes.object,
  errors: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  setFieldValue: PropTypes.func,
  toggleModal: PropTypes.func,
  isSubmitting: PropTypes.bool,
  isValid: PropTypes.bool,
  isLoading: PropTypes.bool,
  modalOpen: PropTypes.bool,
  userCreated: PropTypes.bool,
  resetForm: PropTypes.func
}

const mapPropsToValues = () => ({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  phoneHome: '',
  phoneWork: '',
  phoneMobile: '',
  suburb: '',
  street: '',
  postCode: '',
  listingAgent: '',
  userType: '',
  buyerMenu: false,
  businessMenu: false,
  preSaleMenu: false,
  resourcesMenu: false,
  clientManagerMenu: false,
  systemSettingsMenu: false
})

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address.')
    .required('Email is required.'),
  password: Yup.string()
    .required('Password is required.')
    .min(4, 'Password required minimum 4 characters.')
    .max(20, 'Password require max 20 characters.'),
  firstName: Yup.string()
    .required('First Name is required.')
    .max(20, 'First Name require max 20 characters.'),
  lastName: Yup.string()
    .required('Last Name is required.')
    .max(20, 'Last Name require max 20 characters.'),
  phoneHome: Yup.string()
    .max(20, 'Home Phone require max 20 characters.'),
  phoneWork: Yup.string()
    .max(20, 'Work Phone require max 20 characters.'),
  phoneMobile: Yup.string()
    .max(20, 'Mobile Phone require max 20 characters.'),
  suburb: Yup.string()
    .max(40, 'Suburb require max 40 charecters.'),
  street: Yup.string()
    .max(40, 'Street require max 40 charecters.'),
  postCode: Yup.number()
    .integer('Only numbers are permitted.'),
  dataRegion: Yup.string()
    .required('Office Region is required.'),
  listingAgent: Yup.number()
    .required('Listing Agent is required.'),
  userType: Yup.string()
    .required('User Type is required.')
})

const handleSubmit = (values, { props, setSubmitting }) => {
  props.createUser(values)
  setSubmitting(false)
}

const mapStateToProps = state => {
  return {
    isLoading: state.user.isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ createUser }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withFormik({
    mapPropsToValues,
    validationSchema,
    handleSubmit
  })(NewUserForm)
)

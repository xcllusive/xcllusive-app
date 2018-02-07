import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Icon, Checkbox, Label } from 'semantic-ui-react'
import { withFormik } from 'formik'
import styled from 'styled-components'
import Yup from 'yup'

const dataRegion = [
  { key: '1', text: 'Sydney Office', value: 'Sydney Office' },
  { key: '2', text: 'Melbourne Office', value: 'Melbourne Office' },
  { key: '3', text: 'Gosford Office', value: 'Gosford Office' },
  { key: '4', text: 'Cowra Office', value: 'Cowra Office' },
  { key: '5', text: 'Camberra Office', value: 'Camberra Office' }
]

const listingAgent = [
  { key: '1', text: 'Yes', value: '1' },
  { key: '2', text: 'No', value: '2' }
]

const userType = [
  { key: '1', text: 'Admin', value: '1' },
  { key: '2', text: 'Staff', value: '2' },
  { key: '3', text: 'Introducer', value: '3' }
]

const state = [
  { key: '1', text: 'NSW', value: 'NSW' },
  { key: '2', text: 'QLD', value: 'QLD' },
  { key: '3', text: 'SA', value: 'SA' },
  { key: '4', text: 'TAS', value: 'TAS' },
  { key: '5', text: 'VIC', value: 'VIC' },
  { key: '6', text: 'WA', value: 'WA' }
]

const CheckboxFormatted = styled.div`
  padding-right: 1em`

class NewUserModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      inputSearch: '',
      user: null
    }
  }

  _handleChangeCheckBox = (e, { value }) => {
    this.setState(prevState => ({
      [value]: !prevState[value]
    }))
  }

  _renderTitle = () => {
    return this.props.user
      ? this.props.user.firstName
      : 'New User'
  }

  render () {
    const {
      values,
      touched,
      errors,
      handleChange,
      handleBlur
    } = this.props

    return (
      <Modal open={this.props.modalOpen}>
        <Modal.Header align='center'> {this.props.user !== undefined ? `${this.props.user.firstName} ${this.props.user.lastName}` : 'New User'}</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleSubmit}>
            <Form.Group widths='equal'>
              <Form.Field>
                <Form.Input
                  label='Email'
                  name='email'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email && <Label basic color='red' pointing content={errors.email} />}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  type='password'
                  label='Password'
                  name='password'
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password && <Label basic color='red' pointing content={errors.password} />}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label='First Name'
                  name='firstName'
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.firstName && touched.firstName && <Label basic color='red' pointing content={errors.firstName} />}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label='Last Name'
                  name='lastName'
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
                  label='Office Region'
                  name='dataRegion'
                  options={dataRegion}
                  value={values.dataRegion}
                />
                {errors.dataRegion && touched.dataRegion && <Label basic color='red' pointing content={errors.dataRegion} />}
              </Form.Field>
              <Form.Field>
                <Form.Select
                  label='Listing Agent'
                  name='listingAgent'
                  options={listingAgent}
                  value={values.listingAgent}
                />
                {errors.listingAgent && touched.listingAgent && <Label basic color='red' pointing content={errors.listingAgent} />}
              </Form.Field>
              <Form.Field>
                <Form.Select
                  label='User Type'
                  name='userType'
                  options={userType}
                  value={values.userTypeId}
                />
                {errors.userType && touched.userType && <Label basic color='red' pointing content={errors.userType} />}
              </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
              <h4><b><div align='left'> Menu Access: </div></b></h4>
              <Checkbox
                as={CheckboxFormatted}
                label='Buyer'
                value='buyerMenu'
                checked={this.state.buyerMenu === true}
                onChange={this._handleChangeCheckBox}
              />
              <Checkbox
                as={CheckboxFormatted}
                label='Business'
                value='businessMenu'
                checked={this.state.businessMenu === true}
                onChange={this._handleChangeCheckBox}
              />
              <Checkbox
                as={CheckboxFormatted}
                label='Pre Sale'
                value='preSaleMenu'
                checked={this.state.preSaleMenu === true}
                onChange={this._handleChangeCheckBox}
              />
              <Checkbox
                as={CheckboxFormatted}
                label='Resources'
                value='resourcesMenu'
                checked={this.state.resourcesMenu === true}
                onChange={this._handleChangeCheckBox}
              />
              <Checkbox
                as={CheckboxFormatted}
                label='Client Manager'
                value='clientManagerMenu'
                checked={this.state.clientManagerMenu === true}
                onChange={this._handleChangeCheckBox}
              />
              <Checkbox
                as={CheckboxFormatted}
                label='System Settings'
                value='systemSettingsMenu'
                checked={this.state.systemSettingsMenu === true}
                onChange={this._handleChangeCheckBox}
              />
            </Form.Group>
            <Form.Group>
              <Form.Button color='blue'>
                <Icon name='save' />
                {this.props.user !== undefined ? 'Update User' : 'Create User'}
              </Form.Button>
              <Form.Button color='red' onClick={this.props.funcao}>
                <Icon name='cancel' />
                Cancel
              </Form.Button>
            </Form.Group>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

NewUserModal.propTypes = {
  user: PropTypes.object,
  modalOpen: PropTypes.bool,
  funcao: PropTypes.func,
  values: PropTypes.object,
  touched: PropTypes.object,
  errors: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func
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
  userType: ''
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
  listingAgent: Yup.string()
    .required('Listing Agent is required.'),
  userType: Yup.string()
    .required('User Type is required.')
})

const handleSubmit = ({ email, firstName }) =>
  console.log(email, firstName)

export default withFormik({ mapPropsToValues, validationSchema, handleSubmit })(
  NewUserModal
)

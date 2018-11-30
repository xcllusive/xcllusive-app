import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Modal, Form, Label, Checkbox, Icon, Button, Radio } from 'semantic-ui-react'
import styled from 'styled-components'
import * as Yup from 'yup'

import { closeModal } from '../../redux/ducks/modal'

const CheckboxFormatted = styled.div`
  padding-right: 1em;
`

class ModalNewUser extends Component {
  constructor (props) {
    super(props)
    this.state = {
      formOptions: {
        dataRegion: [
          { key: 1, text: 'Adelaide Office', value: 'Adelaide Office' },
          { key: 2, text: 'Camberra Office', value: 'Camberra Office' },
          { key: 3, text: 'Cowra Office', value: 'Cowra Office' },
          { key: 4, text: 'Gosford Office', value: 'Gosford Office' },
          { key: 5, text: 'Melbourne Office', value: 'Melbourne Office' },
          { key: 6, text: 'Sydney Office', value: 'Sydney Office' },
          { key: 7, text: 'Queensland Office', value: 'Queensland Office' }
        ],
        userType: [
          { key: 1, text: 'Admin', value: 'Admin' },
          { key: 2, text: 'Broker', value: 'Broker' },
          { key: 3, text: 'Introducer', value: 'Introducer' }
        ],
        state: [
          { key: 1, text: 'NSW', value: 'NSW' },
          { key: 2, text: 'QLD', value: 'QLD' },
          { key: 3, text: 'SA', value: 'SA' },
          { key: 4, text: 'TAS', value: 'TAS' },
          { key: 5, text: 'VIC', value: 'VIC' },
          { key: 6, text: 'WA', value: 'WA' },
          { key: 7, text: 'ACT', value: 'ACT' }
        ]
      },
      inputPasswordShow: true
    }
  }

  componentDidMount () {
    this.props.resetForm()
  }

  _handleChangeCheckBox = (e, { name }) => {
    this.props.setFieldValue(name, !this.props.values[name])
  }

  _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
  }

  _canChangePassword = () => {
    this.setState(
      prevState => ({
        inputPasswordShow: !prevState.inputPasswordShow
      }),
      () => {
        if (this.state.inputPasswordShow) {
          this.props.setFieldValue('password', false)
        } else {
          this.props.setFieldValue('password', '')
        }
      }
    )
  }

  render () {
    const { dataRegion, userType, state } = this.state.formOptions

    const {
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      isValid,
      createLoading,
      updateLoading,
      closeModal,
      title
    } = this.props
    return (
      <Modal open dimmer={'blurring'}>
        <Modal.Header align="center">{title}</Modal.Header>
        <Modal.Content>
          <Form>
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
                {errors.email && touched.email && <Label basic color="red" pointing content={errors.email} />}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  action={this.props.user && this.props.user.id !== ''}
                  type="password"
                  label="Password"
                  name="password"
                  autoComplete="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {this.props.user && this.props.user.id ? (
                    <div>
                      <input
                        disabled={this.state.inputPasswordShow}
                        type="password"
                        name="password"
                        autoComplete="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <Button onClick={this._canChangePassword} content="Change Password" />
                    </div>
                  ) : null}
                </Form.Input>
                {errors.password && touched.password && <Label basic color="red" pointing content={errors.password} />}
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <Form.Input
                  required
                  label="First Name"
                  name="firstName"
                  autoComplete="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.firstName && touched.firstName && (
                  <Label basic color="red" pointing content={errors.firstName} />
                )}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  required
                  label="Last Name"
                  name="lastName"
                  autoComplete="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.lastName && touched.lastName && <Label basic color="red" pointing content={errors.lastName} />}
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <Form.Input
                  label="Home Phone"
                  name="phoneHome"
                  autoComplete="phoneHome"
                  value={values.phoneHome}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.phoneHome && touched.phoneHome && (
                  <Label basic color="red" pointing content={errors.phoneHome} />
                )}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Work Phone"
                  name="phoneWork"
                  autoComplete="phoneWork"
                  value={values.phoneWork}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.phoneWork && touched.phoneWork && (
                  <Label basic color="red" pointing content={errors.phoneWork} />
                )}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Mobile Phone"
                  name="phoneMobile"
                  autoComplete="phoneMobile"
                  value={values.phoneMobile}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.phoneMobile && touched.phoneMobile && (
                  <Label basic color="red" pointing content={errors.phoneMobile} />
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
                  label="Suburb"
                  name="suburb"
                  autoComplete="suburb"
                  value={values.suburb}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.suburb && touched.suburb && <Label basic color="red" pointing content={errors.suburb} />}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Street"
                  name="street"
                  autoComplete="street"
                  value={values.street}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.street && touched.street && <Label basic color="red" pointing content={errors.street} />}
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
                {errors.postCode && touched.postCode && <Label basic color="red" pointing content={errors.postCode} />}
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <Form.Select
                  required
                  label="Office Region"
                  name="dataRegion"
                  options={dataRegion}
                  value={values.dataRegion}
                  onChange={this._handleSelectChange}
                />
                {errors.dataRegion && touched.dataRegion && (
                  <Label basic color="red" pointing content={errors.dataRegion} />
                )}
              </Form.Field>
              <Form.Field>
                <Form.Select
                  required
                  label="User Type"
                  name="userType"
                  options={userType}
                  value={values.userType}
                  onChange={this._handleSelectChange}
                />
                {errors.userType && touched.userType && <Label basic color="red" pointing content={errors.userType} />}
              </Form.Field>
              <Form.Field>
                <label>Listing Agent</label>
                <Form.Field
                  control={Radio}
                  label="Yes"
                  name="listingAgent"
                  onChange={this._handleChangeCheckBox}
                  checked={values.listingAgent}
                />
                <Form.Field
                  control={Radio}
                  label="No"
                  name="listingAgent"
                  onChange={this._handleChangeCheckBox}
                  checked={!values.listingAgent}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field width={9}>
                <label>Menu Access:</label>
              </Form.Field>
              <Form.Field width={2}>
                <Checkbox
                  as={CheckboxFormatted}
                  name="buyerMenu"
                  label="Buyer"
                  value="buyerMenu"
                  checked={values.buyerMenu}
                  onChange={this._handleChangeCheckBox}
                />
              </Form.Field>
              <Form.Field width={2}>
                <Checkbox
                  as={CheckboxFormatted}
                  name="businessMenu"
                  label="Business"
                  value="businessMenu"
                  checked={values.businessMenu}
                  onChange={this._handleChangeCheckBox}
                />
              </Form.Field>
              <Form.Field width={11}>
                <Checkbox
                  as={CheckboxFormatted}
                  name="preSaleMenu"
                  label="Pre Sale"
                  value="preSaleMenu"
                  checked={values.preSaleMenu === true}
                  onChange={this._handleChangeCheckBox}
                />
              </Form.Field>
              <Form.Field width={10}>
                <Checkbox
                  as={CheckboxFormatted}
                  name="resourcesMenu"
                  label="Resources"
                  value="resourcesMenu"
                  checked={values.resourcesMenu === true}
                  onChange={this._handleChangeCheckBox}
                />
              </Form.Field>
              <Form.Field width={14}>
                <Checkbox
                  as={CheckboxFormatted}
                  name="clientManagerMenu"
                  label="Client Manager"
                  value="clientManagerMenu"
                  checked={values.clientManagerMenu === true}
                  onChange={this._handleChangeCheckBox}
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  as={CheckboxFormatted}
                  name="systemSettingsMenu"
                  label="System Settings"
                  value="systemSettingsMenu"
                  checked={values.systemSettingsMenu === true}
                  onChange={this._handleChangeCheckBox}
                />
              </Form.Field>
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="blue"
            type="submit"
            disabled={createLoading || updateLoading || !isValid}
            loading={createLoading || updateLoading}
            onClick={handleSubmit}
          >
            <Icon name="save" />
            {this.props.user && this.props.user.id ? 'Edit User' : 'Create User'}
          </Button>
          <Button color="red" onClick={closeModal}>
            <Icon name="cancel" />
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

ModalNewUser.propTypes = {
  values: PropTypes.object,
  touched: PropTypes.object,
  errors: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  setFieldValue: PropTypes.func,
  closeModal: PropTypes.func,
  isValid: PropTypes.bool,
  createLoading: PropTypes.bool,
  updateLoading: PropTypes.bool,
  resetForm: PropTypes.func,
  user: PropTypes.object,
  title: PropTypes.string
}

const mapPropsToValues = props => {
  if (props && props.user) {
    const roles = JSON.parse(props.user.roles)
    return {
      id: props.user.id,
      email: props.user.email,
      password: false,
      firstName: props.user.firstName ? props.user.firstName : '',
      lastName: props.user.lastName ? props.user.lastName : '',
      phoneHome: props.user.phoneHome ? props.user.phoneHome : '',
      phoneWork: props.user.phoneWork ? props.user.phoneWork : '',
      phoneMobile: props.user.phoneMobile ? props.user.phoneMobile : '',
      state: props.user.state ? props.user.state : '',
      suburb: props.user.suburb ? props.user.suburb : '',
      street: props.user.street ? props.user.street : '',
      postCode: props.user.postCode ? props.user.postCode : '',
      dataRegion: props.user.dataRegion ? props.user.dataRegion : '',
      listingAgent: props.user.listingAgent ? props.user.listingAgent : false,
      broker: props.user.listingAgent ? props.user.listingAgent : false,
      userType: props.user.userType ? props.user.userType : '',
      buyerMenu: _.includes(roles, 'BUYER_MENU'),
      businessMenu: _.includes(roles, 'BUSINESS_MENU'),
      preSaleMenu: _.includes(roles, 'PRESALE_MENU'),
      resourcesMenu: _.includes(roles, 'RESOURCES_MENU'),
      clientManagerMenu: _.includes(roles, 'CLIENT_MANAGER_MENU'),
      systemSettingsMenu: _.includes(roles, 'SYSTEM_SETTINGS_MENU')
    }
  }
  return {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneHome: '',
    phoneWork: '',
    phoneMobile: '',
    state: '',
    suburb: '',
    street: '',
    postCode: '',
    dataRegion: '',
    listingAgent: false,
    broker: false,
    userType: '',
    buyerMenu: false,
    businessMenu: false,
    preSaleMenu: false,
    resourcesMenu: false,
    clientManagerMenu: false,
    systemSettingsMenu: false
  }
}

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
  phoneHome: Yup.string().max(20, 'Home Phone require max 20 characters.'),
  phoneWork: Yup.string().max(20, 'Work Phone require max 20 characters.'),
  phoneMobile: Yup.string().max(20, 'Mobile Phone require max 20 characters.'),
  suburb: Yup.string().max(40, 'Suburb require max 40 charecters.'),
  street: Yup.string().max(40, 'Street require max 40 charecters.'),
  postCode: Yup.number().integer('Only numbers are permitted.'),
  dataRegion: Yup.string().required('Office Region is required.'),
  // listingAgent: Yup.number().required('Listing Agent is required.'),
  userType: Yup.string().required('User Type is required.')
})

const handleSubmit = (values, { props, setSubmitting }) => {
  props.onConfirm(values)
}

const mapStateToProps = state => {
  return {
    createLoading: state.user.create.isLoading,
    updateLoading: state.user.update.isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ closeModal }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues,
    validationSchema,
    handleSubmit,
    enableReinitialize: true
  })(ModalNewUser)
)

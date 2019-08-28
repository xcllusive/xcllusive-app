import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Modal, Form, Label, Checkbox, Icon, Button, Radio, Grid } from 'semantic-ui-react'
import styled from 'styled-components'
import * as Yup from 'yup'
import { mapArrayToValuesForDropdown } from '../../utils/sharedFunctionArray'

import { closeModal } from '../../redux/ducks/modal'
import { getOfficeRegister } from '../../redux/ducks/officeRegister'
import { activeInactive } from '../../redux/ducks/user'

const CheckboxFormatted = styled.div`
  padding-right: 1em;
`

class ModalNewUser extends Component {
  constructor (props) {
    super(props)
    this.state = {
      formOptions: {
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
    this.props.getOfficeRegister()
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

  _activeInactive = async user => {
    await this.props.activeInactive(user)
    this.props.onConfirm(null)
    this.props.closeModal()
  }

  render () {
    const { userType, state } = this.state.formOptions
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
      title,
      officeOptions,
      user
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
                  action={user && user.id !== ''}
                  type="password"
                  label="Password"
                  name="password"
                  autoComplete="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {user && user.id ? (
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
                  name="officeId"
                  options={mapArrayToValuesForDropdown(officeOptions)}
                  value={values.officeId}
                  onChange={this._handleSelectChange}
                />
                {errors.officeId && touched.officeId && <Label basic color="red" pointing content={errors.officeId} />}
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
                <label>Listing Agent Xcllusive</label>
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
              <Form.Field>
                <label>Listing Agent CTC</label>
                <Form.Field
                  control={Radio}
                  label="Yes"
                  name="listingAgentCtc"
                  onChange={this._handleChangeCheckBox}
                  checked={values.listingAgentCtc}
                />
                <Form.Field
                  control={Radio}
                  label="No"
                  name="listingAgentCtc"
                  onChange={this._handleChangeCheckBox}
                  checked={!values.listingAgentCtc}
                />
              </Form.Field>
              <Form.Field>
                <label>Level of Info Access</label>
                <Form.Field
                  control={Radio}
                  label="Management"
                  name="levelOfInfoAccess"
                  onChange={this._handleChangeCheckBox}
                  checked={values.levelOfInfoAccess}
                />
                <Form.Field
                  control={Radio}
                  label="Team Leader"
                  name="levelOfInfoAccess"
                  onChange={this._handleChangeCheckBox}
                  checked={!values.levelOfInfoAccess}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <Form.Input
                  required
                  label="Role"
                  name="role"
                  autoComplete="role"
                  value={values.role}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.role && touched.role && <Label basic color="red" pointing content={errors.role} />}
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
              <Form.Field width={14}>
                <Checkbox
                  as={CheckboxFormatted}
                  name="managementMenu"
                  label="Management"
                  value="managementMenu"
                  checked={values.managementMenu === true}
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
              <Form.Field>
                <Checkbox
                  as={CheckboxFormatted}
                  name="ctcMenu"
                  label="CTC"
                  value="ctcMenu"
                  checked={values.ctcMenu === true}
                  onChange={this._handleChangeCheckBox}
                />
              </Form.Field>
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Button
                  floated="left"
                  color={user && user.active ? 'orange' : 'green'}
                  onClick={() => this._activeInactive(user)}
                >
                  <Icon name={user && user.active ? 'cut' : 'redo'} />
                  {user && user.active ? 'Inactivate' : 'Activate'}
                </Button>
                <Button
                  color="blue"
                  type="submit"
                  disabled={createLoading || updateLoading || !isValid}
                  loading={createLoading || updateLoading}
                  onClick={handleSubmit}
                >
                  <Icon name="save" />
                  {user && user.id ? 'Edit User' : 'Create User'}
                </Button>
                <Button color="red" onClick={closeModal}>
                  <Icon name="cancel" />
                  Cancel
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
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
  title: PropTypes.string,
  getOfficeRegister: PropTypes.func,
  officeOptions: PropTypes.array,
  activeInactive: PropTypes.func,
  onConfirm: PropTypes.func
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
      officeId: props.user ? props.user.officeId : '',
      listingAgent: props.user.listingAgent ? props.user.listingAgent : false,
      listingAgentCtc: props.user.listingAgentCtc ? props.user.listingAgentCtc : false,
      broker: props.user.listingAgent ? props.user.listingAgent : false,
      userType: props.user.userType ? props.user.userType : '',
      levelOfInfoAccess: props.user ? props.user.levelOfInfoAccess : false,
      active: props.user.active ? props.user.active : false,
      role: props.user.role ? props.user.role : '',
      buyerMenu: _.includes(roles, 'BUYER_MENU'),
      businessMenu: _.includes(roles, 'BUSINESS_MENU'),
      preSaleMenu: _.includes(roles, 'PRESALE_MENU'),
      resourcesMenu: _.includes(roles, 'RESOURCES_MENU'),
      clientManagerMenu: _.includes(roles, 'CLIENT_MANAGER_MENU'),
      managementMenu: _.includes(roles, 'MANAGEMENT_MENU'),
      systemSettingsMenu: _.includes(roles, 'SYSTEM_SETTINGS_MENU'),
      ctcMenu: _.includes(roles, 'CTC_MENU')
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
    listingAgent: false,
    listingAgentCtc: false,
    broker: false,
    userType: '',
    levelOfInfoAccess: false,
    role: '',
    buyerMenu: false,
    businessMenu: false,
    preSaleMenu: false,
    resourcesMenu: false,
    clientManagerMenu: false,
    managementMenu: false,
    systemSettingsMenu: false,
    ctcMenu: false
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
  officeId: Yup.number().required('Office Region is required.'),
  // listingAgent: Yup.number().required('Listing Agent is required.'),
  userType: Yup.string().required('User Type is required.'),
  role: Yup.string().required('Role is required.')
})

const handleSubmit = (values, { props, setSubmitting }) => {
  props.onConfirm(values)
}

const mapStateToProps = state => {
  return {
    createLoading: state.user.create.isLoading,
    updateLoading: state.user.update.isLoading,
    officeOptions: state.officeRegister.get.array
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ closeModal, getOfficeRegister, activeInactive }, dispatch)
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

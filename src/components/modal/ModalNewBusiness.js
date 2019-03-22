import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Modal, Form, Icon, Button, Label, Message } from 'semantic-ui-react'
import * as Yup from 'yup'
import _ from 'lodash'
import { closeModal } from '../../redux/ducks/modal'
import { getBusinessRegister } from '../../redux/ducks/businessRegister'
import { verifyDuplicatedBusiness, clearBusiness } from '../../redux/ducks/business'
import { getUsers } from '../../redux/ducks/user'

import { mapArrayToValuesForDropdown } from '../../utils/sharedFunctionArray'

class ModalNewBusiness extends Component {
  constructor (props) {
    super(props)
    this.state = {
      phoneMsg: false,
      emailMsg: false
    }
  }

  componentDidMount () {
    this.props.getBusinessRegister(1, 1000)
    this.props.getUsers()
  }

  componentWillUnmount () {
    this.setState({
      phoneMsg: false,
      emailMsg: false
    })
    this.props.clearBusiness()
  }

  _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
  }

  _mapValuesToArray = array => {
    if (array.length > 0) {
      return array.map((item, index) => ({
        key: index,
        text: `${item.firstName} ${item.lastName}`,
        value: item.id
      }))
    }
    return [{ key: 1, text: 'No users found', value: null }]
  }

  _findTelephoneDuplicated = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
    const findDuplicatedPhone = _.find(
      this.props.phonesEmailBusinesses,
      o =>
        o.vendorPhone1 !== null &&
        (o.vendorPhone1.split(' ').join('') === value.split(' ').join('') ||
          o.vendorPhone1.split('-').join('') === value.split('-').join('') ||
          o.vendorPhone1 === value)
    )
    if (findDuplicatedPhone && findDuplicatedPhone.vendorPhone1 !== '') {
      this.setState({
        phoneMsg: findDuplicatedPhone
      })
    } else {
      this.setState({
        phoneMsg: false
      })
    }
  }

  _findEmailDuplicated = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
    const findDuplicatedEmail = _.find(
      this.props.phonesEmailBusinesses,
      o => o.vendorEmail !== null && o.vendorEmail === value
    )
    if (findDuplicatedEmail && findDuplicatedEmail.vendorEmail !== '') {
      this.setState({
        emailMsg: findDuplicatedEmail
      })
    } else {
      this.setState({
        emailMsg: false
      })
    }
  }

  _verifyDuplicatedBusiness = async values => {
    await this.props.verifyDuplicatedBusiness(values)
    if (!this.props.duplicatedBusinessObject) {
      await this.props.onConfirm(values)
      this.props.closeModal(values)
    }
  }

  _closeModalAndSearchBusiness = (values, duplicatedBusinessObject, where) => {
    if (where === 'Client Manager') {
      this.props.onConfirm(values, duplicatedBusinessObject)
    } else {
      this.props.closeModal(values)
      this.props.history.push(`/business/${duplicatedBusinessObject.id}`)
    }
  }

  render () {
    const {
      values,
      handleChange,
      handleBlur,
      errors,
      touched,
      isSubmitting,
      isValid,
      isLoading,
      sourceOptions,
      dropDownLoading,
      title,
      closeModal,
      isLoadingUser,
      duplicatedBusinessObject,
      disableButton,
      handleSubmit
    } = this.props
    return (
      <Modal open dimmer={'blurring'}>
        <Modal.Header align="center">{title}</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group widths="equal">
              <Form.Field>
                <Form.Input
                  label="Business name"
                  name="businessName"
                  autoComplete="businessName"
                  value={values.businessName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.businessName && touched.businessName && (
                  <Label basic color="red" pointing content={errors.businessName} />
                )}
              </Form.Field>
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
                {errors.firstName && touched.firstName && (
                  <Label basic color="red" pointing content={errors.firstName} />
                )}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Last name"
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
                  required
                  label="Telephone 1"
                  name="vendorPhone1"
                  autoComplete="vendorPhone1"
                  value={values.vendorPhone1}
                  onChange={this._findTelephoneDuplicated}
                  onBlur={handleBlur}
                />
                {errors.vendorPhone1 && touched.vendorPhone1 && (
                  <Label basic color="red" pointing content={errors.vendorPhone1} />
                )}
                {this.state.phoneMsg && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={`This phone has been already added for this business: [BS${this.state.phoneMsg.id} - ${
                      this.state.phoneMsg.businessName
                    }]`}
                  />
                )}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Telephone 2"
                  name="vendorPhone2"
                  autoComplete="vendorPhone2"
                  value={values.vendorPhone2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.vendorPhone2 && touched.vendorPhone2 && (
                  <Label basic color="red" pointing content={errors.vendorPhone2} />
                )}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Telephone 3"
                  name="vendorPhone3"
                  autoComplete="vendorPhone3"
                  value={values.vendorPhone3}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.vendorPhone3 && touched.vendorPhone3 && (
                  <Label basic color="red" pointing content={errors.vendorPhone3} />
                )}
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <Form.Input
                  label="Email"
                  name="vendorEmail"
                  autoComplete="vendorEmail"
                  value={values.vendorEmail}
                  onChange={this._findEmailDuplicated}
                  onBlur={handleBlur}
                />
                {errors.vendorEmail && touched.vendorEmail && (
                  <Label basic color="red" pointing content={errors.vendorEmail} />
                )}
                {this.state.emailMsg && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={`This email has been already added for this business: [BS${this.state.emailMsg.id} - ${
                      this.state.emailMsg.businessName
                    }]`}
                  />
                )}
              </Form.Field>
              <Form.Field>
                <Form.Select
                  required
                  label="Source"
                  options={mapArrayToValuesForDropdown(sourceOptions)}
                  name="businessSource"
                  autoComplete="businessSource"
                  loading={dropDownLoading}
                  disabled={dropDownLoading}
                  value={values.businessSource}
                  onChange={this._handleSelectChange}
                />
                {errors.businessSource && touched.businessSource && (
                  <Label basic color="red" pointing content={errors.businessSource} />
                )}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Source Notes"
                  name="sourceNotes"
                  autoComplete="sourceNotes"
                  value={values.sourceNotes}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.sourceNotes && touched.sourceNotes && (
                  <Label basic color="red" pointing content={errors.sourceNotes} />
                )}
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <Form.TextArea
                  label="Notes"
                  name="description"
                  autoComplete="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.description && touched.description && (
                  <Label basic color="red" pointing content={errors.description} />
                )}
              </Form.Field>
            </Form.Group>
            {this.props.values.where === 'ClientManager' ? (
              <Form.Group>
                <Form.Field width={8}>
                  <Form.Select
                    required
                    label="Listing Agent"
                    name="listingAgent"
                    options={this._mapValuesToArray(this.props.users)}
                    autoComplete="listingAgent"
                    value={values.listingAgent}
                    onChange={this._handleSelectChange}
                    loading={isLoadingUser}
                    disabled={isLoadingUser}
                  />
                  {errors.listingAgent && touched.listingAgent && (
                    <Label basic color="red" pointing content={errors.listingAgent} />
                  )}
                </Form.Field>
              </Form.Group>
            ) : null}
          </Form>
          {duplicatedBusinessObject ? (
            <Message warning>
              <Message.Header>Duplicated Business Alert!!</Message.Header>
              <Message.List>
                <Message.Item>
                  {duplicatedBusinessObject.firstNameV} {duplicatedBusinessObject.lastNameV}{' '}
                  <Icon
                    link
                    name="search"
                    onClick={() =>
                      this._closeModalAndSearchBusiness(values, duplicatedBusinessObject, this.props.where)
                    }
                  />
                </Message.Item>
                <Message.Item>{duplicatedBusinessObject.vendorEmail}</Message.Item>
                <Message.Item>{duplicatedBusinessObject.vendorPhone1}</Message.Item>
              </Message.List>
            </Message>
          ) : null}
        </Modal.Content>
        <Modal.Actions>
          {duplicatedBusinessObject ? (
            <Button
              color="green"
              type="submit"
              disabled={isSubmitting || !isValid}
              loading={isLoading}
              onClick={handleSubmit}
            >
              <Icon name="save" />
              Create Duplicated Business
            </Button>
          ) : null}
          <Button
            color="blue"
            disabled={isSubmitting || !isValid || disableButton}
            loading={isLoading}
            onClick={() => this._verifyDuplicatedBusiness(values)}
            type="submit"
          >
            <Icon name="save" />
            Create Business
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

ModalNewBusiness.propTypes = {
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
  title: PropTypes.string,
  where: PropTypes.string,
  closeModal: PropTypes.func,
  getUsers: PropTypes.func,
  users: PropTypes.array,
  isLoadingUser: PropTypes.bool,
  verifyDuplicatedBusiness: PropTypes.func,
  phonesEmailBusinesses: PropTypes.array,
  duplicatedBusinessObject: PropTypes.object,
  onConfirm: PropTypes.func,
  disableButton: PropTypes.bool,
  clearBusiness: PropTypes.func,
  history: PropTypes.object
}

const mapPropsToValues = props => ({
  businessName: '',
  firstName: '',
  lastName: '',
  vendorPhone1: '',
  vendorPhone2: '',
  vendorPhone3: '',
  vendorEmail: '',
  businessSource: '',
  sourceNotes: '',
  description: '',
  listingAgent: '',
  where: props.where ? props.where : null
})

const validationSchema = Yup.object().shape({
  businessName: Yup.string().max(120, 'Business name require max 120 characters.'),
  firstName: Yup.string()
    .required('First name is required.')
    .max(40, 'First name require max 40 characters.'),
  lastName: Yup.string().max(40, 'Last name require max 40 characters.'),
  vendorPhone1: Yup.string()
    .max(30, 'Telephone 1 require max 30 characters.')
    .required('Telephone 1 is required.'),
  vendorPhone2: Yup.string().max(30, 'Telephone 2 require max 30 characters.'),
  vendorPhone3: Yup.string().max(30, 'Telephone 3 require max 30 characters.'),
  vendorEmail: Yup.string().email('Invalid email address.'),
  businessSource: Yup.number().required('Source is required.'),
  sourceNotes: Yup.string().max(40, 'Source Notes require max 40 characters.'),
  description: Yup.string().max(2000, 'Source Notes require max 2000 characters.'),
  where: Yup.string(),
  listingAgent: Yup.number()
    .notRequired()
    .when('where', {
      is: 'ClientManager',
      then: Yup.number().required('Listing Agent is required'),
      otherwise: Yup.number().notRequired()
    })
})

const handleSubmit = (values, { props, setSubmitting }) => {
  props.onConfirm(values)
}

const mapStateToProps = state => {
  return {
    isLoading: state.business.create.isLoading,
    sourceOptions: state.businessRegister.get.source.array,
    dropDownLoading: state.businessRegister.get.source.isLoading,
    users: state.user.get.array,
    isLoadingUser: state.user.get.isLoading,
    duplicatedBusinessObject: state.business.verifyDuplicatedBusiness.object,
    disableButton: state.business.verifyDuplicatedBusiness.disableButton
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { getBusinessRegister, closeModal, getUsers, verifyDuplicatedBusiness, clearBusiness },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues,
    validationSchema,
    handleSubmit
  })(ModalNewBusiness)
)

import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Modal, Form, Icon, Button, Label, Message, Dropdown } from 'semantic-ui-react'
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
      emailMsg: false,
      willReassign: false
    }
  }

  componentDidMount () {
    this.props.getBusinessRegister(1, 1000)
    this.props.getBusinessRegister(6, 1000)
    this.props.getBusinessRegister(10, 1000)
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
    if (name === 'vendorPhone1') {
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
    this._handleChangeTelephone(value, name)
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
      await this.props.onConfirm(values, false, this.state.willReassign)
      this.props.closeModal(values)
    }
  }

  _closeModalAndSearchBusiness = (values, duplicatedBusinessObject, where) => {
    if (where === 'Client Manager') {
      this.props.onConfirm(values, duplicatedBusinessObject)
    } else {
      // this.props.closeModal(values)
      // this.props.history.push(`/business/${duplicatedBusinessObject.id}`)
      window.open(`/business/${duplicatedBusinessObject.id}`)
    }
  }

  _reassignToCtc = () => {
    this.setState({ willReassign: true })
    this.props.values.willReassign = true
  }

  _cancelReassign = () => {
    this.setState({ willReassign: false })
    this.props.values.willReassign = false
    this.props.values.listingAgentCtc = null
    this.props.values.ctcStageId = null
  }

  _handleChangeTelephone = (value, name) => {
    const onlyNumbers = value
    let replaced = onlyNumbers.replace(/-/gi, '')
    replaced = replaced.replace(/ /gi, '')
    replaced = replaced.replace(/;/gi, '')
    replaced = replaced.replace(/<[^>]+>/gi, '')
    replaced = replaced.replace(/<[^>]>/gi, '')
    replaced = replaced.replace(/[.*+?^${}()|[\]\\]/g, '')
    let zero = ''
    if (replaced.substring(0, 1) === '0') zero = 0
    const toString = parseInt(replaced)
    if (name === 'vendorPhone1') this.props.setFieldValue('vendorPhone1Number', `${zero}${toString.toString()}`)
    if (name === 'vendorPhone2') this.props.setFieldValue('vendorPhone2Number', `${zero}${toString.toString()}`)
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
      handleSubmit,
      ctcAnalysts,
      sourceCtcOptions,
      dropDownCtcLoading,
      company,
      xcllusiveAnalysts,
      ctcStageOptions,
      isLoadingCtcStage
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
                    content={`This phone has been already added for this business: [BS${this.state.phoneMsg.id} - ${this.state.phoneMsg.businessName}]`}
                  />
                )}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Telephone 2"
                  name="vendorPhone2"
                  autoComplete="vendorPhone2"
                  value={values.vendorPhone2}
                  onChange={this._findTelephoneDuplicated}
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
                    content={`This email has been already added for this business: [BS${this.state.emailMsg.id} - ${this.state.emailMsg.businessName}]`}
                  />
                )}
              </Form.Field>
              {company === 'Xcllusive' ? (
                <Form.Field>
                  <label>Source</label>
                  <Dropdown
                    name="businessSource"
                    placeholder="Source"
                    fluid
                    search
                    selection
                    loading={dropDownLoading}
                    options={mapArrayToValuesForDropdown(sourceOptions)}
                    value={values.businessSource}
                    onChange={this._handleSelectChange}
                    onSearchChange={this._handleSearchChange}
                  />
                  {errors.businessSource && touched.businessSource && (
                    <Label basic color="red" pointing content={errors.businessSource} />
                  )}
                </Form.Field>
              ) : (
                <Form.Field>
                  <label>Source</label>
                  <Dropdown
                    name="ctcSourceId"
                    placeholder="Source"
                    fluid
                    search
                    selection
                    loading={dropDownCtcLoading}
                    options={mapArrayToValuesForDropdown(sourceCtcOptions)}
                    value={values.ctcSourceId}
                    onChange={this._handleSelectChange}
                    onSearchChange={this._handleSearchChange}
                  />
                  {errors.ctcSourceId && touched.ctcSourceId && (
                    <Label basic color="red" pointing content={errors.ctcSourceId} />
                  )}
                </Form.Field>
              )}
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
            {company === 'CTC' || this.state.willReassign ? (
              <Form.Group>
                <Form.Field width={8}>
                  <Form.Select
                    required
                    label="CTC Stage"
                    options={mapArrayToValuesForDropdown(ctcStageOptions)}
                    name="ctcStageId"
                    autoComplete="ctcStageId"
                    loading={isLoadingCtcStage}
                    disabled={isLoadingCtcStage}
                    value={values.ctcStageId}
                    onChange={this._handleSelectChange}
                  />
                  {errors.ctcStageId && touched.ctcStageId && (
                    <Label basic color="red" pointing content={errors.ctcStageId} />
                  )}
                </Form.Field>
              </Form.Group>
            ) : null}
            {values.where === 'ClientManager' ? (
              <Fragment>
                {company === 'Xcllusive' ? (
                  <Fragment>
                    <Form.Group>
                      <Form.Field width={8}>
                        <label>Listing Agent</label>
                        <Dropdown
                          name="listingAgent"
                          placeholder="Listing Agent"
                          fluid
                          search
                          selection
                          loading={isLoadingUser}
                          options={this._mapValuesToArray(xcllusiveAnalysts)}
                          value={values.listingAgent}
                          onChange={this._handleSelectChange}
                          onSearchChange={this._handleSearchChange}
                        />
                        {errors.listingAgent && touched.listingAgent && (
                          <Label basic color="red" pointing content={errors.listingAgent} />
                        )}
                      </Form.Field>
                      {values.listingAgent && values.businessSource ? (
                        <Form.Field style={{ marginLeft: '50px', marginTop: '22px' }}>
                          {!this.state.willReassign ? (
                            <Button onClick={this._reassignToCtc} color="green">
                              <Icon name="add" />
                              Reassign to CTC
                            </Button>
                          ) : (
                            <Button onClick={this._cancelReassign} color="yellow">
                              <Icon name="cancel" />
                              Cancel Reassignment
                            </Button>
                          )}
                        </Form.Field>
                      ) : null}
                    </Form.Group>
                    <Form.Group>
                      {this.state.willReassign ? (
                        <Fragment>
                          <Form.Field>
                            <Form.Select
                              required
                              label="CTC Source"
                              options={mapArrayToValuesForDropdown(sourceCtcOptions)}
                              name="ctcSourceId"
                              autoComplete="ctcSourceId"
                              loading={dropDownCtcLoading}
                              disabled={true}
                              value={1}
                              onChange={this._handleSelectChange}
                            />
                          </Form.Field>
                          <Form.Field width={7}>
                            <label>Listing Agent</label>
                            <Dropdown
                              name="listingAgentCtc"
                              placeholder="Listing Agent"
                              fluid
                              search
                              selection
                              options={this._mapValuesToArray(ctcAnalysts)}
                              value={values.listingAgentCtc}
                              onChange={this._handleSelectChange}
                              onSearchChange={this._handleSearchChange}
                            />
                            {errors.listingAgentCtc && touched.listingAgentCtc && (
                              <Label basic color="red" pointing content={errors.listingAgentCtc} />
                            )}
                          </Form.Field>
                        </Fragment>
                      ) : null}
                    </Form.Group>
                  </Fragment>
                ) : (
                  <Form.Group>
                    <Form.Field width={8}>
                      <label>Listing Agent</label>
                      <Dropdown
                        name="listingAgentCtc"
                        placeholder="Listing Agent"
                        fluid
                        search
                        selection
                        options={this._mapValuesToArray(ctcAnalysts)}
                        value={values.listingAgentCtc}
                        onChange={this._handleSelectChange}
                        onSearchChange={this._handleSearchChange}
                      />
                      {errors.listingAgentCtc && touched.listingAgentCtc && (
                        <Label basic color="red" pointing content={errors.listingAgentCtc} />
                      )}
                    </Form.Field>
                  </Form.Group>
                )}
              </Fragment>
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
  xcllusiveAnalysts: PropTypes.array,
  isLoadingUser: PropTypes.bool,
  verifyDuplicatedBusiness: PropTypes.func,
  phonesEmailBusinesses: PropTypes.array,
  duplicatedBusinessObject: PropTypes.object,
  onConfirm: PropTypes.func,
  disableButton: PropTypes.bool,
  clearBusiness: PropTypes.func,
  history: PropTypes.object,
  company: PropTypes.string,
  ctcAnalysts: PropTypes.array,
  sourceCtcOptions: PropTypes.array,
  dropDownCtcLoading: PropTypes.bool,
  ctcStageOptions: PropTypes.array,
  isLoadingCtcStage: PropTypes.bool
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
  listingAgent: props.listingAgent ? props.listingAgent : '',
  listingAgentCtc: props.listingAgentCtc ? props.listingAgentCtc : '',
  ctcSourceId: props.ctcSourceId ? props.ctcSourceId : '',
  company: props.company ? props.company : '',
  where: props.where ? props.where : '',
  willReassign: props.willReassign ? props.willReassign : false,
  vendorPhone1Number: 0,
  vendorPhone2Number: 0
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
  // businessSource: Yup.number().required('Source is required.'),
  sourceNotes: Yup.string().max(40, 'Source Notes require max 40 characters.'),
  description: Yup.string().max(2000, 'Source Notes require max 2000 characters.'),
  where: Yup.string(),
  company: Yup.string(),
  businessSource: Yup.number()
    .notRequired()
    .when('company', {
      is: company => company === 'Xcllusive',
      then: Yup.number().required(),
      otherwise: Yup.number().notRequired()
    }),
  ctcSourceId: Yup.number()
    .notRequired()
    .when('company', {
      is: company => company === 'CTC',
      then: Yup.number().required(),
      otherwise: Yup.number().notRequired()
    }),
  listingAgent: Yup.number()
    .notRequired()
    .when(['where', 'company'], {
      is: (where, company) => where === 'ClientManager' && company === 'Xcllusive',
      then: Yup.number().required('Listing Agent is required'),
      otherwise: Yup.number().notRequired()
    }),
  willReassign: Yup.boolean(),
  listingAgentCtc: Yup.number()
    .notRequired()
    .when(['where', 'company', 'willReassign'], {
      is: (where, company, willReassign) => (where === 'ClientManager' && company === 'CTC') || willReassign === true,
      then: Yup.number().required('Listing Agent is required'),
      otherwise: Yup.number().notRequired()
    }),
  ctcStageId: Yup.number()
    .notRequired()
    .when(['company'], {
      is: company => company === 'CTC',
      then: Yup.number().required('CTC Stage is required'),
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
    sourceCtcOptions: state.businessRegister.get.ctcBusinessSource.array,
    dropDownCtcLoading: state.businessRegister.get.ctcBusinessSource.isLoading,
    xcllusiveAnalysts: state.user.get.xcllusiveAnalysts,
    isLoadingUser: state.user.get.isLoading,
    duplicatedBusinessObject: state.business.verifyDuplicatedBusiness.object,
    disableButton: state.business.verifyDuplicatedBusiness.disableButton,
    ctcAnalysts: state.user.get.ctcAnalysts,
    ctcStageOptions: state.businessRegister.get.ctcStage.array,
    isLoadingCtcStage: state.businessRegister.get.ctcStage.isLoading
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

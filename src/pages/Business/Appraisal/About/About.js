import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Form, Label, Message, Step, Grid, Header, Segment, Dropdown } from 'semantic-ui-react'
import * as Yup from 'yup'
import Wrapper from '../../../../components/content/Wrapper'
import { updateAppraisal } from '../../../../redux/ducks/appraisal'
import { updateBusiness } from '../../../../redux/ducks/business'
import { TypesModal, openModal } from '../../../../redux/ducks/modal'
import { BusinessCommencedOptions } from '../../../../constants/BusinessCommencedOptions'
import CustomersSuppliersForm from './CustomersSuppliersForm'
import PremisesAndEmployeesForm from './PremisesAndEmployeesForm'
import OwnershipAndFinalNotesForm from './OwnershipAndFinalNotesForm'

class AboutPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      businessCommencedOptions: BusinessCommencedOptions,
      currentOwnerOptions: BusinessCommencedOptions
    }
  }

  componentWillUnmount () {
    this.props.updateAppraisal(this.props.values)
    this._updateBusiness(this.props.values)
  }

  _updateBusiness = values => {
    const business = {
      id: values.business_id,
      businessType: values.typeId,
      industry: values.industry
    }
    this.props.updateBusiness(business)
  }

  _handleChangeCheckBox = (e, { name }) => {
    this.props.setFieldValue(name, !this.props.values[name])
  }

  _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
  }

  _newBusinessRegister = type => {
    let typeName = null
    if (type === 4) typeName = 'Industry'
    else typeName = 'Type'
    this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM, {
      options: {
        title: 'Confirming...',
        text: `This will add a new business '${typeName}' to the list. Before you do this, please ensure that an applicable option is not included in the list.`
      },
      onConfirm: isConfirmed => {
        if (isConfirmed) {
          this.props.openModal(TypesModal.MODAL_TYPE_NEW_BUSINESS_REGISTER, {
            title: 'New Business Register',
            type: type
          })
        }
      }
    })
  }

  _copyCheckBox = () => {
    this.props.setFieldValue('currentOwner', this.props.values.businessCommenced)
  }

  _handleChangeTextArea = e => {
    if (e.target.type === 'textarea' && e.which === 13 /* Enter */) {
      e.preventDefault()
    }
  }

  render () {
    const { values, handleChange, handleBlur, errors, touched, typeOptions } = this.props
    const { businessCommencedOptions, currentOwnerOptions } = this.state
    return (
      <Wrapper>
        <Segment style={{ backgroundColor: '#ffe7a273', marginTop: '0px' }} size="small">
          <Step.Group size="large">
            <Step active icon="pencil alternate" title="Step 2" description="About This Business" />
            <Message style={{ marginTop: '0px' }} info size="large">
              <p>
                The information you enter on this page will be used on the `About This Business` page of the appraisal.
                Though it won`t be used in any specific calculations it is important to complete in full as it will
                demonstrate to the vendor that care has been taken in assessing their business. A number of these fields
                will also update fields on the business database and our agents may use parts of it in the Sales
                Memorandum. Anything not entered will be left as blank.
              </p>
            </Message>
          </Step.Group>
        </Segment>
        <Form>
          <Grid celled="internally" divided>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Segment style={{ marginLeft: '-15px', backgroundColor: '#008eff26' }}>
                  <Form.Group widths="equal">
                    <Form.Field>
                      <label>Business Industry</label>
                      <Dropdown
                        name="typeId"
                        placeholder="Business Industry"
                        fluid
                        search
                        selection
                        options={typeOptions}
                        value={values.typeId}
                        onChange={this._handleSelectChange}
                        onSearchChange={this._handleSearchChange}
                      />
                      {errors.typeId && touched.typeId && <Label basic color="red" pointing content={errors.typeId} />}
                    </Form.Field>
                    <Form.Field>
                      <Form.Input
                        label="Business Type"
                        name="industry"
                        autoComplete="industry"
                        value={values.industry}
                        onChange={this._handleSelectChange}
                      />
                      {errors.industry && touched.industry && (
                        <Label basic color="red" pointing content={errors.industry} />
                      )}
                    </Form.Field>
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Form.Field>
                      <Form.TextArea
                        label="What Products/Services do they provide?"
                        name="productsServices"
                        autoComplete="productsServices"
                        value={values.productsServices}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onKeyDown={this._handleChangeTextArea}
                      />
                      {errors.productsServices && touched.productsServices && (
                        <Label basic color="red" pointing content={errors.productsServices} />
                      )}
                    </Form.Field>
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Form.Field>
                      <Form.Select
                        label="M/Y Business Commenced"
                        options={businessCommencedOptions}
                        name="businessCommenced"
                        autoComplete="businessCommenced"
                        value={values.businessCommenced}
                        onChange={this._handleSelectChange}
                      />
                      {errors.businessCommenced && touched.businessCommenced && (
                        <Label basic color="red" pointing content={errors.businessCommenced} />
                      )}
                    </Form.Field>
                    <Form.Field>
                      <Form.Select
                        label="M/Y With Current Owner"
                        options={currentOwnerOptions}
                        name="currentOwner"
                        autoComplete="currentOwner"
                        value={values.currentOwner}
                        onChange={this._handleSelectChange}
                      />
                      {errors.currentOwner && touched.currentOwner && (
                        <Label basic color="red" pointing content={errors.currentOwner} />
                      )}
                    </Form.Field>
                    <Form.Field style={{ marginTop: '30px' }} width={2}>
                      <Form.Checkbox label="Same" name="same" onChange={this._copyCheckBox} checked={values.same} />
                    </Form.Field>
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Form.Field>
                      <Form.Input
                        label="Trading Hours"
                        name="tradingHours"
                        autoComplete="tradingHours"
                        value={values.tradingHours}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.tradingHours && touched.tradingHours && (
                        <Label basic color="red" pointing content={errors.tradingHours} />
                      )}
                    </Form.Field>
                    <Form.Field>
                      <Form.Input
                        label="No. Of Business Locations"
                        name="nOfBusinessLocations"
                        autoComplete="nOfBusinessLocations"
                        value={values.nOfBusinessLocations}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.nOfBusinessLocations && touched.nOfBusinessLocations && (
                        <Label basic color="red" pointing content={errors.nOfBusinessLocations} />
                      )}
                    </Form.Field>
                  </Form.Group>
                  <Form.Group>
                    <Form.Field>
                      <Form.Checkbox
                        label="Please confirm that you have completed the above information"
                        name="confirmAbout"
                        onChange={this._handleChangeCheckBox}
                        checked={values.confirmAbout}
                        onClick={() => this.props.confirmsCompleteSteps('confirmAbout', !values.confirmAbout)}
                        disabled={
                          values.businessType === '' ||
                          values.industry === '' ||
                          values.productsServices === '' ||
                          values.businessCommenced === '' ||
                          values.currentOwner === '' ||
                          values.tradingHours === '' ||
                          parseInt(values.nOfBusinessLocations) === 0 ||
                          values.nOfBusinessLocations === ''
                        }
                      />
                    </Form.Field>
                  </Form.Group>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment style={{ backgroundColor: '#daf3e4' }}>
                  <Header as="h3" textAlign="center" color="blue">
                    Customers and Suppliers
                  </Header>
                  <CustomersSuppliersForm {...this.props} />
                  <Form.Group>
                    <Form.Field>
                      <Form.Checkbox
                        label="Please confirm that you have completed the above information"
                        name="confirmCustomersSuppliers"
                        onChange={this._handleChangeCheckBox}
                        checked={values.confirmCustomersSuppliers}
                        onClick={() =>
                          this.props.confirmsCompleteSteps(
                            'confirmCustomersSuppliers',
                            !values.confirmCustomersSuppliers
                          )
                        }
                        disabled={
                          values.descriptionCustomers === '' ||
                          values.client5TO === '' ||
                          values.descriptionSuppliers === ''
                        }
                      />
                    </Form.Field>
                  </Form.Group>
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Segment style={{ marginLeft: '-15px', backgroundColor: '#daf3e4' }}>
                  <Header as="h3" textAlign="center" color="blue">
                    Premises and Employees
                  </Header>
                  <PremisesAndEmployeesForm {...this.props} />
                  <Form.Group>
                    <Form.Field>
                      <Form.Checkbox
                        label="Please confirm that you have completed the above information"
                        name="confirmPremisesEnployees"
                        onChange={this._handleChangeCheckBox}
                        checked={values.confirmPremisesEnployees}
                        onClick={() =>
                          this.props.confirmsCompleteSteps('confirmPremisesEnployees', !values.confirmPremisesEnployees)
                        }
                        disabled={
                          values.premisesOwnedRented === '' ||
                          values.premisesNotes === '' ||
                          values.fullTime === '' ||
                          values.partTime === '' ||
                          values.subContractors === '' ||
                          values.casuals === ''
                        }
                      />
                    </Form.Field>
                  </Form.Group>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment style={{ backgroundColor: '#008eff26' }}>
                  <Header as="h3" textAlign="center" color="blue">
                    Ownership and Final Notes
                  </Header>
                  <OwnershipAndFinalNotesForm {...this.props} />
                  <Form.Group>
                    <Form.Field>
                      <Form.Checkbox
                        label="Please confirm that you have completed the above information"
                        name="confirmOwnershipFinalNotes"
                        onChange={this._handleChangeCheckBox}
                        checked={values.confirmOwnershipFinalNotes}
                        onClick={() =>
                          this.props.confirmsCompleteSteps(
                            'confirmOwnershipFinalNotes',
                            !values.confirmOwnershipFinalNotes
                          )
                        }
                        disabled={
                          parseInt(values.numberOwners) === 0 ||
                          values.numberOwners === '' ||
                          values.owners1sHours === ''
                        }
                      />
                    </Form.Field>
                  </Form.Group>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </Wrapper>
    )
  }
}

AboutPage.propTypes = {
  values: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  errors: PropTypes.object,
  touched: PropTypes.object,
  setFieldValue: PropTypes.func,
  isSubmitting: PropTypes.bool,
  isValid: PropTypes.bool,
  business: PropTypes.object,
  typeOptions: PropTypes.array,
  openModal: PropTypes.func,
  appraisalObject: PropTypes.object,
  updateAppraisal: PropTypes.func,
  confirmsCompleteSteps: PropTypes.func,
  updateBusiness: PropTypes.func
}

const mapPropsToValues = props => ({
  business_id: props.business ? props.business.id : '',
  id: props.appraisalObject ? props.appraisalObject.id : '',
  typeId: props.business ? props.business.typeId : '',
  industry: props.business ? props.business.industry : '',
  productsServices: props.appraisalObject ? props.appraisalObject.productsServices : '',
  businessCommenced: props.appraisalObject ? props.appraisalObject.businessCommenced : '',
  currentOwner: props.appraisalObject ? props.appraisalObject.currentOwner : '',
  tradingHours: props.appraisalObject ? props.appraisalObject.tradingHours : '',
  nOfBusinessLocations: props.appraisalObject ? props.appraisalObject.nOfBusinessLocations : 0,
  confirmAbout: props.appraisalObject ? props.appraisalObject.confirmAbout : false,
  /* CustomersSuppliersForm */
  descriptionCustomers: props.appraisalObject ? props.appraisalObject.descriptionCustomers : '',
  clientDatabaseAvailable: props.appraisalObject ? props.appraisalObject.clientDatabaseAvailable : false,
  client10TO: props.appraisalObject ? props.appraisalObject.client10TO : false,
  descriptionClient10TO: props.appraisalObject ? props.appraisalObject.descriptionClient10TO : '',

  client5TO: props.appraisalObject ? props.appraisalObject.client5TO : '',
  descriptionSuppliers: props.appraisalObject ? props.appraisalObject.descriptionSuppliers : '',
  confirmCustomersSuppliers: props.appraisalObject ? props.appraisalObject.confirmCustomersSuppliers : false,
  /* PremisesAndEmployeesForm */
  premisesOwnedRented: props.appraisalObject ? props.appraisalObject.premisesOwnedRented : '',
  rentCost: props.appraisalObject ? props.appraisalObject.rentCost : 0,
  timeRemLease: props.appraisalObject ? props.appraisalObject.timeRemLease : 0,
  premisesNotes: props.appraisalObject ? props.appraisalObject.premisesNotes : '',
  fullTime: props.appraisalObject ? props.appraisalObject.fullTime : 0,
  partTime: props.appraisalObject ? props.appraisalObject.partTime : 0,
  subContractors: props.appraisalObject ? props.appraisalObject.subContractors : 0,
  casuals: props.appraisalObject ? props.appraisalObject.casuals : 0,
  confirmPremisesEnployees: props.appraisalObject ? props.appraisalObject.confirmPremisesEnployees : false,
  /* OwnershipAndFinalNotesForm */
  numberOwners: props.appraisalObject ? props.appraisalObject.numberOwners : 0,
  owners1sHours: props.appraisalObject ? props.appraisalObject.owners1sHours : '',
  owners1sRole: props.appraisalObject ? props.appraisalObject.owners1sRole : '',
  otherOwnersHours: props.appraisalObject ? props.appraisalObject.otherOwnersHours : '',
  otherOwnersRole: props.appraisalObject ? props.appraisalObject.otherOwnersRole : '',
  otherRelevantNotes: props.appraisalObject ? props.appraisalObject.otherRelevantNotes : '',
  confirmOwnershipFinalNotes: props.appraisalObject ? props.appraisalObject.confirmOwnershipFinalNotes : false
})

const mapStateToProps = state => {
  return {
    typeOptions: state.business.get.typeOptions
  }
}

const validationSchema = Yup.object().shape({
  businessType: Yup.string().required('Business Type is required'),
  industry: Yup.string().required('Business Industry is required'),
  businessCommenced: Yup.string().required('Business Commenced is required'),
  currentOwner: Yup.string().required('Current Owner is required'),
  productsServices: Yup.string()
    .required('This field is required.')
    .max(150, 'This field require max 150 characters.'),
  tradingHours: Yup.string().required('Trading Hours is required.'),
  nOfBusinessLocations: Yup.number().typeError('You must type only numbers here!'),
  /* CustomersSuppliersForm */
  descriptionCustomers: Yup.string()
    .required('Description & Customers is required')
    .max(150, 'This field require max 150 characters.'),
  client5TO: Yup.string().required('Largest 5 clients % of T/O is required'),
  descriptionSuppliers: Yup.string()
    .required('Description of Suppliers is required.')
    .max(150, 'Description of Suppliers require max 150 characters.'),
  /* PremisesAndEmployeesForm */
  premisesOwnedRented: Yup.string().required('Premises Owned or Rented is required'),
  premisesNotes: Yup.string()
    .required('Premises Notes is required')
    .max(150, 'Premises Notes require max 150 characters.'),
  fullTime: Yup.number().typeError('You must type only numbers.'),
  partTime: Yup.number().typeError('You must type only numbers.'),
  subContractors: Yup.number().typeError('You must type only numbers.'),
  casuals: Yup.number().typeError('You must type only numbers.'),
  /* OwnershipAndFinalNotesForm */
  numberOwners: Yup.number()
    .required('Number of Owners is required')
    .typeError('You must type only numbers.'),
  owners1sHours: Yup.string().required('Owner 1`s Hours is required'),
  owners1sRole: Yup.string()
    .required('Owner 1`s Role is required')
    .max(75, 'Owner 1`s Role require max 75 characters.'),
  otherOwnersHours: Yup.string().required('Other Owners` Hours is required'),
  otherOwnersRole: Yup.string()
    .required('Other Owners` Role is required')
    .max(75, 'Other Owners` Role require max 75 characters.'),
  otherRelevantNotes: Yup.string()
    .required('Other Relevant Notes is required')
    .max(75, 'Other Relevant Notes require max 75 characters.')
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ openModal, updateAppraisal, updateBusiness }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues,
    validationSchema,
    enableReinitialize: true
  })(AboutPage)
)

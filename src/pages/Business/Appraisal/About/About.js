import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Form, Label, Message, Step, Grid, Header, Segment, Icon } from 'semantic-ui-react'
import * as Yup from 'yup'
import Wrapper from '../../../../components/content/Wrapper'
import { updateAppraisal } from '../../../../redux/ducks/appraisal'
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

  render () {
    const { values, handleChange, handleBlur, errors, touched, typeOptions, industryOptions } = this.props
    const { businessCommencedOptions, currentOwnerOptions } = this.state
    return (
      <Wrapper>
        <Step.Group size="large">
          <Step active icon="pencil alternate" title="Step 2" description="About This Business" />
          <Message info size="large">
            <p>
              The information you enter on this page will be used on the `About This Business` page of the appraisal.
              Though it won`t be used in any specific calculations it is important to complete in full as it will
              demonstrate to the vendor that care has been taken in assessing their business. A number of these fields
              will also update fields on the business database and our agents may use parts of it in the Sales
              Memorandum. Anything not entered will be left as blank.
            </p>
          </Message>
        </Step.Group>
        <Form>
          <Grid celled="internally" divided>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Segment style={{ marginLeft: '-15px', backgroundColor: 'aliceblue' }}>
                  <Form.Group widths="equal">
                    <Form.Field>
                      <Form.Select
                        label="Business Type"
                        options={typeOptions}
                        name="businessType"
                        autoComplete="businessType"
                        value={values.businessType}
                        onChange={this._handleSelectChange}
                      />
                      {errors.businessType &&
                        touched.businessType && <Label basic color="red" pointing content={errors.businessType} />}
                    </Form.Field>
                    <Form.Field width={1}>
                      <Icon
                        style={{ marginTop: '27px', marginLeft: '-10px' }}
                        name="add"
                        color="green"
                        inverted
                        circular
                        link
                        onClick={() => this._newBusinessRegister(5)}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Form.Select
                        label="Business Industry"
                        options={industryOptions}
                        name="businessIndustry"
                        autoComplete="businessIndustry"
                        value={values.businessIndustry}
                        onChange={this._handleSelectChange}
                      />
                      {errors.businessIndustry &&
                        touched.businessIndustry && (
                        <Label basic color="red" pointing content={errors.businessIndustry} />
                      )}
                    </Form.Field>
                    <Form.Field width={1}>
                      <Icon
                        style={{ marginTop: '27px', marginLeft: '-10px' }}
                        name="add"
                        color="green"
                        inverted
                        circular
                        link
                        onClick={() => this._newBusinessRegister(4)}
                      />
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
                      />
                      {errors.productsServices &&
                        touched.productsServices && (
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
                      {errors.businessCommenced &&
                        touched.businessCommenced && (
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
                      {errors.currentOwner &&
                        touched.currentOwner && <Label basic color="red" pointing content={errors.currentOwner} />}
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
                      {errors.tradingHours &&
                        touched.tradingHours && <Label basic color="red" pointing content={errors.tradingHours} />}
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
                      {errors.nOfBusinessLocations &&
                        touched.nOfBusinessLocations && (
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
                          values.businessIndustry === '' ||
                          values.productsServices === '' ||
                          values.businessCommenced === '' ||
                          values.currentOwner === '' ||
                          parseInt(values.tradingHours) === 0 ||
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
                <Segment style={{ backgroundColor: 'linen' }}>
                  <Header as="h3" textAlign="center" color="blue">
                    Customers and Suppliers
                  </Header>
                  <CustomersSuppliersForm {...this.props} confirmsCompleteSteps={this.updateCompleteSteps} />
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Segment style={{ marginLeft: '-15px', backgroundColor: 'linen' }}>
                  <Header as="h3" textAlign="center" color="blue">
                    Premises and Employees
                  </Header>
                  <PremisesAndEmployeesForm {...this.props} />
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment style={{ backgroundColor: 'aliceblue' }}>
                  <Header as="h3" textAlign="center" color="blue">
                    Ownership and Final Notes
                  </Header>
                  <OwnershipAndFinalNotesForm {...this.props} />
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
  industryOptions: PropTypes.array,
  openModal: PropTypes.func,
  appraisalObject: PropTypes.object,
  updateAppraisal: PropTypes.func,
  confirmsCompleteSteps: PropTypes.func
}

const mapPropsToValues = props => ({
  business_id: props.business ? props.business.id : '',
  id: props.appraisalObject ? props.appraisalObject.id : '',
  businessType: props.business ? props.business.typeId : '',
  businessIndustry: props.business ? props.business.industryId : '',
  productsServices: props.appraisalObject ? props.appraisalObject.productsServices : '',
  businessCommenced: props.appraisalObject ? props.appraisalObject.businessCommenced : '',
  currentOwner: props.appraisalObject ? props.appraisalObject.currentOwner : '',
  tradingHours: props.appraisalObject ? props.appraisalObject.tradingHours : 0,
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
    typeOptions: state.business.get.typeOptions,
    industryOptions: state.business.get.industryOptions
  }
}

const validationSchema = Yup.object().shape({
  businessType: Yup.string().required('Business Type is required'),
  businessIndustry: Yup.string().required('Business Industry is required'),
  businessCommenced: Yup.string().required('Business Commenced is required'),
  currentOwner: Yup.string().required('Current Owner is required'),
  productsServices: Yup.string()
    .required('This field is required.')
    .max(130, 'This field require max 130 characters.'),
  tradingHours: Yup.number().typeError('You must type only numbers here!'),
  nOfBusinessLocations: Yup.number().typeError('You must type only numbers here!'),
  /* CustomersSuppliersForm */
  descriptionCustomers: Yup.string().required('Description & Customers is required'),
  client5TO: Yup.string().required('Largest 5 clients % of T/O is required'),
  descriptionSuppliers: Yup.string()
    .required('Description of Suppliers is required.')
    .max(130, 'Description of Suppliers require max 130 characters.'),
  /* PremisesAndEmployeesForm */
  premisesOwnedRented: Yup.string().required('Premises Owned or Rented is required'),
  premisesNotes: Yup.string().required('Premises Notes is required'),
  fullTime: Yup.number().typeError('You must type only numbers.'),
  partTime: Yup.number().typeError('You must type only numbers.'),
  subContractors: Yup.number().typeError('You must type only numbers.'),
  casuals: Yup.number().typeError('You must type only numbers.'),
  /* OwnershipAndFinalNotesForm */
  numberOwners: Yup.number()
    .required('Number of Owners is required')
    .typeError('You must type only numbers.'),
  owners1sHours: Yup.string().required('Owner 1`s Hours is required'),
  owners1sRole: Yup.string().required('Owner 1`s Role is required'),
  otherOwnersHours: Yup.string().required('Other Owners` Hours is required'),
  otherOwnersRole: Yup.string().required('Other Owners` Role is required'),
  otherRelevantNotes: Yup.string().required('Other Relevant Notes is required')
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ openModal, updateAppraisal }, dispatch)
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

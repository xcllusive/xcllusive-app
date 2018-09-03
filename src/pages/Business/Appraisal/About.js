import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import {
  Form,
  Label,
  Message,
  Step,
  Grid,
  Header,
  Segment,
  Icon
} from 'semantic-ui-react'
import * as Yup from 'yup'
import Wrapper from '../../../components/content/Wrapper'
import { getBusiness } from '../../../redux/ducks/business'
import { TypesModal, openModal } from '../../../redux/ducks/modal'
import { BusinessCommencedOptions } from '../../../constants/BusinessCommencedOptions'
import CustomersSuppliersForm from '../../../components/forms/CustomersSuppliersForm'

class AboutPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      businessCommencedOptions: BusinessCommencedOptions,
      currentOwnerOptions: BusinessCommencedOptions,
      premisesOwnedRentedOptions: [
        { key: '1', text: 'Rented', value: 'Rented' },
        { key: '2', text: 'Owned', value: 'Owned' },
        { key: '3', text: 'Other', value: 'Other' }
      ],
      owners1sHoursOptions: [
        { key: '1', text: '< 5 days', value: '< 5 days' },
        { key: '2', text: '5 days', value: '5 days' },
        { key: '3', text: '6 days', value: '6 days' },
        { key: '4', text: '7 days', value: '7 days' },
        { key: '5', text: 'Under Management', value: 'Under Management' }
      ]
    }
  }

  componentDidMount () {
    this.props.getBusiness(this.props.business.id)
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
    this.props.setFieldValue(
      'currentOwner',
      this.props.values.businessCommenced
    )
  }

  render () {
    const {
      values,
      handleChange,
      handleBlur,
      errors,
      touched,
      typeOptions,
      industryOptions,
      // isSubmitting,
      isValid
    } = this.props
    const {
      businessCommencedOptions,
      currentOwnerOptions,
      premisesOwnedRentedOptions,
      owners1sHoursOptions
    } = this.state
    return (
      <Wrapper>
        <Step.Group size="large">
          <Step
            active
            icon="pencil alternate"
            title="Step 2"
            description="About This Business"
          />
        </Step.Group>
        <Message info size="large">
          <p>
            The information you enter on this page will be used on the `About
            This Business` page of the appraisal. Though it won`t be used in any
            specific calculations it is important to complete in full as it will
            demonstrate to the vendor that care has been taken in assessing
            their business. A number of these fields will also update fields on
            the business database and our agents may use parts of it in the
            Sales Memorandum. Anything not entered will be left as blank.
          </p>
        </Message>
        <Form>
          <Grid celled="internally" divided>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Segment style={{ marginLeft: '-15px' }}>
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
                        touched.businessType && (
                        <Label
                          basic
                          color="red"
                          pointing
                          content={errors.businessType}
                        />
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
                        <Label
                          basic
                          color="red"
                          pointing
                          content={errors.businessIndustry}
                        />
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
                        <Label
                          basic
                          color="red"
                          pointing
                          content={errors.productsServices}
                        />
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
                        <Label
                          basic
                          color="red"
                          pointing
                          content={errors.businessCommenced}
                        />
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
                        touched.currentOwner && (
                        <Label
                          basic
                          color="red"
                          pointing
                          content={errors.currentOwner}
                        />
                      )}
                    </Form.Field>
                    <Form.Field style={{ marginTop: '30px' }} width={2}>
                      <Form.Checkbox
                        label="Same"
                        name="same"
                        onChange={this._copyCheckBox}
                        checked={values.same}
                      />
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
                        touched.tradingHours && (
                        <Label
                          basic
                          color="red"
                          pointing
                          content={errors.tradingHours}
                        />
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
                      {errors.nOfBusinessLocations &&
                        touched.nOfBusinessLocations && (
                        <Label
                          basic
                          color="red"
                          pointing
                          content={errors.nOfBusinessLocations}
                        />
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
                        disabled={!isValid}
                      />
                    </Form.Field>
                  </Form.Group>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment>
                  <Header as="h3" textAlign="center" color="blue">
                    Customers and Suppliers
                  </Header>
                  <CustomersSuppliersForm />
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Segment style={{ marginLeft: '-15px' }}>
                  <Header as="h3" textAlign="center" color="blue">
                    Premises and Employees
                  </Header>
                  <Form.Group>
                    <Form.Field width={6}>
                      <Form.Select
                        label="Premises Owned or Rented"
                        options={premisesOwnedRentedOptions}
                        name="premisesOwnedRented"
                        autoComplete="premisesOwnedRented"
                        value={values.premisesOwnedRented}
                        onChange={this._handleSelectChange}
                      />
                      {errors.premisesOwnedRented &&
                        touched.premisesOwnedRented && (
                        <Label
                          basic
                          color="red"
                          pointing
                          content={errors.premisesOwnedRented}
                        />
                      )}
                    </Form.Field>
                    {this.props.values.premisesOwnedRented === 'Rented' ? (
                      <Fragment>
                        <Form.Field width={5}>
                          <Form.Input
                            label="Rent Cost"
                            name="rentCost"
                            autoComplete="rentCost"
                            value={values.rentCost}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.rentCost &&
                            touched.rentCost && (
                            <Label
                              basic
                              color="red"
                              pointing
                              content={errors.rentCost}
                            />
                          )}
                        </Form.Field>
                        <Form.Field width={5}>
                          <Form.Input
                            label="Time remaining on Lease"
                            name="timeRemLease"
                            autoComplete="timeRemLease"
                            value={values.timeRemLease}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.timeRemLease &&
                            touched.timeRemLease && (
                            <Label
                              basic
                              color="red"
                              pointing
                              content={errors.timeRemLease}
                            />
                          )}
                        </Form.Field>
                      </Fragment>
                    ) : null}
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Form.Field>
                      <Form.TextArea
                        label="Premises Notes"
                        name="premisesNotes"
                        autoComplete="premisesNotes"
                        value={values.premisesNotes}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.premisesNotes &&
                        touched.premisesNotes && (
                        <Label
                          basic
                          color="red"
                          pointing
                          content={errors.premisesNotes}
                        />
                      )}
                    </Form.Field>
                  </Form.Group>
                  <Form.Group>
                    <h4>Number of Employees (Not including Owners)</h4>
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Form.Field width={4}>
                      <Form.Input
                        label="Full Time"
                        name="fullTime"
                        autoComplete="fullTime"
                        value={values.fullTime}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.fullTime &&
                        touched.fullTime && (
                        <Label
                          basic
                          color="red"
                          pointing
                          content={errors.fullTime}
                        />
                      )}
                    </Form.Field>
                    <Form.Field width={4}>
                      <Form.Input
                        label="Part Time"
                        name="partTime"
                        autoComplete="partTime"
                        value={values.partTime}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.partTime &&
                        touched.partTime && (
                        <Label
                          basic
                          color="red"
                          pointing
                          content={errors.partTime}
                        />
                      )}
                    </Form.Field>
                    <Form.Field width={4}>
                      <Form.Input
                        label="Sub-Contractors"
                        name="subContractors"
                        autoComplete="subContractors"
                        value={values.subContractors}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.subContractors &&
                        touched.subContractors && (
                        <Label
                          basic
                          color="red"
                          pointing
                          content={errors.subContractors}
                        />
                      )}
                    </Form.Field>
                    <Form.Field width={4}>
                      <Form.Input
                        label="Casuals"
                        name="casual"
                        autoComplete="casual"
                        value={values.casual}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.casual &&
                        touched.casual && (
                        <Label
                          basic
                          color="red"
                          pointing
                          content={errors.casual}
                        />
                      )}
                    </Form.Field>
                  </Form.Group>
                  <Form.Group>
                    <Form.Field>
                      <Form.Checkbox
                        label="Please confirm that you have completed the above information"
                        name="confirmAbout"
                        onChange={this._handleChangeCheckBox}
                        checked={values.confirmPremisesEnployees}
                        disabled={!isValid}
                      />
                    </Form.Field>
                  </Form.Group>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment>
                  <Header as="h3" textAlign="center" color="blue">
                    Ownership and Final Notes
                  </Header>
                  <Form.Group>
                    <Form.Field width={6}>
                      <Form.Input
                        label="Number of Owners"
                        name="numberOwners"
                        autoComplete="numberOwners"
                        value={values.numberOwners}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.numberOwners &&
                        touched.numberOwners && (
                        <Label
                          basic
                          color="red"
                          pointing
                          content={errors.numberOwners}
                        />
                      )}
                    </Form.Field>
                    <Form.Field width={10}>
                      <Form.Select
                        label="Owner 1's Hours"
                        options={owners1sHoursOptions}
                        name="owners1sHours"
                        autoComplete="owners1sHours"
                        value={values.owners1sHours}
                        onChange={this._handleSelectChange}
                      />
                      {errors.owners1sHours &&
                        touched.owners1sHours && (
                        <Label
                          basic
                          color="red"
                          pointing
                          content={errors.owners1sHours}
                        />
                      )}
                    </Form.Field>
                  </Form.Group>
                  <Form.Group>
                    <Form.Field width={10}>
                      <Form.TextArea
                        label="Owner 1's Role"
                        name="owners1sRole"
                        autoComplete="owners1sRole"
                        value={values.owners1sRole}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.owners1sRole &&
                        touched.owners1sRole && (
                        <Label
                          basic
                          color="red"
                          pointing
                          content={errors.owners1sRole}
                        />
                      )}
                    </Form.Field>
                    <Form.Field width={6}>
                      <Form.Select
                        label="Other Owners' Hours"
                        options={owners1sHoursOptions}
                        name="otherOwnersHours"
                        autoComplete="otherOwnersHours"
                        value={values.otherOwnersHours}
                        onChange={this._handleSelectChange}
                      />
                      {errors.otherOwnersHours &&
                        touched.otherOwnersHours && (
                        <Label
                          basic
                          color="red"
                          pointing
                          content={errors.otherOwnersHours}
                        />
                      )}
                    </Form.Field>
                  </Form.Group>
                  <Form.Group>
                    <Form.Field width={10}>
                      <Form.TextArea
                        label="Other Owners' Role"
                        name="otherOwnersRole"
                        autoComplete="otherOwnersRole"
                        value={values.otherOwnersRole}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.otherOwnersRole &&
                        touched.otherOwnersRole && (
                        <Label
                          basic
                          color="red"
                          pointing
                          content={errors.otherOwnersRole}
                        />
                      )}
                    </Form.Field>
                    <Form.Field width={10}>
                      <Form.TextArea
                        label="Other Relevant Notes"
                        name="otherRelevantNotes"
                        autoComplete="otherRelevantNotes"
                        value={values.otherRelevantNotes}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.otherRelevantNotes &&
                        touched.otherRelevantNotes && (
                        <Label
                          basic
                          color="red"
                          pointing
                          content={errors.otherRelevantNotes}
                        />
                      )}
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
  industryOptions: PropTypes.array,
  getBusiness: PropTypes.func,
  openModal: PropTypes.func
}

const mapPropsToValues = props => ({
  tradingHours: 0,
  nOfBusinessLocations: 0
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
  tradingHours: Yup.number().typeError('You must type only number here!'),
  nOfBusinessLocations: Yup.number().typeError(
    'You must type only number here!'
  )
})

const handleSubmit = (values, { props, setSubmitting }) => {
  props.updateBusiness(values).then(setSubmitting(false))
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getBusiness, openModal }, dispatch)
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
  })(AboutPage)
)

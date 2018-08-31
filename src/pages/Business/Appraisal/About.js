import React, { Component } from 'react'
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
import { BusinessCommencedOptions } from '../../../constants/BusinessCommencedOptions'

class AboutPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      businessCommencedOptions: BusinessCommencedOptions,
      currentOwnerOptions: BusinessCommencedOptions
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

  render () {
    const {
      values,
      handleChange,
      handleBlur,
      errors,
      touched,
      typeOptions,
      industryOptions
    } = this.props
    const { businessCommencedOptions, currentOwnerOptions } = this.state
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
                        onClick={() =>
                          window.open('https://abr.business.gov.au/')
                        }
                      />
                    </Form.Field>
                    <Form.Field>
                      <Form.Select
                        label="Industry"
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
                        onClick={() =>
                          window.open('https://abr.business.gov.au/')
                        }
                      />
                    </Form.Field>
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Form.Field>
                      <Form.TextArea
                        label="What Products/Services do they provide?"
                        name="description"
                        autoComplete="description"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.description &&
                        touched.description && (
                        <Label
                          basic
                          color="red"
                          pointing
                          content={errors.description}
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
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Form.Field>
                      <Form.Input
                        required
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
                        required
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
                  <Form.Group widths="equal">
                    <Form.Field>
                      <Form.TextArea
                        label="What Products/Services do they provide?"
                        name="description"
                        autoComplete="description"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.description &&
                        touched.description && (
                        <Label
                          basic
                          color="red"
                          pointing
                          content={errors.description}
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
  getBusiness: PropTypes.func
}

const mapPropsToValues = props => ({
  businessName: props.business ? props.business.businessName : '',
  businessABN: props.business ? props.business.businessABN : '',
  firstNameV: props.business ? props.business.firstNameV : '',
  lastNameV: props.business ? props.business.lastNameV : '',
  address1: props.business ? props.business.address1 : '',
  suburb: props.business ? props.business.suburb : '',
  state: props.business ? props.business.state : '',
  postCode: props.business ? props.business.postCode : '',
  confirmBusinessDetail: false
})

const mapStateToProps = state => {
  return {
    typeOptions: state.business.get.typeOptions,
    industryOptions: state.business.get.industryOptions
  }
}

const validationSchema = Yup.object().shape({
  businessName: Yup.string()
    .required('Business name is required.')
    .max(120, 'Business name require max 120 characters.'),
  firstNameV: Yup.string()
    .required('First name is required.')
    .max(40, 'First name require max 40 characters.'),
  lastNameV: Yup.string()
    .required('Last name is required.')
    .max(40, 'Last name require max 40 characters.'),
  vendorEmail: Yup.string()
    .email('Invalid email address.')
    .required('Email is required.'),
  businessABN: Yup.string()
    .min(11, 'ABN require min 11 integers.')
    .max(11, 'ABN require max 11 integers.'),
  address1: Yup.string().max(100, 'Street require max 100 characters.'),
  suburb: Yup.string().max(100, 'Suburb require max 100 characters.'),
  postCode: Yup.string()
    .min(4, 'Post Code require min 4 integers.')
    .max(4, 'Post Code require max 4 integers.')
})

const handleSubmit = (values, { props, setSubmitting }) => {
  props.updateBusiness(values).then(setSubmitting(false))
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getBusiness }, dispatch)
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

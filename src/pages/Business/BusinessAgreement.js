import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import 'react-datepicker/dist/react-datepicker.css'
import { withFormik } from 'formik'
import * as Yup from 'yup'

import { Form, Header, Grid, Segment, Label } from 'semantic-ui-react'

import { getBusiness } from '../../redux/ducks/business'
import { getAgreementTemplate } from '../../redux/ducks/agreementTemplates'

import ContractFields from '../../components/content/Agreement/ContractFields'
import OptionIntroductionBuyer from '../../components/content/Agreement/OptionIntroductionBuyer'
import PropertyOption from '../../components/content/Agreement/PropertyOption'

import Wrapper from '../../components/content/Wrapper'

class BusinessAgreement extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  componentDidMount () {
    this.props.getBusiness(this.props.match.params.id)
    this.props.getAgreementTemplate(this.props.match.params.idAgreement)
  }

  render () {
    const {
      objectAgreementTemplate,
      values,
      handleBlur,
      handleChange,
      errors,
      touched
    } = this.props
    return (
      <Wrapper>
        <Grid celled="internally" divided>
          {objectAgreementTemplate ? (
            <Header
              style={{ paddingTop: '1rem' }}
              as="h2"
              content={`${objectAgreementTemplate.title}`}
            />
          ) : null}
          <Grid.Row>
            <Grid.Column>
              <Header as="h3" content="Business Details" />
              <Segment>
                <Form>
                  <Form.Group widths="equal">
                    <Form.Input
                      label="First Name"
                      name="firstName"
                      autoComplete="firstNameV"
                      value={values.firstNameV}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.firstNameV &&
                      touched.firstNameV && (
                      <Label
                        basic
                        pointing
                        color="red"
                        content={errors.firstNameV}
                      />
                    )}
                    <Form.Input
                      label="Last Name"
                      name="lastNameV"
                      autoComplete="lastNameV"
                      value={values.lastNameV}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.lastNameV &&
                      touched.lastNameV && (
                      <Label
                        basic
                        pointing
                        color="red"
                        content={errors.lastNameV}
                      />
                    )}
                    <Form.Input
                      label="Phone"
                      name="vendorPhone1"
                      autoComplete="vendorPhone1"
                      value={values.vendorPhone1}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.vendorPhone1 &&
                      touched.vendorPhone1 && (
                      <Label
                        basic
                        pointing
                        color="red"
                        content={errors.vendorPhone1}
                      />
                    )}
                    <Form.Input
                      label="ABN/ACN"
                      name="businessABN"
                      autoComplete="businessABN"
                      value={values.businessABN}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.businessABN &&
                      touched.businessABN && (
                      <Label
                        basic
                        pointing
                        color="red"
                        content={errors.businessABN}
                      />
                    )}
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Form.Input
                      label="Address"
                      name="address"
                      autoComplete="address"
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.address &&
                      touched.address && (
                      <Label
                        basic
                        pointing
                        color="red"
                        content={errors.address}
                      />
                    )}
                    <Form.Input
                      label="For sale of the businesses known as"
                      // value={this.props.buyer.surname}
                    />
                    <Form.Input
                      label="Conducted at"
                      // value={this.props.buyer.surname}
                    />
                  </Form.Group>
                </Form>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Header as="h3" content="Contract Fields" />
              <ContractFields
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
                errors={errors}
                touched={touched}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Header
                as="h3"
                content="Option For Principal Introduction Of Buyer"
              />
              <OptionIntroductionBuyer
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
                errors={errors}
                touched={touched}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Header as="h3" content="Property Option" />
              <PropertyOption
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
                errors={errors}
                touched={touched}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Wrapper>
    )
  }
}

BusinessAgreement.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  buyer: PropTypes.object,
  getBusiness: PropTypes.func,
  objectBusiness: PropTypes.object,
  values: PropTypes.object,
  getAgreementTemplate: PropTypes.func,
  objectAgreementTemplate: PropTypes.object,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  errors: PropTypes.object,
  touched: PropTypes.object
}

const validationSchema = Yup.object().shape({
  firstNameV: Yup.string().required('First Name is required!'),
  LastNameV: Yup.string().required('Last Name is required!'),
  vendorPhone1: Yup.string().required('Phone is required!'),
  businessABN: Yup.string().required('ABN/ACN is required!'),
  Address: Yup.string().required('Address is required!'),
  listedPrice: Yup.number().required('Listed Price is required!'),
  appraisalHigh: Yup.number().required('Appraisal High is required!'),
  appraisalLow: Yup.number().required('Appraisal Low is required!'),
  engagementFee: Yup.number().required('Engagement Fee is required!'),
  comissionPerc: Yup.number().required('Comission Perc is required!'),
  commissionDiscount: Yup.number().required('Comission Discount is required!'),
  introductionParties: Yup.string()
    .required('Comission Perc is required!')
    .max(300, 'Sorry! you have exceed the area limit of this field.'),
  commissionProperty: Yup.number().required('Comission is required!'),
  addressProperty: Yup.string()
    .required('Address is required!')
    .max(300, 'Sorry! you have exceed the area limit of this field.'),
  priceProperty: Yup.number().required('Price is required!')
})

const mapPropsToValues = props => {
  if (props && props.objectAgreementTemplate && props.objectBusiness) {
    return {
      firstNameV: props.objectBusiness.firstNameV,
      lastNameV: props.objectBusiness.lastNameV,
      vendorPhone1: props.objectBusiness.vendorPhone1,
      businessABN: props.objectBusiness.businessABN,
      address: `${props.objectBusiness.address1}, ${
        props.objectBusiness.suburb
      } - ${props.objectBusiness.state}`,

      id: props.objectAgreementTemplate.id,
      listedPrice: props.objectAgreementTemplate.listedPrice.toLocaleString(),
      appraisalHigh: props.objectAgreementTemplate.appraisalHigh.toLocaleString(),
      appraisalLow: props.objectAgreementTemplate.appraisalLow.toLocaleString(),
      engagementFee: props.objectAgreementTemplate.engagementFee.toLocaleString(),
      commissionPerc: props.objectAgreementTemplate.commissionPerc.toLocaleString(),
      commissionDiscount: props.objectAgreementTemplate.commissionDiscount.toLocaleString(),
      introductionParties: props.objectAgreementTemplate.introductionParties,
      commissionProperty: props.objectAgreementTemplate.commissionProperty.toLocaleString(),
      addressProperty: props.objectAgreementTemplate.addressProperty,
      priceProperty: props.objectAgreementTemplate.priceProperty.toLocaleString(),
      propertyOptions: props.objectAgreementTemplate.propertyOptions,
      optionIntroductionBuyer:
        props.objectAgreementTemplate.optionIntroductionBuyer
    }
  }
  return {
    firstNameV: '',
    lastNameV: '',
    vendorPhone1: 0,
    businessABN: '',
    address: '',

    listedPrice: 0,
    appraisalHigh: 0,
    appraisalLow: 0,
    engagementFee: 0,
    commissionPerc: 0,
    commissionDiscount: 0,
    introductionParties: '',
    commissionProperty: 0,
    addressProperty: '',
    priceProperty: 0
  }
}

const mapStateToProps = state => ({
  objectBusiness: state.business.get.object,
  objectAgreementTemplate: state.agreementTemplates.get.object
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getBusiness,
      getAgreementTemplate
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues,
    validationSchema,
    enableReinitialize: true
  })(BusinessAgreement)
)

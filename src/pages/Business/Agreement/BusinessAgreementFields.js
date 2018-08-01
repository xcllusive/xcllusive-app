import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import numeral from 'numeral'
import 'react-datepicker/dist/react-datepicker.css'

import {
  Form,
  Header,
  Grid,
  Segment,
  Label,
  Message,
  Button,
  Icon
} from 'semantic-ui-react'

import { getBusiness } from '../../../redux/ducks/business'
import { getAgreementTemplate } from '../../../redux/ducks/agreementTemplates'

import ContractFields from '../../../components/content/Agreement/ContractFields'
import OptionIntroductionBuyer from '../../../components/content/Agreement/OptionIntroductionBuyer'
import PropertyOption from '../../../components/content/Agreement/PropertyOption'

import Wrapper from '../../../components/content/Wrapper'

class BusinessAgreementFields extends Component {
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
      touched,
      objectBusiness,
      history,
      objectAgreementIsLoading,
      objectBusinessIsLoading
    } = this.props
    return (
      <Wrapper loading={objectBusinessIsLoading || objectAgreementIsLoading}>
        <Form>
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
                  <Form.Group widths="equal">
                    <Form.Input
                      label="First Name"
                      name="firstNameV"
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
            {values.optionIntroductionBuyer ? (
              <Grid.Row>
                <Grid.Column>
                  <Header
                    as="h3"
                    content="Option For Principal Introduction Of Buyer"
                  />
                  <Message info>
                    <Message.Header>
                      This section has been disabled by the office for this
                      specific agreement.
                    </Message.Header>
                    <p>
                      If you wish to use these fields in the agreement, please
                      get in contact with the office or just choose another
                      agreement template.
                    </p>
                  </Message>
                </Grid.Column>
              </Grid.Row>
            ) : (
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
            )}
            {values.propertyOptions ? (
              <Grid.Row>
                <Grid.Column>
                  <Header as="h3" content="Property Option" />
                  <Message info>
                    <Message.Header>
                      This section has been disabled by the office for this
                      specific agreement.
                    </Message.Header>
                    <p>
                      If you wish to use these fields in the agreement, please
                      get in contact with the office or just try choose
                      agreement template.
                    </p>
                  </Message>
                </Grid.Column>
              </Grid.Row>
            ) : (
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
            )}
            <Grid.Row>
              <Grid.Column>
                <Button
                  color="green"
                  onClick={() => history.push(`/business/${objectBusiness.id}`)}
                  size="small"
                  floated="left"
                >
                  <Icon name="backward" />
                  Back to Business
                </Button>
                <Button
                  color="red"
                  onClick={() =>
                    history.push(
                      `/business/${objectBusiness.id}/agreement/${
                        objectAgreementTemplate.id
                      }/preview`
                    )
                  }
                  size="small"
                  floated="right"
                >
                  <Icon name="edit" />
                  Preview Agreement
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </Wrapper>
    )
  }
}

BusinessAgreementFields.propTypes = {
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
  touched: PropTypes.object,
  objectBusinessIsLoading: PropTypes.bool,
  objectAgreementIsLoading: PropTypes.bool
}

const validationSchema = Yup.object().shape({
  firstNameV: Yup.string().required('First Name is required!'),
  lastNameV: Yup.string().required('Last Name is required!'),
  vendorPhone1: Yup.string().required('Phone is required!'),
  businessABN: Yup.string().required('ABN/ACN is required!'),
  address: Yup.string().required('Address is required!'),
  listedPrice: Yup.number('Number')
    .min(0)
    .integer()
    .required('Listed Price is required!'),
  appraisalHigh: Yup.number().required('Appraisal High is required!'),
  appraisalLow: Yup.number().required('Appraisal Low is required!'),
  engagementFee: Yup.number().required('Engagement Fee is required!'),
  commissionPerc: Yup.number().required('Commission Perc is required!'),
  commissionDiscount: Yup.number().required('Commission Discount is required!'),
  introductionParties: Yup.string()
    .required('Introduction Parties is required!')
    .max(300, 'Sorry! you have exceed the area limit of this field.'),
  commissionProperty: Yup.number().required('Comission is required!'),
  addressProperty: Yup.string()
    .required('Address is required!')
    .max(300, 'Sorry! you have exceed the area limit of this field.'),
  priceProperty: Yup.number().required('Price is required!')
})

const mapPropsToValues = props => ({
  firstNameV: props.objectBusiness.firstNameV
    ? props.objectBusiness.firstNameV
    : '',
  lastNameV: props.objectBusiness.lastNameV
    ? props.objectBusiness.lastNameV
    : '',
  vendorPhone1: props.objectBusiness.vendorPhone1
    ? props.objectBusiness.vendorPhone1
    : '',
  businessABN: props.objectBusiness.businessABN
    ? props.objectBusiness.businessABN
    : '',
  address:
    props.objectBusiness.address1 &&
    props.objectBusiness.suburb &&
    props.objectBusiness.state &&
    props.objectBusiness.postCode
      ? `${props.objectBusiness.address1} ${props.objectBusiness.suburb} ${
        props.objectBusiness.state
      } ${props.objectBusiness.postCode}`
      : '',
  id: props.objectAgreementTemplate ? props.objectAgreementTemplate.id : null,
  listedPrice: props.objectBusiness.listedPrice
    ? numeral(props.objectBusiness.listedPrice).format('0,0.00')
    : 0,
  appraisalHigh: props.objectBusiness.appraisalHigh
    ? numeral(props.objectBusiness.appraisalHigh).format('0,0.00')
    : 0,
  appraisalLow: props.objectBusiness.appraisalLow
    ? numeral(props.objectBusiness.appraisalLow).format('0,0.00')
    : 0,
  engagementFee: props.objectAgreementTemplate
    ? numeral(props.objectAgreementTemplate.engagementFee).format('0,0.00')
    : 0,
  commissionPerc: props.objectAgreementTemplate
    ? numeral(props.objectAgreementTemplate.commissionPerc).format('0,0.00')
    : 0,
  commissionDiscount: props.objectAgreementTemplate
    ? numeral(props.objectAgreementTemplate.commissionDiscount).format('0,0.00')
    : 0,
  introductionParties: props.objectAgreementTemplate
    ? props.objectAgreementTemplate.introductionParties
    : '',
  commissionProperty: props.objectAgreementTemplate
    ? numeral(props.objectAgreementTemplate.commissionProperty).format('0,0.00')
    : 0,
  addressProperty: props.objectAgreementTemplate
    ? props.objectAgreementTemplate.addressProperty
    : '',
  priceProperty: props.objectAgreementTemplate
    ? numeral(props.objectAgreementTemplate.priceProperty).format('0,0.00')
    : 0,
  propertyOptions: props.objectAgreementTemplate
    ? props.objectAgreementTemplate.propertyOptions
    : 0,
  optionIntroductionBuyer: props.objectAgreementTemplate
    ? props.objectAgreementTemplate.optionIntroductionBuyer
    : 0
})

const mapStateToProps = state => ({
  objectBusiness: state.business.get.object,
  objectBusinessIsLoading: state.business.get.isLoading,
  objectAgreementTemplate: state.agreementTemplates.get.object,
  objectAgreementIsLoading: state.agreementTemplates.get.isLoading
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
  })(BusinessAgreementFields)
)

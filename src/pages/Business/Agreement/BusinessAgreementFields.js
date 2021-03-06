import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import 'react-datepicker/dist/react-datepicker.css'

import { Form, Header, Grid, Segment, Label, Message, Button, Icon } from 'semantic-ui-react'

import { getBusiness, updateBusiness } from '../../../redux/ducks/business'
import { getAgreementTemplate } from '../../../redux/ducks/agreementTemplates'

import ContractFields from '../../../components/content/Agreement/ContractFields'
import OptionIntroductionBuyer from '../../../components/content/Agreement/OptionIntroductionBuyer'
import PropertyOption from '../../../components/content/Agreement/PropertyOption'

import numeral from 'numeral'

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

  _replaceDollarAndComma = replace => {
    replace = replace.replace('$', ',')
    replace = replace.replace(/,/g, '')
    return replace
  }

  _previewAgreement = async () => {
    const obj = {
      listedPrice: numeral(this.props.values.listedPrice).format('$0,0.[99]'),
      appraisalHigh: numeral(this.props.values.appraisalHigh).format('$0,0.[99]'),
      appraisalLow: numeral(this.props.values.appraisalLow).format('$0,0.[99]'),
      engagementFee: numeral(this.props.values.engagementFee).format('$0,0.[99]'),
      minimumCommission: numeral(this.props.values.minimumCommission).format('$0,0.[99]'),
      priceProperty: numeral(this.props.values.priceProperty).format('$0,0.[99]')
    }
    await Object.assign(this.props.values, obj)
    const objBusiness = {
      id: this.props.objectBusiness.id,
      listedPrice:
        this.props.values.listedPrice !== 0
          ? this._replaceDollarAndComma(this.props.values.listedPrice)
          : this.props.values.listedPrice,
      appraisalHigh:
        this.props.values.appraisalHigh !== 0
          ? this._replaceDollarAndComma(this.props.values.appraisalHigh)
          : this.props.values.appraisalHigh,
      appraisalLow:
        this.props.values.appraisalLow !== 0
          ? this._replaceDollarAndComma(this.props.values.appraisalLow)
          : this.props.values.appraisalLow,
      engagementFee:
        this.props.values.engagementFee !== 0
          ? this._replaceDollarAndComma(this.props.values.engagementFee)
          : this.props.values.engagementFee
    }
    await this.props.updateBusiness(objBusiness)
    this.props.history.push({
      pathname: `/business/${this.props.objectBusiness.id}/agreement/${this.props.objectAgreementTemplate.id}/preview`,
      state: {
        business: this.props.objectBusiness,
        values: this.props.values,
        typeAgreement: this.props.location.state.typeAgreement,
        title: this.props.objectAgreementTemplate.title
      }
    })
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
              <Header style={{ paddingTop: '1rem' }} as="h2" content={`${objectAgreementTemplate.title}`} />
            ) : null}
            <Grid.Row>
              <Grid.Column>
                <Segment style={{ backgroundColor: '#008eff26' }} size="small">
                  <Header as="h3" content="Business Details" />
                  <Form.Group widths="equal">
                    <Form.Input
                      label="Principal"
                      name="firstNameV"
                      autoComplete="firstNameV"
                      value={values.firstNameV}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.firstNameV && touched.firstNameV && (
                      <Label basic pointing color="red" content={errors.firstNameV} />
                    )}
                    <Form.Input
                      label="Address"
                      name="address"
                      autoComplete="address"
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.address && touched.address && <Label basic pointing color="red" content={errors.address} />}
                    <Form.Input
                      label="Phone"
                      name="vendorPhone1"
                      autoComplete="vendorPhone1"
                      value={values.vendorPhone1}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.vendorPhone1 && touched.vendorPhone1 && (
                      <Label basic pointing color="red" content={errors.vendorPhone1} />
                    )}
                  </Form.Group>
                  <Form.Group widths="equal">
                    {this.props.location.state.typeAgreement === 'businessAgreement' ? (
                      <Fragment>
                        <Form.Input
                          label="For sale of the businesses known as"
                          name="businessKnownAs"
                          autoComplete="businessKnownAs"
                          value={values.businessKnownAs}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.businessKnownAs && touched.businessKnownAs && (
                          <Label basic pointing color="red" content={errors.businessKnownAs} />
                        )}
                        <Form.Input
                          label="Conducted at"
                          name="conductedAt"
                          autoComplete="conductedAt"
                          value={values.conductedAt}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.conductedAt && touched.conductedAt && (
                          <Label basic pointing color="red" content={errors.conductedAt} />
                        )}
                      </Fragment>
                    ) : (
                      <Fragment>
                        <Form.Input
                          label="Property Address"
                          name="addressProperty"
                          autoComplete="addressProperty"
                          value={values.addressProperty}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={values.propertyOptions}
                        />
                        {errors.addressProperty && touched.addressProperty && (
                          <Label basic pointing color="red" content={errors.addressProperty} />
                        )}
                      </Fragment>
                    )}
                    <Form.Input
                      label="ABN/ACN"
                      name="businessABN"
                      autoComplete="businessABN"
                      value={values.businessABN}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.businessABN && touched.businessABN && (
                      <Label basic pointing color="red" content={errors.businessABN} />
                    )}
                  </Form.Group>
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <ContractFields
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  typeAgreement={this.props.location.state.typeAgreement}
                />
              </Grid.Column>
            </Grid.Row>
            {values.optionIntroductionBuyer ? (
              <Grid.Row>
                <Grid.Column>
                  <Header as="h3" content="Option For Principal Introduction Of Buyer" />
                  <Message info>
                    <Message.Header>
                      This section has been disabled by the office for this specific agreement.
                    </Message.Header>
                    <p>
                      If you wish to use these fields in the agreement, please get in contact with the office or just
                      choose another agreement template.
                    </p>
                  </Message>
                </Grid.Column>
              </Grid.Row>
            ) : (
              <Grid.Row>
                <Grid.Column>
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
            {this.props.location.state.typeAgreement === 'propertyAgreement' ? (
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
            ) : null}
            <Grid.Row>
              <Grid.Column>
                <Button
                  color="green"
                  onClick={() =>
                    history.push({
                      pathname: `/business/${objectBusiness.id}/agreementInvoice`,
                      state: {
                        business: objectBusiness
                      }
                    })
                  }
                  size="small"
                  floated="left"
                >
                  <Icon name="backward" />
                  Return
                </Button>
                <Button color="red" onClick={() => this._previewAgreement()} size="small" floated="right">
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
  objectAgreementIsLoading: PropTypes.bool,
  updateBusiness: PropTypes.func,
  location: PropTypes.object
}

const validationSchema = Yup.object().shape({
  firstNameV: Yup.string().required('First Name is required!'),
  lastNameV: Yup.string().required('Last Name is required!'),
  vendorPhone1: Yup.string().required('Phone is required!'),
  businessABN: Yup.string().required('ABN/ACN is required!'),
  address: Yup.string().required('Address is required!'),
  // businessKnownAs: Yup.string().required('Address is required!'),
  // listedPrice: Yup.number('Number')
  //   .min(0)
  //   .integer()
  //   .required('Listed Price is required!'),
  // appraisalHigh: Yup.number().required('Appraisal High is required!'),
  // appraisalLow: Yup.number().required('Appraisal Low is required!'),
  // engagementFee: Yup.number().required('Engagement Fee is required!'),
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
    ? `${props.objectBusiness.firstNameV} ${props.objectBusiness.lastNameV}`
    : '',
  vendorPhone1: props.objectBusiness.vendorPhone1 ? props.objectBusiness.vendorPhone1 : '',
  businessKnownAs: props.objectBusiness.businessKnownAs
    ? props.objectBusiness.businessKnownAs
    : props.objectBusiness.businessName,
  conductedAt: props.objectBusiness.conductedAt
    ? props.objectBusiness.conductedAt
    : `${props.objectBusiness.address1} ${props.objectBusiness.suburb} ${props.objectBusiness.state} ${
      props.objectBusiness.postCode
    }`,
  businessABN: props.objectBusiness.businessABN ? props.objectBusiness.businessABN : '',
  address:
    props.objectBusiness.address1 &&
    props.objectBusiness.suburb &&
    props.objectBusiness.state &&
    props.objectBusiness.postCode
      ? `${props.objectBusiness.address1} ${props.objectBusiness.suburb} ${props.objectBusiness.state} ${
        props.objectBusiness.postCode
      }`
      : '',
  id: props.objectAgreementTemplate ? props.objectAgreementTemplate.id : null,
  listedPrice: props.objectBusiness.listedPrice ? numeral(props.objectBusiness.listedPrice).format('$0,0.[99]') : 0,
  appraisalHigh: props.objectBusiness.appraisalHigh
    ? numeral(props.objectBusiness.appraisalHigh).format('$0,0[.]00')
    : 0,
  appraisalLow: props.objectBusiness.appraisalLow ? numeral(props.objectBusiness.appraisalLow).format('$0,0.[99]') : 0,
  engagementFee: props.objectAgreementTemplate
    ? numeral(props.objectAgreementTemplate.engagementFee).format('$0,0.[99]')
    : 0,
  minimumCommission: props.objectAgreementTemplate
    ? numeral(props.objectAgreementTemplate.minimumCommission).format('$0,0.[99]')
    : 0,
  commissionPerc:
    props.objectAgreementTemplate && props.objectAgreementTemplate.commissionPerc
      ? props.objectAgreementTemplate.commissionPerc
      : 0,
  commissionDiscount: props.objectAgreementTemplate ? props.objectAgreementTemplate.commissionDiscount : 0,
  introductionParties: props.objectAgreementTemplate ? props.objectAgreementTemplate.introductionParties : '',
  commissionProperty: props.objectAgreementTemplate ? props.objectAgreementTemplate.commissionProperty : 0,
  addressProperty:
    props.objectAgreementTemplate && props.objectAgreementTemplate.addressProperty
      ? props.objectAgreementTemplate.addressProperty
      : '',
  priceProperty: props.objectAgreementTemplate
    ? numeral(props.objectAgreementTemplate.priceProperty).format('$0,0.[99]')
    : 0,
  propertyOptions: props.objectAgreementTemplate ? props.objectAgreementTemplate.propertyOptions : 0,
  optionIntroductionBuyer: props.objectAgreementTemplate ? props.objectAgreementTemplate.optionIntroductionBuyer : 0
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
      getAgreementTemplate,
      updateBusiness
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

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import moment from 'moment'
import { TypesModal, openModal, closeModal } from '../../redux/ducks/modal'
import { Modal, Form, Label, Icon, Button, Divider, Header, Dimmer, Loader } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import numeral from 'numeral'

import {
  createBusinessSold,
  updateBusinessSold,
  finaliseStageSold,
  getBusinessSold,
  getBuyersBusinessSold
} from '../../redux/ducks/businessSold'

class StageSoldForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      financialYear: null,
      soldPrice: 0,
      stockValue: 0,
      assetValue: 0,
      workingCapitalReq: 0,
      propertyValue: 0,
      year1: 0,
      year2: 0,
      year3: 0,
      year4: 0,
      agreedWageForWorkingOwners: 0,
      agreedWageForMainOwner: 0,
      latestFullYearTotalRevenue: 0
    }
  }

  componentDidMount () {
    this._calculateFinancialYear()
    this.props.getBusinessSold(this.props.business.id)
    this.props.getBuyersBusinessSold(this.props.business.id, true)
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.businessSold && nextProps.businessSold.soldPrice !== prevState.soldPrice) {
      var soldPrice = numeral(nextProps.values.soldPrice).format('$0,0.[99]')
    }
    if (nextProps.businessSold && nextProps.businessSold.stockValue !== prevState.stockValue) {
      var stockValue = numeral(nextProps.values.stockValue).format('$0,0.[99]')
    }
    if (nextProps.businessSold && nextProps.businessSold.assetValue !== prevState.assetValue) {
      var assetValue = numeral(nextProps.values.assetValue).format('$0,0.[99]')
    }
    if (nextProps.businessSold && nextProps.businessSold.workingCapitalReq !== prevState.workingCapitalReq) {
      var workingCapitalReq = numeral(nextProps.values.workingCapitalReq).format('$0,0.[99]')
    }
    if (nextProps.businessSold && nextProps.businessSold.propertyValue !== prevState.propertyValue) {
      var propertyValue = numeral(nextProps.values.propertyValue).format('$0,0.[99]')
    }
    if (nextProps.businessSold && nextProps.businessSold.year1 !== prevState.year1) {
      var year1 = numeral(nextProps.values.year1).format('$0,0.[99]')
    }
    if (nextProps.businessSold && nextProps.businessSold.year2 !== prevState.year2) {
      var year2 = numeral(nextProps.values.year2).format('$0,0.[99]')
    }
    if (nextProps.businessSold && nextProps.businessSold.year3 !== prevState.year3) {
      var year3 = numeral(nextProps.values.year3).format('$0,0.[99]')
    }
    if (nextProps.businessSold && nextProps.businessSold.year4 !== prevState.year4) {
      var year4 = numeral(nextProps.values.year4).format('$0,0.[99]')
    }
    if (
      nextProps.businessSold &&
      nextProps.businessSold.agreedWageForWorkingOwners !== prevState.agreedWageForWorkingOwners
    ) {
      var agreedWageForWorkingOwners = numeral(nextProps.values.agreedWageForWorkingOwners).format('$0,0.[99]')
    }
    if (nextProps.businessSold && nextProps.businessSold.agreedWageForMainOwner !== prevState.agreedWageForMainOwner) {
      var agreedWageForMainOwner = numeral(nextProps.values.agreedWageForMainOwner).format('$0,0.[99]')
    }
    if (
      nextProps.businessSold &&
      nextProps.businessSold.latestFullYearTotalRevenue !== prevState.latestFullYearTotalRevenue
    ) {
      var latestFullYearTotalRevenue = numeral(nextProps.values.latestFullYearTotalRevenue).format('$0,0.[99]')
    }
    return {
      soldPrice: soldPrice || prevState.soldPrice,
      stockValue: stockValue || prevState.stockValue,
      assetValue: assetValue || prevState.assetValue,
      workingCapitalReq: workingCapitalReq || prevState.workingCapitalReq,
      propertyValue: propertyValue || prevState.propertyValue,
      year1: year1 || prevState.year1,
      year2: year2 || prevState.year2,
      year3: year3 || prevState.year3,
      year4: year4 || prevState.year4,
      agreedWageForWorkingOwners: agreedWageForWorkingOwners || prevState.agreedWageForWorkingOwners,
      agreedWageForMainOwner: agreedWageForMainOwner || prevState.agreedWageForMainOwner,
      latestFullYearTotalRevenue: latestFullYearTotalRevenue || prevState.latestFullYearTotalRevenue
    }
  }

  _handleDateChange = date => {
    this.props.setFieldValue('settlementDate', date)
  }

  _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
  }

  _handleChangeRadio = (e, { value }) => {
    this.props.setFieldValue('trend', value)
  }

  _handleConfirm = isConfirmed => {
    if (!isConfirmed) {
      this.props.closeModal()
      this.props.callBack(isConfirmed)
      if (!this.props.values.sold) {
        if (this.props.businessSold === null) this.props.createBusinessSold(this.props.values)
        else this.props.updateBusinessSold(this.props.values)
      }
      return
    }
    this._modalConfirmChangeStage()
  }

  _calculateFinancialYear = () => {
    const dateChangeFinancialYear = moment('30/06', 'DD/MM')
    const currentDayMonth = moment()
    let financialYear = null
    if (currentDayMonth > dateChangeFinancialYear) {
      financialYear = moment()
        .add(1, 'year')
        .format('YYYY')
    } else financialYear = moment().format('YYYY')

    this.setState({ financialYear })
  }

  _modalConfirmChangeStage = () => {
    this.props.openModal(TypesModal.MODAL_TYPE_CONFIRM, {
      options: {
        title: 'Changing Stage to Sold',
        text: 'Are you sure you want to change the stage to SOLD? Once you have changed you can NOT go back.'
      },
      onConfirm: async isConfirmed => {
        if (isConfirmed) {
          try {
            if (this.props.businessSold === null) {
              const createBusinessSold = await this.props.createBusinessSold(this.props.values)
              this.props.finaliseStageSold(createBusinessSold.id, this.props.business.id)
            } else {
              await this.props.updateBusinessSold(this.props.values)
              this.props.finaliseStageSold(this.props.values.id, this.props.business.id)
            }
          } catch (error) {
            console.log(error)
          }
          return
        }
        this.props.callBack(isConfirmed)
      }
    })
  }

  _numberFormat = (e, { name, value }) => {
    const myNumeral = numeral(value)
    const numberFormated = myNumeral.format('$0,0.[99]')
    this.props.setFieldValue(name, myNumeral.value())
    this.setState({ [name]: numberFormated })
  }

  _mapArrayToValuesForDropdown = array => {
    if (array && array.length > 0) {
      return array.map((item, index) => ({
        key: index,
        text: `${item.enquiry.Buyer.firstName} ${item.enquiry.Buyer.surname} - (${item.enquiry.Buyer.email})`,
        value: `${item.enquiry.Buyer.firstName} ${item.enquiry.Buyer.surname}`
      }))
    }
    return [{ key: 0, text: 'No records found', value: 0 }]
    // return null
  }

  render () {
    const {
      values,
      touched,
      errors,
      isValid,
      handleChange,
      handleBlur,
      options,
      isLoadingBusinessSold,
      listBuyersFromBusiness
    } = this.props
    return (
      <Modal open size="small" onClose={() => this._handleConfirm(false)}>
        <Modal.Header>{options.title}</Modal.Header>
        <Modal.Content style={{ paddingTop: '0px' }} scrolling>
          <Dimmer.Dimmable dimmed={isLoadingBusinessSold}>
            <Dimmer inverted active={isLoadingBusinessSold}>
              <Loader>Loading</Loader>
            </Dimmer>
            <Header as="h3" textAlign="center" color="blue">
              {this.props.business.businessName}
            </Header>
            <Form>
              <Divider horizontal>Business Details</Divider>
              <Form.Group>
                <Form.Field width={8}>
                  <Form.Input
                    label="Business Type Description"
                    name="businessType"
                    autoComplete="businessType"
                    value={values.businessType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.businessType && touched.businessType && (
                    <Label basic color="red" pointing content={errors.businessType} />
                  )}
                </Form.Field>
              </Form.Group>
              <label style={{ fontSize: '.92857143em', color: 'rgba(0,0,0,.87)', fontWeight: '700' }}>
                Settlement Date
              </label>
              <Form.Group style={{ marginTop: '-18px' }}>
                <Form.Field style={{ marginTop: '22px' }} width={3}>
                  <DatePicker selected={values.settlementDate} onChange={this._handleDateChange} />
                </Form.Field>
                <Form.Field width={13}>
                  <Form.Dropdown
                    name="buyerName"
                    label="Buyer Name"
                    autoComplete="buyerName"
                    placeholder="Select one Buyer"
                    value={values.buyerName}
                    onChange={this._handleSelectChange}
                    search
                    selection
                    options={this._mapArrayToValuesForDropdown(listBuyersFromBusiness)}
                  />
                  {errors.buyerName && touched.buyerName && (
                    <Label basic color="red" pointing content={errors.buyerName} />
                  )}
                </Form.Field>
              </Form.Group>
              <Divider horizontal>Sold Details</Divider>
              <Form.Group>
                <Form.Field>
                  <Form.Input
                    label="Sold Price (Ex. Stock)"
                    name="soldPrice"
                    autoComplete="soldPrice"
                    value={this.state.soldPrice}
                    onChange={this._numberFormat}
                    onBlur={handleBlur}
                  />
                  {errors.soldPrice && touched.soldPrice && (
                    <Label basic color="red" pointing content={errors.soldPrice} />
                  )}
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    label="Stock Value"
                    name="stockValue"
                    autoComplete="stockValue"
                    value={this.state.stockValue}
                    onChange={this._numberFormat}
                    onBlur={handleBlur}
                  />
                  {errors.stockValue && touched.stockValue && (
                    <Label basic color="red" pointing content={errors.stockValue} />
                  )}
                </Form.Field>
              </Form.Group>
              <Form.Group>
                <Form.Field>
                  <Form.Input
                    label="Asset Value"
                    name="assetValue"
                    autoComplete="assetValue"
                    value={this.state.assetValue}
                    onChange={this._numberFormat}
                    onBlur={handleBlur}
                  />
                  {errors.assetValue && touched.assetValue && (
                    <Label basic color="red" pointing content={errors.assetValue} />
                  )}
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    label="Working Capital Requirements"
                    name="workingCapitalReq"
                    autoComplete="workingCapitalReq"
                    value={this.state.workingCapitalReq}
                    onChange={this._numberFormat}
                    onBlur={handleBlur}
                  />
                  {errors.workingCapitalReq && touched.workingCapitalReq && (
                    <Label basic color="red" pointing content={errors.workingCapitalReq} />
                  )}
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    label="Property Value"
                    name="propertyValue"
                    autoComplete="propertyValue"
                    value={this.state.propertyValue}
                    onChange={this._numberFormat}
                    onBlur={handleBlur}
                  />
                  {errors.propertyValue && touched.propertyValue && (
                    <Label basic color="red" pointing content={errors.propertyValue} />
                  )}
                </Form.Field>
              </Form.Group>
              <Form.Group>
                <Form.Field width={4}>
                  <Form.Input
                    label={this.state.financialYear - 3}
                    name="year1"
                    autoComplete="year1"
                    value={this.state.year1}
                    onChange={this._numberFormat}
                    onBlur={handleBlur}
                  />
                  {errors.year1 && touched.year1 && <Label basic color="red" pointing content={errors.year1} />}
                </Form.Field>
                <Form.Field width={4}>
                  <Form.Input
                    label={this.state.financialYear - 2}
                    name="year2"
                    autoComplete="year2"
                    value={this.state.year2}
                    onChange={this._numberFormat}
                    onBlur={handleBlur}
                  />
                  {errors.year2 && touched.year2 && <Label basic color="red" pointing content={errors.year2} />}
                </Form.Field>
                <Form.Field width={4}>
                  <Form.Input
                    label={this.state.financialYear - 1}
                    name="year3"
                    autoComplete="year3"
                    value={this.state.year3}
                    onChange={this._numberFormat}
                    onBlur={handleBlur}
                  />
                  {errors.year3 && touched.year3 && <Label basic color="red" pointing content={errors.year3} />}
                </Form.Field>
                <Form.Field width={4}>
                  <Form.Input
                    label={this.state.financialYear + ' Annualised YTD'}
                    name="year4"
                    autoComplete="year4"
                    value={this.state.year4}
                    onChange={this._numberFormat}
                    onBlur={handleBlur}
                  />
                  {errors.year4 && touched.year4 && <Label basic color="red" pointing content={errors.year4} />}
                </Form.Field>
              </Form.Group>
              <Form.Group>
                <label
                  style={{ marginLeft: '5px', fontSize: '.92857143em', color: 'rgba(0,0,0,.87)', fontWeight: '700' }}
                >
                  Trend:{' '}
                </label>
                <Form.Radio label="Up" value="up" checked={values.trend === 'up'} onChange={this._handleChangeRadio} />
                <Icon name="arrow up" color="green" />
                <Form.Radio
                  label="Down"
                  value="down"
                  checked={values.trend === 'down'}
                  onChange={this._handleChangeRadio}
                />
                <Icon name="arrow down" color="red" />
                <Form.Radio
                  label="Steady"
                  value="steady"
                  checked={values.trend === 'steady'}
                  onChange={this._handleChangeRadio}
                />
                <Icon name="arrow right" color="yellow" />
              </Form.Group>
              <Form.Group>
                <Form.Field width={4}>
                  <Form.Input
                    label="N. of Working Owners"
                    name="nOfWorkingOwners"
                    autoComplete="nOfWorkingOwners"
                    value={values.nOfWorkingOwners}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.nOfWorkingOwners && touched.nOfWorkingOwners && (
                    <Label basic color="red" pointing content={errors.nOfWorkingOwners} />
                  )}
                </Form.Field>
                <Form.Field width={4}>
                  <Form.Input
                    label="Agreed Wage For Working Owners"
                    name="agreedWageForWorkingOwners"
                    autoComplete="agreedWageForWorkingOwners"
                    value={this.state.agreedWageForWorkingOwners}
                    onChange={this._numberFormat}
                    onBlur={handleBlur}
                  />
                  {errors.agreedWageForWorkingOwners && touched.agreedWageForWorkingOwners && (
                    <Label basic color="red" pointing content={errors.agreedWageForWorkingOwners} />
                  )}
                </Form.Field>
                <Form.Field width={4}>
                  <Form.Input
                    label="Agreed Wage For Main Owner"
                    name="agreedWageForMainOwner"
                    autoComplete="agreedWageForMainOwner"
                    value={this.state.agreedWageForMainOwner}
                    onChange={this._numberFormat}
                    onBlur={handleBlur}
                  />
                  {errors.agreedWageForMainOwner && touched.agreedWageForMainOwner && (
                    <Label basic color="red" pointing content={errors.agreedWageForMainOwner} />
                  )}
                </Form.Field>
                <Form.Field width={4}>
                  <Form.Input
                    label="Latest Full Year Total Revenue"
                    name="latestFullYearTotalRevenue"
                    autoComplete="latestFullYearTotalRevenue"
                    value={this.state.latestFullYearTotalRevenue}
                    onChange={this._numberFormat}
                    onBlur={handleBlur}
                  />
                  {errors.latestFullYearTotalRevenue && touched.latestFullYearTotalRevenue && (
                    <Label basic color="red" pointing content={errors.latestFullYearTotalRevenue} />
                  )}
                </Form.Field>
              </Form.Group>
              <Form.Group>
                <Form.Field width={8}>
                  <Form.TextArea
                    label="Terms of Deal"
                    name="termsOfDeal"
                    autoComplete="termsOfDeal"
                    value={values.termsOfDeal}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.termsOfDeal && touched.termsOfDeal && (
                    <Label basic color="red" pointing content={errors.termsOfDeal} />
                  )}
                </Form.Field>
                <Form.Field width={8}>
                  <Form.TextArea
                    label="Special Notes"
                    name="specialNotes"
                    autoComplete="specialNotes"
                    value={values.specialNotes}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.specialNotes && touched.specialNotes && (
                    <Label basic color="red" pointing content={errors.specialNotes} />
                  )}
                </Form.Field>
              </Form.Group>
            </Form>
          </Dimmer.Dimmable>
        </Modal.Content>
        <Modal.Actions>
          <Button color="blue" disabled={values.sold} onClick={() => this._handleConfirm(false)}>
            <Icon name="save" />
            Save and Return
          </Button>
          <Button
            color="green"
            disabled={!isValid || values.sold}
            // loading={updateLoading}
            onClick={this._handleConfirm}
          >
            <Icon name="save" />
            Save and Change to Sold
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

const validationSchema = Yup.object().shape({
  businessType: Yup.string().required('This field is required.'),
  buyerName: Yup.string().required('This field is required.'),
  // settlementDate: Yup.string().required(' is required.'),
  nOfWorkingOwners: Yup.number()
    .required('This field required.')
    .typeError('You must type only numbers.'),
  termsOfDeal: Yup.string().required('This field is required.'),
  specialNotes: Yup.string().required('This field is required.')
})

StageSoldForm.propTypes = {
  values: PropTypes.object,
  touched: PropTypes.object,
  errors: PropTypes.object,
  setFieldValue: PropTypes.func,
  isValid: PropTypes.bool,
  updateLoading: PropTypes.bool,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  closeModal: PropTypes.func.isRequired,
  options: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired,
  callBack: PropTypes.func.isRequired,
  updateBusinessSold: PropTypes.func,
  business: PropTypes.object,
  businessSold: PropTypes.object,
  finaliseStageSold: PropTypes.func,
  getBusinessSold: PropTypes.func,
  createBusinessSold: PropTypes.func,
  openModal: PropTypes.func,
  isLoadingBusinessSold: PropTypes.bool,
  getBuyersBusinessSold: PropTypes.func,
  listBuyersFromBusiness: PropTypes.array,
  businessSoldCreated: PropTypes.object
}

const mapPropsToValues = props => ({
  id: props.businessSold ? props.businessSold.id : null,
  businessId: props.business ? props.business.id : null,
  businessType: props.businessSold ? props.businessSold.businessType : '',
  settlementDate: props.businessSold ? moment(props.businessSold.settlementDate) : moment(),
  buyerName: props.businessSold ? props.businessSold.buyerName : '',
  soldPrice: props.businessSold ? props.businessSold.soldPrice : 0,
  stockValue: props.businessSold ? props.businessSold.stockValue : 0,
  assetValue: props.businessSold ? props.businessSold.assetValue : 0,
  workingCapitalReq: props.businessSold ? props.businessSold.workingCapitalReq : 0,
  propertyValue: props.businessSold ? props.businessSold.propertyValue : 0,
  year1: props.businessSold ? props.businessSold.year1 : 0,
  year2: props.businessSold ? props.businessSold.year2 : 0,
  year3: props.businessSold ? props.businessSold.year3 : 0,
  year4: props.businessSold ? props.businessSold.year4 : 0,
  nOfWorkingOwners: props.businessSold ? props.businessSold.nOfWorkingOwners : 0,
  agreedWageForWorkingOwners: props.businessSold ? props.businessSold.agreedWageForWorkingOwners : 0,
  agreedWageForMainOwner: props.businessSold ? props.businessSold.agreedWageForMainOwner : 0,
  latestFullYearTotalRevenue: props.businessSold ? props.businessSold.latestFullYearTotalRevenue : 0,
  termsOfDeal: props.businessSold ? props.businessSold.termsOfDeal : '',
  specialNotes: props.businessSold ? props.businessSold.specialNotes : '',
  sold: props.businessSold ? props.businessSold.sold : false,
  trend: props.businessSold ? props.businessSold.trend : 'up'
})

const mapStateToProps = state => ({
  businessSold: state.businessSold.get.object.data,
  isLoadingBusinessSold: state.businessSold.get.isLoading,
  listBuyersFromBusiness: state.businessSold.getBuyersBusiness.array,
  businessSoldCreated: state.businessSold.create.object
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createBusinessSold,
      getBusinessSold,
      updateBusinessSold,
      finaliseStageSold,
      closeModal,
      openModal,
      getBuyersBusinessSold
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
  })(StageSoldForm)
)

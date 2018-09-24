import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import moment from 'moment'
import { closeModal } from '../../redux/ducks/modal'
import { Modal, Form, Label, Icon, Button, Divider, Header } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// import { updateBusinessSold, finaliseStageSold, getBusinessSold } from '../../redux/ducks/businessSold'

class StageSoldForm extends Component {
  constructor (props) {
    super(props)
    this.state = { financialYear: null }
  }

  componentDidMount () {
    this._calculateFinancialYear()
    // this.props.getBusinessSold(this.props.business.id)
  }

  _handleDateChange = date => {
    this.props.setFieldValue('date', date)
  }

  _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
  }

  _handleChangeCheckBox = (e, { name }) => {
    this.props.setFieldValue(name, !this.props.values[name])
  }

  _handleConfirm = isConfirmed => {
    if (!isConfirmed) {
      this.props.closeModal()
      this.props.callBack(isConfirmed)
      // this.props.updateBusinessSold(this.props.values)
      // return
    }
    // this.props.finaliseStageSold(this.props.values)
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
    console.log(financialYear)

    // this.setState({ financialYear })
  }

  render () {
    const { values, touched, errors, isValid, handleChange, handleBlur, options } = this.props
    console.log('oi')
    return (
      <Modal open size="small" onClose={() => this._handleConfirm(false)}>
        <Modal.Header>{options.title}</Modal.Header>
        <Modal.Content scrolling>
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
                {errors.businessType &&
                  touched.businessType && <Label basic color="red" pointing content={errors.businessType} />}
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field>
                <Form.Input
                  label="Settlement Date"
                  name="settlementDate"
                  autoComplete="settlementDate"
                  value={values.settlementDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.settlementDate &&
                  touched.settlementDate && <Label basic color="red" pointing content={errors.settlementDate} />}
              </Form.Field>
              {/* <Form.Field width={10}>
                <Form.Select
                  label="Buyer Name"
                  // options={ratingOptions}
                  name="buyerName"
                  autoComplete="buyerName"
                  value={values.buyerName}
                  onChange={this._handleSelectChange}
                />
                {errors.buyerName &&
                  touched.buyerName && <Label basic color="red" pointing content={errors.buyerName} />}
              </Form.Field> */}
            </Form.Group>
            <Divider horizontal>Sold Details</Divider>
            <Form.Group>
              <Form.Field>
                <Form.Input
                  label="Sold Price (Ex. Stock)"
                  name="soldPrice"
                  autoComplete="soldPrice"
                  value={values.soldPrice}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.soldPrice &&
                  touched.soldPrice && <Label basic color="red" pointing content={errors.soldPrice} />}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Stock Value"
                  name="stockValue"
                  autoComplete="stockValue"
                  value={values.stockValue}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.stockValue &&
                  touched.stockValue && <Label basic color="red" pointing content={errors.stockValue} />}
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field>
                <Form.Input
                  label="Asset Value"
                  name="assetValue"
                  autoComplete="assetValue"
                  value={values.assetValue}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.assetValue &&
                  touched.assetValue && <Label basic color="red" pointing content={errors.assetValue} />}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Working Capital Requirements"
                  name="workingCapitalReq"
                  autoComplete="workingCapitalReq"
                  value={values.workingCapitalReq}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.workingCapitalReq &&
                  touched.workingCapitalReq && <Label basic color="red" pointing content={errors.workingCapitalReq} />}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Property Value"
                  name="propertyValue"
                  autoComplete="propertyValue"
                  value={values.propertyValue}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.propertyValue &&
                  touched.propertyValue && <Label basic color="red" pointing content={errors.propertyValue} />}
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field width={4}>
                <Form.Input
                  label={this.state.financialYear - 3}
                  name="year1"
                  autoComplete="year1"
                  value={values.year1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.year1 && touched.year1 && <Label basic color="red" pointing content={errors.year1} />}
              </Form.Field>
              <Form.Field width={4}>
                <Form.Input
                  label={this.state.financialYear - 2}
                  name="year2"
                  autoComplete="year2"
                  value={values.year2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.year2 && touched.year2 && <Label basic color="red" pointing content={errors.year2} />}
              </Form.Field>
              <Form.Field width={4}>
                <Form.Input
                  label={this.state.financialYear - 1}
                  name="year3"
                  autoComplete="year3"
                  value={values.year3}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.year3 && touched.year3 && <Label basic color="red" pointing content={errors.year3} />}
              </Form.Field>
              <Form.Field width={4}>
                <Form.Input
                  label={this.state.financialYear + ' YTD (optional)'}
                  name="year4"
                  autoComplete="year4"
                  value={values.year4}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.year4 && touched.year4 && <Label basic color="red" pointing content={errors.year4} />}
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field>
                <Form.Input
                  label="N. of Working Owners"
                  name="nOfWorkingOwners"
                  autoComplete="nOfWorkingOwners"
                  value={values.nOfWorkingOwners}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.nOfWorkingOwners &&
                  touched.nOfWorkingOwners && <Label basic color="red" pointing content={errors.nOfWorkingOwners} />}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Agreed Wage For Working Owners"
                  name="agreedWageForWorkingOwners"
                  autoComplete="agreedWageForWorkingOwners"
                  value={values.agreedWageForWorkingOwners}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.agreedWageForWorkingOwners &&
                  touched.agreedWageForWorkingOwners && (
                  <Label basic color="red" pointing content={errors.agreedWageForWorkingOwners} />
                )}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Latest Full Year Total Revenue"
                  name="latestFullYearTotalRevenue"
                  autoComplete="latestFullYearTotalRevenue"
                  value={values.latestFullYearTotalRevenue}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.latestFullYearTotalRevenue &&
                  touched.latestFullYearTotalRevenue && (
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
                {errors.termsOfDeal &&
                  touched.termsOfDeal && <Label basic color="red" pointing content={errors.termsOfDeal} />}
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
                {errors.specialNotes &&
                  touched.specialNotes && <Label basic color="red" pointing content={errors.specialNotes} />}
              </Form.Field>
            </Form.Group>
            <Divider horizontal>(Optional) Set Follow up date</Divider>
            <Form.Group>
              <Form.Checkbox
                label="Make a Follow up log."
                name="followUpLog"
                onChange={this._handleChangeCheckBox}
                checked={values.followUpLog}
              />
              {this.props.values.followUpLog ? (
                <Form.Field>
                  <DatePicker selected={values.date} onChange={this._handleDateChange} popperPlacement="top-end" />
                </Form.Field>
              ) : (
                <Form.Field>
                  <DatePicker selected={values.date} onChange={this._handleDateChange} disabled />
                </Form.Field>
              )}
            </Form.Group>
            <Form.Group>
              {this.props.values.followUpLog ? (
                <Form.Field width={10}>
                  <Form.TextArea
                    label=""
                    name="text"
                    autoComplete="text"
                    value={values.text}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.text && touched.text && <Label basic color="red" pointing content={errors.text} />}
                </Form.Field>
              ) : (
                <Form.Field width={10}>
                  <Form.TextArea disabled name=" " value={''} />
                </Form.Field>
              )}
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="blue" onClick={this._handleConfirm}>
            <Icon name="save" />
            Save and Return
          </Button>
          <Button
            color="green"
            disabled={!isValid}
            // loading={updateLoading}
            onClick={this._handleConfirm(false)}
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
  // settlementDate: Yup.string().required(' is required.'),
  soldPrice: Yup.number()
    .required('This field is required.')
    .typeError('You must type only numbers.'),
  stockValue: Yup.number()
    .required('This field is required.')
    .typeError('You must type only numbers.'),
  assetValue: Yup.number()
    .required('This field required.')
    .typeError('You must type only numbers.'),
  workingCapitalReq: Yup.number()
    .required('This field required.')
    .typeError('You must type only numbers.'),
  propertyValue: Yup.number()
    .required('This field required.')
    .typeError('You must type only numbers.'),
  year1: Yup.number()
    .required('This field required.')
    .typeError('You must type only numbers.'),
  year2: Yup.number()
    .required('This field required.')
    .typeError('You must type only numbers.'),
  year3: Yup.number()
    .required('This field required.')
    .typeError('You must type only numbers.'),
  nOfWorkingOwners: Yup.number()
    .required('This field required.')
    .typeError('You must type only numbers.'),
  agreedWageForWorkingOwners: Yup.number()
    .required('This field required.')
    .typeError('You must type only numbers.'),
  latestFullYearTotalRevenue: Yup.number()
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
  // updateBusinessSold: PropTypes.func,
  business: PropTypes.object
  // businessSold: PropTypes.object,
  // finaliseStageSold: PropTypes.func,
  // getBusinessSold: PropTypes.func
}

const mapPropsToValues = props => ({
  businessId: props.business.id ? props.business.id : '',
  // settlementDate: props.businessSold ? props.businessSold.settlementDate : moment(),
  followUpLog: false
})

const mapStateToProps = state => ({
  // businessSold: state.businessSold.get.object
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ /* getBusinessSold, updateBusinessSold, finaliseStageSold, */ closeModal }, dispatch)

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

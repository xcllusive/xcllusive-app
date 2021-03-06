import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Message, Step, Grid, Header, Form, Segment } from 'semantic-ui-react'
import * as Yup from 'yup'
import moment from 'moment'

import {
  updateAppraisal,
  moveFinancialYear,
  getAppraisal,
  clearMovedFinancialYear
} from '../../../../redux/ducks/appraisal'

import Wrapper from '../../../../components/content/Wrapper'
import AddbacksAndAdjustmentsForm from './AddbacksAndAdjustmentsForm'
import FinancialAnalysisForm from './FinancialAnalysisForm'
import OwnersMarketWagesForm from './OwnersMarketWagesForm'
import StockForm from './StockForm'
import PhysicalAssetValueForm from './PhysicalAssetValueForm'
import FinancialInformationSourceForm from './FinancialInformationSourceForm'
import CustomColumn from '../../../../components/content/CustomGridColumn'

import { openModal } from '../../../../redux/ducks/modal'

class FinancialAnalysisPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      financialYear: null,
      operatingProfit: {
        operatingProfit1: 0,
        operatingProfit2: 0,
        operatingProfit3: 0,
        operatingProfit4: 0,
        operatingProfit5: 0,
        operatingProfit6: 0
      },
      sales: {
        sales1: 0,
        sales2: 0,
        sales3: 0,
        sales4: 0,
        sales5: 0,
        sales6: 0
      }
    }
  }

  componentDidMount () {
    if (this.props.appraisalObject && !this.props.appraisalObject.year6) this._calculateFinancialYear()
  }

  componentWillUnmount () {
    if (!this.props.isMovedFinancialYear) {
      if (this.props.isValid && this.props.appraisalObject.confirmPricing) this.props.values.confirmPricing = false
      this.props.updateAppraisal(this.props.values)

      if (this.props.isValid && this.props.appraisalObject.confirmPricing) {
        this.props.getAppraisal(this.props.appraisalObject.id)
      }
    }
    this.props.clearMovedFinancialYear()
  }

  _handleChangeCheckBox = (e, { name }) => {
    this.props.setFieldValue(name, !this.props.values[name])
  }

  _calculateFinancialYear = async () => {
    const dateChangeFinancialYear = moment('30/06', 'DD/MM')
    const currentDayMonth = moment()
    let financialYear = null
    if (currentDayMonth > dateChangeFinancialYear) {
      financialYear = moment()
        .add(1, 'year')
        .format('YYYY')
    } else financialYear = moment().format('YYYY')

    await this.setState({
      financialYear
    })
    this.props.setFieldValue('year1', this.state.financialYear - 5)
    this.props.setFieldValue('year2', this.state.financialYear - 4)
    this.props.setFieldValue('year3', this.state.financialYear - 3)
    this.props.setFieldValue('year4', this.state.financialYear - 2)
    this.props.setFieldValue('year5', this.state.financialYear - 1)
    this.props.setFieldValue('year6', this.state.financialYear)
  }

  _getCalcs = obj => {
    if (!obj.year || !obj.field) return
    this.setState(prevState => {
      prevState[obj.field] = {
        ...prevState[obj.field],
        [`${obj.field}${obj.year}`]: obj.calc
      }
    })
    this.props.setFieldValue(`${obj.field}${obj.year}`, obj.calc)
  }

  _handleChangeTotalAdjustedProfitPerc (changeTotalsAdjustedProfitPerc, setFieldValue) {
    setFieldValue('totalsAdjustedProfitPerc', changeTotalsAdjustedProfitPerc)
  }

  _handleChangeTotalAdjustedProfit (changeTotalsAdjustedProfit, setFieldValue) {
    setFieldValue('totalsAdjustedProfit', changeTotalsAdjustedProfit)
  }

  render () {
    const { values, appraisalObject } = this.props
    return (
      <Wrapper>
        <Segment style={{ backgroundColor: '#ffe7a273', marginTop: '0px' }} size="small">
          <Step.Group size="large">
            <Step active icon="chart line" title="Step 3" description="Financial Analysis" />
            <Message style={{ marginTop: '0px' }} info size="large">
              <p>
                The data you enter on this page will be used on the `Financial Analysis` page of the appraisal.This
                information will also be used to calculate the value of the business.Enter data as you would on a
                spreadsheet, using the[tab] key to switch quickly between cells.This page can be left open for longer
                than most other pages, but it is recommended that you manually save regularly to ensure that you don `t
                lose any work. This is done by clicking the [Save] button at the bottom of this page.
              </p>
            </Message>
          </Step.Group>
        </Segment>
        <Segment size="small" style={{ backgroundColor: '#008eff26' }}>
          <Grid celled="internally" divided>
            <FinancialAnalysisForm
              handleChangeCheckBox={this._handleChangeCheckBox}
              handleChangeCheckBoxPdf={this._handleChangeCheckBox}
              values={values}
              handleChange={this.props.handleChange}
              handleBlur={this.props.handleBlur}
              errors={this.props.errors}
              touched={this.props.touched}
              financialYear={this.state.financialYear}
              appraisalObject={appraisalObject}
              sendCalcs={this._getCalcs}
              setFieldValue={this.props.setFieldValue}
              setFieldTouched={this.props.setFieldTouched}
              openModal={this.props.openModal}
              moveFinancialYear={this.props.moveFinancialYear}
              getAppraisal={this.props.getAppraisal}
              changeTotalAdjustedProfitPerc={this._handleChangeTotalAdjustedProfitPerc}
              changeTotalAdjustedProfit={this._handleChangeTotalAdjustedProfit}
            />
          </Grid>
        </Segment>
        <Segment size="small" style={{ backgroundColor: '#daf3e4' }}>
          <Grid celled="internally" divided>
            <Grid.Row>
              <Grid.Column>
                <Header as="h3" textAlign="center" color="blue">
                  Addbacks and Adjustments
                </Header>
              </Grid.Column>
            </Grid.Row>
            <AddbacksAndAdjustmentsForm
              financialYear={this.state.financialYear}
              business={this.props.business}
              appraisalObject={this.props.appraisalObject}
              handleChange={this.props.handleChange}
              monthsCovered={parseInt(this.props.values.monthsCovered)}
              seasonalAdjustment={parseInt(this.props.values.seasonalAdjustment)}
              totalsAdjustedProfitPerc={this.props.values.totalsAdjustedProfitPerc}
              totalsAdjustedProfit={this.props.values.totalsAdjustedProfit}
            />
          </Grid>
        </Segment>
        <Grid>
          <Grid.Row columns={2}>
            <CustomColumn width={9}>
              <OwnersMarketWagesForm business={this.props.business} appraisalObject={this.props.appraisalObject} />
            </CustomColumn>
            <CustomColumn width={7}>
              <StockForm business={this.props.business} appraisalObject={this.props.appraisalObject} />
              <PhysicalAssetValueForm business={this.props.business} appraisalObject={this.props.appraisalObject} />
            </CustomColumn>
          </Grid.Row>
        </Grid>
        <Grid>
          <Grid.Row centered>
            <Grid.Column width={6}>
              <FinancialInformationSourceForm
                appraisalObject={this.props.appraisalObject}
                business={this.props.business}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Form>
                <Form.Group>
                  <Form.Field>
                    <Form.Checkbox
                      label="Please confirm that you have completed the above information"
                      name="confirmFinancialAnalysis"
                      onChange={this._handleChangeCheckBox}
                      checked={values.confirmFinancialAnalysis}
                      disabled={!values.financialInfoSource}
                      onClick={() =>
                        this.props.confirmsCompleteSteps('confirmFinancialAnalysis', !values.confirmFinancialAnalysis)
                      }
                    />
                  </Form.Field>
                </Form.Group>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Wrapper>
    )
  }
}

FinancialAnalysisPage.propTypes = {
  values: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  errors: PropTypes.object,
  touched: PropTypes.object,
  setFieldValue: PropTypes.func,
  isSubmitting: PropTypes.bool,
  isValid: PropTypes.bool,
  updateAppraisal: PropTypes.func,
  appraisalObject: PropTypes.object,
  business: PropTypes.object,
  confirmsCompleteSteps: PropTypes.func,
  setFieldTouched: PropTypes.func,
  openModal: PropTypes.func,
  moveFinancialYear: PropTypes.func,
  getAppraisal: PropTypes.func,
  isMovedFinancialYear: PropTypes.bool,
  clearMovedFinancialYear: PropTypes.func
}

const mapPropsToValues = props => ({
  business_id: props.business ? props.business.id : '',
  id: props.appraisalObject ? props.appraisalObject.id : '',
  monthsCovered: props.appraisalObject ? props.appraisalObject.monthsCovered : 0,
  seasonalAdjustment: props.appraisalObject ? props.appraisalObject.seasonalAdjustment : 0,
  sales1: props.appraisalObject ? props.appraisalObject.sales1 : 0,
  sales2: props.appraisalObject ? props.appraisalObject.sales2 : 0,
  sales3: props.appraisalObject ? props.appraisalObject.sales3 : 0,
  sales4: props.appraisalObject ? props.appraisalObject.sales4 : 0,
  sales5: props.appraisalObject ? props.appraisalObject.sales5 : 0,
  sales6: props.appraisalObject ? props.appraisalObject.sales6 : 0,
  cogs1: props.appraisalObject ? props.appraisalObject.cogs1 : 0,
  cogs2: props.appraisalObject ? props.appraisalObject.cogs2 : 0,
  cogs3: props.appraisalObject ? props.appraisalObject.cogs3 : 0,
  cogs4: props.appraisalObject ? props.appraisalObject.cogs4 : 0,
  cogs5: props.appraisalObject ? props.appraisalObject.cogs5 : 0,
  cogs6: props.appraisalObject ? props.appraisalObject.cogs6 : 0,
  otherIncome1: props.appraisalObject ? props.appraisalObject.otherIncome1 : 0,
  otherIncome2: props.appraisalObject ? props.appraisalObject.otherIncome2 : 0,
  otherIncome3: props.appraisalObject ? props.appraisalObject.otherIncome3 : 0,
  otherIncome4: props.appraisalObject ? props.appraisalObject.otherIncome4 : 0,
  otherIncome5: props.appraisalObject ? props.appraisalObject.otherIncome5 : 0,
  otherIncome6: props.appraisalObject ? props.appraisalObject.otherIncome6 : 0,
  expenses1: props.appraisalObject ? props.appraisalObject.expenses1 : 0,
  expenses2: props.appraisalObject ? props.appraisalObject.expenses2 : 0,
  expenses3: props.appraisalObject ? props.appraisalObject.expenses3 : 0,
  expenses4: props.appraisalObject ? props.appraisalObject.expenses4 : 0,
  expenses5: props.appraisalObject ? props.appraisalObject.expenses5 : 0,
  expenses6: props.appraisalObject ? props.appraisalObject.expenses6 : 0,
  calcAnnualised1: props.appraisalObject ? props.appraisalObject.calcAnnualised1 : 0,
  calcAnnualised2: props.appraisalObject ? props.appraisalObject.calcAnnualised2 : 0,
  calcAnnualised5: props.appraisalObject ? props.appraisalObject.calcAnnualised5 : 0,
  calcAnnualised7: props.appraisalObject ? props.appraisalObject.calcAnnualised7 : 0,
  calcGrossMargin1: props.appraisalObject ? props.appraisalObject.calcGrossMargin1 : 0,
  calcGrossMargin2: props.appraisalObject ? props.appraisalObject.calcGrossMargin2 : 0,
  calcGrossMargin3: props.appraisalObject ? props.appraisalObject.calcGrossMargin3 : 0,
  calcGrossMargin4: props.appraisalObject ? props.appraisalObject.calcGrossMargin4 : 0,
  calcGrossMargin5: props.appraisalObject ? props.appraisalObject.calcGrossMargin5 : 0,
  calcGrossMargin6: props.appraisalObject ? props.appraisalObject.calcGrossMargin6 : 0,
  calcGrossMargin7: props.appraisalObject ? props.appraisalObject.calcGrossMargin7 : 0,
  calcGrossMarginPerc1: props.appraisalObject ? props.appraisalObject.calcGrossMarginPerc1 : 0,
  calcGrossMarginPerc2: props.appraisalObject ? props.appraisalObject.calcGrossMarginPerc2 : 0,
  calcGrossMarginPerc3: props.appraisalObject ? props.appraisalObject.calcGrossMarginPerc3 : 0,
  calcGrossMarginPerc4: props.appraisalObject ? props.appraisalObject.calcGrossMarginPerc4 : 0,
  calcGrossMarginPerc5: props.appraisalObject ? props.appraisalObject.calcGrossMarginPerc5 : 0,
  calcGrossMarginPerc6: props.appraisalObject ? props.appraisalObject.calcGrossMarginPerc6 : 0,
  calcGrossMarginPerc7: props.appraisalObject ? props.appraisalObject.calcGrossMarginPerc7 : 0,
  calcGrossProfit1: props.appraisalObject ? props.appraisalObject.calcGrossProfit1 : 0,
  calcGrossProfit2: props.appraisalObject ? props.appraisalObject.calcGrossProfit2 : 0,
  calcGrossProfit3: props.appraisalObject ? props.appraisalObject.calcGrossProfit3 : 0,
  calcGrossProfit4: props.appraisalObject ? props.appraisalObject.calcGrossProfit4 : 0,
  calcGrossProfit5: props.appraisalObject ? props.appraisalObject.calcGrossProfit5 : 0,
  calcGrossProfit6: props.appraisalObject ? props.appraisalObject.calcGrossProfit6 : 0,
  calcGrossProfit7: props.appraisalObject ? props.appraisalObject.calcGrossProfit7 : 0,
  calcOperatingProfit1: props.appraisalObject ? props.appraisalObject.calcOperatingProfit1 : 0,
  calcOperatingProfit2: props.appraisalObject ? props.appraisalObject.calcOperatingProfit2 : 0,
  calcOperatingProfit3: props.appraisalObject ? props.appraisalObject.calcOperatingProfit3 : 0,
  calcOperatingProfit4: props.appraisalObject ? props.appraisalObject.calcOperatingProfit4 : 0,
  calcOperatingProfit5: props.appraisalObject ? props.appraisalObject.calcOperatingProfit5 : 0,
  calcOperatingProfit6: props.appraisalObject ? props.appraisalObject.calcOperatingProfit6 : 0,
  calcOperatingProfit7: props.appraisalObject ? props.appraisalObject.calcOperatingProfit7 : 0,
  calcOperatingProfitPerc1: props.appraisalObject ? props.appraisalObject.calcOperatingProfitPerc1 : 0,
  calcOperatingProfitPerc2: props.appraisalObject ? props.appraisalObject.calcOperatingProfitPerc2 : 0,
  calcOperatingProfitPerc3: props.appraisalObject ? props.appraisalObject.calcOperatingProfitPerc3 : 0,
  calcOperatingProfitPerc4: props.appraisalObject ? props.appraisalObject.calcOperatingProfitPerc4 : 0,
  calcOperatingProfitPerc5: props.appraisalObject ? props.appraisalObject.calcOperatingProfitPerc5 : 0,
  calcOperatingProfitPerc6: props.appraisalObject ? props.appraisalObject.calcOperatingProfitPerc6 : 0,
  calcOperatingProfitPerc7: props.appraisalObject ? props.appraisalObject.calcOperatingProfitPerc7 : 0,
  salesYesNo: props.appraisalObject ? props.appraisalObject.salesYesNo : false,
  cogsYesNo: props.appraisalObject ? props.appraisalObject.cogsYesNo : false,
  otherIncomeYesNo: props.appraisalObject ? props.appraisalObject.otherIncomeYesNo : false,
  expensesYesNo: props.appraisalObject ? props.appraisalObject.expensesYesNo : false,
  renderPdfYear1: props.appraisalObject ? props.appraisalObject.renderPdfYear1 : false,
  renderPdfYear2: props.appraisalObject ? props.appraisalObject.renderPdfYear2 : false,
  renderPdfYear3: props.appraisalObject ? props.appraisalObject.renderPdfYear3 : false,
  renderPdfYear4: props.appraisalObject ? props.appraisalObject.renderPdfYear4 : false,
  renderPdfYear5: props.appraisalObject ? props.appraisalObject.renderPdfYear5 : false,
  renderPdfYear7: props.appraisalObject ? props.appraisalObject.renderPdfYear7 : false,
  confirmFinancialAnalysis: props.appraisalObject ? props.appraisalObject.confirmFinancialAnalysis : false,
  totalAdjusments1: props.appraisalObject ? props.appraisalObject.totalAdjusments1 : 0,
  totalAdjusments2: props.appraisalObject ? props.appraisalObject.totalAdjusments2 : 0,
  totalAdjusments3: props.appraisalObject ? props.appraisalObject.totalAdjusments3 : 0,
  totalAdjusments4: props.appraisalObject ? props.appraisalObject.totalAdjusments4 : 0,
  totalAdjusments5: props.appraisalObject ? props.appraisalObject.totalAdjusments5 : 0,
  totalAdjusments6: props.appraisalObject ? props.appraisalObject.totalAdjusments6 : 0,
  totalAdjusments7: props.appraisalObject ? props.appraisalObject.totalAdjusments7 : 0,
  totalAdjustedProfit1Perc: props.appraisalObject ? props.appraisalObject.totalAdjustedProfit1Perc : 0,
  totalAdjustedProfit2Perc: props.appraisalObject ? props.appraisalObject.totalAdjustedProfit2Perc : 0,
  totalAdjustedProfit3Perc: props.appraisalObject ? props.appraisalObject.totalAdjustedProfit3Perc : 0,
  totalAdjustedProfit4Perc: props.appraisalObject ? props.appraisalObject.totalAdjustedProfit4Perc : 0,
  totalAdjustedProfit5Perc: props.appraisalObject ? props.appraisalObject.totalAdjustedProfit5Perc : 0,
  totalAdjustedProfit6Perc: props.appraisalObject ? props.appraisalObject.totalAdjustedProfit6Perc : 0,
  totalAdjustedProfit7Perc: props.appraisalObject ? props.appraisalObject.totalAdjustedProfit7Perc : 0,
  financialInfoSource: props.appraisalObject ? props.appraisalObject.financialInfoSource : ''
})

const validationSchema = Yup.object().shape({})

const handleSubmit = (values, { props, setSubmitting }) => {}

const mapStateToProps = state => {
  return {
    isMovedFinancialYear: state.appraisal.moveFinancialYear.isMoved
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { updateAppraisal, openModal, moveFinancialYear, getAppraisal, clearMovedFinancialYear },
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
    handleSubmit,
    enableReinitialize: true
  })(FinancialAnalysisPage)
)

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Segment, Grid, Header } from 'semantic-ui-react'
import * as Yup from 'yup'
import { updateAppraisal } from '../../../../redux/ducks/appraisal'
import numeral from 'numeral'

class SummaryOfFinancialPage extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  _lastYearProfit = appraisalObject => {
    if (appraisalObject && appraisalObject.totalAdjusments7 > 0) return appraisalObject.totalAdjusments7
    if (appraisalObject && appraisalObject.totalAdjusments6 > 0) return appraisalObject.totalAdjusments6
    if (appraisalObject && appraisalObject.totalAdjusments5 > 0) return appraisalObject.totalAdjusments5
    if (appraisalObject && appraisalObject.totalAdjusments4 > 0) return appraisalObject.totalAdjusments4
    if (appraisalObject && appraisalObject.totalAdjusments3 > 0) return appraisalObject.totalAdjusments3
    if (appraisalObject && appraisalObject.totalAdjusments2 > 0) return appraisalObject.totalAdjusments2
    if (appraisalObject && appraisalObject.totalAdjusments1 > 0) return appraisalObject.totalAdjusments1
  }

  _averageProfits = appraisalObject => {
    let count = 0
    let totalYear = 0

    if (appraisalObject && appraisalObject.totalAdjustedProfit7 > 0) {
      count = count + 1
      totalYear = totalYear + appraisalObject.totalAdjustedProfit7
    }

    if (appraisalObject && appraisalObject.totalAdjustedProfit6 > 0) {
      count = count + 1
      totalYear = totalYear + appraisalObject.totalAdjustedProfit6
    }

    if (appraisalObject && appraisalObject.totalAdjustedProfit5 > 0) {
      count = count + 1
      totalYear = totalYear + appraisalObject.totalAdjustedProfit5
    }

    if (appraisalObject && appraisalObject.totalAdjustedProfit4 > 0) {
      count = count + 1
      totalYear = totalYear + appraisalObject.totalAdjustedProfit4
    }

    if (appraisalObject && appraisalObject.totalAdjustedProfit3 > 0) {
      count = count + 1
      totalYear = totalYear + appraisalObject.totalAdjustedProfit3
    }

    if (appraisalObject && appraisalObject.totalAdjustedProfit2 > 0) {
      count = count + 1
      totalYear = totalYear + appraisalObject.totalAdjustedProfit2
    }

    if (appraisalObject && appraisalObject.totalAdjustedProfit1 > 0) {
      count = count + 1
      totalYear = totalYear + appraisalObject.totalAdjustedProfit1
    }

    return totalYear / count
  }

  _salesLatestYearVsPrevious = appraisalObject => {
    if (appraisalObject && appraisalObject.sales7 > 0) return appraisalObject.sales7 - appraisalObject.sales6
    if (appraisalObject && appraisalObject.sales6 > 0) return appraisalObject.sales6 - appraisalObject.sales5
    if (appraisalObject && appraisalObject.sales5 > 0) return appraisalObject.sales5 - appraisalObject.sales4
    if (appraisalObject && appraisalObject.sales4 > 0) return appraisalObject.sales4 - appraisalObject.sales3
    if (appraisalObject && appraisalObject.sales3 > 0) return appraisalObject.sales3 - appraisalObject.sales2
    if (appraisalObject && appraisalObject.sales2 > 0) return appraisalObject.sales2 - appraisalObject.sales1
  }

  _profitsCurrentVsLastYear = appraisalObject => {
    if (appraisalObject && appraisalObject.totalAdjustedProfit7 > 0) {
      return appraisalObject.totalAdjustedProfit7 - appraisalObject.totalAdjustedProfit6
    }
    if (appraisalObject && appraisalObject.sales6 > 0) {
      return appraisalObject.totalAdjustedProfit6 - appraisalObject.totalAdjustedProfit5
    }
    if (appraisalObject && appraisalObject.sales5 > 0) {
      return appraisalObject.totalAdjustedProfit5 - appraisalObject.totalAdjustedProfit4
    }
    if (appraisalObject && appraisalObject.sales4 > 0) {
      return appraisalObject.totalAdjustedProfit4 - appraisalObject.totalAdjustedProfit3
    }
    if (appraisalObject && appraisalObject.sales3 > 0) {
      return appraisalObject.totalAdjustedProfit3 - appraisalObject.totalAdjustedProfit2
    }
    if (appraisalObject && appraisalObject.sales2 > 0) {
      return appraisalObject.totalAdjustedProfit2 - appraisalObject.totalAdjustedProfit1
    }
  }

  _adjProfitsLatestYearVsAverage = appraisalObject => {
    if (appraisalObject && appraisalObject.totalAdjustedProfit7 > 0) {
      return appraisalObject.totalAdjustedProfit7 - this._averageProfits(appraisalObject)
    }
    if (appraisalObject && appraisalObject.totalAdjustedProfit6 > 0) {
      return appraisalObject.totalAdjustedProfit6 - this._averageProfits(appraisalObject)
    }
    if (appraisalObject && appraisalObject.totalAdjustedProfit5 > 0) {
      return appraisalObject.totalAdjustedProfit5 - this._averageProfits(appraisalObject)
    }
    if (appraisalObject && appraisalObject.totalAdjustedProfit4 > 0) {
      return appraisalObject.totalAdjustedProfit4 - this._averageProfits(appraisalObject)
    }
    if (appraisalObject && appraisalObject.totalAdjustedProfit3 > 0) {
      return appraisalObject.totalAdjustedProfit3 - this._averageProfits(appraisalObject)
    }
    if (appraisalObject && appraisalObject.totalAdjustedProfit2 > 0) {
      return appraisalObject.totalAdjustedProfit2 - this._averageProfits(appraisalObject)
    }
    if (appraisalObject && appraisalObject.totalAdjustedProfit1 > 0) {
      return appraisalObject.totalAdjustedProfit1 - this._averageProfits(appraisalObject)
    }
  }

  _grossMarginsLastVsPrevious = appraisalObject => {
    if (appraisalObject && appraisalObject.grossMarginPerc7 > 0) {
      return appraisalObject.grossMarginPerc7 - appraisalObject.grossMarginPerc6
    }
    if (appraisalObject && appraisalObject.grossMarginPerc6 > 0) {
      return appraisalObject.grossMarginPerc6 - appraisalObject.grossMarginPerc5
    }
    if (appraisalObject && appraisalObject.grossMarginPerc5 > 0) {
      return appraisalObject.grossMarginPerc5 - appraisalObject.grossMarginPerc4
    }
    if (appraisalObject && appraisalObject.grossMarginPerc4 > 0) {
      return appraisalObject.grossMarginPerc4 - appraisalObject.grossMarginPerc3
    }
    if (appraisalObject && appraisalObject.grossMarginPerc3 > 0) {
      return appraisalObject.grossMarginPerc3 - appraisalObject.grossMarginPerc2
    }
    if (appraisalObject && appraisalObject.grossMarginPerc2 > 0) {
      return appraisalObject.grossMarginPerc2 - appraisalObject.grossMarginPerc1
    }
  }

  _netMarginsLastVsPrevious = appraisalObject => {
    if (appraisalObject && appraisalObject.adjustedProfitPerc7 > 0) {
      return appraisalObject.adjustedProfitPerc7 - appraisalObject.adjustedProfitPerc6
    }
    if (appraisalObject && appraisalObject.adjustedProfitPerc6 > 0) {
      return appraisalObject.adjustedProfitPerc6 - appraisalObject.adjustedProfitPerc5
    }
    if (appraisalObject && appraisalObject.adjustedProfitPerc5 > 0) {
      return appraisalObject.adjustedProfitPerc5 - appraisalObject.adjustedProfitPerc4
    }
    if (appraisalObject && appraisalObject.adjustedProfitPerc4 > 0) {
      return appraisalObject.adjustedProfitPerc4 - appraisalObject.adjustedProfitPerc3
    }
    if (appraisalObject && appraisalObject.adjustedProfitPerc3 > 0) {
      return appraisalObject.adjustedProfitPerc3 - appraisalObject.adjustedProfitPerc2
    }
    if (appraisalObject && appraisalObject.adjustedProfitPerc2 > 0) {
      return appraisalObject.adjustedProfitPerc2 - appraisalObject.adjustedProfitPerc1
    }
  }

  _totalWages = appraisalObject => {
    let totalWages = 0
    if (appraisalObject && appraisalObject.owner7AnnualWage > 0) {
      totalWages = appraisalObject.owner7AnnualWage + totalWages
    }
    if (appraisalObject && appraisalObject.owner6AnnualWage > 0) {
      totalWages = appraisalObject.owner6AnnualWage + totalWages
    }
    if (appraisalObject && appraisalObject.owner5AnnualWage > 0) {
      totalWages = appraisalObject.owner5AnnualWage + totalWages
    }
    if (appraisalObject && appraisalObject.owner4AnnualWage > 0) {
      totalWages = appraisalObject.owner4AnnualWage + totalWages
    }
    if (appraisalObject && appraisalObject.owner3AnnualWage > 0) {
      totalWages = appraisalObject.owner3AnnualWage + totalWages
    }
    if (appraisalObject && appraisalObject.owner2AnnualWage > 0) {
      totalWages = appraisalObject.owner2AnnualWage + totalWages
    }
    if (appraisalObject && appraisalObject.owner1AnnualWage > 0) {
      totalWages = appraisalObject.owner1AnnualWage + totalWages
    }

    return totalWages
  }

  render () {
    const { appraisalObject } = this.props
    // const {} = this.state
    return (
      <Segment style={{ backgroundColor: '#d4d4d53b' }} size="tiny">
        <Header as="h4" textAlign="center" color="blue">
          Summary of Financial
        </Header>
        <Grid celled="internally" divided>
          <Grid.Row columns={2}>
            <Grid.Column textAlign="center">
              <b>Last Year Profit</b>
            </Grid.Column>
            <Grid.Column textAlign="center">
              {numeral(this._lastYearProfit(appraisalObject)).format('$0,0.[99]')}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column textAlign="center">
              <b>Average Profitst</b>
            </Grid.Column>
            <Grid.Column textAlign="center">
              {numeral(this._averageProfits(appraisalObject)).format('$0,0.[99]')}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column textAlign="center">
              <b>Sales Latest Year VS Previous</b>
            </Grid.Column>
            <Grid.Column textAlign="center">
              {numeral(this._salesLatestYearVsPrevious(appraisalObject)).format('$0,0.[99]')}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column textAlign="center">
              <b>Profits Current VS Last Year</b>
            </Grid.Column>
            <Grid.Column textAlign="center">
              {numeral(this._profitsCurrentVsLastYear(appraisalObject)).format('$0,0.[99]')}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column textAlign="center">
              <b>Adj. Profits Latest Year VS Average</b>
            </Grid.Column>
            <Grid.Column textAlign="center">
              {numeral(this._adjProfitsLatestYearVsAverage(appraisalObject)).format('$0,0.[99]')}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column textAlign="center">
              <b>Gross Margins (Last VS Previous)</b>
            </Grid.Column>
            <Grid.Column textAlign="center">{`${this._grossMarginsLastVsPrevious(appraisalObject)}%`}</Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column textAlign="center">
              <b>Net Margins (Last VS Previous)</b>
            </Grid.Column>
            <Grid.Column textAlign="center">{`${this._netMarginsLastVsPrevious(appraisalObject)}%`}</Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

SummaryOfFinancialPage.propTypes = {
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
  appraisalObject: PropTypes.object,
  updateAppraisal: PropTypes.func
}

const mapPropsToValues = props => ({
  business_id: props.business ? props.business.id : '',
  id: props.appraisalObject ? props.appraisalObject.id : ''
})

const mapStateToProps = state => {
  return {}
}

const validationSchema = Yup.object().shape({})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateAppraisal
    },
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
    enableReinitialize: true
  })(SummaryOfFinancialPage)
)

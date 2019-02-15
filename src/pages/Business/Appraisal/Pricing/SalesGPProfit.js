import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Grid } from 'semantic-ui-react'
import * as Yup from 'yup'
import { updateAppraisal } from '../../../../redux/ducks/appraisal'
import numeral from 'numeral'

class SalesGPProfitPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      graph1: [],
      graph2: []
    }
  }

  render () {
    const { appraisalObject } = this.props
    // const {} = this.state
    return (
      <Grid celled="internally" divided>
        <Grid.Row columns={7}>
          <Grid.Column textAlign="center">
            <b>Summary</b>
          </Grid.Column>
          <Grid.Column textAlign="center">
            {appraisalObject && appraisalObject.sales1 > 0 ? <b>{appraisalObject.year1}</b> : null}
          </Grid.Column>
          <Grid.Column textAlign="center">
            {appraisalObject && appraisalObject.sales2 > 0 ? <b>{appraisalObject.year2}</b> : null}
          </Grid.Column>
          <Grid.Column textAlign="center">
            {appraisalObject && appraisalObject.sales3 > 0 ? <b>{appraisalObject.year3}</b> : null}
          </Grid.Column>
          <Grid.Column textAlign="center">
            {appraisalObject && appraisalObject.sales4 > 0 ? <b>{appraisalObject.year4}</b> : null}
          </Grid.Column>
          <Grid.Column textAlign="center">
            {appraisalObject && appraisalObject.sales5 > 0 ? <b>{appraisalObject.year5}</b> : null}
          </Grid.Column>
          <Grid.Column textAlign="center">
            {appraisalObject && appraisalObject.sales6 > 0 ? <b>{appraisalObject.year6} Annualised</b> : null}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={7}>
          <Grid.Column textAlign="center">Sales</Grid.Column>
          <Grid.Column textAlign="center">
            {appraisalObject && appraisalObject.sales1 > 0 ? numeral(appraisalObject.sales1).format('$0,0') : null}
          </Grid.Column>
          <Grid.Column textAlign="center">
            {appraisalObject && appraisalObject.sales2 > 0 ? numeral(appraisalObject.sales2).format('$0,0') : null}
          </Grid.Column>
          <Grid.Column textAlign="center">
            {appraisalObject && appraisalObject.sales3 > 0 ? numeral(appraisalObject.sales3).format('$0,0') : null}
          </Grid.Column>
          <Grid.Column textAlign="center">
            {appraisalObject && appraisalObject.sales4 > 0 ? numeral(appraisalObject.sales4).format('$0,0') : null}
          </Grid.Column>
          <Grid.Column textAlign="center">
            {appraisalObject && appraisalObject.sales5 > 0 ? numeral(appraisalObject.sales5).format('$0,0') : null}
          </Grid.Column>
          <Grid.Column textAlign="center">
            {appraisalObject && appraisalObject.sales6 > 0 ? numeral(appraisalObject.sales6).format('$0,0') : null}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={7}>
          <Grid.Column textAlign="center">Gross Profit ($)</Grid.Column>
          <Grid.Column textAlign="center">
            {appraisalObject && appraisalObject.grossProfit1 > 0
              ? numeral(appraisalObject.grossProfit1).format('$0,0')
              : null}
          </Grid.Column>
          <Grid.Column textAlign="center">
            {appraisalObject && appraisalObject.grossProfit2 > 0
              ? numeral(appraisalObject.grossProfit2).format('$0,0')
              : null}
          </Grid.Column>
          <Grid.Column textAlign="center">
            {appraisalObject && appraisalObject.grossProfit3 > 0
              ? numeral(appraisalObject.grossProfit3).format('$0,0')
              : null}
          </Grid.Column>
          <Grid.Column textAlign="center">
            {appraisalObject && appraisalObject.grossProfit4 > 0
              ? numeral(appraisalObject.grossProfit4).format('$0,0')
              : null}
          </Grid.Column>
          <Grid.Column textAlign="center">
            {appraisalObject && appraisalObject.grossProfit5 > 0
              ? numeral(appraisalObject.grossProfit5).format('$0,0')
              : null}
          </Grid.Column>
          <Grid.Column textAlign="center">
            {appraisalObject && appraisalObject.grossProfit6 > 0
              ? numeral(appraisalObject.grossProfit6).format('$0,0')
              : null}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={7}>
          <Grid.Column textAlign="center">Gross Profit (%)</Grid.Column>
          <Grid.Column textAlign="center">
            {appraisalObject && appraisalObject.grossMarginPerc1 > 0 ? `${appraisalObject.grossMarginPerc1}%` : null}
          </Grid.Column>
          <Grid.Column textAlign="center">
            {appraisalObject && appraisalObject.grossMarginPerc2 > 0 ? `${appraisalObject.grossMarginPerc2}%` : null}
          </Grid.Column>
          <Grid.Column textAlign="center">
            {appraisalObject && appraisalObject.grossMarginPerc3 > 0 ? `${appraisalObject.grossMarginPerc3}%` : null}
          </Grid.Column>
          <Grid.Column textAlign="center">
            {appraisalObject && appraisalObject.grossMarginPerc4 > 0 ? `${appraisalObject.grossMarginPerc4}%` : null}
          </Grid.Column>
          <Grid.Column textAlign="center">
            {appraisalObject && appraisalObject.grossMarginPerc5 > 0 ? `${appraisalObject.grossMarginPerc5}%` : null}
          </Grid.Column>
          <Grid.Column textAlign="center">
            {appraisalObject && appraisalObject.grossMarginPerc6 > 0 ? `${appraisalObject.grossMarginPerc6}%` : null}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={7}>
          <Grid.Column textAlign="center">
            <b>Adjusted Profit ($)</b>
          </Grid.Column>
          <Grid.Column textAlign="center">
            {appraisalObject && appraisalObject.totalAdjustedProfit1 > 0 ? (
              <b>{numeral(appraisalObject.totalAdjustedProfit1).format('$0,0')}</b>
            ) : null}
          </Grid.Column>
          <Grid.Column textAlign="center">
            {appraisalObject && appraisalObject.totalAdjustedProfit2 > 0 ? (
              <b>{numeral(appraisalObject.totalAdjustedProfit2).format('$0,0')}</b>
            ) : null}
          </Grid.Column>
          <Grid.Column textAlign="center">
            {appraisalObject && appraisalObject.totalAdjustedProfit3 > 0 ? (
              <b>{numeral(appraisalObject.totalAdjustedProfit3).format('$0,0')}</b>
            ) : null}
          </Grid.Column>
          <Grid.Column textAlign="center">
            {appraisalObject && appraisalObject.totalAdjustedProfit4 > 0 ? (
              <b>{numeral(appraisalObject.totalAdjustedProfit4).format('$0,0')}</b>
            ) : null}
          </Grid.Column>
          <Grid.Column textAlign="center">
            {appraisalObject && appraisalObject.totalAdjustedProfit5 > 0 ? (
              <b>{numeral(appraisalObject.totalAdjustedProfit5).format('$0,0')}</b>
            ) : null}
          </Grid.Column>
          <Grid.Column textAlign="center">
            {appraisalObject && appraisalObject.totalAdjustedProfit6 > 0 ? (
              <b>{numeral(appraisalObject.totalAdjustedProfit6).format('$0,0')}</b>
            ) : null}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={7}>
          <Grid.Column textAlign="center">Adjusted Profit (%)</Grid.Column>
          <Grid.Column textAlign="center">
            {appraisalObject && appraisalObject.adjustedProfitPerc1 > 0
              ? `${appraisalObject.adjustedProfitPerc1}%`
              : null}
          </Grid.Column>
          <Grid.Column textAlign="center">
            {appraisalObject && appraisalObject.adjustedProfitPerc2 > 0
              ? `${appraisalObject.adjustedProfitPerc2}%`
              : null}
          </Grid.Column>
          <Grid.Column textAlign="center">
            {appraisalObject && appraisalObject.adjustedProfitPerc3 > 0
              ? `${appraisalObject.adjustedProfitPerc3}%`
              : null}
          </Grid.Column>
          <Grid.Column textAlign="center">
            {appraisalObject && appraisalObject.adjustedProfitPerc4 > 0
              ? `${appraisalObject.adjustedProfitPerc4}%`
              : null}
          </Grid.Column>
          <Grid.Column textAlign="center">
            {appraisalObject && appraisalObject.adjustedProfitPerc5 > 0
              ? `${appraisalObject.adjustedProfitPerc5}%`
              : null}
          </Grid.Column>
          <Grid.Column textAlign="center">
            {appraisalObject && appraisalObject.adjustedProfitPerc6 > 0
              ? `${appraisalObject.adjustedProfitPerc6}%`
              : null}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

SalesGPProfitPage.propTypes = {
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
  })(SalesGPProfitPage)
)

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

  render () {
    // const {} = this.state
    return (
      <Segment style={{ backgroundColor: '#d4d4d53b' }} size="tiny">
        <Header as="h4" textAlign="center" color="blue">
          Summary of Financial
        </Header>
        <Grid celled="internally" divided>
          <Grid.Row columns={2}>
            <Grid.Column textAlign="center">
              <b>EBITDA Last Year</b>
            </Grid.Column>
            <Grid.Column textAlign="right">{numeral(this.props._ebitdaLastYear).format('$0,0')}</Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column textAlign="center">
              <b>EBITDA Avg</b>
            </Grid.Column>
            <Grid.Column textAlign="right">{numeral(this.props._ebitdaAvg).format('$0,0')}</Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column textAlign="center">
              <b>PEBITDA Last Year</b>
            </Grid.Column>
            <Grid.Column textAlign="right">{numeral(this.props._pebitdaLastYear).format('$0,0')}</Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column textAlign="center">
              <b>PEBITDA Avg</b>
            </Grid.Column>
            <Grid.Column textAlign="right">{numeral(this.props._pebitdaAvg).format('$0,0')}</Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column textAlign="center">
              <b>Stock Value</b>
            </Grid.Column>
            <Grid.Column textAlign="right">{numeral(this.props._stockValue).format('$0,0')}</Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column textAlign="center">
              <b>Necessary Stock Value</b>
            </Grid.Column>
            <Grid.Column textAlign="right">{numeral(this.props._necessaryStockValue).format('$0,0')}</Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column textAlign="center">
              <b>Assets Value</b>
            </Grid.Column>
            <Grid.Column textAlign="right">{numeral(this.props._assetsValue).format('$0,0')}</Grid.Column>
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
  updateAppraisal: PropTypes.func,
  _ebitdaLastYear: PropTypes.number,
  _ebitdaAvg: PropTypes.number,
  _totalWages: PropTypes.number,
  _pebitdaLastYear: PropTypes.number,
  _pebitdaAvg: PropTypes.number,
  _stockValue: PropTypes.number,
  _necessaryStockValue: PropTypes.number,
  _assetsValue: PropTypes.number
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

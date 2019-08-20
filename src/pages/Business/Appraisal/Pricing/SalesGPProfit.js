import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Grid, Form } from 'semantic-ui-react'
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

  _handleChangeCheckBox = (e, { name }) => {
    this.props.setFieldValue(name, !this.props.values[name])
  }

  render () {
    const { appraisalObject, values } = this.props
    // const {} = this.state
    return (
      <Grid celled="internally" divided centered columns={2}>
        <Grid.Column width={8}>
          <Grid celled="internally" divided justify="left">
            <Grid.Row columns={7}>
              <Grid.Column textAlign="center">
                <b>Summary</b>
              </Grid.Column>
              <Grid.Column textAlign="center">
                <Form.Field style={{ marginLeft: '-10px' }}>
                  <Form.Checkbox
                    label="Included"
                    name="renderPdfYear1"
                    checked={values.renderPdfYear1}
                    onChange={this._handleChangeCheckBox}
                  />
                </Form.Field>
                <b>{appraisalObject.year1}</b> <br />
              </Grid.Column>
              <Grid.Column textAlign="center">
                <Form.Field style={{ marginLeft: '-10px' }}>
                  <Form.Checkbox
                    label="Included"
                    name="renderPdfYear2"
                    checked={values.renderPdfYear2}
                    onChange={this._handleChangeCheckBox}
                  />
                </Form.Field>
                <b>{appraisalObject.year2}</b> <br />
              </Grid.Column>
              <Grid.Column textAlign="center">
                <Form.Field style={{ marginLeft: '-10px' }}>
                  <Form.Checkbox
                    label="Included"
                    name="renderPdfYear3"
                    checked={values.renderPdfYear3}
                    onChange={this._handleChangeCheckBox}
                  />
                </Form.Field>
                <b>{appraisalObject.year3}</b> <br />
              </Grid.Column>
              <Grid.Column textAlign="center">
                <Form.Field style={{ marginLeft: '-10px' }}>
                  <Form.Checkbox
                    label="Included"
                    name="renderPdfYear4"
                    checked={values.renderPdfYear4}
                    onChange={this._handleChangeCheckBox}
                  />
                </Form.Field>
                <b>{appraisalObject.year4}</b>
                <br />
              </Grid.Column>
              <Grid.Column textAlign="center">
                <Form.Field style={{ marginLeft: '-10px' }}>
                  <Form.Checkbox
                    label="Included"
                    name="renderPdfYear5"
                    checked={values.renderPdfYear5}
                    onChange={this._handleChangeCheckBox}
                  />
                </Form.Field>
                <b>{appraisalObject.year5}</b> <br />
              </Grid.Column>
              <Grid.Column textAlign="center">
                <Form.Field style={{ marginLeft: '-10px' }}>
                  <Form.Checkbox
                    label="Included"
                    name="renderPdfYear7"
                    checked={values.renderPdfYear7}
                    onChange={this._handleChangeCheckBox}
                  />
                </Form.Field>
                <b>{appraisalObject.year7} Annualised </b> <br />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={7}>
              <Grid.Column textAlign="center">Sales</Grid.Column>
              <Grid.Column textAlign="right">
                {appraisalObject && appraisalObject.sales1 !== 0
                  ? numeral(appraisalObject.sales1).format('$0,0')
                  : null}
              </Grid.Column>
              <Grid.Column textAlign="right">
                {appraisalObject && appraisalObject.sales2 !== 0
                  ? numeral(appraisalObject.sales2).format('$0,0')
                  : null}
              </Grid.Column>
              <Grid.Column textAlign="right">
                {appraisalObject && appraisalObject.sales3 !== 0
                  ? numeral(appraisalObject.sales3).format('$0,0')
                  : null}
              </Grid.Column>
              <Grid.Column textAlign="right">
                {appraisalObject && appraisalObject.sales4 !== 0
                  ? numeral(appraisalObject.sales4).format('$0,0')
                  : null}
              </Grid.Column>
              <Grid.Column textAlign="right">
                {appraisalObject && appraisalObject.sales5 !== 0
                  ? numeral(appraisalObject.sales5).format('$0,0')
                  : null}
              </Grid.Column>
              <Grid.Column textAlign="right">
                {appraisalObject &&
                parseInt(appraisalObject.calcAnnualised1) !== 0 &&
                appraisalObject.calcAnnualised1 !== null
                  ? numeral(appraisalObject.calcAnnualised1).format('$0,0')
                  : null}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={7}>
              <Grid.Column textAlign="center">Gross Profit ($)</Grid.Column>
              <Grid.Column textAlign="right">
                {appraisalObject && parseInt(appraisalObject.calcGrossProfit1) !== 0
                  ? numeral(appraisalObject.calcGrossProfit1).format('$0,0')
                  : null}
              </Grid.Column>
              <Grid.Column textAlign="right">
                {appraisalObject && parseInt(appraisalObject.calcGrossProfit2) !== 0
                  ? numeral(appraisalObject.calcGrossProfit2).format('$0,0')
                  : null}
              </Grid.Column>
              <Grid.Column textAlign="right">
                {appraisalObject && parseInt(appraisalObject.calcGrossProfit3) !== 0
                  ? numeral(appraisalObject.calcGrossProfit3).format('$0,0')
                  : null}
              </Grid.Column>
              <Grid.Column textAlign="right">
                {appraisalObject && parseInt(appraisalObject.calcGrossProfit4) !== 0
                  ? numeral(appraisalObject.calcGrossProfit4).format('$0,0')
                  : null}
              </Grid.Column>
              <Grid.Column textAlign="right">
                {appraisalObject && parseInt(appraisalObject.calcGrossProfit5) !== 0
                  ? numeral(appraisalObject.calcGrossProfit5).format('$0,0')
                  : null}
              </Grid.Column>
              <Grid.Column textAlign="right">
                {appraisalObject && parseInt(appraisalObject.calcGrossProfit7) !== 0
                  ? numeral(appraisalObject.calcGrossProfit7).format('$0,0')
                  : null}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={7}>
              <Grid.Column textAlign="center">Gross Profit (%)</Grid.Column>
              <Grid.Column textAlign="right">
                {appraisalObject && parseInt(appraisalObject.calcOperatingProfitPerc1) !== 0
                  ? `${Math.round(appraisalObject.calcOperatingProfitPerc1)}%`
                  : null}
              </Grid.Column>
              <Grid.Column textAlign="right">
                {appraisalObject && parseInt(appraisalObject.calcOperatingProfitPerc2) !== 0
                  ? `${Math.round(appraisalObject.calcOperatingProfitPerc2)}%`
                  : null}
              </Grid.Column>
              <Grid.Column textAlign="right">
                {appraisalObject && parseInt(appraisalObject.calcOperatingProfitPerc3) !== 0
                  ? `${Math.round(appraisalObject.calcOperatingProfitPerc3)}%`
                  : null}
              </Grid.Column>
              <Grid.Column textAlign="right">
                {appraisalObject && parseInt(appraisalObject.calcOperatingProfitPerc4) !== 0
                  ? `${Math.round(appraisalObject.calcOperatingProfitPerc4)}%`
                  : null}
              </Grid.Column>
              <Grid.Column textAlign="right">
                {appraisalObject && parseInt(appraisalObject.calcOperatingProfitPerc5) !== 0
                  ? `${Math.round(appraisalObject.calcOperatingProfitPerc5)}%`
                  : null}
              </Grid.Column>
              <Grid.Column textAlign="right">
                {appraisalObject && parseInt(appraisalObject.calcOperatingProfitPerc7) !== 0
                  ? `${Math.round(appraisalObject.calcOperatingProfitPerc7)}%`
                  : null}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={7}>
              <Grid.Column textAlign="center">
                <b>Adjusted Profit ($)</b>
              </Grid.Column>
              <Grid.Column textAlign="right">
                {appraisalObject && parseInt(appraisalObject.totalAdjustedProfit1) !== 0 ? (
                  <b>{numeral(appraisalObject.totalAdjustedProfit1).format('$0,0')}</b>
                ) : null}
              </Grid.Column>
              <Grid.Column textAlign="right">
                {appraisalObject && parseInt(appraisalObject.totalAdjustedProfit2) !== 0 ? (
                  <b>{numeral(appraisalObject.totalAdjustedProfit2).format('$0,0')}</b>
                ) : null}
              </Grid.Column>
              <Grid.Column textAlign="right">
                {appraisalObject && parseInt(appraisalObject.totalAdjustedProfit3) !== 0 ? (
                  <b>{numeral(appraisalObject.totalAdjustedProfit3).format('$0,0')}</b>
                ) : null}
              </Grid.Column>
              <Grid.Column textAlign="right">
                {appraisalObject && parseInt(appraisalObject.totalAdjustedProfit4) !== 0 ? (
                  <b>{numeral(appraisalObject.totalAdjustedProfit4).format('$0,0')}</b>
                ) : null}
              </Grid.Column>
              <Grid.Column textAlign="right">
                {appraisalObject && parseInt(appraisalObject.totalAdjustedProfit5) !== 0 ? (
                  <b>{numeral(appraisalObject.totalAdjustedProfit5).format('$0,0')}</b>
                ) : null}
              </Grid.Column>
              <Grid.Column textAlign="right">
                {appraisalObject && parseInt(appraisalObject.totalAdjustedProfit7) !== 0 ? (
                  <b>{numeral(appraisalObject.totalAdjustedProfit7).format('$0,0')}</b>
                ) : null}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={7}>
              <Grid.Column textAlign="center">Adjusted Profit (%)</Grid.Column>
              <Grid.Column textAlign="right">
                {appraisalObject &&
                parseInt(appraisalObject.adjustedProfitPerc1) !== 0 &&
                appraisalObject.adjustedProfitPerc1 !== null
                  ? `${appraisalObject.adjustedProfitPerc1}%`
                  : null}
              </Grid.Column>
              <Grid.Column textAlign="right">
                {appraisalObject &&
                parseInt(appraisalObject.adjustedProfitPerc2) !== 0 &&
                appraisalObject.adjustedProfitPerc2 !== null
                  ? `${appraisalObject.adjustedProfitPerc2}%`
                  : null}
              </Grid.Column>
              <Grid.Column textAlign="right">
                {appraisalObject &&
                parseInt(appraisalObject.adjustedProfitPerc3) !== 0 &&
                appraisalObject.adjustedProfitPerc3 !== null
                  ? `${appraisalObject.adjustedProfitPerc3}%`
                  : null}
              </Grid.Column>
              <Grid.Column textAlign="right">
                {appraisalObject &&
                parseInt(appraisalObject.adjustedProfitPerc4) !== 0 &&
                appraisalObject.adjustedProfitPerc4 !== null
                  ? `${appraisalObject.adjustedProfitPerc4}%`
                  : null}
              </Grid.Column>
              <Grid.Column textAlign="right">
                {appraisalObject &&
                parseInt(appraisalObject.adjustedProfitPerc5) !== 0 &&
                appraisalObject.adjustedProfitPerc5 !== null
                  ? `${appraisalObject.adjustedProfitPerc5}%`
                  : null}
              </Grid.Column>
              <Grid.Column textAlign="right">
                {appraisalObject &&
                parseInt(appraisalObject.adjustedProfitPerc7) !== 0 &&
                appraisalObject.adjustedProfitPerc7 !== null
                  ? `${appraisalObject.adjustedProfitPerc7}%`
                  : null}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>
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
  id: props.appraisalObject ? props.appraisalObject.id : '',
  renderPdfYear1: props.appraisalObject ? props.appraisalObject.renderPdfYear1 : '',
  renderPdfYear2: props.appraisalObject ? props.appraisalObject.renderPdfYear2 : '',
  renderPdfYear3: props.appraisalObject ? props.appraisalObject.renderPdfYear3 : '',
  renderPdfYear4: props.appraisalObject ? props.appraisalObject.renderPdfYear4 : '',
  renderPdfYear5: props.appraisalObject ? props.appraisalObject.renderPdfYear5 : '',
  renderPdfYear7: props.appraisalObject ? props.appraisalObject.renderPdfYear7 : ''
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

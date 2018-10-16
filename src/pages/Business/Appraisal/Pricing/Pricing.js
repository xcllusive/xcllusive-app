import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Message, Step, Segment, Grid, Form } from 'semantic-ui-react'
import * as Yup from 'yup'
import Wrapper from '../../../../components/content/Wrapper'
import { updateAppraisal } from '../../../../redux/ducks/appraisal'
import SalesGPProfit from './SalesGPProfit'
import Charts from './Charts'
import SummaryOfFinancial from './SummaryOfFinancial'
import OwnersMarketWages from './OwnersMarketWages'
import numeral from 'numeral'

class PricingPage extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  _handleChangeCheckBox = (name, value) => {
    this.props.setFieldValue(name, value)
  }

  _ebitdaLastYear = appraisalObject => {
    if (appraisalObject && appraisalObject.totalAdjustedProfit7 > 0) {
      return appraisalObject.totalAdjustedProfit7 - this._totalWages(appraisalObject)
    }
    if (appraisalObject && appraisalObject.totalAdjustedProfit6 > 0) {
      return appraisalObject.totalAdjustedProfit6 - this._totalWages(appraisalObject)
    }
    if (appraisalObject && appraisalObject.totalAdjustedProfit5 > 0) {
      return appraisalObject.totalAdjustedProfit5 - this._totalWages(appraisalObject)
    }
    if (appraisalObject && appraisalObject.totalAdjustedProfit4 > 0) {
      return appraisalObject.totalAdjustedProfit4 - this._totalWages(appraisalObject)
    }
    if (appraisalObject && appraisalObject.totalAdjustedProfit3 > 0) {
      return appraisalObject.totalAdjustedProfit3 - this._totalWages(appraisalObject)
    }
    if (appraisalObject && appraisalObject.totalAdjustedProfit2 > 0) {
      return appraisalObject.totalAdjustedProfit2 - this._totalWages(appraisalObject)
    }
    if (appraisalObject && appraisalObject.totalAdjustedProfit1 > 0) {
      return appraisalObject.totalAdjustedProfit1 - this._totalWages(appraisalObject)
    }
  }

  _ebitdaAvg = appraisalObject => {
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

    return totalYear / count - this._totalWages(appraisalObject)
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

  _pebitdaLastYear = appraisalObject => {
    if (appraisalObject && appraisalObject.totalAdjustedProfit7 > 0) {
      return (
        appraisalObject.totalAdjustedProfit7 - (this._totalWages(appraisalObject) - appraisalObject.owner1AnnualWage)
      )
    }
    if (appraisalObject && appraisalObject.totalAdjustedProfit6 > 0) {
      return (
        appraisalObject.totalAdjustedProfit6 - (this._totalWages(appraisalObject) - appraisalObject.owner1AnnualWage)
      )
    }
    if (appraisalObject && appraisalObject.totalAdjustedProfit5 > 0) {
      return (
        appraisalObject.totalAdjustedProfit5 - (this._totalWages(appraisalObject) - appraisalObject.owner1AnnualWage)
      )
    }
    if (appraisalObject && appraisalObject.totalAdjustedProfit4 > 0) {
      return (
        appraisalObject.totalAdjustedProfit4 - (this._totalWages(appraisalObject) - appraisalObject.owner1AnnualWage)
      )
    }
    if (appraisalObject && appraisalObject.totalAdjustedProfit3 > 0) {
      return (
        appraisalObject.totalAdjustedProfit3 - (this._totalWages(appraisalObject) - appraisalObject.owner1AnnualWage)
      )
    }
    if (appraisalObject && appraisalObject.totalAdjustedProfit2 > 0) {
      return (
        appraisalObject.totalAdjustedProfit2 - (this._totalWages(appraisalObject) - appraisalObject.owner1AnnualWage)
      )
    }
    if (appraisalObject && appraisalObject.totalAdjustedProfit1 > 0) {
      return (
        appraisalObject.totalAdjustedProfit1 - (this._totalWages(appraisalObject) - appraisalObject.owner1AnnualWage)
      )
    }
  }

  _pebitdaAvg = appraisalObject => {
    return this._ebitdaAvg(appraisalObject) + appraisalObject.owner1AnnualWage
  }

  _ebitdaLastYearWithStock = appraisalObject => {
    return (appraisalObject.soldPrice + appraisalObject.currentStockLevel) / this._ebitdaLastYear(appraisalObject)
  }

  _stockValue = appraisalObject => {
    return appraisalObject.currentStockLevel
  }

  _necessaryStockValue = appraisalObject => {
    return appraisalObject.stockNecessary
  }

  _assetsValue = appraisalObject => {
    return appraisalObject.physicalAssetValue
  }

  _turnOver = appraisalObject => {
    if (appraisalObject && appraisalObject.sales7 > 0) return appraisalObject.sales7
    if (appraisalObject && appraisalObject.sales6 > 0) return appraisalObject.sales6
    if (appraisalObject && appraisalObject.sales5 > 0) return appraisalObject.sales5
    if (appraisalObject && appraisalObject.sales4 > 0) return appraisalObject.sales4
    if (appraisalObject && appraisalObject.sales3 > 0) return appraisalObject.sales3
    if (appraisalObject && appraisalObject.sales2 > 0) return appraisalObject.sales2
    if (appraisalObject && appraisalObject.sales1 > 0) return appraisalObject.sales1
  }

  render () {
    const { appraisalObject, values } = this.props
    // const {} = this.state
    return (
      <Wrapper>
        <Step.Group size="large">
          <Step active icon="calculator" title="Step 5" description="Pricing" />
          <Message info size="large">
            <p>
              On this page you can assess the results of your financial inputs and Financial Analysis in order to
              identify the best pricing method for the business.
            </p>
          </Message>
        </Step.Group>
        <Segment style={{ backgroundColor: '#d4d4d53b' }} size="tiny">
          <SalesGPProfit appraisalObject={appraisalObject} />
        </Segment>
        <Segment style={{ backgroundColor: '#ecf4fb' }}>
          <Charts appraisalObject={appraisalObject} />
        </Segment>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              {appraisalObject ? (
                <SummaryOfFinancial
                  appraisalObject={appraisalObject}
                  _ebitdaLastYear={this._ebitdaLastYear(appraisalObject)}
                  _totalWages={this._totalWages(appraisalObject)}
                  _pebitdaLastYear={this._pebitdaLastYear(appraisalObject)}
                  _ebitdaAvg={this._ebitdaAvg(appraisalObject)}
                  _pebitdaAvg={this._pebitdaAvg(appraisalObject)}
                  _stockValue={this._stockValue(appraisalObject)}
                  _necessaryStockValue={this._necessaryStockValue(appraisalObject)}
                  _assetsValue={this._assetsValue(appraisalObject)}
                />
              ) : null}
            </Grid.Column>
            <Grid.Column>
              {appraisalObject ? <OwnersMarketWages appraisalObject={appraisalObject} /> : null}
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Segment style={{ backgroundColor: '#ecf4fb' }} size="tiny">
          <Grid celled="internally" divided>
            <Grid.Row columns={11}>
              <Grid.Column />
              <Grid.Column textAlign="center">Multiplier EBITA Last Year</Grid.Column>
              <Grid.Column textAlign="center">Multiplier EBITA Avg</Grid.Column>
              <Grid.Column textAlign="center">Multiplier PEBITA Last Year</Grid.Column>
              <Grid.Column textAlign="center">Multiplier PEBITA AVG</Grid.Column>
              <Grid.Column textAlign="center">Multiplier EBITA Last Year with Stock</Grid.Column>
              <Grid.Column textAlign="center">Multiplier EBITA Avg with Stock</Grid.Column>
              <Grid.Column textAlign="center">Multiplier PEBITA Last Year with Stock</Grid.Column>
              <Grid.Column textAlign="center">Multiplier PEBITA AVG with Stock</Grid.Column>
              <Grid.Column textAlign="center">Multiplier T/O</Grid.Column>
              <Grid.Column textAlign="center">Assets Value</Grid.Column>
            </Grid.Row>
            <Grid.Row columns={11}>
              <Grid.Column>
                <b>Summary</b>
              </Grid.Column>
              <Grid.Column textAlign="center">{appraisalObject ? appraisalObject.sumMEbitdaLastYear : 0}</Grid.Column>
              <Grid.Column textAlign="center">{appraisalObject ? appraisalObject.sumMEbitdaAvg : 0}</Grid.Column>
              <Grid.Column textAlign="center">{appraisalObject ? appraisalObject.sumMPebitdaLastYear : 0}</Grid.Column>
              <Grid.Column textAlign="center">{appraisalObject ? appraisalObject.sumMPebitdaAvg : 0}</Grid.Column>
              <Grid.Column textAlign="center">
                {appraisalObject ? appraisalObject.sumMEbitdaLastYearWithStock : 0}
              </Grid.Column>
              <Grid.Column textAlign="center">
                {appraisalObject ? appraisalObject.sumMEbitdaAvgWithStock : 0}
              </Grid.Column>
              <Grid.Column textAlign="center">
                {appraisalObject ? appraisalObject.sumMPebitdaLastYearWithStock : 0}
              </Grid.Column>
              <Grid.Column textAlign="center">
                {appraisalObject ? appraisalObject.sumMPebitdaAvgWithStock : 0}
              </Grid.Column>
              <Grid.Column textAlign="center">{appraisalObject ? appraisalObject.sumMTO : 0}</Grid.Column>
              <Grid.Column textAlign="center">{appraisalObject ? appraisalObject.sumAssetsValue : 0}</Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment style={{ backgroundColor: '#d4d4d53b' }} size="tiny">
          <Grid celled="internally" divided>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Form size="tiny">
                  <Form.Field>
                    <Form.Checkbox
                      label="Multiplier EBITA Last Year"
                      name="pricingMethod"
                      onChange={() => this._handleChangeCheckBox('pricingMethod', 1)}
                      checked={values.pricingMethod === 1}
                    />
                  </Form.Field>
                </Form>
              </Grid.Column>
              <Grid.Column>
                {appraisalObject
                  ? numeral(this._ebitdaLastYear(appraisalObject) * appraisalObject.sumMEbitdaLastYear).format(
                    '$0,0.[99]'
                  )
                  : 0}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Form size="tiny">
                  <Form.Field>
                    <Form.Checkbox
                      label="Multiplier EBITA Avg"
                      name="pricingMethod"
                      onChange={() => this._handleChangeCheckBox('pricingMethod', 2)}
                      checked={values.pricingMethod === 2}
                    />
                  </Form.Field>
                </Form>
              </Grid.Column>
              <Grid.Column>
                {appraisalObject
                  ? numeral(this._ebitdaAvg(appraisalObject) * appraisalObject.sumMEbitdaAvg).format('$0,0.[99]')
                  : 0}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Form size="tiny">
                  <Form.Field>
                    <Form.Checkbox
                      label="Multiplier PEBITA Last Year"
                      name="pricingMethod"
                      onChange={() => this._handleChangeCheckBox('pricingMethod', 3)}
                      checked={values.pricingMethod === 3}
                    />
                  </Form.Field>
                </Form>
              </Grid.Column>
              <Grid.Column>
                {appraisalObject
                  ? numeral(this._pebitdaLastYear(appraisalObject) * appraisalObject.sumMPebitdaLastYear).format(
                    '$0,0.[99]'
                  )
                  : 0}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Form size="tiny">
                  <Form.Field>
                    <Form.Checkbox
                      label="Multiplier PEBITA Avg"
                      name="pricingMethod"
                      onChange={() => this._handleChangeCheckBox('pricingMethod', 4)}
                      checked={values.pricingMethod === 4}
                    />
                  </Form.Field>
                </Form>
              </Grid.Column>
              <Grid.Column>
                {appraisalObject
                  ? numeral(this._pebitdaAvg(appraisalObject) * appraisalObject.sumMPebitdaAvg).format('$0,0.[99]')
                  : 0}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Form size="tiny">
                  <Form.Field>
                    <Form.Checkbox
                      label="Multiplier EBITA Last Year with Stock"
                      name="pricingMethod"
                      onChange={() => this._handleChangeCheckBox('pricingMethod', 5)}
                      checked={values.pricingMethod === 5}
                    />
                  </Form.Field>
                </Form>
              </Grid.Column>
              <Grid.Column>
                {appraisalObject
                  ? numeral(this._ebitdaLastYear(appraisalObject) * appraisalObject.sumMEbitdaLastYearWithStock).format(
                    '$0,0.[99]'
                  )
                  : 0}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Form size="tiny">
                  <Form.Field>
                    <Form.Checkbox
                      label="Multiplier EBITA Avg with Stock"
                      name="pricingMethod"
                      onChange={() => this._handleChangeCheckBox('pricingMethod', 6)}
                      checked={values.pricingMethod === 6}
                    />
                  </Form.Field>
                </Form>
              </Grid.Column>
              <Grid.Column>
                {appraisalObject
                  ? numeral(this._ebitdaAvg(appraisalObject) * appraisalObject.sumMEbitdaAvgWithStock).format(
                    '$0,0.[99]'
                  )
                  : 0}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Form size="tiny">
                  <Form.Field>
                    <Form.Checkbox
                      label="Multiplier PEBITA Last Year with Stock"
                      name="pricingMethod"
                      onChange={() => this._handleChangeCheckBox('pricingMethod', 7)}
                      checked={values.pricingMethod === 7}
                    />
                  </Form.Field>
                </Form>
              </Grid.Column>
              <Grid.Column>
                {appraisalObject
                  ? numeral(
                    this._pebitdaLastYear(appraisalObject) * appraisalObject.sumMPebitdaLastYearWithStock
                  ).format('$0,0.[99]')
                  : 0}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Form size="tiny">
                  <Form.Field>
                    <Form.Checkbox
                      label="Multiplier PEBITA Avg with Stock"
                      name="pricingMethod"
                      onChange={() => this._handleChangeCheckBox('pricingMethod', 8)}
                      checked={values.pricingMethod === 8}
                    />
                  </Form.Field>
                </Form>
              </Grid.Column>
              <Grid.Column>
                {appraisalObject
                  ? numeral(this._pebitdaAvg(appraisalObject) * appraisalObject.sumMPebitdaAvgWithStock).format(
                    '$0,0.[99]'
                  )
                  : 0}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Form size="tiny">
                  <Form.Field>
                    <Form.Checkbox
                      label="T/O Multiplier"
                      name="pricingMethod"
                      onChange={() => this._handleChangeCheckBox('pricingMethod', 9)}
                      checked={values.pricingMethod === 9}
                    />
                  </Form.Field>
                </Form>
              </Grid.Column>
              <Grid.Column>
                {appraisalObject
                  ? numeral(this._turnOver(appraisalObject) * appraisalObject.sumMTO).format('$0,0.[99]')
                  : 0}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Form size="tiny">
                  <Form.Field>
                    <Form.Checkbox
                      label="Assets Value"
                      name="pricingMethod"
                      onChange={() => this._handleChangeCheckBox('pricingMethod', 10)}
                      checked={values.pricingMethod === 10}
                    />
                  </Form.Field>
                </Form>
              </Grid.Column>
              <Grid.Column>
                {appraisalObject
                  ? numeral(this._assetsValue(appraisalObject) * appraisalObject.sumAssetsValue).format('$0,0.[99]')
                  : 0}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Form size="tiny">
                  <Form.Field>
                    <Form.Checkbox
                      label="Agreed Value"
                      name="pricingMethod"
                      onChange={() => this._handleChangeCheckBox('pricingMethod', 11)}
                      checked={values.pricingMethod === 11}
                    />
                  </Form.Field>
                </Form>
              </Grid.Column>
              <Grid.Column>test</Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Wrapper>
    )
  }
}

PricingPage.propTypes = {
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
  pricingMethod: props.appraisalObject ? props.appraisalObject.pricingMethod : 1
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
  })(PricingPage)
)

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Message, Step, Segment, Grid, Form, Header, Label } from 'semantic-ui-react'
import * as Yup from 'yup'
import Wrapper from '../../../../components/content/Wrapper'
import { updateAppraisal } from '../../../../redux/ducks/appraisal'
import SalesGPProfit from './SalesGPProfit'
import Charts from './Charts'
import SummaryOfFinancial from './SummaryOfFinancial'
import OwnersMarketWages from './OwnersMarketWages'
import numeral from 'numeral'
import { Slider } from 'react-semantic-ui-range'

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

  _handleChangeSlider = (value, name) => {
    this.props.setFieldValue(name, value)
  }

  _labelPricingMethod = pricingMethod => {
    if (pricingMethod === 1 || pricingMethod === 5) return 'Multiplier EBITDA Last Year'
    if (pricingMethod === 2 || pricingMethod === 6) return 'Multiplier EBITDA Avg'
    if (pricingMethod === 3 || pricingMethod === 7) return 'Multiplier PEBITDA Last Year'
    if (pricingMethod === 4 || pricingMethod === 8) return 'Multiplier PEBITDA Avg'
  }

  _pricingMethod = (pricingMethod, appraisalObject) => {
    if (pricingMethod === 1 || pricingMethod === 5) return this._ebitdaLastYear(appraisalObject)
    if (pricingMethod === 2 || pricingMethod === 6) return this._ebitdaAvg(appraisalObject)
    if (pricingMethod === 3 || pricingMethod === 7) return this._pebitdaLastYear(appraisalObject)
    if (pricingMethod === 4 || pricingMethod === 8) return this._pebitdaAvg(appraisalObject)

    // if (value === 9) return this._ebitdaAvg(appraisalObject)
    // if (value === 10) return this._ebitdaAvg(appraisalObject)
    // if (value === 11) return this._ebitdaAvg(appraisalObject)
  }

  _comparableMultiplier = (pricingMethod, appraisalObject) => {
    if (pricingMethod === 1) return appraisalObject.sumMEbitdaLastYear
    if (pricingMethod === 2) return appraisalObject.sumMEbitdaAvg
    if (pricingMethod === 3) return appraisalObject.sumMPebitdaLastYear
    if (pricingMethod === 4) return appraisalObject.sumMPebitdaAvg
    if (pricingMethod === 5) return appraisalObject.sumMEbitdaLastYearWithStock
    if (pricingMethod === 6) return appraisalObject.sumMEbitdaAvgWithStock
    if (pricingMethod === 7) return appraisalObject.sumMPebitdaLastYearWithStock
    if (pricingMethod === 8) return appraisalObject.sumMPebitdaAvgWithStock
    if (pricingMethod === 9) return appraisalObject.sumMTO
  }

  _priceBasedOnComparable = (pricingMethod, appraisalObject) => {
    return (
      this._pricingMethod(pricingMethod, appraisalObject) * this._comparableMultiplier(pricingMethod, appraisalObject)
    )
  }

  _riskPremium = (values, appraisalObject) => {
    const calc = this._priceBasedOnComparable(values.pricingMethod, appraisalObject)
    return (calc * values.sliderPremium) / 100
  }

  _riskNegotiation = (values, appraisalObject) => {
    const calc = this._priceBasedOnComparable(values.pricingMethod, appraisalObject)
    return (calc * values.sliderNegotiation) / 100
  }

  _askingPrice = (values, appraisalObject) => {
    return (
      this._priceBasedOnComparable(values.pricingMethod, appraisalObject) +
      this._riskPremium(values, appraisalObject) +
      this._riskNegotiation(values, appraisalObject)
    )
  }

  _askingPriceMultiplo = (values, appraisalObject) => {
    return this._askingPrice(values, appraisalObject) / this._pricingMethod(values.pricingMethod, appraisalObject)
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
        <Segment style={{ backgroundColor: '#d4d4d53b' }} size="tiny">
          <Grid celled="internally" divided>
            <Grid.Row columns={3}>
              <Grid.Column>
                <Header as="h4" textAlign="center" color="blue">
                  Select Pricing Method
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Header as="h4" textAlign="center" color="blue">
                  Multipliers
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Header as="h4" textAlign="center" color="blue">
                  Pricing Method Previews
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={3}>
              <Grid.Column>
                <Form size="tiny">
                  <Form.Field>
                    <Form.Checkbox
                      label="Multiplier EBITDA Last Year"
                      name="pricingMethod"
                      onChange={() => this._handleChangeCheckBox('pricingMethod', 1)}
                      checked={values.pricingMethod === 1}
                    />
                  </Form.Field>
                </Form>
              </Grid.Column>
              <Grid.Column textAlign="center">
                {appraisalObject ? numeral(appraisalObject.sumMEbitdaLastYear).format('0,0.[99]') : 0}
              </Grid.Column>
              <Grid.Column>
                {appraisalObject
                  ? numeral(this._ebitdaLastYear(appraisalObject) * appraisalObject.sumMEbitdaLastYear).format(
                    '$0,0.[99]'
                  )
                  : 0}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={3}>
              <Grid.Column>
                <Form size="tiny">
                  <Form.Field>
                    <Form.Checkbox
                      label="Multiplier EBITDA Avg"
                      name="pricingMethod"
                      onChange={() => this._handleChangeCheckBox('pricingMethod', 2)}
                      checked={values.pricingMethod === 2}
                    />
                  </Form.Field>
                </Form>
              </Grid.Column>
              <Grid.Column textAlign="center">
                {appraisalObject ? numeral(appraisalObject.sumMEbitdaAvg).format('0,0.[99]') : 0}
              </Grid.Column>
              <Grid.Column>
                {appraisalObject
                  ? numeral(this._ebitdaAvg(appraisalObject) * appraisalObject.sumMEbitdaAvg).format('$0,0.[99]')
                  : 0}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={3}>
              <Grid.Column>
                <Form size="tiny">
                  <Form.Field>
                    <Form.Checkbox
                      label="Multiplier PEBITDA Last Year"
                      name="pricingMethod"
                      onChange={() => this._handleChangeCheckBox('pricingMethod', 3)}
                      checked={values.pricingMethod === 3}
                    />
                  </Form.Field>
                </Form>
              </Grid.Column>
              <Grid.Column textAlign="center">
                {appraisalObject ? numeral(appraisalObject.sumMPebitdaLastYear).format('0,0.[99]') : 0}
              </Grid.Column>
              <Grid.Column>
                {appraisalObject
                  ? numeral(this._pebitdaLastYear(appraisalObject) * appraisalObject.sumMPebitdaLastYear).format(
                    '$0,0.[99]'
                  )
                  : 0}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={3}>
              <Grid.Column>
                <Form size="tiny">
                  <Form.Field>
                    <Form.Checkbox
                      label="Multiplier PEBITDA Avg"
                      name="pricingMethod"
                      onChange={() => this._handleChangeCheckBox('pricingMethod', 4)}
                      checked={values.pricingMethod === 4}
                    />
                  </Form.Field>
                </Form>
              </Grid.Column>
              <Grid.Column textAlign="center">
                {appraisalObject ? numeral(appraisalObject.sumMPebitdaAvg).format('0,0.[99]') : 0}
              </Grid.Column>
              <Grid.Column>
                {appraisalObject
                  ? numeral(this._pebitdaAvg(appraisalObject) * appraisalObject.sumMPebitdaAvg).format('$0,0.[99]')
                  : 0}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={3}>
              <Grid.Column>
                <Form size="tiny">
                  <Form.Field>
                    <Form.Checkbox
                      label="Multiplier EBITDA Last Year with Stock"
                      name="pricingMethod"
                      onChange={() => this._handleChangeCheckBox('pricingMethod', 5)}
                      checked={values.pricingMethod === 5}
                    />
                  </Form.Field>
                </Form>
              </Grid.Column>
              <Grid.Column textAlign="center">
                {appraisalObject ? numeral(appraisalObject.sumMEbitdaLastYearWithStock).format('0,0.[99]') : 0}
              </Grid.Column>
              <Grid.Column>
                {appraisalObject
                  ? numeral(this._ebitdaLastYear(appraisalObject) * appraisalObject.sumMEbitdaLastYearWithStock).format(
                    '$0,0.[99]'
                  )
                  : 0}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={3}>
              <Grid.Column>
                <Form size="tiny">
                  <Form.Field>
                    <Form.Checkbox
                      label="Multiplier EBITDA Avg with Stock"
                      name="pricingMethod"
                      onChange={() => this._handleChangeCheckBox('pricingMethod', 6)}
                      checked={values.pricingMethod === 6}
                    />
                  </Form.Field>
                </Form>
              </Grid.Column>
              <Grid.Column textAlign="center">
                {appraisalObject ? numeral(appraisalObject.sumMEbitdaAvgWithStock).format('0,0.[99]') : 0}
              </Grid.Column>
              <Grid.Column>
                {appraisalObject
                  ? numeral(this._ebitdaAvg(appraisalObject) * appraisalObject.sumMEbitdaAvgWithStock).format(
                    '$0,0.[99]'
                  )
                  : 0}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={3}>
              <Grid.Column>
                <Form size="tiny">
                  <Form.Field>
                    <Form.Checkbox
                      label="Multiplier PEBITDA Last Year with Stock"
                      name="pricingMethod"
                      onChange={() => this._handleChangeCheckBox('pricingMethod', 7)}
                      checked={values.pricingMethod === 7}
                    />
                  </Form.Field>
                </Form>
              </Grid.Column>
              <Grid.Column textAlign="center">
                {appraisalObject ? numeral(appraisalObject.sumMPebitdaLastYearWithStock).format('0,0.[99]') : 0}
              </Grid.Column>
              <Grid.Column>
                {appraisalObject
                  ? numeral(
                    this._pebitdaLastYear(appraisalObject) * appraisalObject.sumMPebitdaLastYearWithStock
                  ).format('$0,0.[99]')
                  : 0}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={3}>
              <Grid.Column>
                <Form size="tiny">
                  <Form.Field>
                    <Form.Checkbox
                      label="Multiplier PEBITDA Avg with Stock"
                      name="pricingMethod"
                      onChange={() => this._handleChangeCheckBox('pricingMethod', 8)}
                      checked={values.pricingMethod === 8}
                    />
                  </Form.Field>
                </Form>
              </Grid.Column>
              <Grid.Column textAlign="center">
                {appraisalObject ? numeral(appraisalObject.sumMPebitdaAvgWithStock).format('0,0.[99]') : 0}
              </Grid.Column>
              <Grid.Column>
                {appraisalObject
                  ? numeral(this._pebitdaAvg(appraisalObject) * appraisalObject.sumMPebitdaAvgWithStock).format(
                    '$0,0.[99]'
                  )
                  : 0}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={3}>
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
              <Grid.Column textAlign="center">
                {appraisalObject ? numeral(appraisalObject.sumMTO).format('0,0.[99]') : 0}
              </Grid.Column>
              <Grid.Column>
                {appraisalObject
                  ? numeral(this._turnOver(appraisalObject) * appraisalObject.sumMTO).format('$0,0.[99]')
                  : 0}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={3}>
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
              <Grid.Column textAlign="center" />
              <Grid.Column>
                {appraisalObject ? numeral(this._assetsValue(appraisalObject)).format('$0,0.[99]') : 0}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={3}>
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
              <Grid.Column />
              <Grid.Column>
                <Form>
                  <Form.Group>
                    <Form.Field width={5}>
                      <Form.Input
                        name="agreedValue"
                        // value={this.state.inputSearch}
                      />
                    </Form.Field>
                  </Form.Group>
                </Form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Grid>
          <Grid.Row>
            <Grid.Column style={{ margin: '0 auto' }} textAlign="center" width={16}>
              <Segment style={{ backgroundColor: '#ecf4fb' }}>
                <Grid celled="internally" divided>
                  <Grid.Row columns={14}>
                    <Grid.Column>{this._labelPricingMethod(values.pricingMethod)}</Grid.Column>
                    <Grid.Column />
                    <Grid.Column>Comparable Multiplier</Grid.Column>
                    <Grid.Column />
                    <Grid.Column>Price Based on Comparable</Grid.Column>
                    <Grid.Column />
                    <Grid.Column>Risk Premium</Grid.Column>
                    <Grid.Column />
                    <Grid.Column>Market Premium</Grid.Column>
                    <Grid.Column />
                    <Grid.Column>Negotiation Premium</Grid.Column>
                    <Grid.Column />
                    <Grid.Column>Asking Price</Grid.Column>
                    <Grid.Column>Asking Price Multiplo</Grid.Column>
                  </Grid.Row>
                  <Grid.Row columns={14}>
                    <Grid.Column>
                      {numeral(this._pricingMethod(values.pricingMethod, appraisalObject)).format('$0,0.[99]')}
                    </Grid.Column>
                    <Grid.Column>x</Grid.Column>
                    <Grid.Column>
                      {numeral(this._comparableMultiplier(values.pricingMethod, appraisalObject)).format('0,0.[99]')}
                    </Grid.Column>
                    <Grid.Column>=</Grid.Column>
                    <Grid.Column>
                      {numeral(this._priceBasedOnComparable(values.pricingMethod, appraisalObject)).format('$0,0.[99]')}
                    </Grid.Column>
                    <Grid.Column>+</Grid.Column>
                    <Grid.Column>{numeral(this._riskPremium(values, appraisalObject)).format('$0,0.[99]')}</Grid.Column>
                    <Grid.Column>+</Grid.Column>
                    <Grid.Column>needs to make</Grid.Column>
                    <Grid.Column>+</Grid.Column>
                    <Grid.Column>
                      {numeral(this._riskNegotiation(values, appraisalObject)).format('$0,0.[99]')}
                    </Grid.Column>
                    <Grid.Column>=</Grid.Column>
                    <Grid.Column>{numeral(this._askingPrice(values, appraisalObject)).format('$0,0.[99]')}</Grid.Column>
                    <Grid.Column>
                      {numeral(this._askingPriceMultiplo(values, appraisalObject)).format('0,0.[99]')}
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Grid>
                  <Grid.Row columns={2}>
                    <Grid.Column width={8}>
                      <h3>Premium</h3>
                      <Slider
                        color={'blue'}
                        inverted={false}
                        value={values.sliderPremium}
                        settings={{
                          start: values.sliderPremium,
                          min: -20,
                          max: 20,
                          step: 1,
                          onChange: value => this._handleChangeSlider(value, 'sliderPremium')
                        }}
                      />
                      <Label style={{ marginTop: '5px' }} color={'red'}>
                        {values.sliderPremium}%
                      </Label>
                    </Grid.Column>
                    <Grid.Column width={8}>
                      <h3>Negotiation</h3>
                      <Slider
                        color={'blue'}
                        inverted={false}
                        value={values.sliderNegotiation}
                        settings={{
                          start: values.sliderNegotiation,
                          min: -20,
                          max: 20,
                          step: 1,
                          onChange: value => this._handleChangeSlider(value, 'sliderNegotiation')
                        }}
                      />
                      <Label style={{ marginTop: '5px' }} color={'red'}>
                        {values.sliderNegotiation}%
                      </Label>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
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
  pricingMethod: props.appraisalObject ? props.appraisalObject.pricingMethod : 1,
  sliderPremium: 0,
  sliderNegotiation: 0
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

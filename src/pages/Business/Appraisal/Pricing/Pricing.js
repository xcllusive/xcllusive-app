import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Message, Step, Segment, Grid, Form, Header, Label, Checkbox, Button, Icon } from 'semantic-ui-react'
import * as Yup from 'yup'
import Wrapper from '../../../../components/content/Wrapper'
import { updateAppraisal } from '../../../../redux/ducks/appraisal'
import { getSelectedList, calcMinMaxChart } from '../../../../redux/ducks/businessSold'
import SalesGPProfit from './SalesGPProfit'
import Charts from './Charts'
import SummaryOfFinancial from './SummaryOfFinancial'
import OwnersMarketWages from './OwnersMarketWages'
import numeral from 'numeral'
import { Slider } from 'react-semantic-ui-range'
import { LineChart, Line, XAxis, Tooltip, CartesianGrid, YAxis, Legend, ReferenceLine } from 'recharts'

class PricingPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [
        { name: '90% Chance of Selling', value: 0 },
        { name: 'Avg Multiplier', value: 3 },
        { name: 'Risk Premium', value: 3.2 },
        { name: 'Market Premium', value: 2.7 },
        { name: 'Asking Price', value: 4 },
        { name: 'Less than 5% Chance of Selling', value: 12 }
      ],
      showHide: true,
      isCalculated: true
    }
  }

  async componentDidMount () {
    await this.props.getSelectedList(this.props.appraisalObject.id)
    this._handleChangeCheckBox('pricingMethod', this.props.appraisalObject.pricingMethod)
  }

  componentWillUnmount () {
    const obj = {
      agreedValue: this._replaceDollarAndComma(this.props.values.agreedValue),
      smallestMultiplier: numeral(this.props.smallestMultiplier).format('0,0.[99]'),
      avgMultiplier: numeral(
        this._comparableMultiplier(this.props.values.pricingMethod, this.props.appraisalObject)
      ).format('0,0.[99]'),
      riskPremium: numeral(
        this._comparableMultiplier(this.props.values.pricingMethod, this.props.appraisalObject) +
          (this._comparableMultiplier(this.props.values.pricingMethod, this.props.appraisalObject) *
            this.props.values.sliderRiskPremium) /
            100
      ).format('0,0.[99]'),
      marketPremium: numeral(
        this._comparableMultiplier(this.props.values.pricingMethod, this.props.appraisalObject) +
          (this._comparableMultiplier(this.props.values.pricingMethod, this.props.appraisalObject) *
            this.props.values.sliderRiskPremium) /
            100 +
          (this._comparableMultiplier(this.props.values.pricingMethod, this.props.appraisalObject) *
            this.props.values.sliderMarketPremium) /
            100
      ).format('0,0.[99]'),
      askingPrice: numeral(
        this._comparableMultiplier(this.props.values.pricingMethod, this.props.appraisalObject) +
          (this._comparableMultiplier(this.props.values.pricingMethod, this.props.appraisalObject) *
            this.props.values.sliderRiskPremium) /
            100 +
          (this._comparableMultiplier(this.props.values.pricingMethod, this.props.appraisalObject) *
            this.props.values.sliderMarketPremium) /
            100 +
          (this._comparableMultiplier(this.props.values.pricingMethod, this.props.appraisalObject) *
            this.props.values.sliderNegotiationPremium) /
            100
      ).format('0,0.[99]'),
      lessThan5PercChanceOfSelling: numeral(this.props.biggestMultiplier).format('0,0.[99]')
    }
    Object.assign(this.props.values, obj)

    // cayo
    const objFormula = {
      formulaValuePricingMethod: numeral(
        this._pricingMethod(this.props.values.pricingMethod, this.props.appraisalObject)
      ).format('$0,0'),
      formulaPriceBasedOnComparable: numeral(
        this._priceBasedOnComparable(this.props.values.pricingMethod, this.props.appraisalObject)
      ).format('$0,0'),
      formulaRiskPremium: numeral(this._riskPremium(this.props.values, this.props.appraisalObject)).format('$0,0'),
      formulaMarketPremium: numeral(this._marketPremium(this.props.values, this.props.appraisalObject)).format('$0,0'),
      formulaNegotiationPremium: numeral(
        this._negotiationPremium(this.props.values, this.props.appraisalObject)
      ).format('$0,0'),
      formulaAskingPrice: numeral(this._askingPrice(this.props.values, this.props.appraisalObject)).format('$0,0')
    }
    Object.assign(this.props.values, objFormula)

    if (this.props.values.reducePriceForStockValue) {
      const objAskingPriceTrue = {
        askingPriceValue1: numeral(
          this._askingPrice(this.props.values, this.props.appraisalObject) -
            this._stockValue(this.props.appraisalObject) +
            ((this._askingPrice(this.props.values, this.props.appraisalObject) -
              this._stockValue(this.props.appraisalObject)) *
              this.props.values.sliderLowRange) /
              100
        ).format('$0,0'),
        askingPriceValue2: numeral(
          this._askingPrice(this.props.values, this.props.appraisalObject) -
            this._stockValue(this.props.appraisalObject)
        ).format('$0,0')
      }
      Object.assign(this.props.values, objAskingPriceTrue)
    } else {
      const objAskingPriceFalse = {
        askingPriceValue1: numeral(
          this._askingPrice(this.props.values, this.props.appraisalObject) +
            this._percLowRange(this.props.values, this.props.appraisalObject)
        ).format('$0,0'),
        askingPriceValue2: numeral(this._askingPrice(this.props.values, this.props.appraisalObject)).format('$0,0')
      }
      Object.assign(this.props.values, objAskingPriceFalse)
    }

    this.props.updateAppraisal(this.props.values)
  }

  _replaceDollarAndComma (replace) {
    replace = replace.replace('$', ',')
    replace = replace.replace(/,/g, '')
    return replace
  }

  _multiplierEbitdaLastYearChart = businessSold => {
    if (businessSold && businessSold.year4 > 0) {
      return businessSold.soldPrice / (businessSold.year4 - businessSold.agreedWageForWorkingOwners)
    }
    if (businessSold && businessSold.year3 > 0) {
      return businessSold.soldPrice / (businessSold.year3 - businessSold.agreedWageForWorkingOwners)
    }
    if (businessSold && businessSold.year2 > 0) {
      return businessSold.soldPrice / (businessSold.year2 - businessSold.agreedWageForWorkingOwners)
    }
    if (businessSold && businessSold.year1 > 0) {
      return businessSold.soldPrice / (businessSold.year1 - businessSold.agreedWageForWorkingOwners)
    }
  }

  _multiplierEbitdaAvgChart = businessSold => {
    return businessSold.soldPrice / this._ebitdaAvgChart(businessSold)
  }

  _multiplierPebitdaLastYearChart = businessSold => {
    if (businessSold.year4 > 0) {
      return (
        businessSold.soldPrice /
        (businessSold.year4 - (businessSold.agreedWageForWorkingOwners - businessSold.agreedWageForMainOwner))
      )
    }
    if (businessSold.year3 > 0) {
      return (
        businessSold.soldPrice /
        (businessSold.year3 - (businessSold.agreedWageForWorkingOwners - businessSold.agreedWageForMainOwner))
      )
    }
    if (businessSold.year2 > 0) {
      return (
        businessSold.soldPrice /
        (businessSold.year2 - (businessSold.agreedWageForWorkingOwners - businessSold.agreedWageForMainOwner))
      )
    }
    if (businessSold.year1 > 0) {
      return (
        businessSold.soldPrice /
        (businessSold.year1 - (businessSold.agreedWageForWorkingOwners - businessSold.agreedWageForMainOwner))
      )
    }
  }

  _ebitdaLastYearChart = businessSold => {
    if (businessSold.year4 > 0) return businessSold.year4 - businessSold.agreedWageForWorkingOwners
    if (businessSold.year3 > 0) return businessSold.year3 - businessSold.agreedWageForWorkingOwners
    if (businessSold.year2 > 0) return businessSold.year2 - businessSold.agreedWageForWorkingOwners
    if (businessSold.year1 > 0) return businessSold.year1 - businessSold.agreedWageForWorkingOwners
  }

  _ebitdaAvgChart = businessSold => {
    let count = 0
    let totalYear = 0

    if (businessSold.year4 > 0) {
      count = count + 1
      totalYear = totalYear + businessSold.year4
    }
    if (businessSold.year3 > 0) {
      count = count + 1
      totalYear = totalYear + businessSold.year3
    }
    if (businessSold.year2 > 0) {
      count = count + 1
      totalYear = totalYear + businessSold.year2
    }
    if (businessSold.year1 > 0) {
      totalYear = totalYear + businessSold.year1
      count = count + 1
    }

    return totalYear / count - businessSold.agreedWageForWorkingOwners
  }

  _pebitdaLastYearChart = businessSold => {
    if (businessSold.year4 > 0) {
      return businessSold.year4 - (businessSold.agreedWageForWorkingOwners - businessSold.agreedWageForMainOwner)
    }
    if (businessSold.year3 > 0) {
      return businessSold.year3 - (businessSold.agreedWageForWorkingOwners - businessSold.agreedWageForMainOwner)
    }
    if (businessSold.year2 > 0) {
      return businessSold.year2 - (businessSold.agreedWageForWorkingOwners - businessSold.agreedWageForMainOwner)
    }
    if (businessSold.year1 > 0) {
      return businessSold.year1 - (businessSold.agreedWageForWorkingOwners - businessSold.agreedWageForMainOwner)
    }
  }

  _pebitdaAvgChart = businessSold => {
    return this._ebitdaAvgChart(businessSold) + businessSold.agreedWageForMainOwner
  }

  _multiplierPebitdaAvgChart = businessSold => {
    return businessSold.soldPrice / (this._ebitdaAvgChart(businessSold) + businessSold.agreedWageForMainOwner)
  }

  _multiplierEbitdaLastYearWithStockChart = businessSold => {
    return (businessSold.soldPrice + businessSold.stockValue) / this._ebitdaLastYearChart(businessSold)
  }

  _multiplierEbitdaAvgWithStockChart = businessSold => {
    return (businessSold.soldPrice + businessSold.stockValue) / this._ebitdaAvgChart(businessSold)
  }

  _multiplierPebitdaLastYearWithStockChart = businessSold => {
    return businessSold.soldPrice / (this._pebitdaLastYearChart(businessSold) + businessSold.stockValue)
  }

  _multiplierPebitdaAvgWithStockChart = businessSold => {
    return businessSold.soldPrice / (this._pebitdaAvgChart(businessSold) + businessSold.stockValue)
  }

  _multiplierTurnOverChart = businessSold => {
    return businessSold.soldPrice / businessSold.latestFullYearTotalRevenue
  }

  _handleChangeCheckBox = async (name, value) => {
    await this.props.setFieldValue(name, value)
    if (value === 1) {
      await this.props.calcMinMaxChart(this.props.listSelected, this._multiplierEbitdaLastYearChart)
    }
    if (value === 2) {
      await this.props.calcMinMaxChart(this.props.listSelected, this._multiplierEbitdaAvgChart)
    }
    if (value === 3) {
      await this.props.calcMinMaxChart(this.props.listSelected, this._multiplierPebitdaLastYearChart)
    }
    if (value === 4) {
      await this.props.calcMinMaxChart(this.props.listSelected, this._multiplierPebitdaAvgChart)
    }
    if (value === 5) {
      await this.props.calcMinMaxChart(this.props.listSelected, this._multiplierEbitdaLastYearWithStockChart)
    }
    if (value === 6) {
      await this.props.calcMinMaxChart(this.props.listSelected, this._multiplierEbitdaAvgWithStockChart)
    }
    if (value === 7) {
      await this.props.calcMinMaxChart(this.props.listSelected, this._multiplierPebitdaLastYearWithStockChart)
    }
    if (value === 8) {
      await this.props.calcMinMaxChart(this.props.listSelected, this._multiplierPebitdaAvgWithStockChart)
    }
    if (value === 9) {
      await this.props.calcMinMaxChart(this.props.listSelected, this._multiplierTurnOverChart)
    }
    this.setState({
      data: [
        { name: '90% Chance of Selling', value: this._chart('90% Chance of Selling') },
        { name: 'Avg Multiplier', value: this._chart('Avg Multiplier') },
        { name: 'Risk Premium', value: this._chart('Risk Premium') },
        { name: 'Market Premium', value: this._chart('Market Premium') },
        { name: 'Asking Price', value: this._chart('Asking Price') },
        { name: 'Less than 5% Chance of Selling', value: this._chart('Less than 5% Chance of Selling') }
      ]
    })
  }

  _ebitdaLastYear = appraisalObject => {
    if (appraisalObject && appraisalObject.totalAdjustedProfit7 > 0 && appraisalObject.renderPdfYear7) {
      return appraisalObject.totalAdjustedProfit7 - this._totalWages(appraisalObject)
    }
    // if (appraisalObject && appraisalObject.totalAdjustedProfit6 > 0) {
    //   return appraisalObject.totalAdjustedProfit6 - this._totalWages(appraisalObject)
    // }
    if (appraisalObject && appraisalObject.totalAdjustedProfit5 > 0 && appraisalObject.renderPdfYear5) {
      return appraisalObject.totalAdjustedProfit5 - this._totalWages(appraisalObject)
    }
    if (appraisalObject && appraisalObject.totalAdjustedProfit4 > 0 && appraisalObject.renderPdfYear4) {
      return appraisalObject.totalAdjustedProfit4 - this._totalWages(appraisalObject)
    }
    if (appraisalObject && appraisalObject.totalAdjustedProfit3 > 0 && appraisalObject.renderPdfYear3) {
      return appraisalObject.totalAdjustedProfit3 - this._totalWages(appraisalObject)
    }
    if (appraisalObject && appraisalObject.totalAdjustedProfit2 > 0 && appraisalObject.renderPdfYear2) {
      return appraisalObject.totalAdjustedProfit2 - this._totalWages(appraisalObject)
    }
    if (appraisalObject && appraisalObject.totalAdjustedProfit1 > 0 && appraisalObject.renderPdfYear1) {
      return appraisalObject.totalAdjustedProfit1 - this._totalWages(appraisalObject)
    }
  }

  _ebitdaAvg = appraisalObject => {
    let count = 0
    let totalYear = 0

    if (appraisalObject && appraisalObject.totalAdjustedProfit7 > 0 && appraisalObject.renderPdfYear7) {
      count = count + 1
      totalYear = totalYear + appraisalObject.totalAdjustedProfit7
    }

    // if (appraisalObject && appraisalObject.totalAdjustedProfit6 > 0) {
    //   count = count + 1
    //   totalYear = totalYear + appraisalObject.totalAdjustedProfit6
    // }

    if (appraisalObject && appraisalObject.totalAdjustedProfit5 > 0 && appraisalObject.renderPdfYear5) {
      count = count + 1
      totalYear = totalYear + appraisalObject.totalAdjustedProfit5
    }

    if (appraisalObject && appraisalObject.totalAdjustedProfit4 > 0 && appraisalObject.renderPdfYear4) {
      count = count + 1
      totalYear = totalYear + appraisalObject.totalAdjustedProfit4
    }

    if (appraisalObject && appraisalObject.totalAdjustedProfit3 > 0 && appraisalObject.renderPdfYear3) {
      count = count + 1
      totalYear = totalYear + appraisalObject.totalAdjustedProfit3
    }

    if (appraisalObject && appraisalObject.totalAdjustedProfit2 > 0 && appraisalObject.renderPdfYear2) {
      count = count + 1
      totalYear = totalYear + appraisalObject.totalAdjustedProfit2
    }

    if (appraisalObject && appraisalObject.totalAdjustedProfit1 > 0 && appraisalObject.renderPdfYear1) {
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
    if (appraisalObject && appraisalObject.totalAdjustedProfit7 > 0 && appraisalObject.renderPdfYear7) {
      return (
        appraisalObject.totalAdjustedProfit7 - (this._totalWages(appraisalObject) - appraisalObject.owner1AnnualWage)
      )
    }
    // if (appraisalObject && appraisalObject.totalAdjustedProfit6 > 0) {
    //   return (
    //     appraisalObject.totalAdjustedProfit6 - (this._totalWages(appraisalObject) - appraisalObject.owner1AnnualWage)
    //   )
    // }
    if (appraisalObject && appraisalObject.totalAdjustedProfit5 > 0 && appraisalObject.renderPdfYear5) {
      return (
        appraisalObject.totalAdjustedProfit5 - (this._totalWages(appraisalObject) - appraisalObject.owner1AnnualWage)
      )
    }
    if (appraisalObject && appraisalObject.totalAdjustedProfit4 > 0 && appraisalObject.renderPdfYear4) {
      return (
        appraisalObject.totalAdjustedProfit4 - (this._totalWages(appraisalObject) - appraisalObject.owner1AnnualWage)
      )
    }
    if (appraisalObject && appraisalObject.totalAdjustedProfit3 > 0 && appraisalObject.renderPdfYear3) {
      return (
        appraisalObject.totalAdjustedProfit3 - (this._totalWages(appraisalObject) - appraisalObject.owner1AnnualWage)
      )
    }
    if (appraisalObject && appraisalObject.totalAdjustedProfit2 > 0 && appraisalObject.renderPdfYear2) {
      return (
        appraisalObject.totalAdjustedProfit2 - (this._totalWages(appraisalObject) - appraisalObject.owner1AnnualWage)
      )
    }
    if (appraisalObject && appraisalObject.totalAdjustedProfit1 > 0 && appraisalObject.renderPdfYear1) {
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
    if (appraisalObject && appraisalObject.sales7 > 0 && appraisalObject.renderPdfYear7) return appraisalObject.sales7
    // if (appraisalObject && appraisalObject.sales6 > 0) return appraisalObject.sales6
    if (appraisalObject && appraisalObject.sales5 > 0 && appraisalObject.renderPdfYear5) return appraisalObject.sales5
    if (appraisalObject && appraisalObject.sales4 > 0 && appraisalObject.renderPdfYear4) return appraisalObject.sales4
    if (appraisalObject && appraisalObject.sales3 > 0 && appraisalObject.renderPdfYear3) return appraisalObject.sales3
    if (appraisalObject && appraisalObject.sales2 > 0 && appraisalObject.renderPdfYear2) return appraisalObject.sales2
    if (appraisalObject && appraisalObject.sales1 > 0 && appraisalObject.renderPdfYear1) return appraisalObject.sales1
  }

  _handleChangeSlider = async (value, name) => {
    await this.props.setFieldValue(name, value)
    this.setState({
      data: [
        { name: '90% Chance of Selling', value: this._chart('90% Chance of Selling') },
        { name: 'Avg Multiplier', value: this._chart('Avg Multiplier') },
        { name: 'Risk Premium', value: this._chart('Risk Premium') },
        { name: 'Market Premium', value: this._chart('Market Premium') },
        { name: 'Asking Price', value: this._chart('Asking Price') },
        { name: 'Less than 5% Chance of Selling', value: this._chart('Less than 5% Chance of Selling') }
      ]
    })
  }

  _labelPricingMethod = pricingMethod => {
    if (pricingMethod === 1 || pricingMethod === 5) return 'Multiplier EBITDA Last Year'
    if (pricingMethod === 2 || pricingMethod === 6) return 'Multiplier EBITDA Avg'
    if (pricingMethod === 3 || pricingMethod === 7) return 'Multiplier PEBITDA Last Year'
    if (pricingMethod === 4 || pricingMethod === 8) return 'Multiplier PEBITDA Avg'
    if (pricingMethod === 9) return 'T/O Multiplier'
  }

  _pricingMethod = (pricingMethod, appraisalObject) => {
    if (pricingMethod === 1 || pricingMethod === 5) return this._ebitdaLastYear(appraisalObject)
    if (pricingMethod === 2 || pricingMethod === 6) return this._ebitdaAvg(appraisalObject)
    if (pricingMethod === 3 || pricingMethod === 7) return this._pebitdaLastYear(appraisalObject)
    if (pricingMethod === 4 || pricingMethod === 8) return this._pebitdaAvg(appraisalObject)
    if (pricingMethod === 9) return this._turnOver(appraisalObject)
    // if (pricingMethod === 10) return this._ebitdaAvg(appraisalObject)
    // if (pricingMethod === 11) return this._ebitdaAvg(appraisalObject)
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
    if (pricingMethod === 10) {
      return this._assetsValue(appraisalObject)
    }
    if (pricingMethod === 11) {
      const agreedValueFormated = parseInt(this._replaceDollarAndComma(this.props.values.agreedValue))
      return agreedValueFormated
    }
    return (
      this._pricingMethod(pricingMethod, appraisalObject) * this._comparableMultiplier(pricingMethod, appraisalObject)
    )
  }

  _riskPremium = (values, appraisalObject) => {
    const calc = this._priceBasedOnComparable(values.pricingMethod, appraisalObject)
    return (calc * values.sliderRiskPremium) / 100
  }

  _marketPremium = (values, appraisalObject) => {
    const calc = this._priceBasedOnComparable(values.pricingMethod, appraisalObject)
    return (calc * values.sliderMarketPremium) / 100
  }

  _negotiationPremium = (values, appraisalObject) => {
    const calc = this._priceBasedOnComparable(values.pricingMethod, appraisalObject)
    return (calc * values.sliderNegotiationPremium) / 100
  }

  _askingPrice = (values, appraisalObject) => {
    return (
      this._priceBasedOnComparable(values.pricingMethod, appraisalObject) +
      this._riskPremium(values, appraisalObject) +
      this._marketPremium(values, appraisalObject) +
      this._negotiationPremium(values, appraisalObject)
    )
  }

  _askingPriceMultipler = (values, appraisalObject) => {
    return this._askingPrice(values, appraisalObject) / this._pricingMethod(values.pricingMethod, appraisalObject)
  }

  _labelSliderRiskAndMarket = (type, value) => {
    if (value >= 0 && value <= 20) {
      return type === 'businessRisk' ? 'Unsustainable Risk' : 'Weak'
    }
    if (value >= 21 && value <= 40) {
      return type === 'businessRisk' ? 'Challenge Risk' : 'Challenging'
    }
    if (value >= 41 && value <= 60) {
      return type === 'businessRisk' ? 'Acceptable Risk' : 'Fair'
    }
    if (value >= 61 && value <= 80) {
      return type === 'businessRisk' ? 'Attractive' : 'Good'
    }
    if (value >= 81 && value <= 100) {
      return type === 'businessRisk' ? 'Highly Attractive' : 'Bullish'
    }
  }

  _handleCheckBox = (e, { name }) => {
    this.props.setFieldValue(name, !this.props.values[name])
  }

  _percLowRange = (values, appraisalObject) => {
    return (this._askingPrice(values, appraisalObject) * values.sliderLowRange) / 100
  }

  _showHideTable = showHide => {
    if (showHide) this.setState({ showHide: true })
    if (!showHide) this.setState({ showHide: false })
  }

  _chart = column => {
    if (column === '90% Chance of Selling') {
      return numeral(this.props.smallestMultiplier).format('0,0.[99]')
    }

    if (column === 'Avg Multiplier') {
      return numeral(this._comparableMultiplier(this.props.values.pricingMethod, this.props.appraisalObject)).format(
        '0,0.[99]'
      )
    }
    if (column === 'Risk Premium') {
      return numeral(
        this._comparableMultiplier(this.props.values.pricingMethod, this.props.appraisalObject) +
          (this._comparableMultiplier(this.props.values.pricingMethod, this.props.appraisalObject) *
            this.props.values.sliderRiskPremium) /
            100
      ).format('0,0.[99]')
    }
    if (column === 'Market Premium') {
      return numeral(
        this._comparableMultiplier(this.props.values.pricingMethod, this.props.appraisalObject) +
          (this._comparableMultiplier(this.props.values.pricingMethod, this.props.appraisalObject) *
            this.props.values.sliderRiskPremium) /
            100 +
          (this._comparableMultiplier(this.props.values.pricingMethod, this.props.appraisalObject) *
            this.props.values.sliderMarketPremium) /
            100
      ).format('0,0.[99]')
    }
    if (column === 'Asking Price') {
      return numeral(
        this._comparableMultiplier(this.props.values.pricingMethod, this.props.appraisalObject) +
          (this._comparableMultiplier(this.props.values.pricingMethod, this.props.appraisalObject) *
            this.props.values.sliderRiskPremium) /
            100 +
          (this._comparableMultiplier(this.props.values.pricingMethod, this.props.appraisalObject) *
            this.props.values.sliderMarketPremium) /
            100 +
          (this._comparableMultiplier(this.props.values.pricingMethod, this.props.appraisalObject) *
            this.props.values.sliderNegotiationPremium) /
            100
      ).format('0,0.[99]')
    }

    if (column === 'Less than 5% Chance of Selling') {
      return numeral(this.props.biggestMultiplier).format('0,0.[99]')
    }
  }

  render () {
    const { appraisalObject, values, handleChange, handleBlur, errors, touched } = this.props
    return (
      <Wrapper>
        <Step.Group size="large">
          <Step active icon="calculator" title="Step 6" description="Pricing" />
          <Message info size="large">
            <p>
              On this page you can assess the results of your financial inputs and Financial Analysis in order to
              identify the best pricing method for the business.
            </p>
          </Message>
        </Step.Group>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              <Segment style={{ backgroundColor: '#d4d4d53b' }} size="tiny">
                <SalesGPProfit appraisalObject={appraisalObject} />
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
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
        <Grid container justify="center">
          <Grid.Row style={{ paddingTop: '0px', paddingBottom: '0px' }} columns={1}>
            <Grid.Column>
              {this.state.showHide ? (
                <Button floated="right" size="small" color="blue" onClick={() => this._showHideTable(false)}>
                  <Icon name="hide" />
                  Hide Table
                </Button>
              ) : (
                <Button floated="right" size="small" color="green" onClick={() => this._showHideTable(true)}>
                  <Icon name="unhide" />
                  Show Table
                </Button>
              )}
            </Grid.Column>
          </Grid.Row>
          {this.state.showHide ? (
            <Segment style={{ backgroundColor: '#d4d4d53b' }} size="tiny">
              <Grid celled="internally" divided>
                <Grid.Row columns={3}>
                  <Grid.Column width={4}>
                    <Header as="h4" textAlign="center" color="blue">
                      Select Pricing Method
                    </Header>
                  </Grid.Column>
                  <Grid.Column width={2}>
                    <Header as="h4" textAlign="center" color="blue">
                      Multipliers
                    </Header>
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <Header as="h4" textAlign="right" color="blue">
                      Pricing Method Previews
                    </Header>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={3}>
                  <Grid.Column width={4}>
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
                  <Grid.Column textAlign="right" width={2}>
                    {appraisalObject ? numeral(appraisalObject.sumMEbitdaLastYear).format('0,0.[99]') : 0}
                  </Grid.Column>
                  <Grid.Column textAlign="right" width={3}>
                    {appraisalObject
                      ? numeral(this._ebitdaLastYear(appraisalObject) * appraisalObject.sumMEbitdaLastYear).format(
                        '$0,0'
                      )
                      : 0}
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={3}>
                  <Grid.Column width={4}>
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
                  <Grid.Column textAlign="right" width={2}>
                    {appraisalObject ? numeral(appraisalObject.sumMEbitdaAvg).format('0,0.[99]') : 0}
                  </Grid.Column>
                  <Grid.Column textAlign="right" width={3}>
                    {appraisalObject
                      ? numeral(this._ebitdaAvg(appraisalObject) * appraisalObject.sumMEbitdaAvg).format('$0,0')
                      : 0}
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={3}>
                  <Grid.Column width={4}>
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
                  <Grid.Column textAlign="right" width={2}>
                    {appraisalObject ? numeral(appraisalObject.sumMPebitdaLastYear).format('0,0.[99]') : 0}
                  </Grid.Column>
                  <Grid.Column textAlign="right" width={3}>
                    {appraisalObject
                      ? numeral(this._pebitdaLastYear(appraisalObject) * appraisalObject.sumMPebitdaLastYear).format(
                        '$0,0'
                      )
                      : 0}
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={3}>
                  <Grid.Column width={4}>
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
                  <Grid.Column textAlign="right" width={2}>
                    {appraisalObject ? numeral(appraisalObject.sumMPebitdaAvg).format('0,0.[99]') : 0}
                  </Grid.Column>
                  <Grid.Column textAlign="right" width={3}>
                    {appraisalObject
                      ? numeral(this._pebitdaAvg(appraisalObject) * appraisalObject.sumMPebitdaAvg).format('$0,0')
                      : 0}
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={3}>
                  <Grid.Column width={4}>
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
                  <Grid.Column textAlign="right" width={2}>
                    {appraisalObject ? numeral(appraisalObject.sumMEbitdaLastYearWithStock).format('0,0.[99]') : 0}
                  </Grid.Column>
                  <Grid.Column textAlign="right" width={3}>
                    {appraisalObject
                      ? numeral(
                        this._ebitdaLastYear(appraisalObject) * appraisalObject.sumMEbitdaLastYearWithStock
                      ).format('$0,0')
                      : 0}
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={3}>
                  <Grid.Column width={4}>
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
                  <Grid.Column textAlign="right" width={2}>
                    {appraisalObject ? numeral(appraisalObject.sumMEbitdaAvgWithStock).format('0,0.[99]') : 0}
                  </Grid.Column>
                  <Grid.Column textAlign="right" width={3}>
                    {appraisalObject
                      ? numeral(this._ebitdaAvg(appraisalObject) * appraisalObject.sumMEbitdaAvgWithStock).format(
                        '$0,0'
                      )
                      : 0}
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={3}>
                  <Grid.Column width={4}>
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
                  <Grid.Column textAlign="right" width={2}>
                    {appraisalObject ? numeral(appraisalObject.sumMPebitdaLastYearWithStock).format('0,0.[99]') : 0}
                  </Grid.Column>
                  <Grid.Column textAlign="right" width={3}>
                    {appraisalObject
                      ? numeral(
                        this._pebitdaLastYear(appraisalObject) * appraisalObject.sumMPebitdaLastYearWithStock
                      ).format('$0,0')
                      : 0}
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={3}>
                  <Grid.Column width={4}>
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
                  <Grid.Column textAlign="right" width={2}>
                    {appraisalObject ? numeral(appraisalObject.sumMPebitdaAvgWithStock).format('0,0.[99]') : 0}
                  </Grid.Column>
                  <Grid.Column textAlign="right" width={3}>
                    {appraisalObject
                      ? numeral(this._pebitdaAvg(appraisalObject) * appraisalObject.sumMPebitdaAvgWithStock).format(
                        '$0,0'
                      )
                      : 0}
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={3}>
                  <Grid.Column width={4}>
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
                  <Grid.Column textAlign="right" width={2}>
                    {appraisalObject ? numeral(appraisalObject.sumMTO).format('0,0.[99]') : 0}
                  </Grid.Column>
                  <Grid.Column textAlign="right" width={3}>
                    {appraisalObject
                      ? numeral(this._turnOver(appraisalObject) * appraisalObject.sumMTO).format('$0,0')
                      : 0}
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={3}>
                  <Grid.Column width={4}>
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
                  <Grid.Column textAlign="right" width={2} />
                  <Grid.Column textAlign="right" width={3}>
                    {appraisalObject ? numeral(this._assetsValue(appraisalObject)).format('$0,0') : 0}
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={3}>
                  <Grid.Column width={4}>
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
                  <Grid.Column width={2} />
                  <Grid.Column textAlign="right" width={3}>
                    <Form>
                      <Form.Group>
                        <Form.Field>
                          <Form.Input
                            style={{ textAlign: 'right' }}
                            name="agreedValue"
                            value={numeral(values.agreedValue).format('$0,0')}
                            autoComplete="agreedValue"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.agreedValue && touched.agreedValue && (
                            <Label basic color="red" pointing content={errors.agreedValue} />
                          )}
                        </Form.Field>
                      </Form.Group>
                    </Form>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          ) : null}
        </Grid>
        <Grid container justify="center">
          <Grid.Row>
            <Grid.Column style={{ margin: '0 auto', paddingLeft: '0px' }} textAlign="center">
              <Segment style={{ backgroundColor: '#ecf4fb' }} size="small">
                <Grid celled="internally" divided>
                  <Grid.Row columns={14}>
                    <Grid.Column>{this._labelPricingMethod(values.pricingMethod)}</Grid.Column>
                    <Grid.Column />
                    <Grid.Column>
                      {values.pricingMethod === 10 || values.pricingMethod === 11 ? '' : 'Comparable Multiplier'}
                    </Grid.Column>
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
                    <Grid.Column>
                      {values.pricingMethod === 10 || values.pricingMethod === 11 ? '' : 'Asking Price Multipler'}
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row columns={14}>
                    <Grid.Column style={{ paddingLeft: '0px' }} textAlign="left">
                      {values.pricingMethod === 10 || values.pricingMethod === 11
                        ? ''
                        : numeral(this._pricingMethod(values.pricingMethod, appraisalObject)).format('$0,0')}
                    </Grid.Column>
                    <Grid.Column>{values.pricingMethod === 10 || values.pricingMethod === 11 ? '' : 'x'}</Grid.Column>
                    <Grid.Column textAlign="left">
                      {values.pricingMethod === 10 || values.pricingMethod === 11
                        ? ''
                        : numeral(this._comparableMultiplier(values.pricingMethod, appraisalObject)).format('0,0.[99]')}
                    </Grid.Column>
                    <Grid.Column>{values.pricingMethod === 10 || values.pricingMethod === 11 ? '' : '='}</Grid.Column>
                    <Grid.Column style={{ paddingLeft: '2px' }} textAlign="left">
                      {numeral(this._priceBasedOnComparable(values.pricingMethod, appraisalObject)).format('$0,0')}
                    </Grid.Column>
                    <Grid.Column>+</Grid.Column>
                    <Grid.Column style={{ paddingLeft: '2px' }} textAlign="left">
                      {numeral(this._riskPremium(values, appraisalObject)).format('$0,0')}
                    </Grid.Column>
                    <Grid.Column>+</Grid.Column>
                    <Grid.Column style={{ paddingLeft: '2px' }} textAlign="left">
                      {numeral(this._marketPremium(values, appraisalObject)).format('$0,0')}
                    </Grid.Column>
                    <Grid.Column>+</Grid.Column>
                    <Grid.Column style={{ paddingLeft: '2px' }} textAlign="left">
                      {numeral(this._negotiationPremium(values, appraisalObject)).format('$0,0')}
                    </Grid.Column>
                    <Grid.Column>=</Grid.Column>
                    <Grid.Column style={{ paddingLeft: '2px' }} textAlign="left">
                      {numeral(this._askingPrice(values, appraisalObject)).format('$0,0')}
                    </Grid.Column>
                    <Grid.Column textAlign="left">
                      {values.pricingMethod === 10 || values.pricingMethod === 11
                        ? ''
                        : numeral(this._askingPriceMultipler(values, appraisalObject)).format('0,0.[99]')}
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Grid>
                  <Grid.Row columns={3}>
                    <Grid.Column width={5} textAlign="center">
                      <h3>Risk Premium</h3>
                      <Slider
                        color={'blue'}
                        inverted={false}
                        value={values.sliderRiskPremium}
                        settings={{
                          start: values.sliderRiskPremium,
                          min: -20,
                          max: 20,
                          step: 1,
                          onChange: value => this._handleChangeSlider(value, 'sliderRiskPremium')
                        }}
                      />
                      <Label style={{ marginTop: '5px' }} color={'red'}>
                        {values.sliderRiskPremium}%
                      </Label>
                      <h4>{this._labelSliderRiskAndMarket('businessRisk', appraisalObject.valueSliderBR)}</h4>
                    </Grid.Column>
                    <Grid.Column width={5} textAlign="center">
                      <h3>Market Premium</h3>
                      <Slider
                        color={'blue'}
                        inverted={false}
                        value={values.sliderMarketPremium}
                        settings={{
                          start: values.sliderMarketPremium,
                          min: -20,
                          max: 20,
                          step: 1,
                          onChange: value => this._handleChangeSlider(value, 'sliderMarketPremium')
                        }}
                      />
                      <Label style={{ marginTop: '5px' }} color={'red'}>
                        {values.sliderMarketPremium}%
                      </Label>
                      <h4>{this._labelSliderRiskAndMarket('market', appraisalObject.valueSliderMarket)}</h4>
                    </Grid.Column>
                    <Grid.Column width={5} textAlign="center">
                      <h3>Negotiation Premium</h3>
                      <Slider
                        color={'blue'}
                        inverted={false}
                        value={values.sliderNegotiationPremium}
                        settings={{
                          start: values.sliderNegotiationPremium,
                          min: 0,
                          max: 20,
                          step: 1,
                          onChange: value => this._handleChangeSlider(value, 'sliderNegotiationPremium')
                        }}
                      />
                      <Label style={{ marginTop: '5px' }} color={'red'}>
                        {values.sliderNegotiationPremium}%
                      </Label>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid container justify="center">
          <Segment style={{ backgroundColor: '#d4d4d53b' }}>
            <Grid>
              <Grid.Row textAlign="left" columns={1}>
                <Grid.Column width={8} style={{ margin: '0 auto' }} textAlign="center">
                  <Form>
                    <Form.Group>
                      <Form.Field>
                        <h4>Price Range Between: </h4>
                      </Form.Field>
                      <Form.Field>
                        <h3>
                          {values.reducePriceForStockValue
                            ? numeral(
                              this._askingPrice(values, appraisalObject) -
                                  this._stockValue(appraisalObject) +
                                  ((this._askingPrice(values, appraisalObject) - this._stockValue(appraisalObject)) *
                                    values.sliderLowRange) /
                                    100
                            ).format('$0,0')
                            : numeral(
                              this._askingPrice(values, appraisalObject) + this._percLowRange(values, appraisalObject)
                            ).format('$0,0')}
                        </h3>
                      </Form.Field>
                      <Form.Field>
                        <h4>and</h4>
                      </Form.Field>
                      <Form.Field>
                        <h3>
                          {values.reducePriceForStockValue
                            ? numeral(
                              this._askingPrice(values, appraisalObject) - this._stockValue(appraisalObject)
                            ).format('$0,0')
                            : numeral(this._askingPrice(values, appraisalObject)).format('$0,0')}
                        </h3>
                      </Form.Field>
                      <Form.Field>
                        <h4> {values.inclStock ? 'Incl. Stock of' : 'Plus Stock of'}</h4>
                      </Form.Field>
                      <Form.Field>
                        <h3>
                          {appraisalObject.stockValuationOption === 2
                            ? numeral(this._stockValue(appraisalObject)).format('$0,0')
                            : appraisalObject.stockValuationOption === 3
                              ? numeral(appraisalObject.stockNecessary).format('$0,0')
                              : 'No Stock'}
                        </h3>
                      </Form.Field>
                    </Form.Group>
                  </Form>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column width={5} style={{ margin: '0 auto' }} textAlign="center">
                  <h3>Low Range</h3>
                  <Slider
                    color={'blue'}
                    inverted={false}
                    value={values.sliderLowRange}
                    settings={{
                      start: values.sliderLowRange,
                      min: -30,
                      max: -10,
                      step: 1,
                      onChange: value => this._handleChangeSlider(value, 'sliderLowRange')
                    }}
                  />
                  <Label style={{ marginTop: '5px' }} color={'red'}>
                    {values.sliderLowRange}%
                  </Label>
                </Grid.Column>
                <Grid.Column style={{ marginTop: '5px' }} verticalAlign="middle">
                  <Checkbox
                    label="Incl. Stock"
                    name="inclStock"
                    value="inclStock"
                    checked={values.inclStock}
                    onChange={this._handleCheckBox}
                  />
                  <Checkbox
                    style={{ marginLeft: '20px' }}
                    label="Reduce Price For Stock Value"
                    name="reducePriceForStockValue"
                    value="reducePriceForStockValue"
                    checked={values.reducePriceForStockValue}
                    onChange={this._handleCheckBox}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Grid>
        <Grid container justify="center">
          <Segment style={{ backgroundColor: '#ecf4fb' }}>
            <Grid>
              <Grid.Row columns={1}>
                <Grid.Column>
                  <LineChart
                    width={1000}
                    height={500}
                    data={this.state.data}
                    layout="vertical"
                    margin={{ top: 20, right: 50, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={['dataMin', 'dataMax']} />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Legend />
                    {/* <ReferenceLine y="25%" stroke="red" label="Test" /> */}
                    <ReferenceLine
                      x={this._chart('90% Chance of Selling')}
                      label={this._chart('90% Chance of Selling').toString()}
                      stroke="blue"
                    />
                    <ReferenceLine
                      x={this._chart('Avg Multiplier')}
                      label={this._chart('Avg Multiplier').toString()}
                      stroke="black"
                    />
                    <ReferenceLine
                      x={this._chart('Risk Premium')}
                      label={this._chart('Risk Premium').toString()}
                      stroke="purple"
                    />
                    <ReferenceLine
                      x={this._chart('Market Premium')}
                      label={this._chart('Market Premium').toString()}
                      stroke="orange"
                    />
                    <ReferenceLine
                      x={this._chart('Asking Price')}
                      label={this._chart('Asking Price').toString()}
                      stroke="green"
                    />
                    <ReferenceLine
                      x={this._chart('Less than 5% Chance of Selling')}
                      label={this._chart('Less than 5% Chance of Selling').toString()}
                      stroke="violet"
                    />
                    <Line type="monotone" dataKey="value" stroke="red" />
                  </LineChart>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Grid>
        <Form.Group>
          <Form.Field>
            <Form.Checkbox
              label="Please confirm that you have completed the above information"
              name="confirmPricing"
              onChange={this._handleCheckBox}
              disabled={this.props.listSelected.length === 0}
              checked={values.confirmPricing}
              onClick={() => this.props.confirmsCompleteSteps('confirmPricing', !values.confirmPricing)}
            />
          </Form.Field>
        </Form.Group>
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
  updateAppraisal: PropTypes.func,
  getSelectedList: PropTypes.func,
  smallestMultiplier: PropTypes.number,
  biggestMultiplier: PropTypes.number,
  listSelected: PropTypes.array,
  calcMinMaxChart: PropTypes.func,
  isCalculated: PropTypes.bool,
  confirmsCompleteSteps: PropTypes.func,
  history: PropTypes.object
}

const mapPropsToValues = props => ({
  business_id: props.business ? props.business.id : '',
  id: props.appraisalObject ? props.appraisalObject.id : '',
  pricingMethod: props.appraisalObject ? props.appraisalObject.pricingMethod : 0,
  sliderRiskPremium: props.appraisalObject ? props.appraisalObject.sliderRiskPremium : 0,
  sliderMarketPremium: props.appraisalObject ? props.appraisalObject.sliderMarketPremium : 0,
  sliderNegotiationPremium: props.appraisalObject ? props.appraisalObject.sliderNegotiationPremium : 0,
  agreedValue: props.appraisalObject ? numeral(props.appraisalObject.agreedValue).format('0,0.[99]') : 0,
  sliderLowRange: -10,
  inclStock: props.appraisalObject ? props.appraisalObject.inclStock : true,
  reducePriceForStockValue: true,
  confirmPricing: props.appraisalObject ? props.appraisalObject.confirmPricing : false
})

const mapStateToProps = state => {
  return {
    smallestMultiplier: state.businessSold.getCalcMinMax.smallestMultiplier,
    biggestMultiplier: state.businessSold.getCalcMinMax.biggestMultiplier,
    isCalculated: state.businessSold.getCalcMinMax.isCalculated,
    listSelected: state.businessSold.getList.array
  }
}

const validationSchema = Yup.object().shape({})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateAppraisal,
      getSelectedList,
      calcMinMaxChart
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

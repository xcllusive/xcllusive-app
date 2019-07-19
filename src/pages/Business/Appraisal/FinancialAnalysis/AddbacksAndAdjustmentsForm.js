import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Grid, Input, Form, Checkbox } from 'semantic-ui-react'
import * as Yup from 'yup'
import numeral from 'numeral'

import CustomColumn from '../../../../components/content/CustomGridColumn'

import {
  updateAppraisal,
  calcAnnualisedWhenChangeMonthsAndSeasonal,
  clearMovedFinancialYear
} from '../../../../redux/ducks/appraisal'

class AddbacksAndAdjustmentsForm extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      rows: this._createArrayWithTable(30),
      totalAdjusment1: 0,
      totalAdjusment2: 0,
      totalAdjusment3: 0,
      totalAdjusment4: 0,
      totalAdjusment5: 0,
      totalAdjusment6: 0,
      totalAdjusment7: 0,
      totalAdjustedProfit1: 0,
      totalAdjustedProfit2: 0,
      totalAdjustedProfit3: 0,
      totalAdjustedProfit4: 0,
      totalAdjustedProfit5: 0,
      totalAdjustedProfit6: 0,
      totalAdjustedProfit7: 0,
      totalAdjustedProfit1Perc: 0,
      totalAdjustedProfit2Perc: 0,
      totalAdjustedProfit3Perc: 0,
      totalAdjustedProfit4Perc: 0,
      totalAdjustedProfit5Perc: 0,
      totalAdjustedProfit6Perc: 0,
      totalAdjustedProfit7Perc: 0,
      controlEntryAndExitComponent: false
    }
  }

  componentDidMount = () => {
    this._setCalcTotalAdjusment()
    this._calcTotalAdjustedProfit()
    this._calcAdjustedProfit()
    this.setState({ monthsCoveredState: this.props.monthsCovered, controlEntryAndExitComponent: false })
  }

  componentWillUnmount () {
    for (let row = 1; row <= 30; row++) {
      this.props.values[`aaRow${row}Year1`] = this._replaceDollarAndComma(this.props.values[`aaRow${row}Year1`])
      this.props.values[`aaRow${row}Year2`] = this._replaceDollarAndComma(this.props.values[`aaRow${row}Year2`])
      this.props.values[`aaRow${row}Year3`] = this._replaceDollarAndComma(this.props.values[`aaRow${row}Year3`])
      this.props.values[`aaRow${row}Year4`] = this._replaceDollarAndComma(this.props.values[`aaRow${row}Year4`])
      this.props.values[`aaRow${row}Year5`] = this._replaceDollarAndComma(this.props.values[`aaRow${row}Year5`])
      this.props.values[`aaRow${row}Year6`] = this._replaceDollarAndComma(this.props.values[`aaRow${row}Year6`])
      this.props.values[`aaRow${row}Year7`] = this._replaceDollarAndComma(
        this.props.values[`aaRow${row}Year7`].toString()
      )
    }
    this.props.values.totalAdjusments1 = this._replaceDollarAndComma(this.state.totalAdjusments1)
    this.props.values.totalAdjusments2 = this._replaceDollarAndComma(this.state.totalAdjusments2)
    this.props.values.totalAdjusments3 = this._replaceDollarAndComma(this.state.totalAdjusments3)
    this.props.values.totalAdjusments4 = this._replaceDollarAndComma(this.state.totalAdjusments4)
    this.props.values.totalAdjusments5 = this._replaceDollarAndComma(this.state.totalAdjusments5)
    this.props.values.totalAdjusments6 = this._replaceDollarAndComma(this.state.totalAdjusments6)
    this.props.values.totalAdjusments7 = this._replaceDollarAndComma(this.state.totalAdjusments7)

    this.props.values.adjustedProfitPerc1 = this.state.totalAdjustedProfit1Perc
    this.props.values.adjustedProfitPerc2 = this.state.totalAdjustedProfit2Perc
    this.props.values.adjustedProfitPerc3 = this.state.totalAdjustedProfit3Perc
    this.props.values.adjustedProfitPerc4 = this.state.totalAdjustedProfit4Perc
    this.props.values.adjustedProfitPerc5 = this.state.totalAdjustedProfit5Perc
    this.props.values.adjustedProfitPerc6 = this.state.totalAdjustedProfit6Perc
    this.props.values.adjustedProfitPerc7 = this.state.totalAdjustedProfit7Perc

    this.props.values.totalAdjustedProfit1 = this.state.totalAdjustedProfit1
    this.props.values.totalAdjustedProfit2 = this.state.totalAdjustedProfit2
    this.props.values.totalAdjustedProfit3 = this.state.totalAdjustedProfit3
    this.props.values.totalAdjustedProfit4 = this.state.totalAdjustedProfit4
    this.props.values.totalAdjustedProfit5 = this.state.totalAdjustedProfit5
    this.props.values.totalAdjustedProfit6 = this.state.totalAdjustedProfit6
    this.props.values.totalAdjustedProfit7 = this.state.totalAdjustedProfit7

    // this.props.updateAppraisal(this.props.values, false)
    if (!this.props.isMovedFinancialYear) {
      this.props.updateAppraisal(this.props.values, false)
    }
    this.props.clearMovedFinancialYear()
    this.setState({ controlEntryAndExitComponent: false })
  }

  async componentDidUpdate (nextProps, prevState) {
    // if (
    //   ((nextProps.monthsCovered || nextProps.monthsCovered.toString() === 'NaN') &&
    //     this.props.monthsCovered > 0 &&
    //     nextProps.monthsCovered !== this.props.monthsCovered) ||
    //   ((nextProps.seasonalAdjustment || nextProps.seasonalAdjustment.toString() === 'NaN') &&
    //     (this.props.seasonalAdjustment > 0 || this.props.seasonalAdjustment <= -1) &&
    //     nextProps.seasonalAdjustment !== this.props.seasonalAdjustment)
    // )
    if (
      this.props.monthsCoveredAndSeasonalAdjusment &&
      this.props.monthsCoveredAndSeasonalAdjusment.monthsCovered &&
      this.props.monthsCoveredAndSeasonalAdjusment.seasonalAdjustment
    ) {
      for (let row = 1; row <= 30; row++) {
        if (this.props.values[`aaRow${row}YesNo`]) {
          this.props.setFieldValue(
            `aaRow${row}Year7`,
            this._calcAnnualised(
              this.props.values[`aaRow${row}Year6`],
              this.props.monthsCoveredAndSeasonalAdjusment.monthsCovered,
              this.props.monthsCoveredAndSeasonalAdjusment.seasonalAdjustment
            )
          )
          // totalAdjusment7 = totalAdjusment7 + numeral(this.props.values[`aaRow${row}Year${7}`]).value()
          // console.log(totalAdjusment7)
        }
      }
      await this.props.calcAnnualisedWhenChangeMonthsAndSeasonal(null, null)
      this._setCalcTotalAdjusment()
      this._calcTotalAdjustedProfit()
      this._calcAdjustedProfit()
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.totalsAdjustedProfit && nextProps.totalsAdjustedProfitPerc) {
      for (let i = 1; i < 7; i++) {
        if (nextProps.totalsAdjustedProfit[`totalAdjustedProfit${i}`]) {
          if (
            prevState[`totalAdjustedProfit${i}`] !== nextProps.totalsAdjustedProfit[`totalAdjustedProfit${i}`] &&
            prevState[`totalAdjustedProfit${i}Perc`] !==
              nextProps.totalsAdjustedProfitPerc[`totalAdjustedProfit${i}Perc`] &&
            !prevState.controlEntryAndExitComponent
          ) {
            return {
              [`totalAdjustedProfit${i}`]: Math.trunc(nextProps.totalsAdjustedProfit[`totalAdjustedProfit${i}`]),
              [`totalAdjustedProfit${i}Perc`]: Math.trunc(
                nextProps.totalsAdjustedProfitPerc[`totalAdjustedProfit${i}Perc`]
              )
            }
          }
        }
      }
    }

    return null
  }

  _replaceDollarAndComma (replace) {
    replace = replace.replace('$', ',')
    replace = replace.replace(/,/g, '')
    return replace
  }

  _replaceCommaPerDoth (replace) {
    let test = replace
    test = test.replace(',', '.')
    return test
  }

  _handleChangeCheckBox = async (e, { name, item, checked }) => {
    await this.props.setFieldValue(name, !this.props.values[name])
    if (checked) {
      this.props.setFieldValue(
        `aaRow${item.row}Year7`,
        this._calcAnnualised(
          this.props.values[`aaRow${item.row}Year6`],
          this.props.monthsCovered,
          this.props.seasonalAdjustment
        )
      )
    } else {
      this.props.setFieldValue(`aaRow${item.row}Year7`, this.props.values[`aaRow${item.row}Year6`])
    }

    this._setCalcTotalAdjusment()
    this._calcTotalAdjustedProfit()
    this._calcAdjustedProfit()
  }

  _calcAnnualised = (yearValue, monthsCoveredValue, seasonalAdjustmentValue) => {
    const year = numeral(yearValue).value()
    const monthsCovered = numeral(monthsCoveredValue).value()
    const seasonalAdjustment = numeral(seasonalAdjustmentValue).value() / 100

    return (year / monthsCovered) * 12 + ((year / monthsCovered) * 12 - year) * seasonalAdjustment
  }

  _createArrayWithTable = (itens = 30) => {
    const array = []
    for (let row = 1; row <= itens; row++) {
      array.push({
        name: `aaRow${row}`,
        tabIndex: 100 + row,
        columns: [
          {
            name: `aaRow${row}Year1`,
            tabIndex: 200 + row
          },
          {
            name: `aaRow${row}Year2`,
            tabIndex: 300 + row
          },
          {
            name: `aaRow${row}Year3`,
            tabIndex: 400 + row
          },
          {
            name: `aaRow${row}Year4`,
            tabIndex: 500 + row
          },
          {
            name: `aaRow${row}Year5`,
            tabIndex: 600 + row
          },
          {
            name: `aaRow${row}Year6`,
            tabIndex: 700 + row
          }
        ],
        row: row
      })
    }
    return array
  }

  _setCalcTotalAdjusment = () => {
    let totalAdjusments1 = 0
    let totalAdjusments2 = 0
    let totalAdjusments3 = 0
    let totalAdjusments4 = 0
    let totalAdjusments5 = 0
    let totalAdjusments6 = 0
    let totalAdjusments7 = 0
    for (let i = 1; i <= 30; i++) {
      totalAdjusments1 = totalAdjusments1 + numeral(this.props.values[`aaRow${i}Year${1}`]).value()
      totalAdjusments2 = totalAdjusments2 + numeral(this.props.values[`aaRow${i}Year${2}`]).value()
      totalAdjusments3 = totalAdjusments3 + numeral(this.props.values[`aaRow${i}Year${3}`]).value()
      totalAdjusments4 = totalAdjusments4 + numeral(this.props.values[`aaRow${i}Year${4}`]).value()
      totalAdjusments5 = totalAdjusments5 + numeral(this.props.values[`aaRow${i}Year${5}`]).value()
      totalAdjusments6 = totalAdjusments6 + numeral(this.props.values[`aaRow${i}Year${6}`]).value()
      totalAdjusments7 = totalAdjusments7 + numeral(this.props.values[`aaRow${i}Year${7}`]).value()
    }
    this.setState({ totalAdjusments1: numeral(totalAdjusments1).format('0,0') })
    this.setState({ totalAdjusments2: numeral(totalAdjusments2).format('0,0') })
    this.setState({ totalAdjusments3: numeral(totalAdjusments3).format('0,0') })
    this.setState({ totalAdjusments4: numeral(totalAdjusments4).format('0,0') })
    this.setState({ totalAdjusments5: numeral(totalAdjusments5).format('0,0') })
    this.setState({ totalAdjusments6: numeral(totalAdjusments6).format('0,0') })
    this.setState({ totalAdjusments7: numeral(totalAdjusments7).format('0,0') })
  }

  _calcTotalAdjustedProfit = async () => {
    const totalAdjustedProfit1 =
      this._calcTotal(1) + numeral(this.props.appraisalObject[`calcOperatingProfit${1}`]).value()
    const totalAdjustedProfit2 =
      this._calcTotal(2) + numeral(this.props.appraisalObject[`calcOperatingProfit${2}`]).value()
    const totalAdjustedProfit3 =
      this._calcTotal(3) + numeral(this.props.appraisalObject[`calcOperatingProfit${3}`]).value()
    const totalAdjustedProfit4 =
      this._calcTotal(4) + numeral(this.props.appraisalObject[`calcOperatingProfit${4}`]).value()
    const totalAdjustedProfit5 =
      this._calcTotal(5) + numeral(this.props.appraisalObject[`calcOperatingProfit${5}`]).value()
    const totalAdjustedProfit6 =
      this._calcTotal(6) + numeral(this.props.appraisalObject[`calcOperatingProfit${6}`]).value()
    const totalAdjustedProfit7 =
      this._calcTotal(7) + numeral(this.props.appraisalObject[`calcOperatingProfit${7}`]).value()
    this.setState({ totalAdjustedProfit1: numeral(totalAdjustedProfit1).format('0,0') })
    this.setState({ totalAdjustedProfit2: numeral(totalAdjustedProfit2).format('0,0') })
    this.setState({ totalAdjustedProfit3: numeral(totalAdjustedProfit3).format('0,0') })
    this.setState({ totalAdjustedProfit4: numeral(totalAdjustedProfit4).format('0,0') })
    this.setState({ totalAdjustedProfit5: numeral(totalAdjustedProfit5).format('0,0') })
    this.setState({ totalAdjustedProfit6: numeral(totalAdjustedProfit6).format('0,0') })
    this.setState({ totalAdjustedProfit7: numeral(totalAdjustedProfit7).format('0,0') })
  }

  _calcAdjustedProfit = () => {
    const total1 = this._calcTotal(1) + numeral(this.props.appraisalObject[`calcOperatingProfit${1}`]).value()
    const totalAdjustedProfit1Perc =
      (numeral(total1).value() / numeral(this.props.appraisalObject[`sales${1}`]).value()) * 100

    const total2 = this._calcTotal(2) + numeral(this.props.appraisalObject[`calcOperatingProfit${2}`]).value()
    const totalAdjustedProfit2Perc =
      (numeral(total2).value() / numeral(this.props.appraisalObject[`sales${2}`]).value()) * 100
    const total3 = this._calcTotal(3) + numeral(this.props.appraisalObject[`calcOperatingProfit${3}`]).value()
    const totalAdjustedProfit3Perc =
      (numeral(total3).value() / numeral(this.props.appraisalObject[`sales${3}`]).value()) * 100
    const total4 = this._calcTotal(4) + numeral(this.props.appraisalObject[`calcOperatingProfit${4}`]).value()
    const totalAdjustedProfit4Perc =
      (numeral(total4).value() / numeral(this.props.appraisalObject[`sales${4}`]).value()) * 100
    const total5 = this._calcTotal(5) + numeral(this.props.appraisalObject[`calcOperatingProfit${5}`]).value()
    const totalAdjustedProfit5Perc =
      (numeral(total5).value() / numeral(this.props.appraisalObject[`sales${5}`]).value()) * 100
    const total6 = this._calcTotal(6) + numeral(this.props.appraisalObject[`calcOperatingProfit${6}`]).value()
    const totalAdjustedProfit6Perc =
      (numeral(total6).value() / numeral(this.props.appraisalObject[`sales${6}`]).value()) * 100
    const total7 = this._calcTotal(7) + numeral(this.props.appraisalObject[`calcOperatingProfit${7}`]).value()
    const totalAdjustedProfit7Perc =
      (numeral(total7).value() / numeral(this.props.appraisalObject.calcAnnualised1).value()) * 100

    this.setState({ totalAdjustedProfit1Perc: Math.trunc(totalAdjustedProfit1Perc) })
    this.setState({ totalAdjustedProfit2Perc: Math.trunc(totalAdjustedProfit2Perc) })
    this.setState({ totalAdjustedProfit3Perc: Math.trunc(totalAdjustedProfit3Perc) })
    this.setState({ totalAdjustedProfit4Perc: Math.trunc(totalAdjustedProfit4Perc) })
    this.setState({ totalAdjustedProfit5Perc: Math.trunc(totalAdjustedProfit5Perc) })
    this.setState({ totalAdjustedProfit6Perc: Math.trunc(totalAdjustedProfit6Perc) })
    this.setState({ totalAdjustedProfit7Perc: Math.trunc(totalAdjustedProfit7Perc) })
  }

  _handleChangeAddbackAndAdjusments = async (e, row, name) => {
    this.setState({ controlEntryAndExitComponent: true })
    e.preventDefault()
    if (
      (name.length === 11 && name.substring(10, 11) === '6') ||
      (name.length === 12 && name.substring(11, 12) === '6')
    ) {
      if (this.props.values[`aaRow${row}YesNo`]) {
        await this.props.setFieldValue(
          `aaRow${row}Year7`,
          this._calcAnnualised(
            this.props.values[`aaRow${row}Year6`],
            this.props.monthsCovered,
            this.props.seasonalAdjustment
          )
        )
      }
    }
    this._setCalcTotalAdjusment()
    this._calcTotalAdjustedProfit()
    this._calcAdjustedProfit()
  }

  _calcTotal = column => {
    let total = 0
    for (let i = 1; i <= 30; i++) {
      total = total + numeral(this.props.values[`aaRow${i}Year${column}`]).value()
    }

    return total
  }

  // _calcTotalAdjustedProfit = column => {
  //   const total = this._calcTotal(column) + this.props.appraisalObject[`operatingProfit${column}`]
  //   return numeral(total).format('0,0')
  // }

  _handleChangeInputCurrency = (e, { value, name }) => {
    if (value.substring(0, 1) === '-') {
      if (value.length === 1) this.props.setFieldValue(name, `${value}$`)
      else this.props.setFieldValue(name, numeral(value).format('$0,0') || 0)
    } else this.props.setFieldValue(name, numeral(value).format('0,0') || 0)
  }

  _handleChangeDescription = async (name, data, item) => {
    await this.props.setFieldValue(name, data.value)
    if (data.value.length > 0) {
      this.props.setFieldValue(`aaRow${item.row}YesNo`, true)
    } else {
      this.props.setFieldValue(`aaRow${item.row}YesNo`, false)
    }
  }

  render () {
    const { values, handleBlur, financialYear, appraisalObject } = this.props
    return (
      <Fragment>
        <Grid.Row
          style={{
            backgroundColor: 'lightyellow',
            celledPadding: '.3em'
          }}
          columns={9}
        >
          <CustomColumn>
            <b> Financial Year </b>
          </CustomColumn>
          <CustomColumn textAlign="center">
            <b> {appraisalObject && appraisalObject.year1 > 0 ? appraisalObject.year1 : financialYear - 5} </b>
          </CustomColumn>
          <CustomColumn textAlign="center">
            <b> {appraisalObject && appraisalObject.year2 > 0 ? appraisalObject.year2 : financialYear - 4} </b>
          </CustomColumn>
          <CustomColumn textAlign="center">
            <b> {appraisalObject && appraisalObject.year3 > 0 ? appraisalObject.year3 : financialYear - 3} </b>
          </CustomColumn>
          <CustomColumn textAlign="center">
            <b> {appraisalObject && appraisalObject.year4 > 0 ? appraisalObject.year4 : financialYear - 2} </b>
          </CustomColumn>
          <CustomColumn textAlign="center">
            <b> {appraisalObject && appraisalObject.year5 > 0 ? appraisalObject.year5 : financialYear - 1} </b>
          </CustomColumn>
          <CustomColumn textAlign="center">
            <b>
              {appraisalObject && appraisalObject.year6 > 0 ? appraisalObject.year6 : financialYear}
              YTD
            </b>
          </CustomColumn>
          <CustomColumn textAlign="center">
            <b>
              {financialYear}
              Annualised
            </b>
          </CustomColumn>
          <CustomColumn textAlign="center">
            <b> Annualised Yes / No </b>
          </CustomColumn>
        </Grid.Row>
        {this.state.rows.map((item, key) => (
          <Grid.Row columns={9} key={key}>
            <CustomColumn>
              <Input
                size="small"
                fluid
                tabIndex={item.tabIndex}
                name={item.name}
                autoComplete={item.name}
                value={values[item.name]}
                onChange={(e, data) => this._handleChangeDescription(item.name, data, item)}
                onBlur={handleBlur}
              />
            </CustomColumn>
            {item.columns.map((subItem, subKey) => (
              <CustomColumn key={subKey}>
                <Input
                  size="small"
                  fluid
                  tabIndex={item.tabIndex}
                  name={subItem.name}
                  autoComplete={subItem.name}
                  value={
                    parseInt(values[subItem.name]) !== 0
                      ? values[subItem.name].substring(0, 1) === '-'
                        ? `${values[subItem.name]}`
                        : `$${values[subItem.name]}`
                      : ''
                  }
                  onChange={this._handleChangeInputCurrency}
                  onBlur={e => this._handleChangeAddbackAndAdjusments(e, item.row, subItem.name)}
                />
              </CustomColumn>
            ))}
            <CustomColumn
              style={{
                backgroundColor: 'white'
              }}
              textAlign="center"
            >
              {parseInt(values[`aaRow${item.row}Year7`]) > 0
                ? numeral(values[`aaRow${item.row}Year7`]).format('$0,0')
                : ''}
            </CustomColumn>
            <CustomColumn textAlign="center">
              <Form.Field
                style={{
                  marginTop: '10px'
                }}
              >
                <Checkbox
                  name={`${item.name}YesNo`}
                  onChange={this._handleChangeCheckBox}
                  item={item}
                  checked={values[`${item.name}YesNo`]}
                />
              </Form.Field>
            </CustomColumn>
          </Grid.Row>
        ))}
        <Grid.Row columns={9}>
          <CustomColumn>
            <b> Total Adjustments </b>
          </CustomColumn>
          <CustomColumn textAlign="right">
            {parseInt(this.state.totalAdjusments1) !== 0 ? numeral(this.state.totalAdjusments1).format('$0,0') : ''}
          </CustomColumn>
          <CustomColumn textAlign="right">
            {parseInt(this.state.totalAdjusments2) !== 0 ? numeral(this.state.totalAdjusments2).format('$0,0') : ''}
          </CustomColumn>
          <CustomColumn textAlign="right">
            {parseInt(this.state.totalAdjusments3) !== 0 ? numeral(this.state.totalAdjusments3).format('$0,0') : ''}
          </CustomColumn>
          <CustomColumn textAlign="right">
            {parseInt(this.state.totalAdjusments4) !== 0 ? numeral(this.state.totalAdjusments4).format('$0,0') : ''}
          </CustomColumn>
          <CustomColumn textAlign="right">
            {parseInt(this.state.totalAdjusments5) !== 0 ? numeral(this.state.totalAdjusments5).format('$0,0') : ''}
          </CustomColumn>
          <CustomColumn textAlign="right">
            {parseInt(this.state.totalAdjusments6) !== 0 ? numeral(this.state.totalAdjusments6).format('$0,0') : ''}
          </CustomColumn>
          <CustomColumn textAlign="right">
            {parseInt(this.state.totalAdjusments7) !== 0 ? numeral(this.state.totalAdjusments7).format('$0,0') : ''}
          </CustomColumn>
        </Grid.Row>
        <Grid.Row columns={9}>
          <CustomColumn>
            <b> Total Adjusted Profit INCL.Owners Wages </b>
          </CustomColumn>
          <CustomColumn textAlign="right">
            {parseInt(this.state.totalAdjustedProfit1) !== 0
              ? numeral(this.state.totalAdjustedProfit1).format('$0,0')
              : ''}
          </CustomColumn>
          <CustomColumn textAlign="right">
            {parseInt(this.state.totalAdjustedProfit2) !== 0
              ? numeral(this.state.totalAdjustedProfit2).format('$0,0')
              : ''}
          </CustomColumn>
          <CustomColumn textAlign="right">
            {parseInt(this.state.totalAdjustedProfit3) !== 0
              ? numeral(this.state.totalAdjustedProfit3).format('$0,0')
              : ''}
          </CustomColumn>
          <CustomColumn textAlign="right">
            {parseInt(this.state.totalAdjustedProfit4) !== 0
              ? numeral(this.state.totalAdjustedProfit4).format('$0,0')
              : ''}
          </CustomColumn>
          <CustomColumn textAlign="right">
            {parseInt(this.state.totalAdjustedProfit5) !== 0
              ? numeral(this.state.totalAdjustedProfit5).format('$0,0')
              : ''}
          </CustomColumn>
          <CustomColumn textAlign="right">
            {parseInt(this.state.totalAdjustedProfit6) !== 0
              ? numeral(this.state.totalAdjustedProfit6).format('$0,0')
              : ''}
          </CustomColumn>
          <CustomColumn textAlign="right">
            {parseInt(this.state.totalAdjustedProfit7) !== 0
              ? numeral(this.state.totalAdjustedProfit7).format('$0,0')
              : ''}
          </CustomColumn>
        </Grid.Row>
        <Grid.Row columns={9}>
          <CustomColumn>
            <b> Adjusted Profit % </b>
          </CustomColumn>
          <CustomColumn textAlign="right">{this.state.totalAdjustedProfit1Perc} %</CustomColumn>
          <CustomColumn textAlign="right"> {this.state.totalAdjustedProfit2Perc} % </CustomColumn>
          <CustomColumn textAlign="right"> {this.state.totalAdjustedProfit3Perc} % </CustomColumn>
          <CustomColumn textAlign="right"> {this.state.totalAdjustedProfit4Perc} % </CustomColumn>
          <CustomColumn textAlign="right"> {this.state.totalAdjustedProfit5Perc} % </CustomColumn>
          <CustomColumn textAlign="right"> {this.state.totalAdjustedProfit6Perc} % </CustomColumn>
          <CustomColumn textAlign="right"> {this.state.totalAdjustedProfit7Perc} % </CustomColumn>
          {/* <CustomColumn textAlign="right">
            {this.state.totalAdjustedProfit2Perc > 0 ? `${this.state.totalAdjustedProfit2Perc} %` : ''}
          </CustomColumn> */}
          {/* <CustomColumn textAlign="right">
            {this.state.totalAdjustedProfit3Perc > 0 ? `${this.state.totalAdjustedProfit3Perc} %` : ''}
          </CustomColumn>
          <CustomColumn textAlign="right">
            {this.state.totalAdjustedProfit4Perc > 0 ? `${this.state.totalAdjustedProfit4Perc} %` : ''}
          </CustomColumn>
          <CustomColumn textAlign="right">
            {this.state.totalAdjustedProfit5Perc > 0 ? `${this.state.totalAdjustedProfit5Perc} %` : ''}
          </CustomColumn>
          <CustomColumn textAlign="right">
            {this.state.totalAdjustedProfit6Perc > 0 ? `${this.state.totalAdjustedProfit6Perc} %` : ''}
          </CustomColumn>
          <CustomColumn textAlign="right">
            {this.state.totalAdjustedProfit7Perc > 0 ? `${this.state.totalAdjustedProfit7Perc} %` : ''}
          </CustomColumn> */}
        </Grid.Row>
      </Fragment>
    )
  }
}

AddbacksAndAdjustmentsForm.propTypes = {
  values: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  errors: PropTypes.object,
  touched: PropTypes.object,
  setFieldValue: PropTypes.func,
  isValid: PropTypes.bool,
  financialYear: PropTypes.string,
  setCalcTotalAddbacksAndAdjustments: PropTypes.func,
  updateAppraisal: PropTypes.func,
  appraisalObject: PropTypes.object,
  monthsCovered: PropTypes.number,
  seasonalAdjustment: PropTypes.number,
  monthsCoveredAndSeasonalAdjusment: PropTypes.object,
  calcAnnualisedWhenChangeMonthsAndSeasonal: PropTypes.func,
  clearMovedFinancialYear: PropTypes.func,
  isMovedFinancialYear: PropTypes.bool,
  totalsAdjustedProfitPerc: PropTypes.object,
  totalsAdjustedProfit: PropTypes.object
}

const mapPropsToValues = props => {
  const values = {
    business_id: props.business ? props.business.id : '',
    id: props.appraisalObject ? props.appraisalObject.id : ''
  }
  for (let row = 1; row <= 30; row++) {
    values[`aaRow${row}`] = props.appraisalObject ? props.appraisalObject[`aaRow${row}`] : 0
    values[`aaRow${row}Year1`] = props.appraisalObject
      ? numeral(props.appraisalObject[`aaRow${row}Year1`]).format('0,0')
      : 0
    values[`aaRow${row}Year2`] = props.appraisalObject
      ? props.appraisalObject[`aaRow${row}Year2`] < 0
        ? numeral(props.appraisalObject[`aaRow${row}Year2`]).format('$0,0')
        : numeral(props.appraisalObject[`aaRow${row}Year2`]).format('0,0')
      : 0
    values[`aaRow${row}Year3`] = props.appraisalObject
      ? props.appraisalObject[`aaRow${row}Year3`] < 0
        ? numeral(props.appraisalObject[`aaRow${row}Year3`]).format('$0,0')
        : numeral(props.appraisalObject[`aaRow${row}Year3`]).format('0,0')
      : 0
    values[`aaRow${row}Year4`] = props.appraisalObject
      ? props.appraisalObject[`aaRow${row}Year4`] < 0
        ? numeral(props.appraisalObject[`aaRow${row}Year4`]).format('$0,0')
        : numeral(props.appraisalObject[`aaRow${row}Year4`]).format('0,0')
      : 0
    values[`aaRow${row}Year5`] = props.appraisalObject
      ? props.appraisalObject[`aaRow${row}Year5`] < 0
        ? numeral(props.appraisalObject[`aaRow${row}Year5`]).format('$0,0')
        : numeral(props.appraisalObject[`aaRow${row}Year5`]).format('0,0')
      : 0
    values[`aaRow${row}Year6`] = props.appraisalObject
      ? props.appraisalObject[`aaRow${row}Year6`] < 0
        ? numeral(props.appraisalObject[`aaRow${row}Year6`]).format('$0,0')
        : numeral(props.appraisalObject[`aaRow${row}Year6`]).format('0,0')
      : 0
    values[`aaRow${row}Year7`] = props.appraisalObject
      ? props.appraisalObject[`aaRow${row}Year7`] < 0
        ? numeral(props.appraisalObject[`aaRow${row}Year7`]).format('$0,0')
        : numeral(props.appraisalObject[`aaRow${row}Year7`]).format('0,0')
      : 0
    values[`aaRow${row}YesNo`] = props.appraisalObject ? props.appraisalObject[`aaRow${row}YesNo`] : 0
  }
  values['aaRow1'] = props.appraisalObject ? props.appraisalObject['aaRow1'] : ''
  values['aaRow2'] = props.appraisalObject ? props.appraisalObject['aaRow2'] : ''
  values['aaRow3'] = props.appraisalObject ? props.appraisalObject['aaRow3'] : ''
  values['aaRow4'] = props.appraisalObject ? props.appraisalObject['aaRow4'] : ''
  values['aaRow5'] = props.appraisalObject ? props.appraisalObject['aaRow5'] : ''
  values['aaRow6'] = props.appraisalObject ? props.appraisalObject['aaRow6'] : ''
  values['aaRow7'] = props.appraisalObject ? props.appraisalObject['aaRow7'] : ''
  values['aaRow8'] = props.appraisalObject ? props.appraisalObject['aaRow8'] : ''
  values['aaRow9'] = props.appraisalObject ? props.appraisalObject['aaRow9'] : ''
  values['aaRow10'] = props.appraisalObject ? props.appraisalObject['aaRow10'] : ''

  return values
}

const mapStateToProps = state => ({
  monthsCoveredAndSeasonalAdjusment: state.appraisal.sendMonthsSeasonal,
  isMovedFinancialYear: state.appraisal.moveFinancialYear.isMoved
})

const validationSchema = Yup.object().shape({})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateAppraisal,
      calcAnnualisedWhenChangeMonthsAndSeasonal,
      clearMovedFinancialYear
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
  })(AddbacksAndAdjustmentsForm)
)

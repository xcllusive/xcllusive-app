import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { Checkbox, Label, Grid, Button, Icon, Input, Form } from 'semantic-ui-react'
import numeral from 'numeral'

import { calcAnnualisedWhenChangeMonthsAndSeasonal } from '../../../../redux/ducks/appraisal'
import CustomColumn from '../../../../components/content/CustomGridColumn'
// import { connect } from 'http2'

const FinancialAnalysisForm = ({
  values,
  handleChange,
  handleBlur,
  handleChangeCheckBox,
  handleChangeCheckBoxPdf,
  errors,
  touched,
  financialYear,
  appraisalObject,
  sendCalcs,
  setFieldValue,
  setFieldTouched,
  calcAnnualisedWhenChangeMonthsAndSeasonal
}) => {
  const _calcGrossMargin = (sales, cogs) => sales - cogs

  const _calcGrossMarginPerc = (sales, cogs) => (((sales - cogs) * 100) / sales).toFixed(2) || 0

  const _calcGrossProfit = (grossMargin, other) => numeral(grossMargin).value() + numeral(other).value() || 0

  const _calcOperatingProfit = (sales, cogs, other, expense, year) => {
    const calc = _calcGrossProfit(_calcGrossMargin(sales, cogs), other) - expense || 0

    sendCalcs({
      year,
      calc,
      field: 'operatingProfit'
    })
    sendCalcs({
      year,
      calc: numeral(sales).value() || 0,
      field: 'sales'
    })
    return calc
  }

  const _calcOperatingProfitPerc = (sales, cogs, other, expense) =>
    ((_calcOperatingProfit(sales, cogs, other, expense) / sales) * 100).toFixed(2) || 0

  const _calcAnnualised = (yearValue, monthsCoveredValue, seasonalAdjustmentValue) => {
    const year = numeral(yearValue).value()
    const monthsCovered = numeral(monthsCoveredValue).value()
    const seasonalAdjustment = numeral(seasonalAdjustmentValue).value() / 100

    return (year / monthsCovered) * 12 + ((year / monthsCovered) * 12 - year) * seasonalAdjustment
  }

  const _handleBlurCalcAnualised = e => {
    if (values.salesYesNo) {
      setFieldValue(
        'calcAnnualised1',
        _calcAnnualised(values.calcGrossMargin6, values.monthsCovered, values.seasonalAdjustment)
      )
      if (values.cogsYesNo) {
        setFieldValue(
          `calcGrossMargin${7}`,
          _calcGrossMargin(
            _calcAnnualised(values.calcGrossMargin6, values.monthsCovered, values.seasonalAdjustment),
            _calcAnnualised(values.cogs6, values.monthsCovered, values.seasonalAdjustment)
          )
        )
        setFieldValue(
          `calcGrossMarginPerc${7}`,
          _calcGrossMarginPerc(
            _calcAnnualised(values.calcGrossMargin6, values.monthsCovered, values.seasonalAdjustment),
            _calcAnnualised(values.cogs6, values.monthsCovered, values.seasonalAdjustment)
          )
        )
      } else {
        setFieldValue(
          `calcGrossMargin${7}`,
          _calcGrossMargin(
            _calcAnnualised(values.calcGrossMargin6, values.monthsCovered, values.seasonalAdjustment),
            values.cogs6
          )
        )
        setFieldValue(
          `calcGrossMarginPerc${7}`,
          _calcGrossMarginPerc(
            _calcAnnualised(values.calcGrossMargin6, values.monthsCovered, values.seasonalAdjustment),
            values.calcAnnualised2
          )
        )
      }
    }
    if (values.cogsYesNo) {
      setFieldValue('calcAnnualised2', _calcAnnualised(values.cogs6, values.monthsCovered, values.seasonalAdjustment))
      if (values.salesYesNo) {
        setFieldValue(
          `calcGrossMargin${7}`,
          _calcGrossMargin(
            _calcAnnualised(values.calcGrossMargin6, values.monthsCovered, values.seasonalAdjustment),
            _calcAnnualised(values.cogs6, values.monthsCovered, values.seasonalAdjustment)
          )
        )
        setFieldValue(
          `calcGrossMarginPerc${7}`,
          _calcGrossMarginPerc(
            _calcAnnualised(values.calcGrossMargin6, values.monthsCovered, values.seasonalAdjustment),
            _calcAnnualised(values.cogs6, values.monthsCovered, values.seasonalAdjustment)
          )
        )
      } else {
        setFieldValue(
          `calcGrossMargin${7}`,
          _calcGrossMargin(
            values.sales6,
            _calcAnnualised(values.cogs6, values.monthsCovered, values.seasonalAdjustment)
          )
        )
        setFieldValue(
          `calcGrossMarginPerc${7}`,
          _calcGrossMarginPerc(
            values.sales6,
            _calcAnnualised(values.cogs6, values.monthsCovered, values.seasonalAdjustment)
          )
        )
      }
    }
    if (values.otherIncomeYesNo) {
      setFieldValue(
        'calcAnnualised5',
        _calcAnnualised(values.otherIncome6, values.monthsCovered, values.seasonalAdjustment)
      )
    }
    if (values.expensesYesNo) {
      setFieldValue(
        'calcAnnualised7',
        _calcAnnualised(values.expenses6, values.monthsCovered, values.seasonalAdjustment)
      )
    }
    calcAnnualisedWhenChangeMonthsAndSeasonal(values.monthsCovered, values.seasonalAdjustment)
  }

  const _handleChangeCheckBox = (e, { name, row, checked }) => {
    handleChangeCheckBox(e, {
      name
    })

    if (row === 1) {
      if (checked) {
        setFieldValue(
          `calcAnnualised${row}`,
          _calcAnnualised(values.sales6, values.monthsCovered, values.seasonalAdjustment)
        )
        setFieldValue(
          `calcGrossMargin${7}`,
          _calcGrossMargin(
            _calcAnnualised(values.sales6, values.monthsCovered, values.seasonalAdjustment),
            values.calcAnnualised2
          )
        )
        if (values.cogsYesNo) {
          setFieldValue(
            `calcGrossMarginPerc${7}`,
            _calcGrossMarginPerc(
              _calcAnnualised(values.sales6, values.monthsCovered, values.seasonalAdjustment),
              values.calcAnnualised2
            )
          )
        } else {
          setFieldValue(
            `calcGrossMarginPerc${7}`,
            _calcGrossMarginPerc(
              _calcAnnualised(values.sales6, values.monthsCovered, values.seasonalAdjustment),
              values.cogs6
            )
          )
        }
      } else {
        if (values.sales6 > 0) {
          setFieldValue(`calcAnnualised${row}`, values.sales6)
          setFieldValue(`calcGrossMargin${7}`, _calcGrossMargin(values.sales6, values.calcAnnualised2))
          setFieldValue(`calcGrossMarginPerc${7}`, _calcGrossMarginPerc(values.sales6, values.calcAnnualised2))
        } else {
          setFieldValue(`calcAnnualised${row}`, 0)
        }
      }
    }

    if (row === 2) {
      if (checked) {
        setFieldValue(
          `calcAnnualised${row}`,
          _calcAnnualised(values.cogs6, values.monthsCovered, values.seasonalAdjustment)
        )
        if (values.salesYesNo) {
          // aqui
          setFieldValue(
            `calcGrossMargin${7}`,
            _calcGrossMargin(
              _calcAnnualised(values.sales6, values.monthsCovered, values.seasonalAdjustment),
              _calcAnnualised(values.cogs6, values.monthsCovered, values.seasonalAdjustment)
            )
          )
          setFieldValue(
            `calcGrossMarginPerc${7}`,
            _calcGrossMarginPerc(
              _calcAnnualised(values.sales6, values.monthsCovered, values.seasonalAdjustment),
              _calcAnnualised(values.cogs6, values.monthsCovered, values.seasonalAdjustment)
            )
          )
        } else {
          setFieldValue(
            `calcGrossMargin${7}`,
            _calcGrossMargin(
              values.sales6,
              _calcAnnualised(values.cogs6, values.monthsCovered, values.seasonalAdjustment)
            )
          )
          setFieldValue(
            `calcGrossMarginPerc${7}`,
            _calcGrossMarginPerc(
              values.sales6,
              _calcAnnualised(values.cogs6, values.monthsCovered, values.seasonalAdjustment)
            )
          )
        }
      } else {
        if (values.cogs6 > 0) {
          setFieldValue(`calcAnnualised${row}`, values.cogs6)
          setFieldValue(`calcGrossMargin${7}`, _calcGrossMargin(values.calcAnnualised1, values.cogs6))
          if (values.salesYesNo) {
            setFieldValue(
              `calcGrossMarginPerc${7}`,
              _calcGrossMarginPerc(_calcGrossMargin(values.calcAnnualised1, values.cogs6), values.cogs6)
            )
          } else {
            setFieldValue(`calcGrossMarginPerc${7}`, _calcGrossMarginPerc(values.sales6, values.cogs6))
          }
        } else {
          setFieldValue(`calcAnnualised${row}`, 0)
        }
      }
    }

    if (row === 5) {
      if (checked) {
        setFieldValue(
          `calcAnnualised${row}`,
          _calcAnnualised(values.otherIncome6, values.monthsCovered, values.seasonalAdjustment)
        )
      } else {
        if (values.otherIncome6 > 0) {
          setFieldValue(`calcAnnualised${row}`, values.otherIncome6)
        } else {
          setFieldValue(`calcAnnualised${row}`, 0)
        }
      }
    }
    if (row === 7) {
      if (checked) {
        setFieldValue(
          `calcAnnualised${row}`,
          _calcAnnualised(values.expenses6, values.monthsCovered, values.seasonalAdjustment)
        )
      } else {
        if (values.expenses6 > 0) {
          setFieldValue(`calcAnnualised${row}`, values.expenses6)
        } else {
          setFieldValue(`calcAnnualised${row}`, 0)
        }
      }
    }
  }

  const _handleChange = (e, { name, value }) => {
    return setFieldValue(name, numeral(value).value()) || 0
  }

  const _handleChangeSales = (e, column) => {
    if (column === 6) {
      if (values.salesYesNo) {
        setFieldValue(
          `calcAnnualised${1}`,
          _calcAnnualised(values.sales6, values.monthsCovered, values.seasonalAdjustment)
        )
      } else {
        setFieldValue(`calcAnnualised${1}`, 0)
      }
    }

    e.preventDefault()
    const name = e.target.name
    const value = e.target.value

    const sales = numeral(value).value()
    const cogs = numeral(values[`cogs${column}`]).value()
    const otherIncome = numeral(values[`otherIncome${column}`]).value()
    const expense = numeral(values[`expenses${column}`]).value()

    // setFieldValue(name, numeral(value).format('0,0'))
    setFieldTouched(name, true)
    setFieldValue(`calcGrossMargin${column}`, _calcGrossMargin(sales, cogs))
    setFieldValue(`calcGrossMarginPerc${column}`, _calcGrossMarginPerc(sales, cogs))
    setFieldValue(`calcGrossProfit${column}`, _calcGrossProfit(_calcGrossMargin(sales, cogs), otherIncome))
    setFieldValue(`calcOperatingProfit${column}`, _calcOperatingProfit(sales, cogs, otherIncome, expense, column))
    setFieldValue(`calcOperatingProfitPerc${column}`, _calcOperatingProfitPerc(sales, cogs, otherIncome, expense))

    if (column === 6) {
      setFieldValue(
        `calcGrossMargin${7}`,
        _calcGrossMargin(
          _calcAnnualised(values.sales6, values.monthsCovered, values.seasonalAdjustment),
          values.calcAnnualised2
        )
      )
      setFieldValue(`calcGrossMarginPerc${7}`, _calcGrossMarginPerc(sales, cogs))
    }
  }

  const _handleChangeCogs = (e, column) => {
    if (column === 6) {
      if (values.cogsYesNo) {
        setFieldValue(
          `calcAnnualised${2}`,
          _calcAnnualised(values.cogs6, values.monthsCovered, values.seasonalAdjustment)
        )
      } else {
        setFieldValue(`calcAnnualised${2}`, 0)
      }
    }
    e.preventDefault()
    const name = e.target.name
    const value = e.target.value

    const cogs = numeral(value).value()
    const sales = numeral(values[`sales${column}`]).value()
    const otherIncome = numeral(values[`otherIncome${column}`]).value()
    const expense = numeral(values[`expenses${column}`]).value()

    // setFieldValue(name, numeral(value).format('0,0'))
    setFieldTouched(name, true)
    setFieldValue(`calcGrossMargin${column}`, _calcGrossMargin(sales, cogs))
    setFieldValue(`calcGrossMarginPerc${column}`, _calcGrossMarginPerc(sales, cogs))
    setFieldValue(`calcGrossProfit${column}`, _calcGrossProfit(_calcGrossMargin(sales, cogs), otherIncome))
    setFieldValue(`calcOperatingProfit${column}`, _calcOperatingProfit(sales, cogs, otherIncome, expense, column))
    setFieldValue(`calcOperatingProfitPerc${column}`, _calcOperatingProfitPerc(sales, cogs, otherIncome, expense))

    if (column === 6) {
      setFieldValue(
        `calcGrossMargin${7}`,
        _calcGrossMargin(
          _calcAnnualised(values.sales6, values.monthsCovered, values.seasonalAdjustment),
          _calcAnnualised(values.cogs6, values.monthsCovered, values.seasonalAdjustment)
        )
      )
      setFieldValue(`calcGrossMarginPerc${7}`, _calcGrossMarginPerc(sales, cogs))
    }
  }

  const _handleChangeOtherIncome = (e, column) => {
    if (column === 6) {
      if (values.otherIncomeYesNo) {
        setFieldValue(
          `calcAnnualised${5}`,
          _calcAnnualised(values.otherIncome6, values.monthsCovered, values.seasonalAdjustment)
        )
      } else {
        setFieldValue(`calcAnnualised${5}`, 0)
      }
    }
    e.preventDefault()
    const name = e.target.name
    const value = e.target.value

    const otherIncome = numeral(value).value()
    const cogs = numeral(values[`cogs${column}`]).value()
    const sales = numeral(values[`sales${column}`]).value()
    const expense = numeral(values[`expenses${column}`]).value()

    // setFieldValue(name, numeral(value).format('0,0'))
    setFieldTouched(name, true)
    setFieldValue(`calcGrossMargin${column}`, _calcGrossMargin(sales, cogs))
    setFieldValue(`calcGrossMarginPerc${column}`, _calcGrossMarginPerc(sales, cogs))
    setFieldValue(`calcGrossProfit${column}`, _calcGrossProfit(_calcGrossMargin(sales, cogs), otherIncome))
    setFieldValue(`calcOperatingProfit${column}`, _calcOperatingProfit(sales, cogs, otherIncome, expense, column))
    setFieldValue(`calcOperatingProfitPerc${column}`, _calcOperatingProfitPerc(sales, cogs, otherIncome, expense))
  }

  const _handleChangeExpense = (e, column) => {
    if (column === 6) {
      if (values.expensesYesNo) {
        setFieldValue(
          `calcAnnualised${7}`,
          _calcAnnualised(values.expenses6, values.monthsCovered, values.seasonalAdjustment)
        )
      } else {
        setFieldValue(`calcAnnualised${7}`, 0)
      }
    }
    e.preventDefault()
    const name = e.target.name
    const value = e.target.value

    const expense = numeral(value).value()
    const cogs = numeral(values[`cogs${column}`]).value()
    const sales = numeral(values[`sales${column}`]).value()
    const otherIncome = numeral(values[`otherIncome${column}`]).value()

    // setFieldValue(name, numeral(value).format('0,0'))
    setFieldTouched(name, true)
    setFieldValue(`calcGrossMargin${column}`, _calcGrossMargin(sales, cogs))
    setFieldValue(`calcGrossMarginPerc${column}`, _calcGrossMarginPerc(sales, cogs))
    setFieldValue(`calcGrossProfit${column}`, _calcGrossProfit(_calcGrossMargin(sales, cogs), otherIncome))
    setFieldValue(`calcOperatingProfit${column}`, _calcOperatingProfit(sales, cogs, otherIncome, expense, column))
    setFieldValue(`calcOperatingProfitPerc${column}`, _calcOperatingProfitPerc(sales, cogs, otherIncome, expense))
  }

  const _handleChangeCheckBoxPdf = (e, { name }) => {
    handleChangeCheckBoxPdf(e, {
      name
    })
  }

  return (
    <Fragment>
      <Grid.Row>
        <CustomColumn>
          <Input
            label="Months Covered"
            name="monthsCovered"
            autoComplete="monthsCovered"
            value={values.monthsCovered}
            onChange={handleChange}
            onBlur={_handleBlurCalcAnualised}
            tabIndex={-2}
          />
          {errors.monthsCovered && touched.monthsCovered && (
            <Label basic color="red" pointing content={errors.monthsCovered} />
          )}
          <Input
            label="Seasonal Adjustment (%)"
            name="seasonalAdjustment"
            autoComplete="seasonalAdjustment"
            value={values.seasonalAdjustment}
            onChange={handleChange}
            onBlur={_handleBlurCalcAnualised}
            tabIndex={-1}
          />
          {errors.seasonalAdjustment && touched.seasonalAdjustment && (
            <Label basic color="red" pointing content={errors.seasonalAdjustment} />
          )}
          <Button color="facebook" size="small">
            <Icon name="forward" />
            Move Financial Year
          </Button>
        </CustomColumn>
      </Grid.Row>
      <Grid.Row
        style={{
          backgroundColor: 'lightyellow'
        }}
        columns={9}
      >
        <CustomColumn>
          <b> Financial Year </b>
        </CustomColumn>
        <CustomColumn textAlign="center">
          <Form.Field>
            <Form.Checkbox
              label="Show in PDF"
              name="renderPdfYear1"
              checked={values.renderPdfYear1}
              onChange={_handleChangeCheckBoxPdf}
            />
          </Form.Field>
          <b> {appraisalObject && appraisalObject.year1 > 0 ? appraisalObject.year1 : financialYear - 5} </b>
        </CustomColumn>
        <CustomColumn textAlign="center">
          <Form.Field>
            <Form.Checkbox
              label="Show in PDF"
              name="renderPdfYear2"
              checked={values.renderPdfYear2}
              onChange={_handleChangeCheckBoxPdf}
            />
          </Form.Field>
          <b> {appraisalObject && appraisalObject.year2 > 0 ? appraisalObject.year2 : financialYear - 4} </b>
        </CustomColumn>
        <CustomColumn textAlign="center">
          <Form.Field>
            <Form.Checkbox
              label="Show in PDF"
              name="renderPdfYear3"
              checked={values.renderPdfYear3}
              onChange={_handleChangeCheckBoxPdf}
            />
          </Form.Field>
          <b> {appraisalObject && appraisalObject.year3 > 0 ? appraisalObject.year3 : financialYear - 3} </b>
        </CustomColumn>
        <CustomColumn textAlign="center">
          <Form.Field>
            <Form.Checkbox
              label="Show in PDF"
              name="renderPdfYear4"
              checked={values.renderPdfYear4}
              onChange={_handleChangeCheckBoxPdf}
            />
          </Form.Field>
          <b> {appraisalObject && appraisalObject.year4 > 0 ? appraisalObject.year4 : financialYear - 2} </b>
        </CustomColumn>
        <CustomColumn textAlign="center">
          <Form.Field>
            <Form.Checkbox
              label="Show in PDF"
              name="renderPdfYear5"
              checked={values.renderPdfYear5}
              onChange={_handleChangeCheckBoxPdf}
            />
          </Form.Field>
          <b> {appraisalObject && appraisalObject.year5 > 0 ? appraisalObject.year5 : financialYear - 1} </b>
        </CustomColumn>
        <CustomColumn textAlign="center">
          <b>
            {appraisalObject && appraisalObject.year6 > 0 ? appraisalObject.year6 : financialYear}
            YTD
          </b>
        </CustomColumn>
        <CustomColumn textAlign="center">
          <Form.Field>
            <Form.Checkbox
              label="Show in PDF"
              name="renderPdfYear7"
              checked={values.renderPdfYear7}
              onChange={_handleChangeCheckBoxPdf}
            />
          </Form.Field>
          <b>
            {financialYear}
            Annualised
          </b>
        </CustomColumn>
        <CustomColumn textAlign="center">
          <b> Annualised Yes / No </b>
        </CustomColumn>
      </Grid.Row>
      <Grid.Row
        style={{
          backgroundColor: '#dae4ef'
        }}
        columns={9}
      >
        <CustomColumn>
          <b> Sales </b>
        </CustomColumn>
        <CustomColumn>
          <Input
            fluid
            column={1}
            tabIndex={1}
            name="sales1"
            autoComplete="sales1"
            value={numeral(values.sales1).format('$0,0.[99]')}
            onChange={_handleChange}
            onBlur={e => _handleChangeSales(e, 1)}
          />
          {errors.sales1 && touched.sales1 && <Label basic color="red" pointing content={errors.sales1} />}
        </CustomColumn>
        <CustomColumn>
          <Input
            fluid
            column={2}
            tabIndex={10}
            name="sales2"
            autoComplete="sales2"
            value={numeral(values.sales2).format('$0,0.[99]')}
            onChange={_handleChange}
            onBlur={e => _handleChangeSales(e, 2)}
          />
          {errors.sales2 && touched.sales2 && <Label basic color="red" pointing content={errors.sales2} />}
        </CustomColumn>
        <CustomColumn>
          <Input
            fluid
            column={3}
            tabIndex={20}
            name="sales3"
            autoComplete="sales3"
            value={numeral(values.sales3).format('$0,0.[99]')}
            onChange={_handleChange}
            onBlur={e => _handleChangeSales(e, 3)}
          />
          {errors.sales3 && touched.sales3 && <Label basic color="red" pointing content={errors.sales3} />}
        </CustomColumn>
        <CustomColumn>
          <Input
            fluid
            column={4}
            tabIndex={30}
            name="sales4"
            autoComplete="sales4"
            value={numeral(values.sales4).format('$0,0.[99]')}
            onChange={_handleChange}
            onBlur={e => _handleChangeSales(e, 4)}
          />
          {errors.sales4 && touched.sales4 && <Label basic color="red" pointing content={errors.sales4} />}
        </CustomColumn>
        <CustomColumn>
          <Input
            fluid
            column={5}
            tabIndex={40}
            name="sales5"
            autoComplete="sales5"
            value={numeral(values.sales5).format('$0,0.[99]')}
            onChange={_handleChange}
            onBlur={e => _handleChangeSales(e, 5)}
          />
          {errors.sales5 && touched.sales5 && <Label basic color="red" pointing content={errors.sales5} />}
        </CustomColumn>
        <CustomColumn>
          <Input
            fluid
            column={6}
            tabIndex={50}
            name="sales6"
            autoComplete="sales6"
            value={numeral(values.sales6).format('$0,0.[99]')}
            onChange={_handleChange}
            onBlur={e => _handleChangeSales(e, 6)}
          />
          {errors.sales6 && touched.sales6 && <Label basic color="red" pointing content={errors.sales6} />}
        </CustomColumn>
        <CustomColumn
          style={{
            backgroundColor: 'white'
          }}
          textAlign="right"
        >
          {/* {_calcAnnualised(values.sales6, values.monthsCovered, values.seasonalAdjustment)} */}
          {numeral(values.calcAnnualised1).format('$0,0')}
        </CustomColumn>
        <CustomColumn textAlign="center">
          <Checkbox name="salesYesNo" onChange={_handleChangeCheckBox} row={1} checked={values.salesYesNo} />
        </CustomColumn>
      </Grid.Row>
      <Grid.Row
        style={{
          backgroundColor: '#dae4ef'
        }}
        columns={9}
      >
        <CustomColumn>
          <b> COGS </b>
        </CustomColumn>
        <CustomColumn>
          <Input
            fluid
            column={1}
            tabIndex={2}
            name="cogs1"
            autoComplete="cogs1"
            value={numeral(values.cogs1).format('$0,0.[99]')}
            onChange={_handleChange}
            onBlur={e => _handleChangeCogs(e, 1)}
          />
          {errors.cogs1 && touched.cogs1 && <Label basic color="red" pointing content={errors.cogs1} />}
        </CustomColumn>
        <CustomColumn>
          <Input
            fluid
            column={2}
            tabIndex={11}
            name="cogs2"
            autoComplete="cogs2"
            value={numeral(values.cogs2).format('$0,0.[99]')}
            onChange={_handleChange}
            onBlur={e => _handleChangeCogs(e, 2)}
          />
          {errors.cogs2 && touched.cogs2 && <Label basic color="red" pointing content={errors.cogs2} />}
        </CustomColumn>
        <CustomColumn>
          <Input
            fluid
            column={3}
            tabIndex={21}
            name="cogs3"
            autoComplete="cogs3"
            value={numeral(values.cogs3).format('$0,0.[99]')}
            onChange={_handleChange}
            onBlur={e => _handleChangeCogs(e, 3)}
          />
          {errors.cogs3 && touched.cogs3 && <Label basic color="red" pointing content={errors.cogs3} />}
        </CustomColumn>
        <CustomColumn>
          <Input
            fluid
            column={4}
            tabIndex={31}
            name="cogs4"
            autoComplete="cogs4"
            value={numeral(values.cogs4).format('$0,0.[99]')}
            onChange={_handleChange}
            onBlur={e => _handleChangeCogs(e, 4)}
          />
          {errors.cogs4 && touched.cogs4 && <Label basic color="red" pointing content={errors.cogs4} />}
        </CustomColumn>
        <CustomColumn>
          <Input
            fluid
            column={5}
            tabIndex={41}
            name="cogs5"
            autoComplete="cogs5"
            value={numeral(values.cogs5).format('$0,0.[99]')}
            onChange={_handleChange}
            onBlur={e => _handleChangeCogs(e, 5)}
          />
          {errors.cogs5 && touched.cogs5 && <Label basic color="red" pointing content={errors.cogs5} />}
        </CustomColumn>
        <CustomColumn>
          <Input
            fluid
            column={6}
            tabIndex={51}
            name="cogs6"
            autoComplete="cogs6"
            value={numeral(values.cogs6).format('$0,0.[99]')}
            onChange={_handleChange}
            onBlur={e => _handleChangeCogs(e, 6)}
          />
          {errors.cogs6 && touched.cogs6 && <Label basic color="red" pointing content={errors.cogs6} />}
        </CustomColumn>
        <CustomColumn
          style={{
            backgroundColor: 'white'
          }}
          textAlign="right"
        >
          {/* {_calcAnnualised(values.cogs6, values.monthsCovered, values.seasonalAdjustment)} */}
          {numeral(values.calcAnnualised2).format('$0,0')}
        </CustomColumn>
        <CustomColumn textAlign="center">
          <Checkbox name="cogsYesNo" onChange={_handleChangeCheckBox} row={2} checked={values.cogsYesNo} />
        </CustomColumn>
      </Grid.Row>
      <Grid.Row columns={9}>
        <CustomColumn>
          <b> Gross Margin </b>
        </CustomColumn>
        {/* <CustomColumn textAlign="center">{_calcGrossMargin(values.sales1, values.cogs1)} %</CustomColumn> */}
        <CustomColumn textAlign="right"> {numeral(values.calcGrossMargin1).format('$0,0')} </CustomColumn>
        <CustomColumn textAlign="right"> {numeral(values.calcGrossMargin2).format('$0,0')} </CustomColumn>
        <CustomColumn textAlign="right"> {numeral(values.calcGrossMargin3).format('$0,0')} </CustomColumn>
        <CustomColumn textAlign="right"> {numeral(values.calcGrossMargin4).format('$0,0')} </CustomColumn>
        <CustomColumn textAlign="right"> {numeral(values.calcGrossMargin5).format('$0,0')} </CustomColumn>
        <CustomColumn textAlign="right"> {numeral(values.calcGrossMargin6).format('$0,0')} </CustomColumn>
        <CustomColumn textAlign="right"> {numeral(values.calcGrossMargin7).format('$0,0')} </CustomColumn>
        <CustomColumn textAlign="center" />
      </Grid.Row>
      <Grid.Row columns={9}>
        <CustomColumn>
          <b> Gross Margin % </b>
        </CustomColumn>
        {/* <CustomColumn textAlign="center">{_calcGrossMarginPerc(values.sales1, values.cogs1)} %</CustomColumn> */}
        <CustomColumn textAlign="right"> {Math.round(values.calcGrossMarginPerc1)} %</CustomColumn>
        <CustomColumn textAlign="right"> {Math.round(values.calcGrossMarginPerc2)} %</CustomColumn>
        <CustomColumn textAlign="right"> {Math.round(values.calcGrossMarginPerc3)} %</CustomColumn>
        <CustomColumn textAlign="right"> {Math.round(values.calcGrossMarginPerc4)} %</CustomColumn>
        <CustomColumn textAlign="right"> {Math.round(values.calcGrossMarginPerc5)} %</CustomColumn>
        <CustomColumn textAlign="right"> {Math.round(values.calcGrossMarginPerc6)} %</CustomColumn>
        <CustomColumn textAlign="right"> {Math.round(values.calcGrossMarginPerc7)} %</CustomColumn>
        <CustomColumn textAlign="center" />
      </Grid.Row>
      <Grid.Row
        style={{
          backgroundColor: '#dae4ef'
        }}
        columns={9}
      >
        <CustomColumn>
          <b> Other Income </b>
        </CustomColumn>
        <CustomColumn>
          <Input
            fluid
            tabIndex={3}
            column={1}
            name="otherIncome1"
            autoComplete="otherIncome1"
            value={numeral(values.otherIncome1).format('$0,0.[99]')}
            onChange={_handleChange}
            onBlur={e => _handleChangeOtherIncome(e, 1)}
          />
          {errors.otherIncome1 && touched.otherIncome1 && (
            <Label basic color="red" pointing content={errors.otherIncome1} />
          )}
        </CustomColumn>
        <CustomColumn>
          <Input
            fluid
            tabIndex={12}
            column={2}
            name="otherIncome2"
            autoComplete="otherIncome2"
            value={numeral(values.otherIncome2).format('$0,0.[99]')}
            onChange={_handleChange}
            onBlur={e => _handleChangeOtherIncome(e, 2)}
          />
          {errors.otherIncome2 && touched.otherIncome2 && (
            <Label basic color="red" pointing content={errors.otherIncome2} />
          )}
        </CustomColumn>
        <CustomColumn>
          <Input
            fluid
            column={3}
            tabIndex={22}
            name="otherIncome3"
            autoComplete="otherIncome3"
            value={numeral(values.otherIncome3).format('$0,0.[99]')}
            onChange={_handleChange}
            onBlur={e => _handleChangeOtherIncome(e, 3)}
          />
          {errors.otherIncome3 && touched.otherIncome3 && (
            <Label basic color="red" pointing content={errors.otherIncome3} />
          )}
        </CustomColumn>
        <CustomColumn>
          <Input
            fluid
            column={4}
            tabIndex={32}
            name="otherIncome4"
            autoComplete="otherIncome4"
            value={numeral(values.otherIncome4).format('$0,0.[99]')}
            onChange={_handleChange}
            onBlur={e => _handleChangeOtherIncome(e, 4)}
          />
          {errors.otherIncome4 && touched.otherIncome4 && (
            <Label basic color="red" pointing content={errors.otherIncome4} />
          )}
        </CustomColumn>
        <CustomColumn>
          <Input
            fluid
            tabIndex={42}
            column={5}
            name="otherIncome5"
            autoComplete="otherIncome5"
            value={numeral(values.otherIncome5).format('$0,0.[99]')}
            onChange={_handleChange}
            onBlur={e => _handleChangeOtherIncome(e, 5)}
          />
          {errors.otherIncome5 && touched.otherIncome5 && (
            <Label basic color="red" pointing content={errors.otherIncome5} />
          )}
        </CustomColumn>
        <CustomColumn>
          <Input
            fluid
            tabIndex={52}
            column={6}
            name="otherIncome6"
            autoComplete="otherIncome6"
            value={numeral(values.otherIncome6).format('$0,0.[99]')}
            onChange={_handleChange}
            onBlur={e => _handleChangeOtherIncome(e, 6)}
          />
          {errors.otherIncome6 && touched.otherIncome6 && (
            <Label basic color="red" pointing content={errors.otherIncome6} />
          )}
        </CustomColumn>
        <CustomColumn
          style={{
            backgroundColor: 'white'
          }}
          textAlign="right"
        >
          {/* {_calcAnnualised(values.otherIncome6, values.monthsCovered, values.seasonalAdjustment)} */}
          {numeral(values.calcAnnualised5).format('$0,0')}
        </CustomColumn>
        <CustomColumn textAlign="center">
          <Checkbox
            name="otherIncomeYesNo"
            onChange={_handleChangeCheckBox}
            row={5}
            checked={values.otherIncomeYesNo}
          />
        </CustomColumn>
      </Grid.Row>
      <Grid.Row columns={9}>
        <CustomColumn>
          <b> Gross Profit </b>
        </CustomColumn>
        {/* <CustomColumn textAlign="center">
                      {_calcGrossProfit(_calcGrossMargin(values.sales1, values.cogs1), values.otherIncome1)}
                      </CustomColumn> */}
        <CustomColumn textAlign="right"> {numeral(values.calcGrossProfit1).format('$0,0')} </CustomColumn>
        <CustomColumn textAlign="right"> {numeral(values.calcGrossProfit2).format('$0,0')} </CustomColumn>
        <CustomColumn textAlign="right"> {numeral(values.calcGrossProfit3).format('$0,0')} </CustomColumn>
        <CustomColumn textAlign="right"> {numeral(values.calcGrossProfit4).format('$0,0')} </CustomColumn>
        <CustomColumn textAlign="right"> {numeral(values.calcGrossProfit5).format('$0,0')} </CustomColumn>
        <CustomColumn textAlign="right"> {numeral(values.calcGrossProfit6).format('$0,0')} </CustomColumn>
        <CustomColumn textAlign="center" />
        <CustomColumn textAlign="center" />
      </Grid.Row>
      <Grid.Row
        style={{
          backgroundColor: '#dae4ef'
        }}
        columns={9}
      >
        <CustomColumn>
          <b> Expenses </b>
        </CustomColumn>
        <CustomColumn>
          <Input
            fluid
            tabIndex={4}
            column={1}
            name="expenses1"
            autoComplete="expenses1"
            value={numeral(values.expenses1).format('$0,0.[99]')}
            onChange={_handleChange}
            onBlur={e => _handleChangeExpense(e, 1)}
          />
          {errors.expenses1 && touched.expenses1 && <Label basic color="red" pointing content={errors.expenses1} />}
        </CustomColumn>
        <CustomColumn>
          <Input
            fluid
            tabIndex={13}
            column={2}
            name="expenses2"
            autoComplete="expenses2"
            value={numeral(values.expenses2).format('$0,0.[99]')}
            onChange={_handleChange}
            onBlur={e => _handleChangeExpense(e, 2)}
          />
          {errors.expenses2 && touched.expenses2 && <Label basic color="red" pointing content={errors.expenses2} />}
        </CustomColumn>
        <CustomColumn>
          <Input
            fluid
            tabIndex={23}
            column={3}
            name="expenses3"
            autoComplete="expenses3"
            value={numeral(values.expenses3).format('$0,0.[99]')}
            onChange={_handleChange}
            onBlur={e => _handleChangeExpense(e, 3)}
          />
          {errors.expenses3 && touched.expenses3 && <Label basic color="red" pointing content={errors.expenses3} />}
        </CustomColumn>
        <CustomColumn>
          <Input
            fluid
            tabIndex={33}
            column={4}
            name="expenses4"
            autoComplete="expenses4"
            value={numeral(values.expenses4).format('$0,0.[99]')}
            onChange={_handleChange}
            onBlur={e => _handleChangeExpense(e, 4)}
          />
          {errors.expenses4 && touched.expenses4 && <Label basic color="red" pointing content={errors.expenses4} />}
        </CustomColumn>
        <CustomColumn>
          <Input
            fluid
            tabIndex={43}
            column={5}
            name="expenses5"
            autoComplete="expenses5"
            value={numeral(values.expenses5).format('$0,0.[99]')}
            onChange={_handleChange}
            onBlur={e => _handleChangeExpense(e, 5)}
          />
          {errors.expenses5 && touched.expenses5 && <Label basic color="red" pointing content={errors.expenses5} />}
        </CustomColumn>
        <CustomColumn>
          <Input
            fluid
            tabIndex={53}
            column={6}
            name="expenses6"
            autoComplete="expenses6"
            value={numeral(values.expenses6).format('$0,0.[99]')}
            onChange={_handleChange}
            onBlur={e => _handleChangeExpense(e, 6)}
          />
          {errors.expenses6 && touched.expenses6 && <Label basic color="red" pointing content={errors.expenses6} />}
        </CustomColumn>
        <CustomColumn
          style={{
            backgroundColor: 'white'
          }}
          textAlign="right"
        >
          {/* {_calcAnnualised(values.expenses6, values.monthsCovered, values.seasonalAdjustment)} */}
          {numeral(values.calcAnnualised7).format('$0,0')}
        </CustomColumn>
        <CustomColumn textAlign="center">
          <Checkbox name="expensesYesNo" onChange={_handleChangeCheckBox} row={7} checked={values.expensesYesNo} />
        </CustomColumn>
      </Grid.Row>
      <Grid.Row columns={9}>
        <CustomColumn>
          <b> Operating Profit </b>
        </CustomColumn>
        {/* <CustomColumn textAlign="center">
                                  {_calcOperatingProfit(values.sales1, values.cogs1, values.otherIncome1, values.expenses1, '1')}
                                </CustomColumn> */}
        <CustomColumn textAlign="right"> {numeral(values.calcOperatingProfit1).format('$0,0')} </CustomColumn>
        <CustomColumn textAlign="right"> {numeral(values.calcOperatingProfit2).format('$0,0')} </CustomColumn>
        <CustomColumn textAlign="right"> {numeral(values.calcOperatingProfit3).format('$0,0')} </CustomColumn>
        <CustomColumn textAlign="right"> {numeral(values.calcOperatingProfit4).format('$0,0')} </CustomColumn>
        <CustomColumn textAlign="right"> {numeral(values.calcOperatingProfit5).format('$0,0')} </CustomColumn>
        <CustomColumn textAlign="right"> {numeral(values.calcOperatingProfit6).format('$0,0')} </CustomColumn>
        <CustomColumn textAlign="right" />
        <CustomColumn textAlign="right" />
      </Grid.Row>
      <Grid.Row columns={9}>
        <CustomColumn>
          <b> Operating Profit % </b>
        </CustomColumn>
        {/* <CustomColumn textAlign="center">
                                  {_calcOperatingProfitPerc(values.sales1, values.cogs1, values.otherIncome1, values.expenses1)} %
                                </CustomColumn> */}
        <CustomColumn textAlign="right"> {Math.round(values.calcOperatingProfitPerc1)} % </CustomColumn>
        <CustomColumn textAlign="right"> {Math.round(values.calcOperatingProfitPerc2)} % </CustomColumn>
        <CustomColumn textAlign="right"> {Math.round(values.calcOperatingProfitPerc3)} % </CustomColumn>
        <CustomColumn textAlign="right"> {Math.round(values.calcOperatingProfitPerc4)} % </CustomColumn>
        <CustomColumn textAlign="right"> {Math.round(values.calcOperatingProfitPerc5)} % </CustomColumn>
        <CustomColumn textAlign="right"> {Math.round(values.calcOperatingProfitPerc6)} % </CustomColumn>
        <CustomColumn textAlign="center" />
        <CustomColumn textAlign="center" />
      </Grid.Row>
    </Fragment>
  )
}

FinancialAnalysisForm.propTypes = {
  values: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  errors: PropTypes.object,
  touched: PropTypes.object,
  setFieldValue: PropTypes.func,
  isValid: PropTypes.bool,
  financialYear: PropTypes.string,
  appraisalObject: PropTypes.object,
  updateAppraisal: PropTypes.func,
  sendCalcs: PropTypes.func,
  handleChangeCheckBox: PropTypes.func,
  handleChangeCheckBoxPdf: PropTypes.func,
  setFieldTouched: PropTypes.func,
  calcAnnualisedWhenChangeMonthsAndSeasonal: PropTypes.func
}

const mapStateToProps = state => ({
  // isLoadingUpdate: state.business.update.isLoading
})

const mapDispatchToProps = dispatch => bindActionCreators({ calcAnnualisedWhenChangeMonthsAndSeasonal }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FinancialAnalysisForm)

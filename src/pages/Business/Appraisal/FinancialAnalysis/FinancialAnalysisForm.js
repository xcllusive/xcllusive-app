import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Checkbox, Label, Grid, Button, Icon, Input, Form } from 'semantic-ui-react'
import numeral from 'numeral'

import CustomColumn from '../../../../components/content/CustomGridColumn'

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
  setFieldValue
}) => {
  const _calcGrossMargin = (sales, cogs) => sales - cogs

  const _calcGrossMarginPerc = (sales, cogs) => (((sales - cogs) * 100) / sales).toFixed(2) || 0

  const _calcGrossProfit = (grossMargin, other) => numeral(grossMargin).value() + numeral(other).value() || 0

  const _calcOperatingProfit = (sales, cogs, other, expense, year) => {
    const calc = _calcGrossProfit(_calcGrossMargin(sales, cogs), other) - expense || 0

    sendCalcs({ year, calc, field: 'operatingProfit' })
    sendCalcs({ year, calc: numeral(sales).value() || 0, field: 'sales' })
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

  const _handleChangeCheckBox = (e, { name, row, checked }) => {
    handleChangeCheckBox(e, { name })

    if (row === 1) {
      if (checked) {
        setFieldValue(
          `calcAnnualised${row}`,
          _calcAnnualised(values.sales6, values.monthsCovered, values.seasonalAdjustment)
        )
      } else {
        setFieldValue(`calcAnnualised${row}`, 0)
      }
    }

    if (row === 2) {
      if (checked) {
        setFieldValue(
          `calcAnnualised${row}`,
          _calcAnnualised(values.cogs6, values.monthsCovered, values.seasonalAdjustment)
        )
      } else {
        setFieldValue(`calcAnnualised${row}`, 0)
      }
    }

    if (row === 5) {
      if (checked) {
        setFieldValue(
          `calcAnnualised${row}`,
          _calcAnnualised(values.otherIncome6, values.monthsCovered, values.seasonalAdjustment)
        )
      } else {
        setFieldValue(`calcAnnualised${row}`, 0)
      }
    }
    if (row === 7) {
      if (checked) {
        setFieldValue(
          `calcAnnualised${row}`,
          _calcAnnualised(values.expenses6, values.monthsCovered, values.seasonalAdjustment)
        )
      } else {
        setFieldValue(`calcAnnualised${row}`, 0)
      }
    }
  }

  const _handleChangeSales = (e, { name, value, column }) => {
    const sales = value
    const cogs = values[`cogs${column}`]
    const otherIncome = values[`otherIncome${column}`]
    const expense = values[`expense${column}`]

    setFieldValue(name, value)
    setFieldValue(`calcGrossMargin${column}`, _calcGrossMargin(sales, cogs))
    setFieldValue(`calcGrossMarginPerc${column}`, _calcGrossMarginPerc(sales, cogs))
    setFieldValue(`calcGrossProfit${column}`, _calcGrossProfit(_calcGrossMargin(sales, cogs), otherIncome))
    setFieldValue(`calcOperatingProfit${column}`, _calcOperatingProfit(sales, cogs, otherIncome, expense, column))
    setFieldValue(`calcOperatingProfitPerc${column}`, _calcOperatingProfitPerc(sales, cogs, otherIncome, expense))
  }

  const _handleChangeCogs = (e, { name, value, column }) => {
    const cogs = value
    const sales = values[`sales${column}`]
    const otherIncome = values[`otherIncome${column}`]
    const expense = values[`expense${column}`]

    setFieldValue(name, value)
    setFieldValue(`calcGrossMargin${column}`, _calcGrossMargin(sales, cogs))
    setFieldValue(`calcGrossMarginPerc${column}`, _calcGrossMarginPerc(sales, cogs))
    setFieldValue(`calcGrossProfit${column}`, _calcGrossProfit(_calcGrossMargin(sales, cogs), otherIncome))
    setFieldValue(`calcOperatingProfit${column}`, _calcOperatingProfit(sales, cogs, otherIncome, expense, column))
    setFieldValue(`calcOperatingProfitPerc${column}`, _calcOperatingProfitPerc(sales, cogs, otherIncome, expense))
  }

  const _handleChangeOtherIncome = (e, { name, value, column }) => {
    const otherIncome = value
    const cogs = values[`cogs${column}`]
    const sales = values[`sales${column}`]
    const expense = values[`expense${column}`]

    setFieldValue(name, value)
    setFieldValue(`calcGrossMargin${column}`, _calcGrossMargin(sales, cogs))
    setFieldValue(`calcGrossMarginPerc${column}`, _calcGrossMarginPerc(sales, cogs))
    setFieldValue(`calcGrossProfit${column}`, _calcGrossProfit(_calcGrossMargin(sales, cogs), otherIncome))
    setFieldValue(`calcOperatingProfit${column}`, _calcOperatingProfit(sales, cogs, otherIncome, expense, column))
    setFieldValue(`calcOperatingProfitPerc${column}`, _calcOperatingProfitPerc(sales, cogs, otherIncome, expense))
  }

  const _handleChangeExpense = (e, { name, value, column }) => {
    const expense = value
    const cogs = values[`cogs${column}`]
    const sales = values[`sales${column}`]
    const otherIncome = values[`otherIncome${column}`]

    setFieldValue(name, value)
    setFieldValue(`calcGrossMargin${column}`, _calcGrossMargin(sales, cogs))
    setFieldValue(`calcGrossMarginPerc${column}`, _calcGrossMarginPerc(sales, cogs))
    setFieldValue(`calcGrossProfit${column}`, _calcGrossProfit(_calcGrossMargin(sales, cogs), otherIncome))
    setFieldValue(`calcOperatingProfit${column}`, _calcOperatingProfit(sales, cogs, otherIncome, expense, column))
    setFieldValue(`calcOperatingProfitPerc${column}`, _calcOperatingProfitPerc(sales, cogs, otherIncome, expense))
  }

  const _handleChangeCheckBoxPdf = (e, { name }) => {
    handleChangeCheckBoxPdf(e, { name })
  }

  return (
    <Fragment>
      <Grid.Row>
        <CustomColumn>
          <Input
            label="Months Covered"
            name="monthsCovered"
            autoComplete="monthsCovered"
            type="number"
            value={values.monthsCovered}
            onChange={handleChange}
            onBlur={handleBlur}
            tabIndex={-2}
          />
          {errors.monthsCovered && touched.monthsCovered && (
            <Label basic color="red" pointing content={errors.monthsCovered} />
          )}
          <Input
            label="Seasonal Adjustment (%)"
            name="seasonalAdjustment"
            autoComplete="seasonalAdjustment"
            type="number"
            value={values.seasonalAdjustment}
            onChange={handleChange}
            onBlur={handleBlur}
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
      <Grid.Row style={{ backgroundColor: 'lightyellow' }} columns={9}>
        <CustomColumn>
          <b>Financial Year</b>
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
          <b>{appraisalObject && appraisalObject.year1 > 0 ? appraisalObject.year1 : financialYear - 5}</b>
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
          <b>{appraisalObject && appraisalObject.year2 > 0 ? appraisalObject.year2 : financialYear - 4}</b>
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
          <b>{appraisalObject && appraisalObject.year3 > 0 ? appraisalObject.year3 : financialYear - 3}</b>
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
          <b>{appraisalObject && appraisalObject.year4 > 0 ? appraisalObject.year4 : financialYear - 2}</b>
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
          <b>{appraisalObject && appraisalObject.year5 > 0 ? appraisalObject.year5 : financialYear - 1}</b>
        </CustomColumn>
        <CustomColumn textAlign="center">
          <b>{appraisalObject && appraisalObject.year6 > 0 ? appraisalObject.year6 : financialYear} YTD</b>{' '}
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
          <b>{financialYear} Annualised</b>
        </CustomColumn>
        <CustomColumn textAlign="center">
          <b>Annualised Yes/No</b>
        </CustomColumn>
      </Grid.Row>
      <Grid.Row style={{ backgroundColor: '#dae4ef' }} columns={9}>
        <CustomColumn>
          <b>Sales</b>
        </CustomColumn>
        <CustomColumn>
          <Input
            fluid
            type="number"
            column={1}
            tabIndex={1}
            name="sales1"
            autoComplete="sales1"
            value={values.sales1}
            onChange={_handleChangeSales}
            onBlur={handleBlur}
          />
          {errors.sales1 && touched.sales1 && <Label basic color="red" pointing content={errors.sales1} />}
        </CustomColumn>
        <CustomColumn>
          <Input
            fluid
            type="number"
            column={2}
            tabIndex={10}
            name="sales2"
            autoComplete="sales2"
            value={values.sales2}
            onChange={_handleChangeSales}
            onBlur={handleBlur}
          />
          {errors.sales2 && touched.sales2 && <Label basic color="red" pointing content={errors.sales2} />}
        </CustomColumn>
        <CustomColumn>
          <Input
            fluid
            type="number"
            column={3}
            tabIndex={20}
            name="sales3"
            autoComplete="sales3"
            value={values.sales3}
            onChange={_handleChangeSales}
            onBlur={handleBlur}
          />
          {errors.sales3 && touched.sales3 && <Label basic color="red" pointing content={errors.sales3} />}
        </CustomColumn>
        <CustomColumn>
          <Input
            fluid
            type="number"
            column={4}
            tabIndex={30}
            name="sales4"
            autoComplete="sales4"
            value={values.sales4}
            onChange={_handleChangeSales}
            onBlur={handleBlur}
          />
          {errors.sales4 && touched.sales4 && <Label basic color="red" pointing content={errors.sales4} />}
        </CustomColumn>
        <CustomColumn>
          <Input
            fluid
            type="number"
            column={5}
            tabIndex={40}
            name="sales5"
            autoComplete="sales5"
            value={values.sales5}
            onChange={_handleChangeSales}
            onBlur={handleBlur}
          />
          {errors.sales5 && touched.sales5 && <Label basic color="red" pointing content={errors.sales5} />}
        </CustomColumn>
        <CustomColumn>
          <Input
            fluid
            type="number"
            column={6}
            tabIndex={50}
            name="sales6"
            autoComplete="sales6"
            value={values.sales6}
            onChange={_handleChangeSales}
            onBlur={handleBlur}
          />
          {errors.sales6 && touched.sales6 && <Label basic color="red" pointing content={errors.sales6} />}
        </CustomColumn>
        <CustomColumn style={{ backgroundColor: 'white' }} textAlign="center">
          {/* {_calcAnnualised(values.sales6, values.monthsCovered, values.seasonalAdjustment)} */}
          {values.calcAnnualised1}
        </CustomColumn>
        <CustomColumn textAlign="center">
          <Checkbox name="salesYesNo" onChange={_handleChangeCheckBox} row={1} checked={values.salesYesNo} />
        </CustomColumn>
      </Grid.Row>
      <Grid.Row style={{ backgroundColor: '#dae4ef' }} columns={9}>
        <CustomColumn>
          <b>COGS</b>
        </CustomColumn>
        <CustomColumn>
          <Input
            fluid
            type="number"
            column={1}
            tabIndex={2}
            name="cogs1"
            autoComplete="cogs1"
            value={values.cogs1}
            onChange={_handleChangeCogs}
            onBlur={handleBlur}
          />
          {errors.cogs1 && touched.cogs1 && <Label basic color="red" pointing content={errors.cogs1} />}
        </CustomColumn>
        <CustomColumn>
          <Input
            fluid
            type="number"
            column={2}
            tabIndex={11}
            name="cogs2"
            autoComplete="cogs2"
            value={values.cogs2}
            onChange={_handleChangeCogs}
            onBlur={handleBlur}
          />
          {errors.cogs2 && touched.cogs2 && <Label basic color="red" pointing content={errors.cogs2} />}
        </CustomColumn>
        <CustomColumn>
          <Input
            fluid
            type="number"
            column={3}
            tabIndex={21}
            name="cogs3"
            autoComplete="cogs3"
            value={values.cogs3}
            onChange={_handleChangeCogs}
            onBlur={handleBlur}
          />
          {errors.cogs3 && touched.cogs3 && <Label basic color="red" pointing content={errors.cogs3} />}
        </CustomColumn>
        <CustomColumn>
          <Input
            fluid
            type="number"
            column={4}
            tabIndex={31}
            name="cogs4"
            autoComplete="cogs4"
            value={values.cogs4}
            onChange={_handleChangeCogs}
            onBlur={handleBlur}
          />
          {errors.cogs4 && touched.cogs4 && <Label basic color="red" pointing content={errors.cogs4} />}
        </CustomColumn>
        <CustomColumn>
          <Input
            fluid
            type="number"
            column={5}
            tabIndex={41}
            name="cogs5"
            autoComplete="cogs5"
            value={values.cogs5}
            onChange={_handleChangeCogs}
            onBlur={handleBlur}
          />
          {errors.cogs5 && touched.cogs5 && <Label basic color="red" pointing content={errors.cogs5} />}
        </CustomColumn>
        <CustomColumn>
          <Input
            fluid
            type="number"
            column={6}
            tabIndex={51}
            name="cogs6"
            autoComplete="cogs6"
            value={values.cogs6}
            onChange={_handleChangeCogs}
            onBlur={handleBlur}
          />
          {errors.cogs6 && touched.cogs6 && <Label basic color="red" pointing content={errors.cogs6} />}
        </CustomColumn>
        <CustomColumn style={{ backgroundColor: 'white' }} textAlign="center">
          {/* {_calcAnnualised(values.cogs6, values.monthsCovered, values.seasonalAdjustment)} */}
          {values.calcAnnualised2}
        </CustomColumn>
        <CustomColumn textAlign="center">
          <Checkbox name="cogsYesNo" onChange={_handleChangeCheckBox} row={2} checked={values.cogsYesNo} />
        </CustomColumn>
      </Grid.Row>
      <Grid.Row columns={9}>
        <CustomColumn>
          <b>Gross Margin</b>
        </CustomColumn>
        {/* <CustomColumn textAlign="center">{_calcGrossMargin(values.sales1, values.cogs1)} %</CustomColumn> */}
        <CustomColumn textAlign="center">{values.calcGrossMargin1}</CustomColumn>
        <CustomColumn textAlign="center">{values.calcGrossMargin2}</CustomColumn>
        <CustomColumn textAlign="center">{values.calcGrossMargin3}</CustomColumn>
        <CustomColumn textAlign="center">{values.calcGrossMargin4}</CustomColumn>
        <CustomColumn textAlign="center">{values.calcGrossMargin5}</CustomColumn>
        <CustomColumn textAlign="center">{values.calcGrossMargin6}</CustomColumn>
        <CustomColumn textAlign="center" />
        <CustomColumn textAlign="center" />
      </Grid.Row>
      <Grid.Row columns={9}>
        <CustomColumn>
          <b>Gross Margin %</b>
        </CustomColumn>
        {/* <CustomColumn textAlign="center">{_calcGrossMarginPerc(values.sales1, values.cogs1)} %</CustomColumn> */}
        <CustomColumn textAlign="center">{values.calcGrossMarginPerc1} %</CustomColumn>
        <CustomColumn textAlign="center">{values.calcGrossMarginPerc2} %</CustomColumn>
        <CustomColumn textAlign="center">{values.calcGrossMarginPerc3} %</CustomColumn>
        <CustomColumn textAlign="center">{values.calcGrossMarginPerc4} %</CustomColumn>
        <CustomColumn textAlign="center">{values.calcGrossMarginPerc5} %</CustomColumn>
        <CustomColumn textAlign="center">{values.calcGrossMarginPerc6} %</CustomColumn>

        <CustomColumn textAlign="center" />
        <CustomColumn textAlign="center" />
      </Grid.Row>
      <Grid.Row style={{ backgroundColor: '#dae4ef' }} columns={9}>
        <CustomColumn>
          <b>Other Income</b>
        </CustomColumn>
        <CustomColumn>
          <Input
            fluid
            type="number"
            tabIndex={3}
            column={1}
            name="otherIncome1"
            autoComplete="otherIncome1"
            value={values.otherIncome1}
            onChange={_handleChangeOtherIncome}
            onBlur={handleBlur}
          />
          {errors.otherIncome1 && touched.otherIncome1 && (
            <Label basic color="red" pointing content={errors.otherIncome1} />
          )}
        </CustomColumn>
        <CustomColumn>
          <Input
            fluid
            type="number"
            tabIndex={12}
            column={2}
            name="otherIncome2"
            autoComplete="otherIncome2"
            value={values.otherIncome2}
            onChange={_handleChangeOtherIncome}
            onBlur={handleBlur}
          />
          {errors.otherIncome2 && touched.otherIncome2 && (
            <Label basic color="red" pointing content={errors.otherIncome2} />
          )}
        </CustomColumn>
        <CustomColumn>
          <Input
            fluid
            type="number"
            column={3}
            tabIndex={22}
            name="otherIncome3"
            autoComplete="otherIncome3"
            value={values.otherIncome3}
            onChange={_handleChangeOtherIncome}
            onBlur={handleBlur}
          />
          {errors.otherIncome3 && touched.otherIncome3 && (
            <Label basic color="red" pointing content={errors.otherIncome3} />
          )}
        </CustomColumn>
        <CustomColumn>
          <Input
            fluid
            type="number"
            column={4}
            tabIndex={32}
            name="otherIncome4"
            autoComplete="otherIncome4"
            value={values.otherIncome4}
            onChange={_handleChangeOtherIncome}
            onBlur={handleBlur}
          />
          {errors.otherIncome4 && touched.otherIncome4 && (
            <Label basic color="red" pointing content={errors.otherIncome4} />
          )}
        </CustomColumn>
        <CustomColumn>
          <Input
            fluid
            type="number"
            tabIndex={42}
            column={5}
            name="otherIncome5"
            autoComplete="otherIncome5"
            value={values.otherIncome5}
            onChange={_handleChangeOtherIncome}
            onBlur={handleBlur}
          />
          {errors.otherIncome5 && touched.otherIncome5 && (
            <Label basic color="red" pointing content={errors.otherIncome5} />
          )}
        </CustomColumn>
        <CustomColumn>
          <Input
            fluid
            type="number"
            tabIndex={52}
            column={6}
            name="otherIncome6"
            autoComplete="otherIncome6"
            value={values.otherIncome6}
            onChange={_handleChangeOtherIncome}
            onBlur={handleBlur}
          />
          {errors.otherIncome6 && touched.otherIncome6 && (
            <Label basic color="red" pointing content={errors.otherIncome6} />
          )}
        </CustomColumn>
        <CustomColumn style={{ backgroundColor: 'white' }} textAlign="center">
          {/* {_calcAnnualised(values.otherIncome6, values.monthsCovered, values.seasonalAdjustment)} */}
          {values.calcAnnualised5}
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
          <b>Gross Profit</b>
        </CustomColumn>
        {/* <CustomColumn textAlign="center">
          {_calcGrossProfit(_calcGrossMargin(values.sales1, values.cogs1), values.otherIncome1)}
          </CustomColumn> */}
        <CustomColumn textAlign="center">{values.calcGrossProfit1}</CustomColumn>
        <CustomColumn textAlign="center">{values.calcGrossProfit2}</CustomColumn>
        <CustomColumn textAlign="center">{values.calcGrossProfit3}</CustomColumn>
        <CustomColumn textAlign="center">{values.calcGrossProfit4}</CustomColumn>
        <CustomColumn textAlign="center">{values.calcGrossProfit5}</CustomColumn>
        <CustomColumn textAlign="center">{values.calcGrossProfit6}</CustomColumn>
        <CustomColumn textAlign="center" />
        <CustomColumn textAlign="center" />
      </Grid.Row>
      <Grid.Row style={{ backgroundColor: '#dae4ef' }} columns={9}>
        <CustomColumn>
          <b>Expenses</b>
        </CustomColumn>
        <CustomColumn>
          <Input
            fluid
            type="number"
            tabIndex={4}
            column={1}
            name="expenses1"
            autoComplete="expenses1"
            value={values.expenses1}
            onChange={_handleChangeExpense}
            onBlur={handleBlur}
          />
          {errors.expenses1 && touched.expenses1 && <Label basic color="red" pointing content={errors.expenses1} />}
        </CustomColumn>
        <CustomColumn>
          <Input
            fluid
            type="number"
            tabIndex={13}
            column={2}
            name="expenses2"
            autoComplete="expenses2"
            value={values.expenses2}
            onChange={_handleChangeExpense}
            onBlur={handleBlur}
          />
          {errors.expenses2 && touched.expenses2 && <Label basic color="red" pointing content={errors.expenses2} />}
        </CustomColumn>
        <CustomColumn>
          <Input
            fluid
            type="number"
            tabIndex={23}
            column={3}
            name="expenses3"
            autoComplete="expenses3"
            value={values.expenses3}
            onChange={_handleChangeExpense}
            onBlur={handleBlur}
          />
          {errors.expenses3 && touched.expenses3 && <Label basic color="red" pointing content={errors.expenses3} />}
        </CustomColumn>
        <CustomColumn>
          <Input
            fluid
            type="number"
            tabIndex={33}
            column={4}
            name="expenses4"
            autoComplete="expenses4"
            value={values.expenses4}
            onChange={_handleChangeExpense}
            onBlur={handleBlur}
          />
          {errors.expenses4 && touched.expenses4 && <Label basic color="red" pointing content={errors.expenses4} />}
        </CustomColumn>
        <CustomColumn>
          <Input
            fluid
            type="number"
            tabIndex={43}
            column={5}
            name="expenses5"
            autoComplete="expenses5"
            value={values.expenses5}
            onChange={_handleChangeExpense}
            onBlur={handleBlur}
          />
          {errors.expenses5 && touched.expenses5 && <Label basic color="red" pointing content={errors.expenses5} />}
        </CustomColumn>
        <CustomColumn>
          <Input
            fluid
            type="number"
            tabIndex={53}
            column={6}
            name="expenses6"
            autoComplete="expenses6"
            value={values.expenses6}
            onChange={_handleChangeExpense}
            onBlur={handleBlur}
          />
          {errors.expenses6 && touched.expenses6 && <Label basic color="red" pointing content={errors.expenses6} />}
        </CustomColumn>
        <CustomColumn style={{ backgroundColor: 'white' }} textAlign="center">
          {/* {_calcAnnualised(values.expenses6, values.monthsCovered, values.seasonalAdjustment)} */}
          {values.calcAnnualised7}
        </CustomColumn>
        <CustomColumn textAlign="center">
          <Checkbox name="expensesYesNo" onChange={_handleChangeCheckBox} row={7} checked={values.expensesYesNo} />
        </CustomColumn>
      </Grid.Row>
      <Grid.Row columns={9}>
        <CustomColumn>
          <b>Operating Profit</b>
        </CustomColumn>
        {/* <CustomColumn textAlign="center">
          {_calcOperatingProfit(values.sales1, values.cogs1, values.otherIncome1, values.expenses1, '1')}
        </CustomColumn> */}
        <CustomColumn textAlign="center">{values.calcOperatingProfit1}</CustomColumn>
        <CustomColumn textAlign="center">{values.calcOperatingProfit2}</CustomColumn>
        <CustomColumn textAlign="center">{values.calcOperatingProfit3}</CustomColumn>
        <CustomColumn textAlign="center">{values.calcOperatingProfit4}</CustomColumn>
        <CustomColumn textAlign="center">{values.calcOperatingProfit5}</CustomColumn>
        <CustomColumn textAlign="center">{values.calcOperatingProfit6}</CustomColumn>
        <CustomColumn textAlign="center" />
        <CustomColumn textAlign="center" />
      </Grid.Row>
      <Grid.Row columns={9}>
        <CustomColumn>
          <b>Operating Profit %</b>
        </CustomColumn>
        {/* <CustomColumn textAlign="center">
          {_calcOperatingProfitPerc(values.sales1, values.cogs1, values.otherIncome1, values.expenses1)} %
        </CustomColumn> */}
        <CustomColumn textAlign="center">{values.calcOperatingProfitPerc1} %</CustomColumn>
        <CustomColumn textAlign="center">{values.calcOperatingProfitPerc2} %</CustomColumn>
        <CustomColumn textAlign="center">{values.calcOperatingProfitPerc3} %</CustomColumn>
        <CustomColumn textAlign="center">{values.calcOperatingProfitPerc4} %</CustomColumn>
        <CustomColumn textAlign="center">{values.calcOperatingProfitPerc5} %</CustomColumn>
        <CustomColumn textAlign="center">{values.calcOperatingProfitPerc6} %</CustomColumn>
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
  handleChangeCheckBoxPdf: PropTypes.func
}

export default FinancialAnalysisForm

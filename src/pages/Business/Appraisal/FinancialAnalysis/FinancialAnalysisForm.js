import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Form, Label, Grid, Button, Icon, Input } from 'semantic-ui-react'
import * as Yup from 'yup'
import numeral from 'numeral'

import CustomColumn from '../../../../components/content/CustomGridColumn'
import { updateAppraisal } from '../../../../redux/ducks/appraisal'

class AddbacksAndAdjustmentsForm extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillUnmount () {
    console.log(this.props.values)
    this.props.updateAppraisal(this.props.values)
  }

  _handleChangeCheckBox = (e, { name }) => {
    this.props.setFieldValue(name, !this.props.values[name])
  }

  _calcGrossMargin = (sales, cogs) => sales - cogs

  _calcGrossMarginPerc = (sales, cogs) => (((sales - cogs) * 100) / sales).toFixed(2) || 0

  _calcGrossProfit = (grossMargin, other) => numeral(grossMargin).value() + numeral(other).value() || 0

  _calcOperatingProfit = (sales, cogs, other, expense, year) => {
    const calc = this._calcGrossProfit(this._calcGrossMargin(sales, cogs), other) - expense || 0

    this.props.sendCalcs({ year, calc, field: 'operatingProfit' })
    this.props.sendCalcs({ year, calc: numeral(sales).value() || 0, field: 'sales' })
    return calc
  }

  _calcOperatingProfitPerc = (sales, cogs, other, expense) =>
    ((this._calcOperatingProfit(sales, cogs, other, expense) / sales) * 100).toFixed(2) || 0

  _calcAnnualised = (yearValue, monthsCoveredValue, seasonalAdjustmentValue) => {
    const year = numeral(yearValue).value()
    const monthsCovered = numeral(monthsCoveredValue).value()
    const seasonalAdjustment = numeral(seasonalAdjustmentValue).value() / 100

    return (year / monthsCovered) * 12 + ((year / monthsCovered) * 12 - year) * seasonalAdjustment
  }
  render () {
    const { values, handleChange, handleBlur, errors, touched, financialYear, appraisalObject } = this.props
    return (
      <Fragment>
        <Grid.Row>
          <CustomColumn>
            <Form>
              <Form.Group>
                <Form.Field width={2}>
                  <Form.Input
                    label="Months Covered"
                    name="monthsCovered"
                    autoComplete="monthsCovered"
                    type="number"
                    value={values.monthsCovered}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    tabIndex={-2}
                  />
                  {errors.monthsCovered &&
                    touched.monthsCovered && <Label basic color="red" pointing content={errors.monthsCovered} />}
                </Form.Field>
                <Form.Field width={2}>
                  <Form.Input
                    label="Seasonal Adjustment (%)"
                    name="seasonalAdjustment"
                    autoComplete="seasonalAdjustment"
                    type="number"
                    value={values.seasonalAdjustment}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    tabIndex={-1}
                  />
                  {errors.seasonalAdjustment &&
                    touched.seasonalAdjustment && (
                    <Label basic color="red" pointing content={errors.seasonalAdjustment} />
                  )}
                </Form.Field>
                <Form.Field style={{ marginTop: '20px' }} width={2}>
                  <Button color="facebook" size="small">
                    <Icon name="forward" />
                    Move Financial Year
                  </Button>
                </Form.Field>
              </Form.Group>
            </Form>
          </CustomColumn>
        </Grid.Row>
        <Grid.Row style={{ backgroundColor: 'lightyellow' }} columns={9}>
          <CustomColumn>
            <b>Financial Year</b>
          </CustomColumn>
          <CustomColumn textAlign="center">
            <b>{appraisalObject && appraisalObject.year1 > 0 ? appraisalObject.year1 : financialYear - 5}</b>
          </CustomColumn>
          <CustomColumn textAlign="center">
            <b>{appraisalObject && appraisalObject.year2 > 0 ? appraisalObject.year2 : financialYear - 4}</b>
          </CustomColumn>
          <CustomColumn textAlign="center">
            <b>{appraisalObject && appraisalObject.year3 > 0 ? appraisalObject.year3 : financialYear - 3}</b>
          </CustomColumn>
          <CustomColumn textAlign="center">
            <b>{appraisalObject && appraisalObject.year4 > 0 ? appraisalObject.year4 : financialYear - 2}</b>
          </CustomColumn>
          <CustomColumn textAlign="center">
            <b>{appraisalObject && appraisalObject.year5 > 0 ? appraisalObject.year5 : financialYear - 1}</b>
          </CustomColumn>
          <CustomColumn textAlign="center">
            <b>{appraisalObject && appraisalObject.year6 > 0 ? appraisalObject.year6 : financialYear} YTD</b>{' '}
          </CustomColumn>
          <CustomColumn textAlign="center">
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
              tabIndex={1}
              name="sales1"
              autoComplete="sales1"
              value={values.sales1}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.sales1 && touched.sales1 && <Label basic color="red" pointing content={errors.sales1} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              type="number"
              tabIndex={10}
              name="sales2"
              autoComplete="sales2"
              value={values.sales2}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.sales2 && touched.sales2 && <Label basic color="red" pointing content={errors.sales2} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              type="number"
              tabIndex={20}
              name="sales3"
              autoComplete="sales3"
              value={values.sales3}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.sales3 && touched.sales3 && <Label basic color="red" pointing content={errors.sales3} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              type="number"
              tabIndex={30}
              name="sales4"
              autoComplete="sales4"
              value={values.sales4}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.sales4 && touched.sales4 && <Label basic color="red" pointing content={errors.sales4} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              type="number"
              tabIndex={40}
              name="sales5"
              autoComplete="sales5"
              value={values.sales5}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.sales5 && touched.sales5 && <Label basic color="red" pointing content={errors.sales5} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              type="number"
              tabIndex={50}
              name="sales6"
              autoComplete="sales6"
              value={values.sales6}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.sales6 && touched.sales6 && <Label basic color="red" pointing content={errors.sales6} />}
          </CustomColumn>
          <CustomColumn style={{ backgroundColor: 'white' }} textAlign="center">
            {this._calcAnnualised(
              this.props.values.sales6,
              this.props.values.monthsCovered,
              this.props.values.seasonalAdjustment
            )}
          </CustomColumn>
          <CustomColumn textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox name="salesYesNo" onChange={this._handleChangeCheckBox} checked={values.salesYesNo} />
              </Form.Field>
            </Form>
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
              tabIndex={2}
              name="cogs1"
              autoComplete="cogs1"
              value={values.cogs1}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.cogs1 && touched.cogs1 && <Label basic color="red" pointing content={errors.cogs1} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              type="number"
              tabIndex={11}
              name="cogs2"
              autoComplete="cogs2"
              value={values.cogs2}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.cogs2 && touched.cogs2 && <Label basic color="red" pointing content={errors.cogs2} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              type="number"
              tabIndex={21}
              name="cogs3"
              autoComplete="cogs3"
              value={values.cogs3}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.cogs3 && touched.cogs3 && <Label basic color="red" pointing content={errors.cogs3} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              type="number"
              tabIndex={31}
              name="cogs4"
              autoComplete="cogs4"
              value={values.cogs4}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.cogs4 && touched.cogs4 && <Label basic color="red" pointing content={errors.cogs4} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              type="number"
              tabIndex={41}
              name="cogs5"
              autoComplete="cogs5"
              value={values.cogs5}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.cogs5 && touched.cogs5 && <Label basic color="red" pointing content={errors.cogs5} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              type="number"
              tabIndex={51}
              name="cogs6"
              autoComplete="cogs6"
              value={values.cogs6}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.cogs6 && touched.cogs6 && <Label basic color="red" pointing content={errors.cogs6} />}
          </CustomColumn>
          <CustomColumn style={{ backgroundColor: 'white' }} textAlign="center">
            {this._calcAnnualised(
              this.props.values.cogs6,
              this.props.values.monthsCovered,
              this.props.values.seasonalAdjustment
            )}
          </CustomColumn>
          <CustomColumn textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox name="cogsYesNo" onChange={this._handleChangeCheckBox} checked={values.cogsYesNo} />
              </Form.Field>
            </Form>
          </CustomColumn>
        </Grid.Row>
        <Grid.Row columns={9}>
          <CustomColumn>
            <b>Gross Margin</b>
          </CustomColumn>
          <CustomColumn textAlign="center">
            {this._calcGrossMargin(this.props.values.sales1, this.props.values.cogs1)}
          </CustomColumn>
          <CustomColumn textAlign="center">
            {this._calcGrossMargin(this.props.values.sales2, this.props.values.cogs2)}
          </CustomColumn>
          <CustomColumn textAlign="center">
            {this._calcGrossMargin(this.props.values.sales3, this.props.values.cogs3)}
          </CustomColumn>
          <CustomColumn textAlign="center">
            {this._calcGrossMargin(this.props.values.sales4, this.props.values.cogs4)}
          </CustomColumn>
          <CustomColumn textAlign="center">
            {this._calcGrossMargin(this.props.values.sales5, this.props.values.cogs5)}
          </CustomColumn>
          <CustomColumn textAlign="center">
            {this._calcGrossMargin(this.props.values.sales6, this.props.values.cogs6)}
          </CustomColumn>
          <CustomColumn textAlign="center" />
          <CustomColumn textAlign="center" />
        </Grid.Row>
        <Grid.Row columns={9}>
          <CustomColumn>
            <b>Gross Margin %</b>
          </CustomColumn>
          <CustomColumn textAlign="center">
            {this._calcGrossMarginPerc(this.props.values.sales1, this.props.values.cogs1)} %
          </CustomColumn>
          <CustomColumn textAlign="center">
            {this._calcGrossMarginPerc(this.props.values.sales2, this.props.values.cogs2)} %
          </CustomColumn>
          <CustomColumn textAlign="center">
            {this._calcGrossMarginPerc(this.props.values.sales3, this.props.values.cogs3)} %
          </CustomColumn>
          <CustomColumn textAlign="center">
            {this._calcGrossMarginPerc(this.props.values.sales4, this.props.values.cogs4)} %
          </CustomColumn>
          <CustomColumn textAlign="center">
            {this._calcGrossMarginPerc(this.props.values.sales5, this.props.values.cogs5)} %
          </CustomColumn>
          <CustomColumn textAlign="center">
            {this._calcGrossMarginPerc(this.props.values.sales6, this.props.values.cogs6)} %
          </CustomColumn>
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
              tabIndex={3}
              name="otherIncome1"
              autoComplete="otherIncome1"
              value={values.otherIncome1}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.otherIncome1 &&
              touched.otherIncome1 && <Label basic color="red" pointing content={errors.otherIncome1} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={12}
              name="otherIncome2"
              autoComplete="otherIncome2"
              value={values.otherIncome2}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.otherIncome2 &&
              touched.otherIncome2 && <Label basic color="red" pointing content={errors.otherIncome2} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={22}
              name="otherIncome3"
              autoComplete="otherIncome3"
              value={values.otherIncome3}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.otherIncome3 &&
              touched.otherIncome3 && <Label basic color="red" pointing content={errors.otherIncome3} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={32}
              name="otherIncome4"
              autoComplete="otherIncome4"
              value={values.otherIncome4}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.otherIncome4 &&
              touched.otherIncome4 && <Label basic color="red" pointing content={errors.otherIncome4} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={42}
              name="otherIncome5"
              autoComplete="otherIncome5"
              value={values.otherIncome5}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.otherIncome5 &&
              touched.otherIncome5 && <Label basic color="red" pointing content={errors.otherIncome5} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={52}
              name="otherIncome6"
              autoComplete="otherIncome6"
              value={values.otherIncome6}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.otherIncome6 &&
              touched.otherIncome6 && <Label basic color="red" pointing content={errors.otherIncome6} />}
          </CustomColumn>
          <CustomColumn style={{ backgroundColor: 'white' }} textAlign="center">
            {this._calcAnnualised(
              this.props.values.otherIncome6,
              this.props.values.monthsCovered,
              this.props.values.seasonalAdjustment
            )}
          </CustomColumn>
          <CustomColumn textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox
                  name="otherIncomeYesNo"
                  onChange={this._handleChangeCheckBox}
                  checked={values.otherIncomeYesNo}
                />
              </Form.Field>
            </Form>
          </CustomColumn>
        </Grid.Row>
        <Grid.Row columns={9}>
          <CustomColumn>
            <b>Gross Profit</b>
          </CustomColumn>
          <CustomColumn textAlign="center">
            {this._calcGrossProfit(
              this._calcGrossMargin(this.props.values.sales1, this.props.values.cogs1),
              this.props.values.otherIncome1
            )}
          </CustomColumn>
          <CustomColumn textAlign="center">
            {this._calcGrossProfit(
              this._calcGrossMargin(this.props.values.sales2, this.props.values.cogs2),
              this.props.values.otherIncome2
            )}
          </CustomColumn>
          <CustomColumn textAlign="center">
            {this._calcGrossProfit(
              this._calcGrossMargin(this.props.values.sales3, this.props.values.cogs3),
              this.props.values.otherIncome3
            )}
          </CustomColumn>
          <CustomColumn textAlign="center">
            {this._calcGrossProfit(
              this._calcGrossMargin(this.props.values.sales4, this.props.values.cogs4),
              this.props.values.otherIncome4
            )}
          </CustomColumn>
          <CustomColumn textAlign="center">
            {this._calcGrossProfit(
              this._calcGrossMargin(this.props.values.sales5, this.props.values.cogs5),
              this.props.values.otherIncome5
            )}
          </CustomColumn>
          <CustomColumn textAlign="center">
            {this._calcGrossProfit(
              this._calcGrossMargin(this.props.values.sales6, this.props.values.cogs6),
              this.props.values.otherIncome6
            )}
          </CustomColumn>
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
              tabIndex={4}
              name="expenses1"
              autoComplete="expenses1"
              value={values.expenses1}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.expenses1 && touched.expenses1 && <Label basic color="red" pointing content={errors.expenses1} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={13}
              name="expenses2"
              autoComplete="expenses2"
              value={values.expenses2}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.expenses2 && touched.expenses2 && <Label basic color="red" pointing content={errors.expenses2} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={23}
              name="expenses3"
              autoComplete="expenses3"
              value={values.expenses3}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.expenses3 && touched.expenses3 && <Label basic color="red" pointing content={errors.expenses3} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={33}
              name="expenses4"
              autoComplete="expenses4"
              value={values.expenses4}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.expenses4 && touched.expenses4 && <Label basic color="red" pointing content={errors.expenses4} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={43}
              name="expenses5"
              autoComplete="expenses5"
              value={values.expenses5}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.expenses5 && touched.expenses5 && <Label basic color="red" pointing content={errors.expenses5} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={53}
              name="expenses6"
              autoComplete="expenses6"
              value={values.expenses6}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.expenses6 && touched.expenses6 && <Label basic color="red" pointing content={errors.expenses6} />}
          </CustomColumn>
          <CustomColumn style={{ backgroundColor: 'white' }} textAlign="center">
            {this._calcAnnualised(
              this.props.values.expenses6,
              this.props.values.monthsCovered,
              this.props.values.seasonalAdjustment
            )}
          </CustomColumn>
          <CustomColumn textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox
                  name="expensesYesNo"
                  onChange={this._handleChangeCheckBox}
                  checked={values.expensesYesNo}
                />
              </Form.Field>
            </Form>
          </CustomColumn>
        </Grid.Row>
        <Grid.Row columns={9}>
          <CustomColumn>
            <b>Operating Profit</b>
          </CustomColumn>
          <CustomColumn textAlign="center">
            {this._calcOperatingProfit(
              this.props.values.sales1,
              this.props.values.cogs1,
              this.props.values.otherIncome1,
              this.props.values.expenses1,
              '1'
            )}
          </CustomColumn>
          <CustomColumn textAlign="center">
            {this._calcOperatingProfit(
              this.props.values.sales2,
              this.props.values.cogs2,
              this.props.values.otherIncome2,
              this.props.values.expenses2,
              '2'
            )}
          </CustomColumn>
          <CustomColumn textAlign="center">
            {this._calcOperatingProfit(
              this.props.values.sales3,
              this.props.values.cogs3,
              this.props.values.otherIncome3,
              this.props.values.expenses3,
              '3'
            )}
          </CustomColumn>
          <CustomColumn textAlign="center">
            {this._calcOperatingProfit(
              this.props.values.sales4,
              this.props.values.cogs4,
              this.props.values.otherIncome4,
              this.props.values.expenses4,
              '4'
            )}
          </CustomColumn>
          <CustomColumn textAlign="center">
            {this._calcOperatingProfit(
              this.props.values.sales5,
              this.props.values.cogs5,
              this.props.values.otherIncome5,
              this.props.values.expenses5,
              '5'
            )}
          </CustomColumn>
          <CustomColumn textAlign="center">
            {this._calcOperatingProfit(
              this.props.values.sales6,
              this.props.values.cogs6,
              this.props.values.otherIncome6,
              this.props.values.expenses6,
              '6'
            )}
          </CustomColumn>
          <CustomColumn textAlign="center" />
          <CustomColumn textAlign="center" />
        </Grid.Row>
        <Grid.Row columns={9}>
          <CustomColumn>
            <b>Operating Profit %</b>
          </CustomColumn>
          <CustomColumn textAlign="center">
            {this._calcOperatingProfitPerc(
              this.props.values.sales1,
              this.props.values.cogs1,
              this.props.values.otherIncome1,
              this.props.values.expenses1
            )}{' '}
            %
          </CustomColumn>
          <CustomColumn textAlign="center">
            {this._calcOperatingProfitPerc(
              this.props.values.sales2,
              this.props.values.cogs2,
              this.props.values.otherIncome2,
              this.props.values.expenses2
            )}{' '}
            %
          </CustomColumn>
          <CustomColumn textAlign="center">
            {this._calcOperatingProfitPerc(
              this.props.values.sales3,
              this.props.values.cogs3,
              this.props.values.otherIncome3,
              this.props.values.expenses3
            )}{' '}
            %
          </CustomColumn>
          <CustomColumn textAlign="center">
            {this._calcOperatingProfitPerc(
              this.props.values.sales4,
              this.props.values.cogs4,
              this.props.values.otherIncome4,
              this.props.values.expenses4
            )}{' '}
            %
          </CustomColumn>
          <CustomColumn textAlign="center">
            {this._calcOperatingProfitPerc(
              this.props.values.sales5,
              this.props.values.cogs5,
              this.props.values.otherIncome5,
              this.props.values.expenses5
            )}{' '}
            %
          </CustomColumn>
          <CustomColumn textAlign="center">
            {this._calcOperatingProfitPerc(
              this.props.values.sales6,
              this.props.values.cogs6,
              this.props.values.otherIncome6,
              this.props.values.expenses6
            )}{' '}
            %
          </CustomColumn>
          <CustomColumn textAlign="center" />
          <CustomColumn textAlign="center" />
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
  appraisalObject: PropTypes.object,
  updateAppraisal: PropTypes.func,
  sendCalcs: PropTypes.func
}

const mapPropsToValues = props => ({
  business_id: props.business ? props.business.id : '',
  id: props.appraisalObject ? props.appraisalObject.id : '',
  monthsCovered: props.appraisalObject ? props.appraisalObject.monthsCovered : 0,
  seasonalAdjustment: props.appraisalObject ? props.appraisalObject.seasonalAdjustment : 0,
  sales1: props.appraisalObject ? props.appraisalObject.sales1 : 0,
  sales2: props.appraisalObject ? props.appraisalObject.sales2 : 0,
  sales3: props.appraisalObject ? props.appraisalObject.sales3 : 0,
  sales4: props.appraisalObject ? props.appraisalObject.sales4 : 0,
  sales5: props.appraisalObject ? props.appraisalObject.sales5 : 0,
  sales6: props.appraisalObject ? props.appraisalObject.sales6 : 0,
  cogs1: props.appraisalObject ? props.appraisalObject.cogs1 : 0,
  cogs2: props.appraisalObject ? props.appraisalObject.cogs1 : 0,
  cogs3: props.appraisalObject ? props.appraisalObject.cogs3 : 0,
  cogs4: props.appraisalObject ? props.appraisalObject.cogs4 : 0,
  cogs5: props.appraisalObject ? props.appraisalObject.cogs5 : 0,
  cogs6: props.appraisalObject ? props.appraisalObject.cogs6 : 0,
  otherIncome1: props.appraisalObject ? props.appraisalObject.otherIncome1 : 0,
  otherIncome2: props.appraisalObject ? props.appraisalObject.otherIncome2 : 0,
  otherIncome3: props.appraisalObject ? props.appraisalObject.otherIncome3 : 0,
  otherIncome4: props.appraisalObject ? props.appraisalObject.otherIncome4 : 0,
  otherIncome5: props.appraisalObject ? props.appraisalObject.otherIncome5 : 0,
  otherIncome6: props.appraisalObject ? props.appraisalObject.otherIncome6 : 0,
  expenses1: props.appraisalObject ? props.appraisalObject.expenses1 : 0,
  expenses2: props.appraisalObject ? props.appraisalObject.expenses2 : 0,
  expenses3: props.appraisalObject ? props.appraisalObject.expenses3 : 0,
  expenses4: props.appraisalObject ? props.appraisalObject.expenses4 : 0,
  expenses5: props.appraisalObject ? props.appraisalObject.expenses5 : 0,
  expenses6: props.appraisalObject ? props.appraisalObject.expenses6 : 0
})

const mapStateToProps = state => {
  return {}
}

const validationSchema = Yup.object().shape({})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateAppraisal }, dispatch)
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

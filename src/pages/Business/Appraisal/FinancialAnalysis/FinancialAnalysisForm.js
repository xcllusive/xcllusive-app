import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Form, Label, Grid, Button, Icon } from 'semantic-ui-react'
import * as Yup from 'yup'

import CustomColumn from '../../../../components/content/CustomGridColumn'

class AddbacksAndAdjustmentsForm extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  _handleChangeCheckBox = (e, { name }) => {
    this.props.setFieldValue(name, !this.props.values[name])
  }

  handleRef = c => {
    this.inputRef = c
  }

  focus = () => {
    this.inputRef.focus()
  }

  render () {
    const {
      values,
      handleChange,
      handleBlur,
      errors,
      touched,
      financialYear
    } = this.props
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
                  />
                  {errors.monthsCovered &&
                    touched.monthsCovered && (
                    <Label
                      basic
                      color="red"
                      pointing
                      content={errors.monthsCovered}
                    />
                  )}
                </Form.Field>
                <Form.Field width={2}>
                  <Form.Input
                    label="Seasonal Adjustment (%)"
                    name="seasonalAdjusment"
                    autoComplete="seasonalAdjusment"
                    type="number"
                    value={values.seasonalAdjusment}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.seasonalAdjusment &&
                    touched.seasonalAdjusment && (
                    <Label
                      basic
                      color="red"
                      pointing
                      content={errors.seasonalAdjusment}
                    />
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
            <b>{financialYear - 5}</b>
          </CustomColumn>
          <CustomColumn textAlign="center">
            <b>{financialYear - 4}</b>
          </CustomColumn>
          <CustomColumn textAlign="center">
            <b>{financialYear - 3}</b>
          </CustomColumn>
          <CustomColumn textAlign="center">
            <b>{financialYear - 2}</b>
          </CustomColumn>
          <CustomColumn textAlign="center">
            <b>{financialYear - 1}</b>
          </CustomColumn>
          <CustomColumn textAlign="center">
            <b>{financialYear} YTD</b>{' '}
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
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="sales1"
                  autoComplete="sales1"
                  value={values.sales1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  tabIndex={0}
                  focus
                  ref={this.handleRef}
                />
                {errors.sales1 &&
                  touched.sales1 && (
                  <Label basic color="red" pointing content={errors.sales1} />
                )}
              </Form.Field>
            </Form>
          </CustomColumn>
          <CustomColumn>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="sales2"
                  autoComplete="sales2"
                  value={values.sales2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.sales2 &&
                  touched.sales2 && (
                  <Label basic color="red" pointing content={errors.sales2} />
                )}
              </Form.Field>
            </Form>
          </CustomColumn>
          <CustomColumn>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="sales3"
                  autoComplete="sales3"
                  value={values.sales3}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.sales3 &&
                  touched.sales3 && (
                  <Label basic color="red" pointing content={errors.sales3} />
                )}
              </Form.Field>
            </Form>
          </CustomColumn>
          <CustomColumn>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="sales4"
                  autoComplete="sales4"
                  value={values.sales4}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.sales4 &&
                  touched.sales4 && (
                  <Label basic color="red" pointing content={errors.sales4} />
                )}
              </Form.Field>
            </Form>
          </CustomColumn>
          <CustomColumn>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="sales5"
                  autoComplete="sales5"
                  value={values.sales5}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.sales5 &&
                  touched.sales5 && (
                  <Label basic color="red" pointing content={errors.sales5} />
                )}
              </Form.Field>
            </Form>
          </CustomColumn>
          <CustomColumn>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="sales6"
                  autoComplete="sales6"
                  value={values.sales6}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.sales6 &&
                  touched.sales6 && (
                  <Label basic color="red" pointing content={errors.sales6} />
                )}
              </Form.Field>
            </Form>
          </CustomColumn>
          <CustomColumn>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="sales7"
                  autoComplete="sales7"
                  value={values.sales7}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.sales7 &&
                  touched.sales7 && (
                  <Label basic color="red" pointing content={errors.sales7} />
                )}
              </Form.Field>
            </Form>
          </CustomColumn>
          <CustomColumn textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox
                  name="salesYesNo"
                  onChange={this._handleChangeCheckBox}
                  checked={values.salesYesNo}
                />
              </Form.Field>
            </Form>
          </CustomColumn>
        </Grid.Row>
        <Grid.Row style={{ backgroundColor: '#dae4ef' }} columns={9}>
          <CustomColumn>
            <b>COGS</b>
          </CustomColumn>
          <CustomColumn>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="cogs1"
                  autoComplete="cogs1"
                  value={values.cogs1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  tabIndex={1}
                />
                {errors.cogs1 &&
                  touched.cogs1 && (
                  <Label basic color="red" pointing content={errors.cogs1} />
                )}
              </Form.Field>
            </Form>
          </CustomColumn>
          <CustomColumn>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="cogs2"
                  autoComplete="cogs2"
                  value={values.cogs2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.cogs2 &&
                  touched.cogs2 && (
                  <Label basic color="red" pointing content={errors.cogs2} />
                )}
              </Form.Field>
            </Form>
          </CustomColumn>
          <CustomColumn>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="cogs3"
                  autoComplete="cogs3"
                  value={values.cogs3}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.cogs3 &&
                  touched.cogs3 && (
                  <Label basic color="red" pointing content={errors.cogs3} />
                )}
              </Form.Field>
            </Form>
          </CustomColumn>
          <CustomColumn>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="cogs4"
                  autoComplete="cogs4"
                  value={values.cogs4}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.cogs4 &&
                  touched.cogs4 && (
                  <Label basic color="red" pointing content={errors.cogs4} />
                )}
              </Form.Field>
            </Form>
          </CustomColumn>
          <CustomColumn>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="cogs5"
                  autoComplete="cogs5"
                  value={values.cogs5}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.cogs5 &&
                  touched.cogs5 && (
                  <Label basic color="red" pointing content={errors.cogs5} />
                )}
              </Form.Field>
            </Form>
          </CustomColumn>
          <CustomColumn>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="cogs6"
                  autoComplete="cogs6"
                  value={values.cogs6}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.cogs6 &&
                  touched.cogs6 && (
                  <Label basic color="red" pointing content={errors.cogs6} />
                )}
              </Form.Field>
            </Form>
          </CustomColumn>
          <CustomColumn>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="cogs7"
                  autoComplete="cogs7"
                  value={values.cogs7}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.cogs7 &&
                  touched.cogs7 && (
                  <Label basic color="red" pointing content={errors.cogs7} />
                )}
              </Form.Field>
            </Form>
          </CustomColumn>
          <CustomColumn textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox
                  name="cogsYesNo"
                  onChange={this._handleChangeCheckBox}
                  checked={values.cogsYesNo}
                />
              </Form.Field>
            </Form>
          </CustomColumn>
        </Grid.Row>
        <Grid.Row columns={9}>
          <CustomColumn>
            <b>Gross Margin</b>
          </CustomColumn>
          <CustomColumn textAlign="center">50</CustomColumn>
          <CustomColumn textAlign="center">50</CustomColumn>
          <CustomColumn textAlign="center">50</CustomColumn>
          <CustomColumn textAlign="center">50</CustomColumn>
          <CustomColumn textAlign="center">50</CustomColumn>
          <CustomColumn textAlign="center">50</CustomColumn>
          <CustomColumn textAlign="center">50</CustomColumn>
          <CustomColumn textAlign="center" />
        </Grid.Row>
        <Grid.Row columns={9}>
          <CustomColumn>
            <b>Gross Margin %</b>
          </CustomColumn>
          <CustomColumn textAlign="center">50 %</CustomColumn>
          <CustomColumn textAlign="center">50 %</CustomColumn>
          <CustomColumn textAlign="center">50 %</CustomColumn>
          <CustomColumn textAlign="center">50 %</CustomColumn>
          <CustomColumn textAlign="center">50 %</CustomColumn>
          <CustomColumn textAlign="center">50 %</CustomColumn>
          <CustomColumn textAlign="center">50 %</CustomColumn>
          <CustomColumn textAlign="center" />
        </Grid.Row>
        <Grid.Row style={{ backgroundColor: '#dae4ef' }} columns={9}>
          <CustomColumn>
            <b>Other Income</b>
          </CustomColumn>
          <CustomColumn>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="otherIncome1"
                  autoComplete="otherIncome1"
                  value={values.otherIncome1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.otherIncome1 &&
                  touched.otherIncome1 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.otherIncome1}
                  />
                )}
              </Form.Field>
            </Form>
          </CustomColumn>
          <CustomColumn>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="otherIncome2"
                  autoComplete="otherIncome2"
                  value={values.otherIncome2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.otherIncome2 &&
                  touched.otherIncome2 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.otherIncome2}
                  />
                )}
              </Form.Field>
            </Form>
          </CustomColumn>
          <CustomColumn>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="otherIncome3"
                  autoComplete="otherIncome3"
                  value={values.otherIncome3}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.otherIncome3 &&
                  touched.otherIncome3 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.otherIncome3}
                  />
                )}
              </Form.Field>
            </Form>
          </CustomColumn>
          <CustomColumn>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="otherIncome4"
                  autoComplete="otherIncome4"
                  value={values.otherIncome4}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.otherIncome4 &&
                  touched.otherIncome4 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.otherIncome4}
                  />
                )}
              </Form.Field>
            </Form>
          </CustomColumn>
          <CustomColumn>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="otherIncome5"
                  autoComplete="otherIncome5"
                  value={values.otherIncome5}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.otherIncome5 &&
                  touched.otherIncome5 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.otherIncome5}
                  />
                )}
              </Form.Field>
            </Form>
          </CustomColumn>
          <CustomColumn>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="otherIncome6"
                  autoComplete="otherIncome6"
                  value={values.otherIncome6}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.otherIncome6 &&
                  touched.otherIncome6 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.otherIncome6}
                  />
                )}
              </Form.Field>
            </Form>
          </CustomColumn>
          <CustomColumn>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="otherIncome7"
                  autoComplete="otherIncome7"
                  value={values.otherIncome7}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.otherIncome7 &&
                  touched.otherIncome7 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.otherIncome7}
                  />
                )}
              </Form.Field>
            </Form>
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
          <CustomColumn textAlign="center">50</CustomColumn>
          <CustomColumn textAlign="center">50</CustomColumn>
          <CustomColumn textAlign="center">50</CustomColumn>
          <CustomColumn textAlign="center">50</CustomColumn>
          <CustomColumn textAlign="center">50</CustomColumn>
          <CustomColumn textAlign="center">50</CustomColumn>
          <CustomColumn textAlign="center">50</CustomColumn>
          <CustomColumn textAlign="center" />
        </Grid.Row>
        <Grid.Row style={{ backgroundColor: '#dae4ef' }} columns={9}>
          <CustomColumn>
            <b>Expenses</b>
          </CustomColumn>
          <CustomColumn>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="expenses1"
                  autoComplete="expenses1"
                  value={values.expenses1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.expenses1 &&
                  touched.expenses1 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.expenses1}
                  />
                )}
              </Form.Field>
            </Form>
          </CustomColumn>
          <CustomColumn>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="expenses2"
                  autoComplete="expenses2"
                  value={values.expenses2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.expenses2 &&
                  touched.expenses2 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.expenses2}
                  />
                )}
              </Form.Field>
            </Form>
          </CustomColumn>
          <CustomColumn>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="expenses3"
                  autoComplete="expenses3"
                  value={values.expenses3}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.expenses3 &&
                  touched.expenses3 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.expenses3}
                  />
                )}
              </Form.Field>
            </Form>
          </CustomColumn>
          <CustomColumn>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="expenses4"
                  autoComplete="expenses4"
                  value={values.expenses4}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.expenses4 &&
                  touched.expenses4 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.expenses4}
                  />
                )}
              </Form.Field>
            </Form>
          </CustomColumn>
          <CustomColumn>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="expenses5"
                  autoComplete="expenses5"
                  value={values.expenses5}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.expenses5 &&
                  touched.expenses5 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.expenses5}
                  />
                )}
              </Form.Field>
            </Form>
          </CustomColumn>
          <CustomColumn>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="expenses6"
                  autoComplete="expenses6"
                  value={values.expenses6}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.expenses6 &&
                  touched.expenses6 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.expenses6}
                  />
                )}
              </Form.Field>
            </Form>
          </CustomColumn>
          <CustomColumn>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="expenses7"
                  autoComplete="expenses7"
                  value={values.expenses7}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.expenses7 &&
                  touched.expenses7 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.expenses7}
                  />
                )}
              </Form.Field>
            </Form>
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
          <CustomColumn textAlign="center">50</CustomColumn>
          <CustomColumn textAlign="center">50</CustomColumn>
          <CustomColumn textAlign="center">50</CustomColumn>
          <CustomColumn textAlign="center">50</CustomColumn>
          <CustomColumn textAlign="center">50</CustomColumn>
          <CustomColumn textAlign="center">50</CustomColumn>
          <CustomColumn textAlign="center">50</CustomColumn>
          <CustomColumn textAlign="center" />
        </Grid.Row>
        <Grid.Row columns={9}>
          <CustomColumn>
            <b>Operating Profit %</b>
          </CustomColumn>
          <CustomColumn textAlign="center">50 %</CustomColumn>
          <CustomColumn textAlign="center">50 %</CustomColumn>
          <CustomColumn textAlign="center">50 %</CustomColumn>
          <CustomColumn textAlign="center">50 %</CustomColumn>
          <CustomColumn textAlign="center">50 %</CustomColumn>
          <CustomColumn textAlign="center">50 %</CustomColumn>
          <CustomColumn textAlign="center">50 %</CustomColumn>
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
  financialYear: PropTypes.string
}

const mapPropsToValues = props => ({})

const mapStateToProps = state => {
  return {}
}

const validationSchema = Yup.object().shape({})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch)
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

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Message, Step, Label, Grid, Form } from 'semantic-ui-react'
import * as Yup from 'yup'
import Wrapper from '../../../components/content/Wrapper'

class FinancialAnalysisPage extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidUpdate () {}

  _handleChangeCheckBox = (e, { name }) => {
    this.props.setFieldValue(name, !this.props.values[name])
  }

  _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
  }

  render () {
    const { values, handleChange, handleBlur, errors, touched } = this.props
    // const {} = this.state
    return (
      <Wrapper>
        <Step.Group size="large">
          <Step
            active
            icon="chart line"
            title="Step 4"
            description="Financial Analysis"
          />
          <Message info size="large">
            <p>
              The data you enter on this page will be used on the `Financial
              Analysis` page of the appraisal. This information will also be
              used to calculate the value of the business. Enter data as you
              would on a spreadsheet, using the [tab] key to switch quickly
              between cells. This page can be left open for longer than most
              other pages, but it is recommended that you manually save
              regularly to ensure that you don`t lose any work. This is done by
              clicking the [Save] button at the bottom of this page.
            </p>
          </Message>
        </Step.Group>
        <Grid celled="internally" divided>
          <Grid.Row columns={9}>
            <Grid.Column>
              <Label color="blue" size="large">
                Financial Year
              </Label>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Label color="blue" size="medium">
                2014
              </Label>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Label color="blue" size="medium">
                2015
              </Label>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Label color="blue" size="medium">
                2016
              </Label>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Label color="blue" size="medium">
                2017
              </Label>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Label color="blue" size="medium">
                2018
              </Label>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Label color="blue" size="medium">
                2019 YTD
              </Label>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Label color="blue" size="medium">
                2019 Annualised
              </Label>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Label color="blue" size="medium">
                Annualised Yes/No
              </Label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={9}>
            <Grid.Column>
              <Label size="large">Sales</Label>
            </Grid.Column>
            <Grid.Column>
              <Form size="tiny">
                <Form.Field>
                  <Form.Input
                    name="sales01"
                    autoComplete="sales01"
                    value={values.sales01}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.sales01 &&
                    touched.sales01 && (
                    <Label
                      basic
                      color="red"
                      pointing
                      content={errors.sales01}
                    />
                  )}
                </Form.Field>
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Form size="tiny">
                <Form.Field>
                  <Form.Input
                    name="sales02"
                    autoComplete="sales02"
                    value={values.sales02}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.sales02 &&
                    touched.sales02 && (
                    <Label
                      basic
                      color="red"
                      pointing
                      content={errors.sales02}
                    />
                  )}
                </Form.Field>
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Form size="tiny">
                <Form.Field>
                  <Form.Input
                    name="sales03"
                    autoComplete="sales03"
                    value={values.sales03}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.sales03 &&
                    touched.sales03 && (
                    <Label
                      basic
                      color="red"
                      pointing
                      content={errors.sales03}
                    />
                  )}
                </Form.Field>
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Form size="tiny">
                <Form.Field>
                  <Form.Input
                    name="sales04"
                    autoComplete="sales04"
                    value={values.sales04}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.sales04 &&
                    touched.sales04 && (
                    <Label
                      basic
                      color="red"
                      pointing
                      content={errors.sales04}
                    />
                  )}
                </Form.Field>
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Form size="tiny">
                <Form.Field>
                  <Form.Input
                    name="sales05"
                    autoComplete="sales05"
                    value={values.sales05}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.sales05 &&
                    touched.sales05 && (
                    <Label
                      basic
                      color="red"
                      pointing
                      content={errors.sales05}
                    />
                  )}
                </Form.Field>
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Form size="tiny">
                <Form.Field>
                  <Form.Input
                    name="sales06"
                    autoComplete="sales06"
                    value={values.sales06}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.sales06 &&
                    touched.sales06 && (
                    <Label
                      basic
                      color="red"
                      pointing
                      content={errors.sales06}
                    />
                  )}
                </Form.Field>
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Form size="tiny">
                <Form.Field>
                  <Form.Input
                    name="sales07"
                    autoComplete="sales07"
                    value={values.sales07}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.sales07 &&
                    touched.sales07 && (
                    <Label
                      basic
                      color="red"
                      pointing
                      content={errors.sales07}
                    />
                  )}
                </Form.Field>
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Form size="tiny">
                <Form.Field>
                  <Form.Input
                    name="sales08"
                    autoComplete="sales08"
                    value={values.sales08}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.sales08 &&
                    touched.sales08 && (
                    <Label
                      basic
                      color="red"
                      pointing
                      content={errors.sales08}
                    />
                  )}
                </Form.Field>
              </Form>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={9}>
            <Grid.Column>
              <Label size="large">COGS</Label>
            </Grid.Column>
            <Grid.Column>
              <Form size="tiny">
                <Form.Field>
                  <Form.Input
                    name="cogs01"
                    autoComplete="cogs01"
                    value={values.cogs01}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.cogs01 &&
                    touched.cogs01 && (
                    <Label
                      basic
                      color="red"
                      pointing
                      content={errors.cogs01}
                    />
                  )}
                </Form.Field>
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Form size="tiny">
                <Form.Field>
                  <Form.Input
                    name="cogs02"
                    autoComplete="cogs02"
                    value={values.cogs02}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.cogs02 &&
                    touched.cogs02 && (
                    <Label
                      basic
                      color="red"
                      pointing
                      content={errors.cogs02}
                    />
                  )}
                </Form.Field>
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Form size="tiny">
                <Form.Field>
                  <Form.Input
                    name="cogs03"
                    autoComplete="cogs03"
                    value={values.cogs03}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.cogs03 &&
                    touched.cogs03 && (
                    <Label
                      basic
                      color="red"
                      pointing
                      content={errors.cogs03}
                    />
                  )}
                </Form.Field>
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Form size="tiny">
                <Form.Field>
                  <Form.Input
                    name="cogs04"
                    autoComplete="cogs04"
                    value={values.cogs04}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.cogs04 &&
                    touched.cogs04 && (
                    <Label
                      basic
                      color="red"
                      pointing
                      content={errors.cogs04}
                    />
                  )}
                </Form.Field>
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Form size="tiny">
                <Form.Field>
                  <Form.Input
                    name="cogs05"
                    autoComplete="cogs05"
                    value={values.cogs05}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.cogs05 &&
                    touched.cogs05 && (
                    <Label
                      basic
                      color="red"
                      pointing
                      content={errors.cogs05}
                    />
                  )}
                </Form.Field>
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Form size="tiny">
                <Form.Field>
                  <Form.Input
                    name="cogs06"
                    autoComplete="cogs06"
                    value={values.cogs06}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.cogs06 &&
                    touched.cogs06 && (
                    <Label
                      basic
                      color="red"
                      pointing
                      content={errors.cogs06}
                    />
                  )}
                </Form.Field>
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Form size="tiny">
                <Form.Field>
                  <Form.Input
                    name="cogs07"
                    autoComplete="cogs07"
                    value={values.cogs07}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.cogs07 &&
                    touched.cogs07 && (
                    <Label
                      basic
                      color="red"
                      pointing
                      content={errors.cogs07}
                    />
                  )}
                </Form.Field>
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Form size="tiny">
                <Form.Field>
                  <Form.Input
                    name="cogs08"
                    autoComplete="cogs08"
                    value={values.cogs08}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.cogs08 &&
                    touched.cogs08 && (
                    <Label
                      basic
                      color="red"
                      pointing
                      content={errors.cogs08}
                    />
                  )}
                </Form.Field>
              </Form>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={9}>
            <Grid.Column>
              <Label color="black" size="large">
                Gross Margin
              </Label>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Label color="grey" size="medium">
                50
              </Label>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Label color="grey" size="medium">
                50
              </Label>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Label color="grey" size="medium">
                50
              </Label>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Label color="grey" size="medium">
                50
              </Label>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Label color="grey" size="medium">
                50
              </Label>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Label color="grey" size="medium">
                50
              </Label>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Label color="grey" size="medium">
                50
              </Label>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Label color="grey" size="medium">
                50
              </Label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={9}>
            <Grid.Column>
              <Label color="black" size="large">
                Gross Margin %
              </Label>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Label color="grey" size="medium">
                50 %
              </Label>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Label color="grey" size="medium">
                50 %
              </Label>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Label color="grey" size="medium">
                50 %
              </Label>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Label color="grey" size="medium">
                50 %
              </Label>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Label color="grey" size="medium">
                50 %
              </Label>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Label color="grey" size="medium">
                50 %
              </Label>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Label color="grey" size="medium">
                50 %
              </Label>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Label color="grey" size="medium">
                50 %
              </Label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={9}>
            <Grid.Column>
              <Label size="large">Other Income</Label>
            </Grid.Column>
            <Grid.Column>
              <Form size="tiny">
                <Form.Field>
                  <Form.Input
                    name="otherIncome01"
                    autoComplete="otherIncome01"
                    value={values.otherIncome01}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.otherIncome01 &&
                    touched.otherIncome01 && (
                    <Label
                      basic
                      color="red"
                      pointing
                      content={errors.otherIncome01}
                    />
                  )}
                </Form.Field>
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Form size="tiny">
                <Form.Field>
                  <Form.Input
                    name="otherIncome02"
                    autoComplete="otherIncome02"
                    value={values.otherIncome02}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.otherIncome02 &&
                    touched.otherIncome02 && (
                    <Label
                      basic
                      color="red"
                      pointing
                      content={errors.otherIncome02}
                    />
                  )}
                </Form.Field>
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Form size="tiny">
                <Form.Field>
                  <Form.Input
                    name="otherIncome03"
                    autoComplete="otherIncome03"
                    value={values.otherIncome03}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.otherIncome03 &&
                    touched.otherIncome03 && (
                    <Label
                      basic
                      color="red"
                      pointing
                      content={errors.otherIncome03}
                    />
                  )}
                </Form.Field>
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Form size="tiny">
                <Form.Field>
                  <Form.Input
                    name="otherIncome04"
                    autoComplete="otherIncome04"
                    value={values.otherIncome04}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.otherIncome04 &&
                    touched.otherIncome04 && (
                    <Label
                      basic
                      color="red"
                      pointing
                      content={errors.otherIncome04}
                    />
                  )}
                </Form.Field>
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Form size="tiny">
                <Form.Field>
                  <Form.Input
                    name="otherIncome05"
                    autoComplete="otherIncome05"
                    value={values.otherIncome05}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.otherIncome05 &&
                    touched.otherIncome05 && (
                    <Label
                      basic
                      color="red"
                      pointing
                      content={errors.otherIncome05}
                    />
                  )}
                </Form.Field>
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Form size="tiny">
                <Form.Field>
                  <Form.Input
                    name="otherIncome06"
                    autoComplete="otherIncome06"
                    value={values.otherIncome06}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.otherIncome06 &&
                    touched.otherIncome06 && (
                    <Label
                      basic
                      color="red"
                      pointing
                      content={errors.otherIncome06}
                    />
                  )}
                </Form.Field>
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Form size="tiny">
                <Form.Field>
                  <Form.Input
                    name="otherIncome07"
                    autoComplete="otherIncome07"
                    value={values.otherIncome07}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.otherIncome07 &&
                    touched.otherIncome07 && (
                    <Label
                      basic
                      color="red"
                      pointing
                      content={errors.otherIncome07}
                    />
                  )}
                </Form.Field>
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Form size="tiny">
                <Form.Field>
                  <Form.Input
                    name="otherIncome08"
                    autoComplete="otherIncome08"
                    value={values.otherIncome08}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.otherIncome08 &&
                    touched.otherIncome08 && (
                    <Label
                      basic
                      color="red"
                      pointing
                      content={errors.otherIncome08}
                    />
                  )}
                </Form.Field>
              </Form>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={9}>
            <Grid.Column>
              <Label color="black" size="large">
                Gross Profit
              </Label>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Label color="grey" size="medium">
                50
              </Label>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Label color="grey" size="medium">
                50
              </Label>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Label color="grey" size="medium">
                50
              </Label>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Label color="grey" size="medium">
                50
              </Label>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Label color="grey" size="medium">
                50
              </Label>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Label color="grey" size="medium">
                50
              </Label>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Label color="grey" size="medium">
                50
              </Label>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Label color="grey" size="medium">
                50
              </Label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={9}>
            <Grid.Column>
              <Label size="large">Expenses</Label>
            </Grid.Column>
            <Grid.Column>
              <Form size="tiny">
                <Form.Field>
                  <Form.Input
                    name="expenses01"
                    autoComplete="expenses01"
                    value={values.expenses01}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.expenses01 &&
                    touched.expenses01 && (
                    <Label
                      basic
                      color="red"
                      pointing
                      content={errors.expenses01}
                    />
                  )}
                </Form.Field>
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Form size="tiny">
                <Form.Field>
                  <Form.Input
                    name="expenses02"
                    autoComplete="expenses02"
                    value={values.expenses02}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.expenses02 &&
                    touched.expenses02 && (
                    <Label
                      basic
                      color="red"
                      pointing
                      content={errors.expenses02}
                    />
                  )}
                </Form.Field>
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Form size="tiny">
                <Form.Field>
                  <Form.Input
                    name="expenses03"
                    autoComplete="expenses03"
                    value={values.expenses03}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.expenses03 &&
                    touched.expenses03 && (
                    <Label
                      basic
                      color="red"
                      pointing
                      content={errors.expenses03}
                    />
                  )}
                </Form.Field>
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Form size="tiny">
                <Form.Field>
                  <Form.Input
                    name="expenses04"
                    autoComplete="expenses04"
                    value={values.expenses04}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.expenses04 &&
                    touched.expenses04 && (
                    <Label
                      basic
                      color="red"
                      pointing
                      content={errors.expenses04}
                    />
                  )}
                </Form.Field>
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Form size="tiny">
                <Form.Field>
                  <Form.Input
                    name="expenses05"
                    autoComplete="expenses05"
                    value={values.expenses05}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.expenses05 &&
                    touched.expenses05 && (
                    <Label
                      basic
                      color="red"
                      pointing
                      content={errors.expenses05}
                    />
                  )}
                </Form.Field>
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Form size="tiny">
                <Form.Field>
                  <Form.Input
                    name="expenses06"
                    autoComplete="expenses06"
                    value={values.expenses06}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.expenses06 &&
                    touched.expenses06 && (
                    <Label
                      basic
                      color="red"
                      pointing
                      content={errors.expenses06}
                    />
                  )}
                </Form.Field>
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Form size="tiny">
                <Form.Field>
                  <Form.Input
                    name="expenses07"
                    autoComplete="expenses07"
                    value={values.expenses07}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.expenses07 &&
                    touched.expenses07 && (
                    <Label
                      basic
                      color="red"
                      pointing
                      content={errors.expenses07}
                    />
                  )}
                </Form.Field>
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Form size="tiny">
                <Form.Field>
                  <Form.Input
                    name="expenses08"
                    autoComplete="expenses08"
                    value={values.expenses08}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.expenses08 &&
                    touched.expenses08 && (
                    <Label
                      basic
                      color="red"
                      pointing
                      content={errors.expenses08}
                    />
                  )}
                </Form.Field>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Wrapper>
    )
  }
}

FinancialAnalysisPage.propTypes = {
  values: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  errors: PropTypes.object,
  touched: PropTypes.object,
  setFieldValue: PropTypes.func,
  isSubmitting: PropTypes.bool,
  isValid: PropTypes.bool
}

const mapPropsToValues = props => ({})

const validationSchema = Yup.object().shape({})

const handleSubmit = (values, { props, setSubmitting }) => {}

const mapStateToProps = state => {
  return {}
}

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
    handleSubmit,
    enableReinitialize: true
  })(FinancialAnalysisPage)
)

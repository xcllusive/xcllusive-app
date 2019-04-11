import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Grid, Segment, Header, Form, Label } from 'semantic-ui-react'
import * as Yup from 'yup'
import numeral from 'numeral'
import CustomColumn from '../../../../components/content/CustomGridColumn'
import { updateAppraisal } from '../../../../redux/ducks/appraisal'

class AddbacksAndAdjustmentsForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      owner1AnnualWage: 0,
      owner2AnnualWage: 0,
      owner3AnnualWage: 0,
      owner4AnnualWage: 0,
      owner5AnnualWage: 0,
      owner6AnnualWage: 0,
      owner7AnnualWage: 0
    }
  }

  componentWillUnmount () {
    const obj = {
      totalAnnualWages: this._replaceDollarAndComma(this.props.values.totalAnnualWages),
      owner1AnnualWage: this._replaceDollarAndComma(this.props.values.owner1AnnualWage),
      owner2AnnualWage: this._replaceDollarAndComma(this.props.values.owner2AnnualWage),
      owner3AnnualWage: this._replaceDollarAndComma(this.props.values.owner3AnnualWage),
      owner4AnnualWage: this._replaceDollarAndComma(this.props.values.owner4AnnualWage),
      owner5AnnualWage: this._replaceDollarAndComma(this.props.values.owner5AnnualWage),
      owner6AnnualWage: this._replaceDollarAndComma(this.props.values.owner6AnnualWage),
      owner7AnnualWage: this._replaceDollarAndComma(this.props.values.owner7AnnualWage)
    }
    Object.assign(this.props.values, obj)
    this.props.updateAppraisal(this.props.values, false)
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (
      nextProps.appraisalObject &&
      (nextProps.appraisalObject.owner1AnnualWage !== prevState.owner1AnnualWage ||
        nextProps.appraisalObject.owner1AnnualWage === 0)
    ) {
      var owner1AnnualWage = numeral(nextProps.values.owner1AnnualWage).format('$0,0.[99]')
    }
    if (
      nextProps.appraisalObject &&
      (nextProps.appraisalObject.owner2AnnualWage !== prevState.owner2AnnualWage ||
        nextProps.appraisalObject.owner2AnnualWage === 0)
    ) {
      var owner2AnnualWage = numeral(nextProps.values.owner2AnnualWage).format('$0,0.[99]')
    }
    if (
      nextProps.appraisalObject &&
      (nextProps.appraisalObject.owner3AnnualWage !== prevState.owner3AnnualWage ||
        nextProps.appraisalObject.owner3AnnualWage === 0)
    ) {
      var owner3AnnualWage = numeral(nextProps.values.owner3AnnualWage).format('$0,0.[99]')
    }
    if (
      nextProps.appraisalObject &&
      (nextProps.appraisalObject.owner4AnnualWage !== prevState.owner4AnnualWage ||
        nextProps.appraisalObject.owner4AnnualWage === 0)
    ) {
      var owner4AnnualWage = numeral(nextProps.values.owner4AnnualWage).format('$0,0.[99]')
    }
    if (
      nextProps.appraisalObject &&
      (nextProps.appraisalObject.owner5AnnualWage !== prevState.owner5AnnualWage ||
        nextProps.appraisalObject.owner5AnnualWage === 0)
    ) {
      var owner5AnnualWage = numeral(nextProps.values.owner5AnnualWage).format('$0,0.[99]')
    }
    if (
      nextProps.appraisalObject &&
      (nextProps.appraisalObject.owner6AnnualWage !== prevState.owner6AnnualWage ||
        nextProps.appraisalObject.owner6AnnualWage === 0)
    ) {
      var owner6AnnualWage = numeral(nextProps.values.owner6AnnualWage).format('$0,0.[99]')
    }
    if (
      nextProps.appraisalObject &&
      (nextProps.appraisalObject.owner7AnnualWage !== prevState.owner7AnnualWage ||
        nextProps.appraisalObject.owner7AnnualWage === 0)
    ) {
      var owner7AnnualWage = numeral(nextProps.values.owner7AnnualWage).format('$0,0.[99]')
    }

    return {
      owner1AnnualWage: owner1AnnualWage || prevState.owner1AnnualWage,
      owner2AnnualWage: owner2AnnualWage || prevState.owner2AnnualWage,
      owner3AnnualWage: owner3AnnualWage || prevState.owner3AnnualWage,
      owner4AnnualWage: owner4AnnualWage || prevState.owner4AnnualWage,
      owner5AnnualWage: owner5AnnualWage || prevState.owner5AnnualWage,
      owner6AnnualWage: owner6AnnualWage || prevState.owner6AnnualWage,
      owner7AnnualWage: owner7AnnualWage || prevState.owner7AnnualWage
    }
  }

  _replaceDollarAndComma (replace) {
    replace = replace.replace('$', ',')
    replace = replace.replace(/,/g, '')
    return replace
  }

  _handleChangeCheckBox = (e, { name }) => {
    this.props.setFieldValue(name, !this.props.values[name])
  }

  _handleChangeTotalWage = async (e, { name, value }) => {
    await this.props.setFieldValue(name, value)
    const totalWagesInt = numeral(this.props.values.owner1AnnualWage)
    const totalWagesInt2 = numeral(this.props.values.owner2AnnualWage)
    const totalWagesInt3 = numeral(this.props.values.owner3AnnualWage)
    const totalWagesInt4 = numeral(this.props.values.owner4AnnualWage)
    const totalWagesInt5 = numeral(this.props.values.owner5AnnualWage)
    const totalWagesInt6 = numeral(this.props.values.owner6AnnualWage)
    const totalWagesInt7 = numeral(this.props.values.owner7AnnualWage)
    const totalWages = numeral(
      totalWagesInt.value() +
        totalWagesInt2.value() +
        totalWagesInt3.value() +
        totalWagesInt4.value() +
        totalWagesInt5.value() +
        totalWagesInt6.value() +
        totalWagesInt7.value()
    ).format('$0,0')
    this.props.setFieldValue('totalAnnualWages', totalWages)
  }

  render () {
    const { values, handleChange, handleBlur, errors, touched } = this.props
    return (
      <Fragment>
        <Segment>
          <Header style={{ marginTop: '10px', marginBottom: '10px' }} as="h3" textAlign="center" color="blue">
            Owners Market Wages
          </Header>
          <Grid celled="internally" divided>
            <Grid.Row columns={4}>
              <CustomColumn />
              <CustomColumn textAlign="center">
                <b>Position</b>
              </CustomColumn>
              <CustomColumn textAlign="center">
                <b>Hours per Week</b>
              </CustomColumn>
              <CustomColumn textAlign="center">
                <b>Annual Wage inc Super</b>
              </CustomColumn>
            </Grid.Row>
            <Grid.Row style={{ backgroundColor: 'lightblue' }} columns={4}>
              <CustomColumn>Owner 1/New Owner</CustomColumn>
              <CustomColumn>
                <Form size="tiny">
                  <Form.Field>
                    <Form.Input
                      style={{ textAlign: 'right' }}
                      name="owner1Position"
                      autoComplete="owner1Position"
                      value={values.owner1Position}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.owner1Position && touched.owner1Position && (
                      <Label basic color="red" pointing content={errors.owner1Position} />
                    )}
                  </Form.Field>
                </Form>
              </CustomColumn>
              <CustomColumn textAlign="center">
                <Form size="tiny">
                  <Form.Field>
                    <Form.Input
                      name="owner1HoursPWeek"
                      autoComplete="owner1HoursPWeek"
                      value={values.owner1HoursPWeek}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.owner1HoursPWeek && touched.owner1HoursPWeek && (
                      <Label basic color="red" pointing content={errors.owner1HoursPWeek} />
                    )}
                  </Form.Field>
                </Form>
              </CustomColumn>
              <CustomColumn textAlign="center">
                <Form size="tiny">
                  <Form.Field>
                    <Form.Input
                      name="owner1AnnualWage"
                      autoComplete="owner1AnnualWage"
                      // value={this.state.owner1AnnualWage === 0 ? values.owner1AnnualWage : this.state.owner1AnnualWage}
                      value={this.state.owner1AnnualWage}
                      onChange={this._handleChangeTotalWage}
                      onBlur={handleBlur}
                    />
                    {errors.owner1AnnualWage && touched.owner1AnnualWage && (
                      <Label basic color="red" pointing content={errors.owner1AnnualWage} />
                    )}
                  </Form.Field>
                </Form>
              </CustomColumn>
            </Grid.Row>
            <Grid.Row columns={4}>
              <CustomColumn>Owner 2</CustomColumn>
              <CustomColumn textAlign="center">
                <Form size="tiny">
                  <Form.Field>
                    <Form.Input
                      name="owner2Position"
                      autoComplete="owner2Position"
                      value={values.owner2Position}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.owner2Position && touched.owner2Position && (
                      <Label basic color="red" pointing content={errors.owner2Position} />
                    )}
                  </Form.Field>
                </Form>
              </CustomColumn>
              <CustomColumn textAlign="center">
                <Form size="tiny">
                  <Form.Field>
                    <Form.Input
                      name="owner2HoursPWeek"
                      autoComplete="owner2HoursPWeek"
                      value={values.owner2HoursPWeek}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.owner2HoursPWeek && touched.owner2HoursPWeek && (
                      <Label basic color="red" pointing content={errors.owner2HoursPWeek} />
                    )}
                  </Form.Field>
                </Form>
              </CustomColumn>
              <CustomColumn textAlign="center">
                <Form size="tiny">
                  <Form.Field>
                    <Form.Input
                      name="owner2AnnualWage"
                      autoComplete="owner2AnnualWage"
                      // value={this.state.owner2AnnualWage === 0 ? values.owner2AnnualWage : this.state.owner2AnnualWage}
                      value={this.state.owner2AnnualWage}
                      onChange={this._handleChangeTotalWage}
                      onBlur={handleBlur}
                    />
                    {errors.owner2AnnualWage && touched.owner2AnnualWage && (
                      <Label basic color="red" pointing content={errors.owner2AnnualWage} />
                    )}
                  </Form.Field>
                </Form>
              </CustomColumn>
            </Grid.Row>
            <Grid.Row style={{ backgroundColor: 'lightblue' }} columns={4}>
              <CustomColumn>Owner 3</CustomColumn>
              <CustomColumn textAlign="center">
                <Form size="tiny">
                  <Form.Field>
                    <Form.Input
                      name="owner3Position"
                      autoComplete="owner3Position"
                      value={values.owner3Position}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.owner3Position && touched.owner3Position && (
                      <Label basic color="red" pointing content={errors.owner3Position} />
                    )}
                  </Form.Field>
                </Form>
              </CustomColumn>
              <CustomColumn textAlign="center">
                <Form size="tiny">
                  <Form.Field>
                    <Form.Input
                      name="owner3HoursPWeek"
                      autoComplete="owner3HoursPWeek"
                      value={values.owner3HoursPWeek}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.owner3HoursPWeek && touched.owner3HoursPWeek && (
                      <Label basic color="red" pointing content={errors.owner3HoursPWeek} />
                    )}
                  </Form.Field>
                </Form>
              </CustomColumn>
              <CustomColumn textAlign="center">
                <Form size="tiny">
                  <Form.Field>
                    <Form.Input
                      name="owner3AnnualWage"
                      autoComplete="owner3AnnualWage"
                      // value={this.state.owner3AnnualWage === 0 ? values.owner3AnnualWage : this.state.owner3AnnualWage}
                      value={this.state.owner3AnnualWage}
                      onChange={this._handleChangeTotalWage}
                      onBlur={handleBlur}
                    />
                    {errors.owner3AnnualWage && touched.owner3AnnualWage && (
                      <Label basic color="red" pointing content={errors.owner3AnnualWage} />
                    )}
                  </Form.Field>
                </Form>
              </CustomColumn>
            </Grid.Row>
            <Grid.Row columns={4}>
              <CustomColumn>Owner 4</CustomColumn>
              <CustomColumn textAlign="center">
                <Form size="tiny">
                  <Form.Field>
                    <Form.Input
                      name="owner4Position"
                      autoComplete="owner4Position"
                      value={values.owner4Position}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.owner4Position && touched.owner4Position && (
                      <Label basic color="red" pointing content={errors.owner4Position} />
                    )}
                  </Form.Field>
                </Form>
              </CustomColumn>
              <CustomColumn textAlign="center">
                <Form size="tiny">
                  <Form.Field>
                    <Form.Input
                      name="owner4HoursPWeek"
                      autoComplete="owner4HoursPWeek"
                      value={values.owner4HoursPWeek}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.owner4HoursPWeek && touched.owner4HoursPWeek && (
                      <Label basic color="red" pointing content={errors.owner4HoursPWeek} />
                    )}
                  </Form.Field>
                </Form>
              </CustomColumn>
              <CustomColumn textAlign="center">
                <Form size="tiny">
                  <Form.Field>
                    <Form.Input
                      name="owner4AnnualWage"
                      autoComplete="owner4AnnualWage"
                      // value={this.state.owner4AnnualWage === 0 ? values.owner4AnnualWage : this.state.owner4AnnualWage}
                      value={this.state.owner4AnnualWage}
                      onChange={this._handleChangeTotalWage}
                      onBlur={handleBlur}
                    />
                    {errors.owner4AnnualWage && touched.owner4AnnualWage && (
                      <Label basic color="red" pointing content={errors.owner4AnnualWage} />
                    )}
                  </Form.Field>
                </Form>
              </CustomColumn>
            </Grid.Row>
            <Grid.Row style={{ backgroundColor: 'lightblue' }} columns={4}>
              <CustomColumn>Owner 5</CustomColumn>
              <CustomColumn textAlign="center">
                <Form size="tiny">
                  <Form.Field>
                    <Form.Input
                      name="owner5Position"
                      autoComplete="owner5Position"
                      value={values.owner5Position}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.owner5Position && touched.owner5Position && (
                      <Label basic color="red" pointing content={errors.owner5Position} />
                    )}
                  </Form.Field>
                </Form>
              </CustomColumn>
              <CustomColumn textAlign="center">
                <Form size="tiny">
                  <Form.Field>
                    <Form.Input
                      name="owner5HoursPWeek"
                      autoComplete="owner5HoursPWeek"
                      value={values.owner5HoursPWeek}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.owner5HoursPWeek && touched.owner5HoursPWeek && (
                      <Label basic color="red" pointing content={errors.owner5HoursPWeek} />
                    )}
                  </Form.Field>
                </Form>
              </CustomColumn>
              <CustomColumn textAlign="center">
                <Form size="tiny">
                  <Form.Field>
                    <Form.Input
                      name="owner5AnnualWage"
                      autoComplete="owner5AnnualWage"
                      value={this.state.owner5AnnualWage === 0 ? values.owner5AnnualWage : this.state.owner5AnnualWage}
                      onChange={this._handleChangeTotalWage}
                      onBlur={handleBlur}
                    />
                    {errors.owner5AnnualWage && touched.owner5AnnualWage && (
                      <Label basic color="red" pointing content={errors.owner5AnnualWage} />
                    )}
                  </Form.Field>
                </Form>
              </CustomColumn>
            </Grid.Row>
            <Grid.Row columns={4}>
              <CustomColumn>Owner 6</CustomColumn>
              <CustomColumn textAlign="center">
                <Form size="tiny">
                  <Form.Field>
                    <Form.Input
                      name="owner6Position"
                      autoComplete="owner6Position"
                      value={values.owner6Position}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.owner6Position && touched.owner6Position && (
                      <Label basic color="red" pointing content={errors.owner6Position} />
                    )}
                  </Form.Field>
                </Form>
              </CustomColumn>
              <CustomColumn textAlign="center">
                <Form size="tiny">
                  <Form.Field>
                    <Form.Input
                      name="owner6HoursPWeek"
                      autoComplete="owner6HoursPWeek"
                      value={values.owner6HoursPWeek}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.owner6HoursPWeek && touched.owner6HoursPWeek && (
                      <Label basic color="red" pointing content={errors.owner6HoursPWeek} />
                    )}
                  </Form.Field>
                </Form>
              </CustomColumn>
              <CustomColumn textAlign="center">
                <Form size="tiny">
                  <Form.Field>
                    <Form.Input
                      name="owner6AnnualWage"
                      autoComplete="owner6AnnualWage"
                      value={this.state.owner6AnnualWage === 0 ? values.owner6AnnualWage : this.state.owner6AnnualWage}
                      onChange={this._handleChangeTotalWage}
                      onBlur={handleBlur}
                    />
                    {errors.owner6AnnualWage && touched.owner6AnnualWage && (
                      <Label basic color="red" pointing content={errors.owner6AnnualWage} />
                    )}
                  </Form.Field>
                </Form>
              </CustomColumn>
            </Grid.Row>
            <Grid.Row style={{ backgroundColor: 'lightblue' }} columns={4}>
              <CustomColumn>Owner 7</CustomColumn>
              <CustomColumn textAlign="center">
                <Form size="tiny">
                  <Form.Field>
                    <Form.Input
                      name="owner7Position"
                      autoComplete="owner7Position"
                      value={values.owner7Position}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.owner7Position && touched.owner7Position && (
                      <Label basic color="red" pointing content={errors.owner7Position} />
                    )}
                  </Form.Field>
                </Form>
              </CustomColumn>
              <CustomColumn textAlign="center">
                <Form size="tiny">
                  <Form.Field>
                    <Form.Input
                      name="owner7HoursPWeek"
                      autoComplete="owner7HoursPWeek"
                      value={values.owner7HoursPWeek}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.owner7HoursPWeek && touched.owner7HoursPWeek && (
                      <Label basic color="red" pointing content={errors.owner7HoursPWeek} />
                    )}
                  </Form.Field>
                </Form>
              </CustomColumn>
              <CustomColumn textAlign="center">
                <Form size="tiny">
                  <Form.Field>
                    <Form.Input
                      name="owner7AnnualWage"
                      autoComplete="owner7AnnualWage"
                      value={this.state.owner7AnnualWage === 0 ? values.owner7AnnualWage : this.state.owner7AnnualWage}
                      onChange={this._handleChangeTotalWage}
                      onBlur={handleBlur}
                    />
                    {errors.owner7AnnualWage && touched.owner7AnnualWage && (
                      <Label basic color="red" pointing content={errors.owner7AnnualWage} />
                    )}
                  </Form.Field>
                </Form>
              </CustomColumn>
            </Grid.Row>
            <Grid.Row columns={4}>
              <CustomColumn>Total Wages</CustomColumn>
              <CustomColumn />
              <CustomColumn />
              <CustomColumn textAlign="center">
                <Form size="tiny">
                  <Form.Field>
                    <Form.Input
                      name="totalAnnualWages"
                      autoComplete="totalAnnualWages"
                      value={values.totalAnnualWages}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      readOnly
                    />
                  </Form.Field>
                </Form>
              </CustomColumn>
            </Grid.Row>
          </Grid>
        </Segment>
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
  business: PropTypes.object
}

const mapPropsToValues = props => ({
  business_id: props.business ? props.business.id : '',
  id: props.appraisalObject ? props.appraisalObject.id : '',
  owner1Position: props.appraisalObject ? props.appraisalObject.owner1Position : '',
  owner2Position: props.appraisalObject ? props.appraisalObject.owner2Position : '',
  owner3Position: props.appraisalObject ? props.appraisalObject.owner3Position : '',
  owner4Position: props.appraisalObject ? props.appraisalObject.owner4Position : '',
  owner5Position: props.appraisalObject ? props.appraisalObject.owner5Position : '',
  owner6Position: props.appraisalObject ? props.appraisalObject.owner6Position : '',
  owner7Position: props.appraisalObject ? props.appraisalObject.owner7Position : '',
  owner1HoursPWeek: props.appraisalObject ? props.appraisalObject.owner1HoursPWeek : '',
  owner2HoursPWeek: props.appraisalObject ? props.appraisalObject.owner2HoursPWeek : '',
  owner3HoursPWeek: props.appraisalObject ? props.appraisalObject.owner3HoursPWeek : '',
  owner4HoursPWeek: props.appraisalObject ? props.appraisalObject.owner4HoursPWeek : '',
  owner5HoursPWeek: props.appraisalObject ? props.appraisalObject.owner5HoursPWeek : '',
  owner6HoursPWeek: props.appraisalObject ? props.appraisalObject.owner6HoursPWeek : '',
  owner7HoursPWeek: props.appraisalObject ? props.appraisalObject.owner7HoursPWeek : '',
  owner1AnnualWage: props.appraisalObject ? numeral(props.appraisalObject.owner1AnnualWage).format('$0,0') : '',
  owner2AnnualWage: props.appraisalObject ? numeral(props.appraisalObject.owner2AnnualWage).format('$0,0') : '',
  owner3AnnualWage: props.appraisalObject ? numeral(props.appraisalObject.owner3AnnualWage).format('$0,0') : '',
  owner4AnnualWage: props.appraisalObject ? numeral(props.appraisalObject.owner4AnnualWage).format('$0,0') : '',
  owner5AnnualWage: props.appraisalObject ? numeral(props.appraisalObject.owner5AnnualWage).format('$0,0') : '',
  owner6AnnualWage: props.appraisalObject ? numeral(props.appraisalObject.owner6AnnualWage).format('$0,0') : '',
  owner7AnnualWage: props.appraisalObject ? numeral(props.appraisalObject.owner7AnnualWage).format('$0,0') : '',
  totalAnnualWages: props.appraisalObject ? numeral(props.appraisalObject.totalAnnualWages).format('$0,0') : 0
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

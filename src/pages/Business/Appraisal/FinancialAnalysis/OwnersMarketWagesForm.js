import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Grid, Segment, Header, Form, Label } from 'semantic-ui-react'
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
              <CustomColumn textAlign="center">
                <Form size="tiny">
                  <Form.Field>
                    <Form.Input
                      name="owner1Position"
                      autoComplete="owner1Position"
                      value={values.owner1Position}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.owner1Position &&
                      touched.owner1Position && <Label basic color="red" pointing content={errors.owner1Position} />}
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
                    {errors.owner1HoursPWeek &&
                      touched.owner1HoursPWeek && (
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
                      value={values.owner1AnnualWage}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.owner1AnnualWage &&
                      touched.owner1AnnualWage && (
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
                    {errors.owner2Position &&
                      touched.owner2Position && <Label basic color="red" pointing content={errors.owner2Position} />}
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
                    {errors.owner2HoursPWeek &&
                      touched.owner2HoursPWeek && (
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
                      value={values.owner2AnnualWage}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.owner2AnnualWage &&
                      touched.owner2AnnualWage && (
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
                    {errors.owner3Position &&
                      touched.owner3Position && <Label basic color="red" pointing content={errors.owner3Position} />}
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
                    {errors.owner3HoursPWeek &&
                      touched.owner3HoursPWeek && (
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
                      value={values.owner3AnnualWage}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.owner3AnnualWage &&
                      touched.owner3AnnualWage && (
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
                    {errors.owner4Position &&
                      touched.owner4Position && <Label basic color="red" pointing content={errors.owner4Position} />}
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
                    {errors.owner4HoursPWeek &&
                      touched.owner4HoursPWeek && (
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
                      value={values.owner4AnnualWage}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.owner4AnnualWage &&
                      touched.owner4AnnualWage && (
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
                    {errors.owner5Position &&
                      touched.owner5Position && <Label basic color="red" pointing content={errors.owner5Position} />}
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
                    {errors.owner5HoursPWeek &&
                      touched.owner5HoursPWeek && (
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
                      value={values.owner5AnnualWage}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.owner5AnnualWage &&
                      touched.owner5AnnualWage && (
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
                    {errors.owner6Position &&
                      touched.owner6Position && <Label basic color="red" pointing content={errors.owner6Position} />}
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
                    {errors.owner6HoursPWeek &&
                      touched.owner6HoursPWeek && (
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
                      value={values.owner6AnnualWage}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.owner6AnnualWage &&
                      touched.owner6AnnualWage && (
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
                    {errors.owner7Position &&
                      touched.owner7Position && <Label basic color="red" pointing content={errors.owner7Position} />}
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
                    {errors.owner7HoursPWeek &&
                      touched.owner7HoursPWeek && (
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
                      value={values.owner7AnnualWage}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.owner7AnnualWage &&
                      touched.owner7AnnualWage && (
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
              <CustomColumn textAlign="center">0</CustomColumn>
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

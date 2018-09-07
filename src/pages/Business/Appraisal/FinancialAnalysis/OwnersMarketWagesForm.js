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
          <Header
            style={{ marginTop: '10px', marginBottom: '10px' }}
            as="h3"
            textAlign="center"
            color="blue"
          >
            Owners Market Wages
          </Header>
          <Grid celled="internally" divided>
            <Grid.Row columns={3}>
              <CustomColumn />
              <CustomColumn textAlign="center">
                <b>Position</b>
              </CustomColumn>
              <CustomColumn textAlign="center">
                <b>Annual Wage inc Super</b>
              </CustomColumn>
            </Grid.Row>
            <Grid.Row style={{ backgroundColor: 'lightblue' }} columns={3}>
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
                      touched.owner1Position && (
                      <Label
                        basic
                        color="red"
                        pointing
                        content={errors.owner1Position}
                      />
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
                      <Label
                        basic
                        color="red"
                        pointing
                        content={errors.owner1AnnualWage}
                      />
                    )}
                  </Form.Field>
                </Form>
              </CustomColumn>
            </Grid.Row>
            <Grid.Row columns={3}>
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
                      touched.owner2Position && (
                      <Label
                        basic
                        color="red"
                        pointing
                        content={errors.owner2Position}
                      />
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
                      <Label
                        basic
                        color="red"
                        pointing
                        content={errors.owner2AnnualWage}
                      />
                    )}
                  </Form.Field>
                </Form>
              </CustomColumn>
            </Grid.Row>
            <Grid.Row style={{ backgroundColor: 'lightblue' }} columns={3}>
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
                      touched.owner3Position && (
                      <Label
                        basic
                        color="red"
                        pointing
                        content={errors.owner3Position}
                      />
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
                      <Label
                        basic
                        color="red"
                        pointing
                        content={errors.owner3AnnualWage}
                      />
                    )}
                  </Form.Field>
                </Form>
              </CustomColumn>
            </Grid.Row>
            <Grid.Row columns={3}>
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
                      touched.owner4Position && (
                      <Label
                        basic
                        color="red"
                        pointing
                        content={errors.owner4Position}
                      />
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
                      <Label
                        basic
                        color="red"
                        pointing
                        content={errors.owner5AnnualWage}
                      />
                    )}
                  </Form.Field>
                </Form>
              </CustomColumn>
            </Grid.Row>
            <Grid.Row style={{ backgroundColor: 'lightblue' }} columns={3}>
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
                      touched.owner6Position && (
                      <Label
                        basic
                        color="red"
                        pointing
                        content={errors.owner6Position}
                      />
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
                      <Label
                        basic
                        color="red"
                        pointing
                        content={errors.owner6AnnualWage}
                      />
                    )}
                  </Form.Field>
                </Form>
              </CustomColumn>
            </Grid.Row>
            <Grid.Row columns={3}>
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
                      touched.owner7Position && (
                      <Label
                        basic
                        color="red"
                        pointing
                        content={errors.owner7Position}
                      />
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
                      <Label
                        basic
                        color="red"
                        pointing
                        content={errors.owner7AnnualWage}
                      />
                    )}
                  </Form.Field>
                </Form>
              </CustomColumn>
            </Grid.Row>
            <Grid.Row style={{ backgroundColor: 'lightblue' }} columns={3}>
              <CustomColumn>Total Wages</CustomColumn>
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

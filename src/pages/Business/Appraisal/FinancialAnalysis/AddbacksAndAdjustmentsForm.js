import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Form, Label, Grid } from 'semantic-ui-react'
import * as Yup from 'yup'

class AddbacksAndAdjustmentsForm extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  _handleChangeCheckBox = (e, { name }) => {
    this.props.setFieldValue(name, !this.props.values[name])
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
        <Grid.Row
          style={{ backgroundColor: 'lightyellow', celledPadding: '.3em' }}
          columns={9}
        >
          <Grid.Column>
            <b>Financial Year</b>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <b>{financialYear - 5}</b>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <b>{financialYear - 4}</b>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <b>{financialYear - 3}</b>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <b>{financialYear - 2}</b>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <b>{financialYear - 1}</b>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <b>{financialYear} YTD</b>{' '}
          </Grid.Column>
          <Grid.Column textAlign="center">
            <b>{financialYear} Annualised</b>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <b>Annualised Yes/No</b>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{ backgroundColor: 'lightblue' }} columns={9}>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow01"
                  autoComplete="aaRow01"
                  value={values.aaRow01}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow01 &&
                  touched.aaRow01 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow01}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow01Year1"
                  autoComplete="aaRow01Year1"
                  value={values.aaRow01Year1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow01Year1 &&
                  touched.aaRow01Year1 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow01Year1}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow01Year2"
                  autoComplete="aaRow01Year2"
                  value={values.aaRow01Year2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow01Year2 &&
                  touched.aaRow01Year2 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow01Year2}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow01Year3"
                  autoComplete="aaRow01Year3"
                  value={values.aaRow01Year3}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow01Year3 &&
                  touched.aaRow01Year3 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow01Year3}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow01Year4"
                  autoComplete="aaRow01Year4"
                  value={values.aaRow01Year4}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow01Year4 &&
                  touched.aaRow01Year4 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow01Year4}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow01Year5"
                  autoComplete="aaRow01Year5"
                  value={values.aaRow01Year5}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow01Year5 &&
                  touched.aaRow01Year5 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow01Year5}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow01Year6"
                  autoComplete="aaRow01Year6"
                  value={values.aaRow01Year6}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow01Year6 &&
                  touched.aaRow01Year6 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow01Year6}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow01Year7"
                  autoComplete="aaRow01Year7"
                  value={values.aaRow01Year7}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow01Year7 &&
                  touched.aaRow01Year7 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow01Year7}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox
                  name="aaRow01YesNo"
                  onChange={this._handleChangeCheckBox}
                  checked={values.aaRow01YesNo}
                />
              </Form.Field>
            </Form>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={9}>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow02"
                  autoComplete="aaRow02"
                  value={values.aaRow02}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow02 &&
                  touched.aaRow02 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow02}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow02Year1"
                  autoComplete="aaRow02Year1"
                  value={values.aaRow02Year1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow02Year1 &&
                  touched.aaRow02Year1 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow02Year1}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow02Year2"
                  autoComplete="aaRow02Year2"
                  value={values.aaRow02Year2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow02Year2 &&
                  touched.aaRow02Year2 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow02Year2}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow02Year3"
                  autoComplete="aaRow02Year3"
                  value={values.aaRow02Year3}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow02Year3 &&
                  touched.aaRow02Year3 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow02Year3}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow02Year4"
                  autoComplete="aaRow02Year4"
                  value={values.aaRow02Year4}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow02Year4 &&
                  touched.aaRow02Year4 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow02Year4}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow02Year5"
                  autoComplete="aaRow02Year5"
                  value={values.aaRow02Year5}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow02Year5 &&
                  touched.aaRow02Year5 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow02Year5}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow02Year6"
                  autoComplete="aaRow02Year6"
                  value={values.aaRow02Year6}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow02Year6 &&
                  touched.aaRow02Year6 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow02Year6}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow02Year7"
                  autoComplete="aaRow02Year7"
                  value={values.aaRow02Year7}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow02Year7 &&
                  touched.aaRow02Year7 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow02Year7}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox
                  name="aaRow02YesNo"
                  onChange={this._handleChangeCheckBox}
                  checked={values.aaRow02YesNo}
                />
              </Form.Field>
            </Form>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{ backgroundColor: 'lightblue' }} columns={9}>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow03"
                  autoComplete="aaRow03"
                  value={values.aaRow03}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow03 &&
                  touched.aaRow03 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow03}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow03Year1"
                  autoComplete="aaRow03Year1"
                  value={values.aaRow03Year1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow03Year1 &&
                  touched.aaRow03Year1 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow03Year1}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow03Year2"
                  autoComplete="aaRow03Year2"
                  value={values.aaRow03Year2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow03Year2 &&
                  touched.aaRow03Year2 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow03Year2}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow03Year3"
                  autoComplete="aaRow03Year3"
                  value={values.aaRow03Year3}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow03Year3 &&
                  touched.aaRow03Year3 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow03Year3}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow03Year4"
                  autoComplete="aaRow03Year4"
                  value={values.aaRow03Year4}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow03Year4 &&
                  touched.aaRow03Year4 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow03Year4}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow03Year5"
                  autoComplete="aaRow03Year5"
                  value={values.aaRow03Year5}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow03Year5 &&
                  touched.aaRow03Year5 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow03Year5}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow03Year6"
                  autoComplete="aaRow03Year6"
                  value={values.aaRow03Year6}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow03Year6 &&
                  touched.aaRow03Year6 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow03Year6}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow03Year7"
                  autoComplete="aaRow03Year7"
                  value={values.aaRow03Year7}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow03Year7 &&
                  touched.aaRow03Year7 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow03Year7}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox
                  name="aaRow03YesNo"
                  onChange={this._handleChangeCheckBox}
                  checked={values.aaRow03YesNo}
                />
              </Form.Field>
            </Form>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={9}>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow04"
                  autoComplete="aaRow04"
                  value={values.aaRow04}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow04 &&
                  touched.aaRow04 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow04}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow04Year1"
                  autoComplete="aaRow04Year1"
                  value={values.aaRow04Year1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow04Year1 &&
                  touched.aaRow04Year1 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow04Year1}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow04Year2"
                  autoComplete="aaRow04Year2"
                  value={values.aaRow04Year2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow04Year2 &&
                  touched.aaRow04Year2 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow04Year2}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow04Year3"
                  autoComplete="aaRow04Year3"
                  value={values.aaRow04Year3}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow04Year3 &&
                  touched.aaRow04Year3 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow04Year3}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow04Year4"
                  autoComplete="aaRow04Year4"
                  value={values.aaRow04Year4}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow04Year4 &&
                  touched.aaRow04Year4 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow04Year4}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow04Year5"
                  autoComplete="aaRow04Year5"
                  value={values.aaRow04Year5}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow04Year5 &&
                  touched.aaRow04Year5 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow04Year5}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow04Year6"
                  autoComplete="aaRow04Year6"
                  value={values.aaRow04Year6}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow04Year6 &&
                  touched.aaRow04Year6 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow04Year6}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow04Year7"
                  autoComplete="aaRow04Year7"
                  value={values.aaRow04Year7}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow04Year7 &&
                  touched.aaRow04Year7 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow04Year7}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox
                  name="aaRow04YesNo"
                  onChange={this._handleChangeCheckBox}
                  checked={values.aaRow04YesNo}
                />
              </Form.Field>
            </Form>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{ backgroundColor: 'lightblue' }} columns={9}>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow05"
                  autoComplete="aaRow05"
                  value={values.aaRow05}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow05 &&
                  touched.aaRow05 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow05}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow05Year1"
                  autoComplete="aaRow05Year1"
                  value={values.aaRow05Year1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow05Year1 &&
                  touched.aaRow05Year1 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow05Year1}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow05Year2"
                  autoComplete="aaRow05Year2"
                  value={values.aaRow05Year2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow05Year2 &&
                  touched.aaRow05Year2 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow05Year2}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow05Year3"
                  autoComplete="aaRow05Year3"
                  value={values.aaRow05Year3}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow05Year3 &&
                  touched.aaRow05Year3 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow05Year3}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow05Year4"
                  autoComplete="aaRow05Year4"
                  value={values.aaRow05Year4}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow05Year4 &&
                  touched.aaRow05Year4 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow05Year4}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow05Year5"
                  autoComplete="aaRow05Year5"
                  value={values.aaRow05Year5}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow05Year5 &&
                  touched.aaRow05Year5 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow05Year5}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow05Year6"
                  autoComplete="aaRow05Year6"
                  value={values.aaRow05Year6}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow05Year6 &&
                  touched.aaRow05Year6 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow05Year6}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow05Year7"
                  autoComplete="aaRow05Year7"
                  value={values.aaRow05Year7}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow05Year7 &&
                  touched.aaRow05Year7 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow05Year7}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox
                  name="aaRow05YesNo"
                  onChange={this._handleChangeCheckBox}
                  checked={values.aaRow05YesNo}
                />
              </Form.Field>
            </Form>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={9}>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow06"
                  autoComplete="aaRow06"
                  value={values.aaRow06}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow06 &&
                  touched.aaRow06 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow05}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow06Year1"
                  autoComplete="aaRow06Year1"
                  value={values.aaRow06Year1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow06Year1 &&
                  touched.aaRow06Year1 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow06Year1}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow06Year2"
                  autoComplete="aaRow06Year2"
                  value={values.aaRow06Year2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow06Year2 &&
                  touched.aaRow06Year2 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow06Year2}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow06Year3"
                  autoComplete="aaRow06Year3"
                  value={values.aaRow06Year3}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow06Year3 &&
                  touched.aaRow06Year3 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow06Year3}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow06Year4"
                  autoComplete="aaRow06Year4"
                  value={values.aaRow06Year4}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow06Year4 &&
                  touched.aaRow06Year4 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow06Year4}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow06Year5"
                  autoComplete="aaRow06Year5"
                  value={values.aaRow06Year5}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow06Year5 &&
                  touched.aaRow06Year5 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow06Year5}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow06Year6"
                  autoComplete="aaRow06Year6"
                  value={values.aaRow06Year6}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow06Year6 &&
                  touched.aaRow06Year6 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow06Year6}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow06Year7"
                  autoComplete="aaRow06Year7"
                  value={values.aaRow06Year7}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow06Year7 &&
                  touched.aaRow06Year7 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow06Year7}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox
                  name="aaRow06YesNo"
                  onChange={this._handleChangeCheckBox}
                  checked={values.aaRow06YesNo}
                />
              </Form.Field>
            </Form>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{ backgroundColor: 'lightblue' }} columns={9}>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow07"
                  autoComplete="aaRow07"
                  value={values.aaRow07}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow07 &&
                  touched.aaRow07 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow07}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow07Year1"
                  autoComplete="aaRow07Year1"
                  value={values.aaRow07Year1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow07Year1 &&
                  touched.aaRow07Year1 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow07Year1}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow07Year2"
                  autoComplete="aaRow07Year2"
                  value={values.aaRow07Year2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow07Year2 &&
                  touched.aaRow07Year2 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow07Year2}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow07Year3"
                  autoComplete="aaRow07Year3"
                  value={values.aaRow07Year3}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow07Year3 &&
                  touched.aaRow07Year3 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow07Year3}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow07Year4"
                  autoComplete="aaRow07Year4"
                  value={values.aaRow07Year4}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow07Year4 &&
                  touched.aaRow07Year4 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow07Year4}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow07Year5"
                  autoComplete="aaRow07Year5"
                  value={values.aaRow07Year5}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow07Year5 &&
                  touched.aaRow07Year5 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow07Year5}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow07Year6"
                  autoComplete="aaRow07Year6"
                  value={values.aaRow07Year6}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow07Year6 &&
                  touched.aaRow07Year6 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow07Year6}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow07Year7"
                  autoComplete="aaRow07Year7"
                  value={values.aaRow07Year7}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow07Year7 &&
                  touched.aaRow07Year7 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow07Year7}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox
                  name="aaRow07YesNo"
                  onChange={this._handleChangeCheckBox}
                  checked={values.aaRow07YesNo}
                />
              </Form.Field>
            </Form>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={9}>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow08"
                  autoComplete="aaRow08"
                  value={values.aaRow08}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow08 &&
                  touched.aaRow08 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow08}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow08Year1"
                  autoComplete="aaRow08Year1"
                  value={values.aaRow08Year1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow08Year1 &&
                  touched.aaRow08Year1 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow08Year1}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow08Year2"
                  autoComplete="aaRow08Year2"
                  value={values.aaRow08Year2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow08Year2 &&
                  touched.aaRow08Year2 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow08Year2}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow08Year3"
                  autoComplete="aaRow08Year3"
                  value={values.aaRow08Year3}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow08Year3 &&
                  touched.aaRow08Year3 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow08Year3}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow08Year4"
                  autoComplete="aaRow08Year4"
                  value={values.aaRow08Year4}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow08Year4 &&
                  touched.aaRow08Year4 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow08Year4}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow08Year5"
                  autoComplete="aaRow08Year5"
                  value={values.aaRow08Year5}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow08Year5 &&
                  touched.aaRow08Year5 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow08Year5}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow08Year6"
                  autoComplete="aaRow08Year6"
                  value={values.aaRow08Year6}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow08Year6 &&
                  touched.aaRow08Year6 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow08Year6}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow08Year7"
                  autoComplete="aaRow08Year7"
                  value={values.aaRow08Year7}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow08Year7 &&
                  touched.aaRow08Year7 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow08Year7}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox
                  name="aaRow08YesNo"
                  onChange={this._handleChangeCheckBox}
                  checked={values.aaRow08YesNo}
                />
              </Form.Field>
            </Form>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{ backgroundColor: 'lightblue' }} columns={9}>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow09"
                  autoComplete="aaRow09"
                  value={values.aaRow09}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow09 &&
                  touched.aaRow09 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow09}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow09Year1"
                  autoComplete="aaRow09Year1"
                  value={values.aaRow09Year1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow09Year1 &&
                  touched.aaRow09Year1 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow09Year1}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow09Year2"
                  autoComplete="aaRow09Year2"
                  value={values.aaRow09Year2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow09Year2 &&
                  touched.aaRow09Year2 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow09Year2}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow09Year3"
                  autoComplete="aaRow09Year3"
                  value={values.aaRow09Year3}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow09Year3 &&
                  touched.aaRow09Year3 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow09Year3}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow09Year4"
                  autoComplete="aaRow09Year4"
                  value={values.aaRow09Year4}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow09Year4 &&
                  touched.aaRow09Year4 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow09Year4}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow09Year5"
                  autoComplete="aaRow09Year5"
                  value={values.aaRow09Year5}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow09Year5 &&
                  touched.aaRow09Year5 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow09Year5}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow09Year6"
                  autoComplete="aaRow09Year6"
                  value={values.aaRow09Year6}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow09Year6 &&
                  touched.aaRow09Year6 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow09Year6}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow09Year7"
                  autoComplete="aaRow09Year7"
                  value={values.aaRow09Year7}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow09Year7 &&
                  touched.aaRow09Year7 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow09Year7}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox
                  name="aaRow09YesNo"
                  onChange={this._handleChangeCheckBox}
                  checked={values.aaRow09YesNo}
                />
              </Form.Field>
            </Form>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={9}>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow10"
                  autoComplete="aaRow10"
                  value={values.aaRow10}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow10 &&
                  touched.aaRow10 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow10}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow10Year1"
                  autoComplete="aaRow10Year1"
                  value={values.aaRow10Year1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow10Year1 &&
                  touched.aaRow10Year1 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow10Year1}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow10Year2"
                  autoComplete="aaRow10Year2"
                  value={values.aaRow10Year2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow10Year2 &&
                  touched.aaRow10Year2 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow10Year2}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow10Year3"
                  autoComplete="aaRow10Year3"
                  value={values.aaRow10Year3}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow10Year3 &&
                  touched.aaRow10Year3 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow10Year3}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow10Year4"
                  autoComplete="aaRow10Year4"
                  value={values.aaRow10Year4}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow10Year4 &&
                  touched.aaRow10Year4 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow10Year4}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow10Year5"
                  autoComplete="aaRow10Year5"
                  value={values.aaRow10Year5}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow10Year5 &&
                  touched.aaRow10Year5 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow10Year5}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow10Year6"
                  autoComplete="aaRow10Year6"
                  value={values.aaRow10Year6}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow10Year6 &&
                  touched.aaRow10Year6 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow10Year6}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow10Year7"
                  autoComplete="aaRow10Year7"
                  value={values.aaRow10Year7}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow10Year7 &&
                  touched.aaRow10Year7 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow10Year7}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox
                  name="aaRow10YesNo"
                  onChange={this._handleChangeCheckBox}
                  checked={values.aaRow10YesNo}
                />
              </Form.Field>
            </Form>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{ backgroundColor: 'lightblue' }} columns={9}>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow11"
                  autoComplete="aaRow11"
                  value={values.aaRow11}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow11 &&
                  touched.aaRow11 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow11}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow11Year1"
                  autoComplete="aaRow11Year1"
                  value={values.aaRow11Year1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow11Year1 &&
                  touched.aaRow11Year1 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow11Year1}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow11Year2"
                  autoComplete="aaRow11Year2"
                  value={values.aaRow11Year2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow11Year2 &&
                  touched.aaRow11Year2 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow11Year2}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow11Year3"
                  autoComplete="aaRow11Year3"
                  value={values.aaRow11Year3}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow11Year3 &&
                  touched.aaRow11Year3 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow11Year3}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow11Year4"
                  autoComplete="aaRow11Year4"
                  value={values.aaRow11Year4}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow11Year4 &&
                  touched.aaRow11Year4 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow11Year4}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow11Year5"
                  autoComplete="aaRow11Year5"
                  value={values.aaRow11Year5}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow11Year5 &&
                  touched.aaRow11Year5 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow11Year5}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow11Year6"
                  autoComplete="aaRow11Year6"
                  value={values.aaRow11Year6}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow11Year6 &&
                  touched.aaRow11Year6 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow11Year6}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow11Year7"
                  autoComplete="aaRow11Year7"
                  value={values.aaRow11Year7}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow11Year7 &&
                  touched.aaRow11Year7 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow11Year7}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox
                  name="aaRow11YesNo"
                  onChange={this._handleChangeCheckBox}
                  checked={values.aaRow11YesNo}
                />
              </Form.Field>
            </Form>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={9}>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow12"
                  autoComplete="aaRow12"
                  value={values.aaRow12}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow12 &&
                  touched.aaRow12 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow12}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow12Year1"
                  autoComplete="aaRow12Year1"
                  value={values.aaRow12Year1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow12Year1 &&
                  touched.aaRow12Year1 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow12Year1}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow12Year2"
                  autoComplete="aaRow12Year2"
                  value={values.aaRow12Year2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow12Year2 &&
                  touched.aaRow12Year2 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow12Year2}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow12Year3"
                  autoComplete="aaRow12Year3"
                  value={values.aaRow12Year3}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow12Year3 &&
                  touched.aaRow12Year3 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow12Year3}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow12Year4"
                  autoComplete="aaRow12Year4"
                  value={values.aaRow12Year4}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow12Year4 &&
                  touched.aaRow12Year4 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow12Year4}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow12Year5"
                  autoComplete="aaRow12Year5"
                  value={values.aaRow12Year5}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow12Year5 &&
                  touched.aaRow12Year5 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow12Year5}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow12Year6"
                  autoComplete="aaRow12Year6"
                  value={values.aaRow12Year6}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow12Year6 &&
                  touched.aaRow12Year6 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow12Year6}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow12Year7"
                  autoComplete="aaRow12Year7"
                  value={values.aaRow12Year7}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow12Year7 &&
                  touched.aaRow12Year7 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow12Year7}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox
                  name="aaRow12YesNo"
                  onChange={this._handleChangeCheckBox}
                  checked={values.aaRow12YesNo}
                />
              </Form.Field>
            </Form>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{ backgroundColor: 'lightblue' }} columns={9}>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow13"
                  autoComplete="aaRow13"
                  value={values.aaRow13}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow13 &&
                  touched.aaRow13 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow13}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow13Year1"
                  autoComplete="aaRow13Year1"
                  value={values.aaRow13Year1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow13Year1 &&
                  touched.aaRow13Year1 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow13Year1}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow13Year2"
                  autoComplete="aaRow13Year2"
                  value={values.aaRow13Year2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow13Year2 &&
                  touched.aaRow13Year2 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow13Year2}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow13Year3"
                  autoComplete="aaRow13Year3"
                  value={values.aaRow13Year3}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow13Year3 &&
                  touched.aaRow13Year3 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow13Year3}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow13Year4"
                  autoComplete="aaRow13Year4"
                  value={values.aaRow13Year4}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow13Year4 &&
                  touched.aaRow13Year4 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow13Year4}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow13Year5"
                  autoComplete="aaRow13Year5"
                  value={values.aaRow13Year5}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow13Year5 &&
                  touched.aaRow13Year5 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow13Year5}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow13Year6"
                  autoComplete="aaRow13Year6"
                  value={values.aaRow13Year6}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow13Year6 &&
                  touched.aaRow13Year6 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow13Year6}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow13Year7"
                  autoComplete="aaRow13Year7"
                  value={values.aaRow13Year7}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow13Year7 &&
                  touched.aaRow13Year7 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow13Year7}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox
                  name="aaRow13YesNo"
                  onChange={this._handleChangeCheckBox}
                  checked={values.aaRow13YesNo}
                />
              </Form.Field>
            </Form>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={9}>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow14"
                  autoComplete="aaRow14"
                  value={values.aaRow14}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow14 &&
                  touched.aaRow14 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow14}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow14Year1"
                  autoComplete="aaRow14Year1"
                  value={values.aaRow14Year1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow14Year1 &&
                  touched.aaRow14Year1 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow14Year1}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow14Year2"
                  autoComplete="aaRow14Year2"
                  value={values.aaRow14Year2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow14Year2 &&
                  touched.aaRow14Year2 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow14Year2}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow14Year3"
                  autoComplete="aaRow14Year3"
                  value={values.aaRow14Year3}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow14Year3 &&
                  touched.aaRow14Year3 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow14Year3}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow14Year4"
                  autoComplete="aaRow14Year4"
                  value={values.aaRow14Year4}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow14Year4 &&
                  touched.aaRow14Year4 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow14Year4}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow14Year5"
                  autoComplete="aaRow14Year5"
                  value={values.aaRow14Year5}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow14Year5 &&
                  touched.aaRow14Year5 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow14Year5}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow14Year6"
                  autoComplete="aaRow14Year6"
                  value={values.aaRow14Year6}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow14Year6 &&
                  touched.aaRow14Year6 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow14Year6}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow14Year7"
                  autoComplete="aaRow14Year7"
                  value={values.aaRow14Year7}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow14Year7 &&
                  touched.aaRow14Year7 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow14Year7}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox
                  name="aaRow14YesNo"
                  onChange={this._handleChangeCheckBox}
                  checked={values.aaRow14YesNo}
                />
              </Form.Field>
            </Form>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{ backgroundColor: 'lightblue' }} columns={9}>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow15"
                  autoComplete="aaRow15"
                  value={values.aaRow15}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow15 &&
                  touched.aaRow15 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow15}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow15Year1"
                  autoComplete="aaRow15Year1"
                  value={values.aaRow15Year1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow15Year1 &&
                  touched.aaRow15Year1 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow15Year1}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow15Year2"
                  autoComplete="aaRow15Year2"
                  value={values.aaRow15Year2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow15Year2 &&
                  touched.aaRow15Year2 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow15Year2}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow15Year3"
                  autoComplete="aaRow15Year3"
                  value={values.aaRow15Year3}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow15Year3 &&
                  touched.aaRow15Year3 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow15Year3}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow15Year4"
                  autoComplete="aaRow15Year4"
                  value={values.aaRow15Year4}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow15Year4 &&
                  touched.aaRow15Year4 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow15Year4}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow15Year5"
                  autoComplete="aaRow15Year5"
                  value={values.aaRow15Year5}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow15Year5 &&
                  touched.aaRow15Year5 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow15Year5}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow15Year6"
                  autoComplete="aaRow15Year6"
                  value={values.aaRow15Year6}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow15Year6 &&
                  touched.aaRow15Year6 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow15Year6}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form size="tiny">
              <Form.Field>
                <Form.Input
                  name="aaRow15Year7"
                  autoComplete="aaRow15Year7"
                  value={values.aaRow15Year7}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.aaRow15Year7 &&
                  touched.aaRow15Year7 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.aaRow15Year7}
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox
                  name="aaRow15YesNo"
                  onChange={this._handleChangeCheckBox}
                  checked={values.aaRow15YesNo}
                />
              </Form.Field>
            </Form>
          </Grid.Column>
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

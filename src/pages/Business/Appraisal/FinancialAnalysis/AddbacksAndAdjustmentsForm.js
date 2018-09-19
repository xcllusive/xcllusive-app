import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Form, Label, Grid, Input } from 'semantic-ui-react'
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
    const { values, handleChange, handleBlur, errors, touched, financialYear } = this.props
    return (
      <Fragment>
        <Grid.Row style={{ backgroundColor: 'lightyellow', celledPadding: '.3em' }} columns={9}>
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
        <Grid.Row style={{ backgroundColor: 'lightblue' }} columns={9}>
          <CustomColumn>
            <Input
              fluid
              tabIndex={64}
              name="aaRow01"
              autoComplete="aaRow01"
              value={values.aaRow01}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow01 && touched.aaRow01 && <Label basic color="red" pointing content={errors.aaRow01} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={92}
              name="aaRow01Year1"
              autoComplete="aaRow01Year1"
              value={values.aaRow01Year1}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow01Year1 &&
              touched.aaRow01Year1 && <Label basic color="red" pointing content={errors.aaRow01Year1} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={121}
              name="aaRow01Year2"
              autoComplete="aaRow01Year2"
              value={values.aaRow01Year2}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow01Year2 &&
              touched.aaRow01Year2 && <Label basic color="red" pointing content={errors.aaRow01Year2} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={151}
              name="aaRow01Year3"
              autoComplete="aaRow01Year3"
              value={values.aaRow01Year3}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow01Year3 &&
              touched.aaRow01Year3 && <Label basic color="red" pointing content={errors.aaRow01Year3} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={181}
              name="aaRow01Year4"
              autoComplete="aaRow01Year4"
              value={values.aaRow01Year4}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow01Year4 &&
              touched.aaRow01Year4 && <Label basic color="red" pointing content={errors.aaRow01Year4} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={211}
              name="aaRow01Year5"
              autoComplete="aaRow01Year5"
              value={values.aaRow01Year5}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow01Year5 &&
              touched.aaRow01Year5 && <Label basic color="red" pointing content={errors.aaRow01Year5} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={241}
              name="aaRow01Year6"
              autoComplete="aaRow01Year6"
              value={values.aaRow01Year6}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow01Year6 &&
              touched.aaRow01Year6 && <Label basic color="red" pointing content={errors.aaRow01Year6} />}
          </CustomColumn>
          <CustomColumn style={{ backgroundColor: 'white' }} textAlign="center">
            0
          </CustomColumn>
          <CustomColumn textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox
                  name="aaRow01YesNo"
                  onChange={this._handleChangeCheckBox}
                  checked={values.aaRow01YesNo}
                />
              </Form.Field>
            </Form>
          </CustomColumn>
        </Grid.Row>
        <Grid.Row columns={9}>
          <CustomColumn>
            <Input
              fluid
              tabIndex={65}
              name="aaRow02"
              autoComplete="aaRow02"
              value={values.aaRow02}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow02 && touched.aaRow02 && <Label basic color="red" pointing content={errors.aaRow02} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={93}
              name="aaRow02Year1"
              autoComplete="aaRow02Year1"
              value={values.aaRow02Year1}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow02Year1 &&
              touched.aaRow02Year1 && <Label basic color="red" pointing content={errors.aaRow02Year1} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={122}
              name="aaRow02Year2"
              autoComplete="aaRow02Year2"
              value={values.aaRow02Year2}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow02Year2 &&
              touched.aaRow02Year2 && <Label basic color="red" pointing content={errors.aaRow02Year2} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={152}
              name="aaRow02Year3"
              autoComplete="aaRow02Year3"
              value={values.aaRow02Year3}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow02Year3 &&
              touched.aaRow02Year3 && <Label basic color="red" pointing content={errors.aaRow02Year3} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={182}
              name="aaRow02Year4"
              autoComplete="aaRow02Year4"
              value={values.aaRow02Year4}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow02Year4 &&
              touched.aaRow02Year4 && <Label basic color="red" pointing content={errors.aaRow02Year4} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={212}
              name="aaRow02Year5"
              autoComplete="aaRow02Year5"
              value={values.aaRow02Year5}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow02Year5 &&
              touched.aaRow02Year5 && <Label basic color="red" pointing content={errors.aaRow02Year5} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={242}
              name="aaRow02Year6"
              autoComplete="aaRow02Year6"
              value={values.aaRow02Year6}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow02Year6 &&
              touched.aaRow02Year6 && <Label basic color="red" pointing content={errors.aaRow02Year6} />}
          </CustomColumn>
          <CustomColumn textAlign="center">0</CustomColumn>
          <CustomColumn textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox
                  name="aaRow02YesNo"
                  onChange={this._handleChangeCheckBox}
                  checked={values.aaRow02YesNo}
                />
              </Form.Field>
            </Form>
          </CustomColumn>
        </Grid.Row>
        <Grid.Row style={{ backgroundColor: 'lightblue' }} columns={9}>
          <CustomColumn>
            <Input
              fluid
              tabIndex={66}
              name="aaRow03"
              autoComplete="aaRow03"
              value={values.aaRow03}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow03 && touched.aaRow03 && <Label basic color="red" pointing content={errors.aaRow03} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={94}
              name="aaRow03Year1"
              autoComplete="aaRow03Year1"
              value={values.aaRow03Year1}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow03Year1 &&
              touched.aaRow03Year1 && <Label basic color="red" pointing content={errors.aaRow03Year1} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={123}
              name="aaRow03Year2"
              autoComplete="aaRow03Year2"
              value={values.aaRow03Year2}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow03Year2 &&
              touched.aaRow03Year2 && <Label basic color="red" pointing content={errors.aaRow03Year2} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={153}
              name="aaRow03Year3"
              autoComplete="aaRow03Year3"
              value={values.aaRow03Year3}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow03Year3 &&
              touched.aaRow03Year3 && <Label basic color="red" pointing content={errors.aaRow03Year3} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={183}
              name="aaRow03Year4"
              autoComplete="aaRow03Year4"
              value={values.aaRow03Year4}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow03Year4 &&
              touched.aaRow03Year4 && <Label basic color="red" pointing content={errors.aaRow03Year4} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={213}
              name="aaRow03Year5"
              autoComplete="aaRow03Year5"
              value={values.aaRow03Year5}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow03Year5 &&
              touched.aaRow03Year5 && <Label basic color="red" pointing content={errors.aaRow03Year5} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={243}
              name="aaRow03Year6"
              autoComplete="aaRow03Year6"
              value={values.aaRow03Year6}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow03Year6 &&
              touched.aaRow03Year6 && <Label basic color="red" pointing content={errors.aaRow03Year6} />}
          </CustomColumn>
          <CustomColumn style={{ backgroundColor: 'white' }} textAlign="center">
            0
          </CustomColumn>
          <CustomColumn textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox
                  name="aaRow03YesNo"
                  onChange={this._handleChangeCheckBox}
                  checked={values.aaRow03YesNo}
                />
              </Form.Field>
            </Form>
          </CustomColumn>
        </Grid.Row>
        <Grid.Row columns={9}>
          <CustomColumn>
            <Input
              fluid
              tabIndex={67}
              name="aaRow04"
              autoComplete="aaRow04"
              value={values.aaRow04}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow04 && touched.aaRow04 && <Label basic color="red" pointing content={errors.aaRow04} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={95}
              name="aaRow04Year1"
              autoComplete="aaRow04Year1"
              value={values.aaRow04Year1}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow04Year1 &&
              touched.aaRow04Year1 && <Label basic color="red" pointing content={errors.aaRow04Year1} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={124}
              name="aaRow04Year2"
              autoComplete="aaRow04Year2"
              value={values.aaRow04Year2}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow04Year2 &&
              touched.aaRow04Year2 && <Label basic color="red" pointing content={errors.aaRow04Year2} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={154}
              name="aaRow04Year3"
              autoComplete="aaRow04Year3"
              value={values.aaRow04Year3}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow04Year3 &&
              touched.aaRow04Year3 && <Label basic color="red" pointing content={errors.aaRow04Year3} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={184}
              name="aaRow04Year4"
              autoComplete="aaRow04Year4"
              value={values.aaRow04Year4}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow04Year4 &&
              touched.aaRow04Year4 && <Label basic color="red" pointing content={errors.aaRow04Year4} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={214}
              name="aaRow04Year5"
              autoComplete="aaRow04Year5"
              value={values.aaRow04Year5}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow04Year5 &&
              touched.aaRow04Year5 && <Label basic color="red" pointing content={errors.aaRow04Year5} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={244}
              name="aaRow04Year6"
              autoComplete="aaRow04Year6"
              value={values.aaRow04Year6}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow04Year6 &&
              touched.aaRow04Year6 && <Label basic color="red" pointing content={errors.aaRow04Year6} />}
          </CustomColumn>
          <CustomColumn textAlign="center">0</CustomColumn>
          <CustomColumn textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox
                  name="aaRow04YesNo"
                  onChange={this._handleChangeCheckBox}
                  checked={values.aaRow04YesNo}
                />
              </Form.Field>
            </Form>
          </CustomColumn>
        </Grid.Row>
        <Grid.Row style={{ backgroundColor: 'lightblue' }} columns={9}>
          <CustomColumn>
            <Input
              fluid
              tabIndex={68}
              name="aaRow05"
              autoComplete="aaRow05"
              value={values.aaRow05}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow05 && touched.aaRow05 && <Label basic color="red" pointing content={errors.aaRow05} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={95}
              name="aaRow05Year1"
              autoComplete="aaRow05Year1"
              value={values.aaRow05Year1}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow05Year1 &&
              touched.aaRow05Year1 && <Label basic color="red" pointing content={errors.aaRow05Year1} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={125}
              name="aaRow05Year2"
              autoComplete="aaRow05Year2"
              value={values.aaRow05Year2}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow05Year2 &&
              touched.aaRow05Year2 && <Label basic color="red" pointing content={errors.aaRow05Year2} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={155}
              name="aaRow05Year3"
              autoComplete="aaRow05Year3"
              value={values.aaRow05Year3}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow05Year3 &&
              touched.aaRow05Year3 && <Label basic color="red" pointing content={errors.aaRow05Year3} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={185}
              name="aaRow05Year4"
              autoComplete="aaRow05Year4"
              value={values.aaRow05Year4}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow05Year4 &&
              touched.aaRow05Year4 && <Label basic color="red" pointing content={errors.aaRow05Year4} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={215}
              name="aaRow05Year5"
              autoComplete="aaRow05Year5"
              value={values.aaRow05Year5}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow05Year5 &&
              touched.aaRow05Year5 && <Label basic color="red" pointing content={errors.aaRow05Year5} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={245}
              name="aaRow05Year6"
              autoComplete="aaRow05Year6"
              value={values.aaRow05Year6}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow05Year6 &&
              touched.aaRow05Year6 && <Label basic color="red" pointing content={errors.aaRow05Year6} />}
          </CustomColumn>
          <CustomColumn style={{ backgroundColor: 'white' }} textAlign="center">
            0
          </CustomColumn>
          <CustomColumn textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox
                  name="aaRow05YesNo"
                  onChange={this._handleChangeCheckBox}
                  checked={values.aaRow05YesNo}
                />
              </Form.Field>
            </Form>
          </CustomColumn>
        </Grid.Row>
        <Grid.Row columns={9}>
          <CustomColumn>
            <Input
              fluid
              tabIndex={69}
              name="aaRow06"
              autoComplete="aaRow06"
              value={values.aaRow06}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow06 && touched.aaRow06 && <Label basic color="red" pointing content={errors.aaRow05} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={96}
              name="aaRow06Year1"
              autoComplete="aaRow06Year1"
              value={values.aaRow06Year1}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow06Year1 &&
              touched.aaRow06Year1 && <Label basic color="red" pointing content={errors.aaRow06Year1} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={126}
              name="aaRow06Year2"
              autoComplete="aaRow06Year2"
              value={values.aaRow06Year2}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow06Year2 &&
              touched.aaRow06Year2 && <Label basic color="red" pointing content={errors.aaRow06Year2} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={156}
              name="aaRow06Year3"
              autoComplete="aaRow06Year3"
              value={values.aaRow06Year3}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow06Year3 &&
              touched.aaRow06Year3 && <Label basic color="red" pointing content={errors.aaRow06Year3} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={186}
              name="aaRow06Year4"
              autoComplete="aaRow06Year4"
              value={values.aaRow06Year4}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow06Year4 &&
              touched.aaRow06Year4 && <Label basic color="red" pointing content={errors.aaRow06Year4} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={216}
              name="aaRow06Year5"
              autoComplete="aaRow06Year5"
              value={values.aaRow06Year5}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow06Year5 &&
              touched.aaRow06Year5 && <Label basic color="red" pointing content={errors.aaRow06Year5} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={246}
              name="aaRow06Year6"
              autoComplete="aaRow06Year6"
              value={values.aaRow06Year6}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow06Year6 &&
              touched.aaRow06Year6 && <Label basic color="red" pointing content={errors.aaRow06Year6} />}
          </CustomColumn>
          <CustomColumn textAlign="center">0</CustomColumn>
          <CustomColumn textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox
                  name="aaRow06YesNo"
                  onChange={this._handleChangeCheckBox}
                  checked={values.aaRow06YesNo}
                />
              </Form.Field>
            </Form>
          </CustomColumn>
        </Grid.Row>
        <Grid.Row style={{ backgroundColor: 'lightblue' }} columns={9}>
          <CustomColumn>
            <Input
              fluid
              tabIndex={70}
              name="aaRow07"
              autoComplete="aaRow07"
              value={values.aaRow07}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow07 && touched.aaRow07 && <Label basic color="red" pointing content={errors.aaRow07} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={97}
              name="aaRow07Year1"
              autoComplete="aaRow07Year1"
              value={values.aaRow07Year1}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow07Year1 &&
              touched.aaRow07Year1 && <Label basic color="red" pointing content={errors.aaRow07Year1} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={127}
              name="aaRow07Year2"
              autoComplete="aaRow07Year2"
              value={values.aaRow07Year2}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow07Year2 &&
              touched.aaRow07Year2 && <Label basic color="red" pointing content={errors.aaRow07Year2} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={157}
              name="aaRow07Year3"
              autoComplete="aaRow07Year3"
              value={values.aaRow07Year3}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow07Year3 &&
              touched.aaRow07Year3 && <Label basic color="red" pointing content={errors.aaRow07Year3} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={187}
              name="aaRow07Year4"
              autoComplete="aaRow07Year4"
              value={values.aaRow07Year4}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow07Year4 &&
              touched.aaRow07Year4 && <Label basic color="red" pointing content={errors.aaRow07Year4} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={217}
              name="aaRow07Year5"
              autoComplete="aaRow07Year5"
              value={values.aaRow07Year5}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow07Year5 &&
              touched.aaRow07Year5 && <Label basic color="red" pointing content={errors.aaRow07Year5} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={247}
              name="aaRow07Year6"
              autoComplete="aaRow07Year6"
              value={values.aaRow07Year6}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow07Year6 &&
              touched.aaRow07Year6 && <Label basic color="red" pointing content={errors.aaRow07Year6} />}
          </CustomColumn>
          <CustomColumn style={{ backgroundColor: 'white' }} textAlign="center">
            0
          </CustomColumn>
          <CustomColumn textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox
                  name="aaRow07YesNo"
                  onChange={this._handleChangeCheckBox}
                  checked={values.aaRow07YesNo}
                />
              </Form.Field>
            </Form>
          </CustomColumn>
        </Grid.Row>
        <Grid.Row columns={9}>
          <CustomColumn>
            <Input
              fluid
              tabIndex={71}
              name="aaRow08"
              autoComplete="aaRow08"
              value={values.aaRow08}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow08 && touched.aaRow08 && <Label basic color="red" pointing content={errors.aaRow08} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={98}
              name="aaRow08Year1"
              autoComplete="aaRow08Year1"
              value={values.aaRow08Year1}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow08Year1 &&
              touched.aaRow08Year1 && <Label basic color="red" pointing content={errors.aaRow08Year1} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={128}
              name="aaRow08Year2"
              autoComplete="aaRow08Year2"
              value={values.aaRow08Year2}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow08Year2 &&
              touched.aaRow08Year2 && <Label basic color="red" pointing content={errors.aaRow08Year2} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={158}
              name="aaRow08Year3"
              autoComplete="aaRow08Year3"
              value={values.aaRow08Year3}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow08Year3 &&
              touched.aaRow08Year3 && <Label basic color="red" pointing content={errors.aaRow08Year3} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={188}
              name="aaRow08Year4"
              autoComplete="aaRow08Year4"
              value={values.aaRow08Year4}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow08Year4 &&
              touched.aaRow08Year4 && <Label basic color="red" pointing content={errors.aaRow08Year4} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={218}
              name="aaRow08Year5"
              autoComplete="aaRow08Year5"
              value={values.aaRow08Year5}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow08Year5 &&
              touched.aaRow08Year5 && <Label basic color="red" pointing content={errors.aaRow08Year5} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={248}
              name="aaRow08Year6"
              autoComplete="aaRow08Year6"
              value={values.aaRow08Year6}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow08Year6 &&
              touched.aaRow08Year6 && <Label basic color="red" pointing content={errors.aaRow08Year6} />}
          </CustomColumn>
          <CustomColumn textAlign="center">0</CustomColumn>
          <CustomColumn textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox
                  name="aaRow08YesNo"
                  onChange={this._handleChangeCheckBox}
                  checked={values.aaRow08YesNo}
                />
              </Form.Field>
            </Form>
          </CustomColumn>
        </Grid.Row>
        <Grid.Row style={{ backgroundColor: 'lightblue' }} columns={9}>
          <CustomColumn>
            <Input
              fluid
              tabIndex={72}
              name="aaRow09"
              autoComplete="aaRow09"
              value={values.aaRow09}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow09 && touched.aaRow09 && <Label basic color="red" pointing content={errors.aaRow09} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={99}
              name="aaRow09Year1"
              autoComplete="aaRow09Year1"
              value={values.aaRow09Year1}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow09Year1 &&
              touched.aaRow09Year1 && <Label basic color="red" pointing content={errors.aaRow09Year1} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={129}
              name="aaRow09Year2"
              autoComplete="aaRow09Year2"
              value={values.aaRow09Year2}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow09Year2 &&
              touched.aaRow09Year2 && <Label basic color="red" pointing content={errors.aaRow09Year2} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={159}
              name="aaRow09Year3"
              autoComplete="aaRow09Year3"
              value={values.aaRow09Year3}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow09Year3 &&
              touched.aaRow09Year3 && <Label basic color="red" pointing content={errors.aaRow09Year3} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={189}
              name="aaRow09Year4"
              autoComplete="aaRow09Year4"
              value={values.aaRow09Year4}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow09Year4 &&
              touched.aaRow09Year4 && <Label basic color="red" pointing content={errors.aaRow09Year4} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={219}
              name="aaRow09Year5"
              autoComplete="aaRow09Year5"
              value={values.aaRow09Year5}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow09Year5 &&
              touched.aaRow09Year5 && <Label basic color="red" pointing content={errors.aaRow09Year5} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={249}
              name="aaRow09Year6"
              autoComplete="aaRow09Year6"
              value={values.aaRow09Year6}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow09Year6 &&
              touched.aaRow09Year6 && <Label basic color="red" pointing content={errors.aaRow09Year6} />}
          </CustomColumn>
          <CustomColumn style={{ backgroundColor: 'white' }} textAlign="center">
            0
          </CustomColumn>
          <CustomColumn textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox
                  name="aaRow09YesNo"
                  onChange={this._handleChangeCheckBox}
                  checked={values.aaRow09YesNo}
                />
              </Form.Field>
            </Form>
          </CustomColumn>
        </Grid.Row>
        <Grid.Row columns={9}>
          <CustomColumn>
            <Input
              fluid
              tabIndex={72}
              name="aaRow10"
              autoComplete="aaRow10"
              value={values.aaRow10}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow10 && touched.aaRow10 && <Label basic color="red" pointing content={errors.aaRow10} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={100}
              name="aaRow10Year1"
              autoComplete="aaRow10Year1"
              value={values.aaRow10Year1}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow10Year1 &&
              touched.aaRow10Year1 && <Label basic color="red" pointing content={errors.aaRow10Year1} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={130}
              name="aaRow10Year2"
              autoComplete="aaRow10Year2"
              value={values.aaRow10Year2}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow10Year2 &&
              touched.aaRow10Year2 && <Label basic color="red" pointing content={errors.aaRow10Year2} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={160}
              name="aaRow10Year3"
              autoComplete="aaRow10Year3"
              value={values.aaRow10Year3}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow10Year3 &&
              touched.aaRow10Year3 && <Label basic color="red" pointing content={errors.aaRow10Year3} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={190}
              name="aaRow10Year4"
              autoComplete="aaRow10Year4"
              value={values.aaRow10Year4}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow10Year4 &&
              touched.aaRow10Year4 && <Label basic color="red" pointing content={errors.aaRow10Year4} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={220}
              name="aaRow10Year5"
              autoComplete="aaRow10Year5"
              value={values.aaRow10Year5}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow10Year5 &&
              touched.aaRow10Year5 && <Label basic color="red" pointing content={errors.aaRow10Year5} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={250}
              name="aaRow10Year6"
              autoComplete="aaRow10Year6"
              value={values.aaRow10Year6}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow10Year6 &&
              touched.aaRow10Year6 && <Label basic color="red" pointing content={errors.aaRow10Year6} />}
          </CustomColumn>
          <CustomColumn textAlign="center">0</CustomColumn>
          <CustomColumn textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox
                  name="aaRow10YesNo"
                  onChange={this._handleChangeCheckBox}
                  checked={values.aaRow10YesNo}
                />
              </Form.Field>
            </Form>
          </CustomColumn>
        </Grid.Row>
        <Grid.Row style={{ backgroundColor: 'lightblue' }} columns={9}>
          <CustomColumn>
            <Input
              fluid
              tabIndex={72}
              name="aaRow11"
              autoComplete="aaRow11"
              value={values.aaRow11}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow11 && touched.aaRow11 && <Label basic color="red" pointing content={errors.aaRow11} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={101}
              name="aaRow11Year1"
              autoComplete="aaRow11Year1"
              value={values.aaRow11Year1}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow11Year1 &&
              touched.aaRow11Year1 && <Label basic color="red" pointing content={errors.aaRow11Year1} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={131}
              name="aaRow11Year2"
              autoComplete="aaRow11Year2"
              value={values.aaRow11Year2}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow11Year2 &&
              touched.aaRow11Year2 && <Label basic color="red" pointing content={errors.aaRow11Year2} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={161}
              name="aaRow11Year3"
              autoComplete="aaRow11Year3"
              value={values.aaRow11Year3}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow11Year3 &&
              touched.aaRow11Year3 && <Label basic color="red" pointing content={errors.aaRow11Year3} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={191}
              name="aaRow11Year4"
              autoComplete="aaRow11Year4"
              value={values.aaRow11Year4}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow11Year4 &&
              touched.aaRow11Year4 && <Label basic color="red" pointing content={errors.aaRow11Year4} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={221}
              name="aaRow11Year5"
              autoComplete="aaRow11Year5"
              value={values.aaRow11Year5}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow11Year5 &&
              touched.aaRow11Year5 && <Label basic color="red" pointing content={errors.aaRow11Year5} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={251}
              name="aaRow11Year6"
              autoComplete="aaRow11Year6"
              value={values.aaRow11Year6}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow11Year6 &&
              touched.aaRow11Year6 && <Label basic color="red" pointing content={errors.aaRow11Year6} />}
          </CustomColumn>
          <CustomColumn style={{ backgroundColor: 'white' }} textAlign="center">
            0
          </CustomColumn>
          <CustomColumn textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox
                  name="aaRow11YesNo"
                  onChange={this._handleChangeCheckBox}
                  checked={values.aaRow11YesNo}
                />
              </Form.Field>
            </Form>
          </CustomColumn>
        </Grid.Row>
        <Grid.Row columns={9}>
          <CustomColumn>
            <Input
              fluid
              tabIndex={73}
              name="aaRow12"
              autoComplete="aaRow12"
              value={values.aaRow12}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow12 && touched.aaRow12 && <Label basic color="red" pointing content={errors.aaRow12} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={102}
              name="aaRow12Year1"
              autoComplete="aaRow12Year1"
              value={values.aaRow12Year1}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow12Year1 &&
              touched.aaRow12Year1 && <Label basic color="red" pointing content={errors.aaRow12Year1} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={132}
              name="aaRow12Year2"
              autoComplete="aaRow12Year2"
              value={values.aaRow12Year2}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow12Year2 &&
              touched.aaRow12Year2 && <Label basic color="red" pointing content={errors.aaRow12Year2} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={162}
              name="aaRow12Year3"
              autoComplete="aaRow12Year3"
              value={values.aaRow12Year3}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow12Year3 &&
              touched.aaRow12Year3 && <Label basic color="red" pointing content={errors.aaRow12Year3} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={192}
              name="aaRow12Year4"
              autoComplete="aaRow12Year4"
              value={values.aaRow12Year4}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow12Year4 &&
              touched.aaRow12Year4 && <Label basic color="red" pointing content={errors.aaRow12Year4} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={222}
              name="aaRow12Year5"
              autoComplete="aaRow12Year5"
              value={values.aaRow12Year5}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow12Year5 &&
              touched.aaRow12Year5 && <Label basic color="red" pointing content={errors.aaRow12Year5} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={252}
              name="aaRow12Year6"
              autoComplete="aaRow12Year6"
              value={values.aaRow12Year6}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow12Year6 &&
              touched.aaRow12Year6 && <Label basic color="red" pointing content={errors.aaRow12Year6} />}
          </CustomColumn>
          <CustomColumn textAlign="center">0</CustomColumn>
          <CustomColumn textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox
                  name="aaRow12YesNo"
                  onChange={this._handleChangeCheckBox}
                  checked={values.aaRow12YesNo}
                />
              </Form.Field>
            </Form>
          </CustomColumn>
        </Grid.Row>
        <Grid.Row style={{ backgroundColor: 'lightblue' }} columns={9}>
          <CustomColumn>
            <Input
              fluid
              tabIndex={74}
              name="aaRow13"
              autoComplete="aaRow13"
              value={values.aaRow13}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow13 && touched.aaRow13 && <Label basic color="red" pointing content={errors.aaRow13} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={103}
              name="aaRow13Year1"
              autoComplete="aaRow13Year1"
              value={values.aaRow13Year1}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow13Year1 &&
              touched.aaRow13Year1 && <Label basic color="red" pointing content={errors.aaRow13Year1} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={133}
              name="aaRow13Year2"
              autoComplete="aaRow13Year2"
              value={values.aaRow13Year2}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow13Year2 &&
              touched.aaRow13Year2 && <Label basic color="red" pointing content={errors.aaRow13Year2} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={163}
              name="aaRow13Year3"
              autoComplete="aaRow13Year3"
              value={values.aaRow13Year3}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow13Year3 &&
              touched.aaRow13Year3 && <Label basic color="red" pointing content={errors.aaRow13Year3} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={193}
              name="aaRow13Year4"
              autoComplete="aaRow13Year4"
              value={values.aaRow13Year4}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow13Year4 &&
              touched.aaRow13Year4 && <Label basic color="red" pointing content={errors.aaRow13Year4} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={223}
              name="aaRow13Year5"
              autoComplete="aaRow13Year5"
              value={values.aaRow13Year5}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow13Year5 &&
              touched.aaRow13Year5 && <Label basic color="red" pointing content={errors.aaRow13Year5} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={253}
              name="aaRow13Year6"
              autoComplete="aaRow13Year6"
              value={values.aaRow13Year6}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow13Year6 &&
              touched.aaRow13Year6 && <Label basic color="red" pointing content={errors.aaRow13Year6} />}
          </CustomColumn>
          <CustomColumn style={{ backgroundColor: 'white' }} textAlign="center">
            0
          </CustomColumn>
          <CustomColumn textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox
                  name="aaRow13YesNo"
                  onChange={this._handleChangeCheckBox}
                  checked={values.aaRow13YesNo}
                />
              </Form.Field>
            </Form>
          </CustomColumn>
        </Grid.Row>
        <Grid.Row columns={9}>
          <CustomColumn>
            <Input
              fluid
              tabIndex={75}
              name="aaRow14"
              autoComplete="aaRow14"
              value={values.aaRow14}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow14 && touched.aaRow14 && <Label basic color="red" pointing content={errors.aaRow14} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={104}
              name="aaRow14Year1"
              autoComplete="aaRow14Year1"
              value={values.aaRow14Year1}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow14Year1 &&
              touched.aaRow14Year1 && <Label basic color="red" pointing content={errors.aaRow14Year1} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={134}
              name="aaRow14Year2"
              autoComplete="aaRow14Year2"
              value={values.aaRow14Year2}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow14Year2 &&
              touched.aaRow14Year2 && <Label basic color="red" pointing content={errors.aaRow14Year2} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={164}
              name="aaRow14Year3"
              autoComplete="aaRow14Year3"
              value={values.aaRow14Year3}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow14Year3 &&
              touched.aaRow14Year3 && <Label basic color="red" pointing content={errors.aaRow14Year3} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={194}
              name="aaRow14Year4"
              autoComplete="aaRow14Year4"
              value={values.aaRow14Year4}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow14Year4 &&
              touched.aaRow14Year4 && <Label basic color="red" pointing content={errors.aaRow14Year4} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={224}
              name="aaRow14Year5"
              autoComplete="aaRow14Year5"
              value={values.aaRow14Year5}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow14Year5 &&
              touched.aaRow14Year5 && <Label basic color="red" pointing content={errors.aaRow14Year5} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={254}
              name="aaRow14Year6"
              autoComplete="aaRow14Year6"
              value={values.aaRow14Year6}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow14Year6 &&
              touched.aaRow14Year6 && <Label basic color="red" pointing content={errors.aaRow14Year6} />}
          </CustomColumn>
          <CustomColumn textAlign="center">0</CustomColumn>
          <CustomColumn textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox
                  name="aaRow14YesNo"
                  onChange={this._handleChangeCheckBox}
                  checked={values.aaRow14YesNo}
                />
              </Form.Field>
            </Form>
          </CustomColumn>
        </Grid.Row>
        <Grid.Row style={{ backgroundColor: 'lightblue' }} columns={9}>
          <CustomColumn>
            <Input
              fluid
              tabIndex={76}
              name="aaRow15"
              autoComplete="aaRow15"
              value={values.aaRow15}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow15 && touched.aaRow15 && <Label basic color="red" pointing content={errors.aaRow15} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={105}
              name="aaRow15Year1"
              autoComplete="aaRow15Year1"
              value={values.aaRow15Year1}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow15Year1 &&
              touched.aaRow15Year1 && <Label basic color="red" pointing content={errors.aaRow15Year1} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={135}
              name="aaRow15Year2"
              autoComplete="aaRow15Year2"
              value={values.aaRow15Year2}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow15Year2 &&
              touched.aaRow15Year2 && <Label basic color="red" pointing content={errors.aaRow15Year2} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={165}
              name="aaRow15Year3"
              autoComplete="aaRow15Year3"
              value={values.aaRow15Year3}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow15Year3 &&
              touched.aaRow15Year3 && <Label basic color="red" pointing content={errors.aaRow15Year3} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={195}
              name="aaRow15Year4"
              autoComplete="aaRow15Year4"
              value={values.aaRow15Year4}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow15Year4 &&
              touched.aaRow15Year4 && <Label basic color="red" pointing content={errors.aaRow15Year4} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={225}
              name="aaRow15Year5"
              autoComplete="aaRow15Year5"
              value={values.aaRow15Year5}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow15Year5 &&
              touched.aaRow15Year5 && <Label basic color="red" pointing content={errors.aaRow15Year5} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={255}
              name="aaRow15Year6"
              autoComplete="aaRow15Year6"
              value={values.aaRow15Year6}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow15Year6 &&
              touched.aaRow15Year6 && <Label basic color="red" pointing content={errors.aaRow15Year6} />}
          </CustomColumn>
          <CustomColumn style={{ backgroundColor: 'white' }} textAlign="center">
            0
          </CustomColumn>
          <CustomColumn textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox
                  name="aaRow15YesNo"
                  onChange={this._handleChangeCheckBox}
                  checked={values.aaRow15YesNo}
                />
              </Form.Field>
            </Form>
          </CustomColumn>
        </Grid.Row>
        <Grid.Row columns={9}>
          <CustomColumn>
            <Input
              fluid
              tabIndex={77}
              name="aaRow16"
              autoComplete="aaRow16"
              value={values.aaRow16}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow16 && touched.aaRow16 && <Label basic color="red" pointing content={errors.aaRow16} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={106}
              name="aaRow16Year1"
              autoComplete="aaRow16Year1"
              value={values.aaRow16Year1}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow16Year1 &&
              touched.aaRow16Year1 && <Label basic color="red" pointing content={errors.aaRow16Year1} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={136}
              name="aaRow16Year2"
              autoComplete="aaRow16Year2"
              value={values.aaRow16Year2}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow16Year2 &&
              touched.aaRow16Year2 && <Label basic color="red" pointing content={errors.aaRow16Year2} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={166}
              name="aaRow16Year3"
              autoComplete="aaRow16Year3"
              value={values.aaRow16Year3}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow16Year3 &&
              touched.aaRow16Year3 && <Label basic color="red" pointing content={errors.aaRow16Year3} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={196}
              name="aaRow16Year4"
              autoComplete="aaRow16Year4"
              value={values.aaRow16Year4}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow16Year4 &&
              touched.aaRow16Year4 && <Label basic color="red" pointing content={errors.aaRow16Year4} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={226}
              name="aaRow16Year5"
              autoComplete="aaRow16Year5"
              value={values.aaRow16Year5}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow16Year5 &&
              touched.aaRow16Year5 && <Label basic color="red" pointing content={errors.aaRow16Year5} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={256}
              name="aaRow16Year6"
              autoComplete="aaRow16Year6"
              value={values.aaRow16Year6}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow16Year6 &&
              touched.aaRow16Year6 && <Label basic color="red" pointing content={errors.aaRow16Year6} />}
          </CustomColumn>
          <CustomColumn textAlign="center">0</CustomColumn>
          <CustomColumn textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox
                  name="aaRow16YesNo"
                  onChange={this._handleChangeCheckBox}
                  checked={values.aaRow16YesNo}
                />
              </Form.Field>
            </Form>
          </CustomColumn>
        </Grid.Row>
        <Grid.Row style={{ backgroundColor: 'lightblue' }} columns={9}>
          <CustomColumn>
            <Input
              fluid
              tabIndex={78}
              name="aaRow17"
              autoComplete="aaRow17"
              value={values.aaRow17}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow17 && touched.aaRow17 && <Label basic color="red" pointing content={errors.aaRow17} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={107}
              name="aaRow17Year1"
              autoComplete="aaRow17Year1"
              value={values.aaRow17Year1}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow17Year1 &&
              touched.aaRow17Year1 && <Label basic color="red" pointing content={errors.aaRow17Year1} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={137}
              name="aaRow17Year2"
              autoComplete="aaRow17Year2"
              value={values.aaRow17Year2}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow17Year2 &&
              touched.aaRow17Year2 && <Label basic color="red" pointing content={errors.aaRow17Year2} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={167}
              name="aaRow17Year3"
              autoComplete="aaRow17Year3"
              value={values.aaRow17Year3}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow17Year3 &&
              touched.aaRow17Year3 && <Label basic color="red" pointing content={errors.aaRow17Year3} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={197}
              name="aaRow17Year4"
              autoComplete="aaRow17Year4"
              value={values.aaRow17Year4}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow17Year4 &&
              touched.aaRow17Year4 && <Label basic color="red" pointing content={errors.aaRow17Year4} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={227}
              name="aaRow17Year5"
              autoComplete="aaRow17Year5"
              value={values.aaRow17Year5}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow17Year5 &&
              touched.aaRow17Year5 && <Label basic color="red" pointing content={errors.aaRow17Year5} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={257}
              name="aaRow17Year6"
              autoComplete="aaRow17Year6"
              value={values.aaRow17Year6}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow17Year6 &&
              touched.aaRow17Year6 && <Label basic color="red" pointing content={errors.aaRow17Year6} />}
          </CustomColumn>
          <CustomColumn style={{ backgroundColor: 'white' }} textAlign="center">
            0
          </CustomColumn>
          <CustomColumn textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox
                  name="aaRow17YesNo"
                  onChange={this._handleChangeCheckBox}
                  checked={values.aaRow17YesNo}
                />
              </Form.Field>
            </Form>
          </CustomColumn>
        </Grid.Row>
        <Grid.Row columns={9}>
          <CustomColumn>
            <Input
              fluid
              tabIndex={79}
              name="aaRow18"
              autoComplete="aaRow18"
              value={values.aaRow18}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow18 && touched.aaRow18 && <Label basic color="red" pointing content={errors.aaRow18} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={108}
              name="aaRow18Year1"
              autoComplete="aaRow18Year1"
              value={values.aaRow18Year1}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow18Year1 &&
              touched.aaRow18Year1 && <Label basic color="red" pointing content={errors.aaRow18Year1} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={138}
              name="aaRow18Year2"
              autoComplete="aaRow18Year2"
              value={values.aaRow18Year2}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow18Year2 &&
              touched.aaRow18Year2 && <Label basic color="red" pointing content={errors.aaRow18Year2} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={168}
              name="aaRow18Year3"
              autoComplete="aaRow18Year3"
              value={values.aaRow18Year3}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow18Year3 &&
              touched.aaRow18Year3 && <Label basic color="red" pointing content={errors.aaRow18Year3} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={198}
              name="aaRow18Year4"
              autoComplete="aaRow18Year4"
              value={values.aaRow18Year4}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow18Year4 &&
              touched.aaRow18Year4 && <Label basic color="red" pointing content={errors.aaRow18Year4} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={228}
              name="aaRow18Year5"
              autoComplete="aaRow18Year5"
              value={values.aaRow18Year5}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow18Year5 &&
              touched.aaRow18Year5 && <Label basic color="red" pointing content={errors.aaRow18Year5} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={258}
              name="aaRow18Year6"
              autoComplete="aaRow18Year6"
              value={values.aaRow18Year6}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow18Year6 &&
              touched.aaRow18Year6 && <Label basic color="red" pointing content={errors.aaRow18Year6} />}
          </CustomColumn>
          <CustomColumn textAlign="center">0</CustomColumn>
          <CustomColumn textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox
                  name="aaRow18YesNo"
                  onChange={this._handleChangeCheckBox}
                  checked={values.aaRow18YesNo}
                />
              </Form.Field>
            </Form>
          </CustomColumn>
        </Grid.Row>
        <Grid.Row style={{ backgroundColor: 'lightblue' }} columns={9}>
          <CustomColumn>
            <Input
              fluid
              tabIndex={80}
              name="aaRow19"
              autoComplete="aaRow19"
              value={values.aaRow19}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow19 && touched.aaRow19 && <Label basic color="red" pointing content={errors.aaRow19} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={109}
              name="aaRow19Year1"
              autoComplete="aaRow19Year1"
              value={values.aaRow19Year1}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow19Year1 &&
              touched.aaRow19Year1 && <Label basic color="red" pointing content={errors.aaRow19Year1} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={139}
              name="aaRow19Year2"
              autoComplete="aaRow19Year2"
              value={values.aaRow19Year2}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow19Year2 &&
              touched.aaRow19Year2 && <Label basic color="red" pointing content={errors.aaRow19Year2} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={169}
              name="aaRow19Year3"
              autoComplete="aaRow19Year3"
              value={values.aaRow19Year3}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow19Year3 &&
              touched.aaRow19Year3 && <Label basic color="red" pointing content={errors.aaRow19Year3} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={199}
              name="aaRow19Year4"
              autoComplete="aaRow19Year4"
              value={values.aaRow19Year4}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow19Year4 &&
              touched.aaRow19Year4 && <Label basic color="red" pointing content={errors.aaRow19Year4} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={229}
              name="aaRow19Year5"
              autoComplete="aaRow19Year5"
              value={values.aaRow19Year5}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow19Year5 &&
              touched.aaRow19Year5 && <Label basic color="red" pointing content={errors.aaRow19Year5} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={259}
              name="aaRow19Year6"
              autoComplete="aaRow19Year6"
              value={values.aaRow19Year6}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow19Year6 &&
              touched.aaRow19Year6 && <Label basic color="red" pointing content={errors.aaRow19Year6} />}
          </CustomColumn>
          <CustomColumn style={{ backgroundColor: 'white' }} textAlign="center">
            0
          </CustomColumn>
          <CustomColumn textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox
                  name="aaRow19YesNo"
                  onChange={this._handleChangeCheckBox}
                  checked={values.aaRow19YesNo}
                />
              </Form.Field>
            </Form>
          </CustomColumn>
        </Grid.Row>
        <Grid.Row columns={9}>
          <CustomColumn>
            <Input
              fluid
              tabIndex={81}
              name="aaRow20"
              autoComplete="aaRow20"
              value={values.aaRow20}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow20 && touched.aaRow20 && <Label basic color="red" pointing content={errors.aaRow20} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={110}
              name="aaRow20Year1"
              autoComplete="aaRow20Year1"
              value={values.aaRow20Year1}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow20Year1 &&
              touched.aaRow20Year1 && <Label basic color="red" pointing content={errors.aaRow20Year1} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={140}
              name="aaRow20Year2"
              autoComplete="aaRow20Year2"
              value={values.aaRow20Year2}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow20Year2 &&
              touched.aaRow20Year2 && <Label basic color="red" pointing content={errors.aaRow20Year2} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={170}
              name="aaRow20Year3"
              autoComplete="aaRow20Year3"
              value={values.aaRow20Year3}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow20Year3 &&
              touched.aaRow20Year3 && <Label basic color="red" pointing content={errors.aaRow20Year3} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={200}
              name="aaRow20Year4"
              autoComplete="aaRow20Year4"
              value={values.aaRow20Year4}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow20Year4 &&
              touched.aaRow20Year4 && <Label basic color="red" pointing content={errors.aaRow20Year4} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={230}
              name="aaRow20Year5"
              autoComplete="aaRow20Year5"
              value={values.aaRow20Year5}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow20Year5 &&
              touched.aaRow20Year5 && <Label basic color="red" pointing content={errors.aaRow20Year5} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={260}
              name="aaRow20Year6"
              autoComplete="aaRow20Year6"
              value={values.aaRow20Year6}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow20Year6 &&
              touched.aaRow20Year6 && <Label basic color="red" pointing content={errors.aaRow20Year6} />}
          </CustomColumn>
          <CustomColumn textAlign="center">0</CustomColumn>
          <CustomColumn textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox
                  name="aaRow20YesNo"
                  onChange={this._handleChangeCheckBox}
                  checked={values.aaRow20YesNo}
                />
              </Form.Field>
            </Form>
          </CustomColumn>
        </Grid.Row>
        <Grid.Row style={{ backgroundColor: 'lightblue' }} columns={9}>
          <CustomColumn>
            <Input
              fluid
              tabIndex={82}
              name="aaRow21"
              autoComplete="aaRow21"
              value={values.aaRow21}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow21 && touched.aaRow21 && <Label basic color="red" pointing content={errors.aaRow21} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={111}
              name="aaRow21Year1"
              autoComplete="aaRow21Year1"
              value={values.aaRow21Year1}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow21Year1 &&
              touched.aaRow21Year1 && <Label basic color="red" pointing content={errors.aaRow21Year1} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={141}
              name="aaRow21Year2"
              autoComplete="aaRow21Year2"
              value={values.aaRow21Year2}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow21Year2 &&
              touched.aaRow21Year2 && <Label basic color="red" pointing content={errors.aaRow21Year2} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={171}
              name="aaRow21Year3"
              autoComplete="aaRow21Year3"
              value={values.aaRow21Year3}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow21Year3 &&
              touched.aaRow21Year3 && <Label basic color="red" pointing content={errors.aaRow21Year3} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={201}
              name="aaRow21Year4"
              autoComplete="aaRow21Year4"
              value={values.aaRow21Year4}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow21Year4 &&
              touched.aaRow21Year4 && <Label basic color="red" pointing content={errors.aaRow21Year4} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={231}
              name="aaRow21Year5"
              autoComplete="aaRow21Year5"
              value={values.aaRow21Year5}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow21Year5 &&
              touched.aaRow21Year5 && <Label basic color="red" pointing content={errors.aaRow21Year5} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={261}
              name="aaRow21Year6"
              autoComplete="aaRow21Year6"
              value={values.aaRow21Year6}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow21Year6 &&
              touched.aaRow21Year6 && <Label basic color="red" pointing content={errors.aaRow21Year6} />}
          </CustomColumn>
          <CustomColumn style={{ backgroundColor: 'white' }} textAlign="center">
            0
          </CustomColumn>
          <CustomColumn textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox
                  name="aaRow21YesNo"
                  onChange={this._handleChangeCheckBox}
                  checked={values.aaRow21YesNo}
                />
              </Form.Field>
            </Form>
          </CustomColumn>
        </Grid.Row>
        <Grid.Row columns={9}>
          <CustomColumn>
            <Input
              fluid
              tabIndex={83}
              name="aaRow22"
              autoComplete="aaRow22"
              value={values.aaRow22}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow22 && touched.aaRow22 && <Label basic color="red" pointing content={errors.aaRow22} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={112}
              name="aaRow22Year1"
              autoComplete="aaRow22Year1"
              value={values.aaRow22Year1}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow22Year1 &&
              touched.aaRow22Year1 && <Label basic color="red" pointing content={errors.aaRow22Year1} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={142}
              name="aaRow22Year2"
              autoComplete="aaRow22Year2"
              value={values.aaRow22Year2}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow22Year2 &&
              touched.aaRow22Year2 && <Label basic color="red" pointing content={errors.aaRow22Year2} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={172}
              name="aaRow22Year3"
              autoComplete="aaRow22Year3"
              value={values.aaRow22Year3}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow22Year3 &&
              touched.aaRow22Year3 && <Label basic color="red" pointing content={errors.aaRow22Year3} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={202}
              name="aaRow22Year4"
              autoComplete="aaRow22Year4"
              value={values.aaRow22Year4}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow22Year4 &&
              touched.aaRow22Year4 && <Label basic color="red" pointing content={errors.aaRow22Year4} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={232}
              name="aaRow22Year5"
              autoComplete="aaRow22Year5"
              value={values.aaRow22Year5}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow22Year5 &&
              touched.aaRow22Year5 && <Label basic color="red" pointing content={errors.aaRow22Year5} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={262}
              name="aaRow22Year6"
              autoComplete="aaRow22Year6"
              value={values.aaRow22Year6}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow22Year6 &&
              touched.aaRow22Year6 && <Label basic color="red" pointing content={errors.aaRow22Year6} />}
          </CustomColumn>
          <CustomColumn textAlign="center">0</CustomColumn>
          <CustomColumn textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox
                  name="aaRow22YesNo"
                  onChange={this._handleChangeCheckBox}
                  checked={values.aaRow22YesNo}
                />
              </Form.Field>
            </Form>
          </CustomColumn>
        </Grid.Row>
        <Grid.Row style={{ backgroundColor: 'lightblue' }} columns={9}>
          <CustomColumn>
            <Input
              fluid
              tabIndex={84}
              name="aaRow23"
              autoComplete="aaRow23"
              value={values.aaRow23}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow23 && touched.aaRow23 && <Label basic color="red" pointing content={errors.aaRow23} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={113}
              name="aaRow23Year1"
              autoComplete="aaRow23Year1"
              value={values.aaRow23Year1}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow23Year1 &&
              touched.aaRow23Year1 && <Label basic color="red" pointing content={errors.aaRow23Year1} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={143}
              name="aaRow23Year2"
              autoComplete="aaRow23Year2"
              value={values.aaRow23Year2}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow23Year2 &&
              touched.aaRow23Year2 && <Label basic color="red" pointing content={errors.aaRow23Year2} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={173}
              name="aaRow23Year3"
              autoComplete="aaRow23Year3"
              value={values.aaRow23Year3}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow23Year3 &&
              touched.aaRow23Year3 && <Label basic color="red" pointing content={errors.aaRow23Year3} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={203}
              name="aaRow23Year4"
              autoComplete="aaRow23Year4"
              value={values.aaRow23Year4}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow23Year4 &&
              touched.aaRow23Year4 && <Label basic color="red" pointing content={errors.aaRow23Year4} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={233}
              name="aaRow23Year5"
              autoComplete="aaRow23Year5"
              value={values.aaRow23Year5}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow23Year5 &&
              touched.aaRow23Year5 && <Label basic color="red" pointing content={errors.aaRow23Year5} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={263}
              name="aaRow23Year6"
              autoComplete="aaRow23Year6"
              value={values.aaRow23Year6}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow23Year6 &&
              touched.aaRow23Year6 && <Label basic color="red" pointing content={errors.aaRow23Year6} />}
          </CustomColumn>
          <CustomColumn style={{ backgroundColor: 'white' }} textAlign="center">
            0
          </CustomColumn>
          <CustomColumn textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox
                  name="aaRow23YesNo"
                  onChange={this._handleChangeCheckBox}
                  checked={values.aaRow23YesNo}
                />
              </Form.Field>
            </Form>
          </CustomColumn>
        </Grid.Row>
        <Grid.Row columns={9}>
          <CustomColumn>
            <Input
              fluid
              tabIndex={85}
              name="aaRow24"
              autoComplete="aaRow24"
              value={values.aaRow24}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow24 && touched.aaRow24 && <Label basic color="red" pointing content={errors.aaRow24} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={114}
              name="aaRow24Year1"
              autoComplete="aaRow24Year1"
              value={values.aaRow24Year1}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow24Year1 &&
              touched.aaRow24Year1 && <Label basic color="red" pointing content={errors.aaRow24Year1} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={144}
              name="aaRow24Year2"
              autoComplete="aaRow24Year2"
              value={values.aaRow24Year2}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow24Year2 &&
              touched.aaRow24Year2 && <Label basic color="red" pointing content={errors.aaRow24Year2} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={174}
              name="aaRow24Year3"
              autoComplete="aaRow24Year3"
              value={values.aaRow24Year3}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow24Year3 &&
              touched.aaRow24Year3 && <Label basic color="red" pointing content={errors.aaRow24Year3} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={204}
              name="aaRow24Year4"
              autoComplete="aaRow24Year4"
              value={values.aaRow24Year4}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow24Year4 &&
              touched.aaRow24Year4 && <Label basic color="red" pointing content={errors.aaRow24Year4} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={234}
              name="aaRow24Year5"
              autoComplete="aaRow24Year5"
              value={values.aaRow24Year5}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow24Year5 &&
              touched.aaRow24Year5 && <Label basic color="red" pointing content={errors.aaRow24Year5} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={264}
              name="aaRow24Year6"
              autoComplete="aaRow24Year6"
              value={values.aaRow24Year6}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow24Year6 &&
              touched.aaRow24Year6 && <Label basic color="red" pointing content={errors.aaRow24Year6} />}
          </CustomColumn>
          <CustomColumn textAlign="center">0</CustomColumn>
          <CustomColumn textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox
                  name="aaRow24YesNo"
                  onChange={this._handleChangeCheckBox}
                  checked={values.aaRow24YesNo}
                />
              </Form.Field>
            </Form>
          </CustomColumn>
        </Grid.Row>
        <Grid.Row style={{ backgroundColor: 'lightblue' }} columns={9}>
          <CustomColumn>
            <Input
              fluid
              tabIndex={86}
              name="aaRow25"
              autoComplete="aaRow25"
              value={values.aaRow25}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow25 && touched.aaRow25 && <Label basic color="red" pointing content={errors.aaRow25} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={115}
              name="aaRow25Year1"
              autoComplete="aaRow25Year1"
              value={values.aaRow25Year1}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow25Year1 &&
              touched.aaRow25Year1 && <Label basic color="red" pointing content={errors.aaRow25Year1} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={145}
              name="aaRow25Year2"
              autoComplete="aaRow25Year2"
              value={values.aaRow25Year2}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow25Year2 &&
              touched.aaRow25Year2 && <Label basic color="red" pointing content={errors.aaRow25Year2} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={175}
              name="aaRow25Year3"
              autoComplete="aaRow25Year3"
              value={values.aaRow25Year3}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow25Year3 &&
              touched.aaRow25Year3 && <Label basic color="red" pointing content={errors.aaRow25Year3} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={205}
              name="aaRow25Year4"
              autoComplete="aaRow25Year4"
              value={values.aaRow25Year4}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow25Year4 &&
              touched.aaRow25Year4 && <Label basic color="red" pointing content={errors.aaRow25Year4} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={235}
              name="aaRow25Year5"
              autoComplete="aaRow25Year5"
              value={values.aaRow25Year5}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow25Year5 &&
              touched.aaRow25Year5 && <Label basic color="red" pointing content={errors.aaRow25Year5} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={265}
              name="aaRow25Year6"
              autoComplete="aaRow25Year6"
              value={values.aaRow25Year6}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow25Year6 &&
              touched.aaRow25Year6 && <Label basic color="red" pointing content={errors.aaRow25Year6} />}
          </CustomColumn>
          <CustomColumn style={{ backgroundColor: 'white' }} textAlign="center">
            0
          </CustomColumn>
          <CustomColumn textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox
                  name="aaRow25YesNo"
                  onChange={this._handleChangeCheckBox}
                  checked={values.aaRow25YesNo}
                />
              </Form.Field>
            </Form>
          </CustomColumn>
        </Grid.Row>
        <Grid.Row columns={9}>
          <CustomColumn>
            <Input
              fluid
              tabIndex={87}
              name="aaRow26"
              autoComplete="aaRow26"
              value={values.aaRow26}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow26 && touched.aaRow26 && <Label basic color="red" pointing content={errors.aaRow26} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={116}
              name="aaRow26Year1"
              autoComplete="aaRow26Year1"
              value={values.aaRow26Year1}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow26Year1 &&
              touched.aaRow26Year1 && <Label basic color="red" pointing content={errors.aaRow26Year1} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={146}
              name="aaRow26Year2"
              autoComplete="aaRow26Year2"
              value={values.aaRow26Year2}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow26Year2 &&
              touched.aaRow26Year2 && <Label basic color="red" pointing content={errors.aaRow26Year2} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={176}
              name="aaRow26Year3"
              autoComplete="aaRow26Year3"
              value={values.aaRow26Year3}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow26Year3 &&
              touched.aaRow26Year3 && <Label basic color="red" pointing content={errors.aaRow26Year3} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={206}
              name="aaRow26Year4"
              autoComplete="aaRow26Year4"
              value={values.aaRow26Year4}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow26Year4 &&
              touched.aaRow26Year4 && <Label basic color="red" pointing content={errors.aaRow26Year4} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={236}
              name="aaRow26Year5"
              autoComplete="aaRow26Year5"
              value={values.aaRow26Year5}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow26Year5 &&
              touched.aaRow26Year5 && <Label basic color="red" pointing content={errors.aaRow26Year5} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={266}
              name="aaRow26Year6"
              autoComplete="aaRow26Year6"
              value={values.aaRow26Year6}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow26Year6 &&
              touched.aaRow26Year6 && <Label basic color="red" pointing content={errors.aaRow26Year6} />}
          </CustomColumn>
          <CustomColumn textAlign="center">0</CustomColumn>
          <CustomColumn textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox
                  name="aaRow26YesNo"
                  onChange={this._handleChangeCheckBox}
                  checked={values.aaRow26YesNo}
                />
              </Form.Field>
            </Form>
          </CustomColumn>
        </Grid.Row>
        <Grid.Row style={{ backgroundColor: 'lightblue' }} columns={9}>
          <CustomColumn>
            <Input
              fluid
              tabIndex={88}
              name="aaRow27"
              autoComplete="aaRow27"
              value={values.aaRow27}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow27 && touched.aaRow27 && <Label basic color="red" pointing content={errors.aaRow27} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={117}
              name="aaRow27Year1"
              autoComplete="aaRow27Year1"
              value={values.aaRow27Year1}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow27Year1 &&
              touched.aaRow27Year1 && <Label basic color="red" pointing content={errors.aaRow27Year1} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={147}
              name="aaRow27Year2"
              autoComplete="aaRow27Year2"
              value={values.aaRow27Year2}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow27Year2 &&
              touched.aaRow27Year2 && <Label basic color="red" pointing content={errors.aaRow27Year2} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={177}
              name="aaRow27Year3"
              autoComplete="aaRow27Year3"
              value={values.aaRow27Year3}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow27Year3 &&
              touched.aaRow27Year3 && <Label basic color="red" pointing content={errors.aaRow27Year3} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={207}
              name="aaRow27Year4"
              autoComplete="aaRow27Year4"
              value={values.aaRow27Year4}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow27Year4 &&
              touched.aaRow27Year4 && <Label basic color="red" pointing content={errors.aaRow27Year4} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={237}
              name="aaRow27Year5"
              autoComplete="aaRow27Year5"
              value={values.aaRow27Year5}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow27Year5 &&
              touched.aaRow27Year5 && <Label basic color="red" pointing content={errors.aaRow27Year5} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={267}
              name="aaRow27Year6"
              autoComplete="aaRow27Year6"
              value={values.aaRow27Year6}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow27Year6 &&
              touched.aaRow27Year6 && <Label basic color="red" pointing content={errors.aaRow27Year6} />}
          </CustomColumn>
          <CustomColumn style={{ backgroundColor: 'white' }} textAlign="center">
            0
          </CustomColumn>
          <CustomColumn textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox
                  name="aaRow27YesNo"
                  onChange={this._handleChangeCheckBox}
                  checked={values.aaRow27YesNo}
                />
              </Form.Field>
            </Form>
          </CustomColumn>
        </Grid.Row>
        <Grid.Row columns={9}>
          <CustomColumn>
            <Input
              fluid
              tabIndex={89}
              name="aaRow28"
              autoComplete="aaRow28"
              value={values.aaRow28}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow28 && touched.aaRow28 && <Label basic color="red" pointing content={errors.aaRow28} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={118}
              name="aaRow28Year1"
              autoComplete="aaRow28Year1"
              value={values.aaRow28Year1}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow28Year1 &&
              touched.aaRow28Year1 && <Label basic color="red" pointing content={errors.aaRow28Year1} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={148}
              name="aaRow28Year2"
              autoComplete="aaRow28Year2"
              value={values.aaRow28Year2}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow28Year2 &&
              touched.aaRow28Year2 && <Label basic color="red" pointing content={errors.aaRow28Year2} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={178}
              name="aaRow28Year3"
              autoComplete="aaRow28Year3"
              value={values.aaRow28Year3}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow28Year3 &&
              touched.aaRow28Year3 && <Label basic color="red" pointing content={errors.aaRow28Year3} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={208}
              name="aaRow28Year4"
              autoComplete="aaRow28Year4"
              value={values.aaRow28Year4}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow28Year4 &&
              touched.aaRow28Year4 && <Label basic color="red" pointing content={errors.aaRow28Year4} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={238}
              name="aaRow28Year5"
              autoComplete="aaRow28Year5"
              value={values.aaRow28Year5}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow28Year5 &&
              touched.aaRow28Year5 && <Label basic color="red" pointing content={errors.aaRow28Year5} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={268}
              name="aaRow28Year6"
              autoComplete="aaRow28Year6"
              value={values.aaRow28Year6}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow28Year6 &&
              touched.aaRow28Year6 && <Label basic color="red" pointing content={errors.aaRow28Year6} />}
          </CustomColumn>
          <CustomColumn textAlign="center">0</CustomColumn>
          <CustomColumn textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox
                  name="aaRow28YesNo"
                  onChange={this._handleChangeCheckBox}
                  checked={values.aaRow28YesNo}
                />
              </Form.Field>
            </Form>
          </CustomColumn>
        </Grid.Row>
        <Grid.Row style={{ backgroundColor: 'lightblue' }} columns={9}>
          <CustomColumn>
            <Input
              fluid
              tabIndex={90}
              name="aaRow29"
              autoComplete="aaRow29"
              value={values.aaRow29}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow29 && touched.aaRow29 && <Label basic color="red" pointing content={errors.aaRow29} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={119}
              name="aaRow29Year1"
              autoComplete="aaRow29Year1"
              value={values.aaRow29Year1}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow29Year1 &&
              touched.aaRow29Year1 && <Label basic color="red" pointing content={errors.aaRow29Year1} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={149}
              name="aaRow29Year2"
              autoComplete="aaRow29Year2"
              value={values.aaRow29Year2}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow29Year2 &&
              touched.aaRow29Year2 && <Label basic color="red" pointing content={errors.aaRow29Year2} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={179}
              name="aaRow29Year3"
              autoComplete="aaRow29Year3"
              value={values.aaRow29Year3}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow29Year3 &&
              touched.aaRow29Year3 && <Label basic color="red" pointing content={errors.aaRow29Year3} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={209}
              name="aaRow29Year4"
              autoComplete="aaRow29Year4"
              value={values.aaRow29Year4}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow29Year4 &&
              touched.aaRow29Year4 && <Label basic color="red" pointing content={errors.aaRow29Year4} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={239}
              name="aaRow29Year5"
              autoComplete="aaRow29Year5"
              value={values.aaRow29Year5}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow29Year5 &&
              touched.aaRow29Year5 && <Label basic color="red" pointing content={errors.aaRow29Year5} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={269}
              name="aaRow29Year6"
              autoComplete="aaRow29Year6"
              value={values.aaRow29Year6}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow29Year6 &&
              touched.aaRow29Year6 && <Label basic color="red" pointing content={errors.aaRow29Year6} />}
          </CustomColumn>
          <CustomColumn style={{ backgroundColor: 'white' }} textAlign="center">
            0
          </CustomColumn>
          <CustomColumn textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox
                  name="aaRow29YesNo"
                  onChange={this._handleChangeCheckBox}
                  checked={values.aaRow29YesNo}
                />
              </Form.Field>
            </Form>
          </CustomColumn>
        </Grid.Row>
        <Grid.Row columns={9}>
          <CustomColumn>
            <Input
              fluid
              tabIndex={91}
              name="aaRow30"
              autoComplete="aaRow30"
              value={values.aaRow30}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow30 && touched.aaRow30 && <Label basic color="red" pointing content={errors.aaRow30} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={120}
              name="aaRow30Year1"
              autoComplete="aaRow30Year1"
              value={values.aaRow30Year1}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow30Year1 &&
              touched.aaRow30Year1 && <Label basic color="red" pointing content={errors.aaRow30Year1} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={150}
              name="aaRow30Year2"
              autoComplete="aaRow30Year2"
              value={values.aaRow30Year2}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow30Year2 &&
              touched.aaRow30Year2 && <Label basic color="red" pointing content={errors.aaRow30Year2} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={180}
              name="aaRow30Year3"
              autoComplete="aaRow30Year3"
              value={values.aaRow30Year3}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow30Year3 &&
              touched.aaRow30Year3 && <Label basic color="red" pointing content={errors.aaRow30Year3} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={210}
              name="aaRow30Year4"
              autoComplete="aaRow30Year4"
              value={values.aaRow30Year4}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow30Year4 &&
              touched.aaRow30Year4 && <Label basic color="red" pointing content={errors.aaRow30Year4} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={240}
              name="aaRow30Year5"
              autoComplete="aaRow30Year5"
              value={values.aaRow30Year5}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow30Year5 &&
              touched.aaRow30Year5 && <Label basic color="red" pointing content={errors.aaRow30Year5} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              tabIndex={270}
              name="aaRow30Year6"
              autoComplete="aaRow30Year6"
              value={values.aaRow30Year6}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow30Year6 &&
              touched.aaRow30Year6 && <Label basic color="red" pointing content={errors.aaRow30Year6} />}
          </CustomColumn>
          <CustomColumn textAlign="center">0</CustomColumn>
          <CustomColumn textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox
                  name="aaRow30YesNo"
                  onChange={this._handleChangeCheckBox}
                  checked={values.aaRow30YesNo}
                />
              </Form.Field>
            </Form>
          </CustomColumn>
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

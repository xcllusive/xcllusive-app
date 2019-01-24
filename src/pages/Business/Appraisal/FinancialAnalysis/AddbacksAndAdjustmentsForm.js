import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Grid, Input, Form } from 'semantic-ui-react'
import * as Yup from 'yup'
import numeral from 'numeral'

import CustomColumn from '../../../../components/content/CustomGridColumn'

import { updateAppraisal } from '../../../../redux/ducks/appraisal'

class AddbacksAndAdjustmentsForm extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      rows: [
        {
          name: 'aaRow1',
          tabIndex: 100,
          columns: [
            {
              name: 'aaRow1Year1',
              tabIndex: 200
            },
            {
              name: 'aaRow1Year2',
              tabIndex: 300
            },
            {
              name: 'aaRow1Year3',
              tabIndex: 400
            },
            {
              name: 'aaRow1Year4',
              tabIndex: 500
            },
            {
              name: 'aaRow1Year5',
              tabIndex: 600
            },
            {
              name: 'aaRow1Year6',
              tabIndex: 700
            }
          ]
        },
        {
          name: 'aaRow2',
          tabIndex: 101,
          columns: [
            {
              name: 'aaRow2Year1',
              tabIndex: 201
            },
            {
              name: 'aaRow2Year2',
              tabIndex: 301
            },
            {
              name: 'aaRow2Year3',
              tabIndex: 401
            },
            {
              name: 'aaRow2Year4',
              tabIndex: 501
            },
            {
              name: 'aaRow2Year5',
              tabIndex: 601
            },
            {
              name: 'aaRow2Year6',
              tabIndex: 701
            }
          ]
        },
        {
          name: 'aaRow3',
          tabIndex: 102,
          columns: [
            {
              name: 'aaRow3Year1',
              tabIndex: 202
            },
            {
              name: 'aaRow3Year2',
              tabIndex: 302
            },
            {
              name: 'aaRow3Year3',
              tabIndex: 402
            },
            {
              name: 'aaRow3Year4',
              tabIndex: 502
            },
            {
              name: 'aaRow3Year5',
              tabIndex: 602
            },
            {
              name: 'aaRow3Year6',
              tabIndex: 702
            }
          ]
        },
        {
          name: 'aaRow4',
          tabIndex: 103,
          columns: [
            {
              name: 'aaRow4Year1',
              tabIndex: 203
            },
            {
              name: 'aaRow4Year2',
              tabIndex: 303
            },
            {
              name: 'aaRow4Year3',
              tabIndex: 403
            },
            {
              name: 'aaRow4Year4',
              tabIndex: 503
            },
            {
              name: 'aaRow4Year5',
              tabIndex: 603
            },
            {
              name: 'aaRow4Year6',
              tabIndex: 703
            }
          ]
        }
      ]
    }
  }

  componentWillUnmount () {
    this.props.updateAppraisal(this.props.values)
  }

  _handleChangeCheckBox = (e, { name }) => {
    this.props.setFieldValue(name, !this.props.values[name])
  }

  _calcTotal = column => {
    let total = 0
    for (let i = 1; i < 30; i++) {
      total = total + numeral(this.props.values[`aaRow${i}Year${column}`]).value()
    }
    const result = numeral(total).value()
    return result
  }

  _calcTotalAdjustedProfit = column => {
    const total = this._calcTotal(column) + this.props.appraisalObject[`operatingProfit${column}`]
    return numeral(total).value()
  }

  _calcAdjustedProfit = column => {
    const totalAdjustedProfit = this._calcTotal(column) + this.props.appraisalObject[`operatingProfit${column}`]
    const total = (totalAdjustedProfit / numeral(this.props.appraisalObject[`sales${column}`]).value()) * 100

    return numeral(total).format('0.00')
  }

  render () {
    const { values, handleChange, handleBlur, financialYear, appraisalObject } = this.props

    return (
      <Fragment>
        <Grid.Row style={{ backgroundColor: 'lightyellow', celledPadding: '.3em' }} columns={9}>
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

        {this.state.rows.map((item, key) => (
          <Grid.Row columns={9} key={key}>
            <CustomColumn>
              <Input
                fluid
                tabIndex={item.tabIndex}
                name={item.name}
                autoComplete={item.name}
                value={values[item.name]}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </CustomColumn>
            {item.columns.map((subItem, subKey) => (
              <CustomColumn key={subKey}>
                <Input
                  fluid
                  type="number"
                  tabIndex={item.tabIndex}
                  name={subItem.name}
                  autoComplete={subItem.name}
                  value={values[subItem.name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </CustomColumn>
            ))}
            <CustomColumn style={{ backgroundColor: 'white' }} textAlign="center">
              0
            </CustomColumn>
            <CustomColumn textAlign="center">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox
                  name={`${item.name}YesNo`}
                  checked={values[`${item.name}YesNo`]}
                  onChange={this._handleChangeCheckBox}
                />
              </Form.Field>
            </CustomColumn>
          </Grid.Row>
        ))}

        {/* <Grid.Row style={{ backgroundColor: 'lightyellow', celledPadding: '.3em' }} columns={9}>
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
              tabIndex={100}
              name="aaRow1"
              autoComplete="aaRow1"
              value={values.aaRow1}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow1 && touched.aaRow1 && <Label basic color="red" pointing content={errors.aaRow1} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              type="number"
              fluid
              tabIndex={200}
              name="aaRow1Year1"
              autoComplete="aaRow1Year1"
              value={values.aaRow1Year1}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow1Year1 &&
              touched.aaRow1Year1 && <Label basic color="red" pointing content={errors.aaRow1Year1} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              type="number"
              fluid
              tabIndex={300}
              name="aaRow1Year2"
              autoComplete="aaRow1Year2"
              value={values.aaRow1Year2}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow1Year2 &&
              touched.aaRow1Year2 && <Label basic color="red" pointing content={errors.aaRow1Year2} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              type="number"
              fluid
              tabIndex={400}
              name="aaRow1Year3"
              autoComplete="aaRow1Year3"
              value={values.aaRow1Year3}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow1Year3 &&
              touched.aaRow1Year3 && <Label basic color="red" pointing content={errors.aaRow1Year3} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              type="number"
              fluid
              tabIndex={500}
              name="aaRow1Year4"
              autoComplete="aaRow1Year4"
              value={values.aaRow1Year4}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow1Year4 &&
              touched.aaRow1Year4 && <Label basic color="red" pointing content={errors.aaRow1Year4} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              type="number"
              fluid
              tabIndex={600}
              name="aaRow1Year5"
              autoComplete="aaRow1Year5"
              value={values.aaRow1Year5}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow1Year5 &&
              touched.aaRow1Year5 && <Label basic color="red" pointing content={errors.aaRow1Year5} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              type="number"
              fluid
              tabIndex={700}
              name="aaRow1Year6"
              autoComplete="aaRow1Year6"
              value={values.aaRow1Year6}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow1Year6 &&
              touched.aaRow1Year6 && <Label basic color="red" pointing content={errors.aaRow1Year6} />}
          </CustomColumn>
          <CustomColumn style={{ backgroundColor: 'white' }} textAlign="center">
            0
          </CustomColumn>
          <CustomColumn textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox name="aaRow1YesNo" onChange={this._handleChangeCheckBox} checked={values.aaRow1YesNo} />
              </Form.Field>
            </Form>
          </CustomColumn>
        </Grid.Row>
        <Grid.Row columns={9}>
          <CustomColumn>
            <Input
              fluid
              tabIndex={101}
              name="aaRow2"
              autoComplete="aaRow2"
              value={values.aaRow2}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow2 && touched.aaRow2 && <Label basic color="red" pointing content={errors.aaRow2} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              type="number"
              fluid
              tabIndex={201}
              name="aaRow2Year1"
              autoComplete="aaRow2Year1"
              value={values.aaRow2Year1}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow2Year1 &&
              touched.aaRow2Year1 && <Label basic color="red" pointing content={errors.aaRow2Year1} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              type="number"
              fluid
              tabIndex={301}
              name="aaRow2Year2"
              autoComplete="aaRow2Year2"
              value={values.aaRow2Year2}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow2Year2 &&
              touched.aaRow2Year2 && <Label basic color="red" pointing content={errors.aaRow2Year2} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              type="number"
              fluid
              tabIndex={401}
              name="aaRow2Year3"
              autoComplete="aaRow2Year3"
              value={values.aaRow2Year3}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow2Year3 &&
              touched.aaRow2Year3 && <Label basic color="red" pointing content={errors.aaRow2Year3} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              type="number"
              fluid
              tabIndex={501}
              name="aaRow2Year4"
              autoComplete="aaRow2Year4"
              value={values.aaRow2Year4}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow2Year4 &&
              touched.aaRow2Year4 && <Label basic color="red" pointing content={errors.aaRow2Year4} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              type="number"
              fluid
              tabIndex={601}
              name="aaRow2Year5"
              autoComplete="aaRow2Year5"
              value={values.aaRow2Year5}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow2Year5 &&
              touched.aaRow2Year5 && <Label basic color="red" pointing content={errors.aaRow2Year5} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              fluid
              type="number"
              tabIndex={701}
              name="aaRow2Year6"
              autoComplete="aaRow2Year6"
              value={values.aaRow2Year6}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow2Year6 &&
              touched.aaRow2Year6 && <Label basic color="red" pointing content={errors.aaRow2Year6} />}
          </CustomColumn>
          <CustomColumn textAlign="center">0</CustomColumn>
          <CustomColumn textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox name="aaRow2YesNo" onChange={handleChange} checked={values.aaRow2YesNo} />
              </Form.Field>
            </Form>
          </CustomColumn>
        </Grid.Row>
        <Grid.Row style={{ backgroundColor: 'lightblue' }} columns={9}>
          <CustomColumn>
            <Input
              fluid
              tabIndex={103}
              name="aaRow3"
              autoComplete="aaRow3"
              value={values.aaRow3}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow3 && touched.aaRow3 && <Label basic color="red" pointing content={errors.aaRow3} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              type="number"
              fluid
              tabIndex={203}
              name="aaRow3Year1"
              autoComplete="aaRow3Year1"
              value={values.aaRow3Year1}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow3Year1 &&
              touched.aaRow3Year1 && <Label basic color="red" pointing content={errors.aaRow3Year1} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              type="number"
              fluid
              tabIndex={303}
              name="aaRow3Year2"
              autoComplete="aaRow3Year2"
              value={values.aaRow3Year2}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow3Year2 &&
              touched.aaRow3Year2 && <Label basic color="red" pointing content={errors.aaRow3Year2} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              type="number"
              fluid
              tabIndex={403}
              name="aaRow3Year3"
              autoComplete="aaRow3Year3"
              value={values.aaRow3Year3}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow3Year3 &&
              touched.aaRow3Year3 && <Label basic color="red" pointing content={errors.aaRow3Year3} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              type="number"
              fluid
              tabIndex={503}
              name="aaRow3Year4"
              autoComplete="aaRow3Year4"
              value={values.aaRow3Year4}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow3Year4 &&
              touched.aaRow3Year4 && <Label basic color="red" pointing content={errors.aaRow3Year4} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              type="number"
              fluid
              tabIndex={603}
              name="aaRow3Year5"
              autoComplete="aaRow3Year5"
              value={values.aaRow3Year5}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow3Year5 &&
              touched.aaRow3Year5 && <Label basic color="red" pointing content={errors.aaRow3Year5} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              type="number"
              fluid
              tabIndex={703}
              name="aaRow3Year6"
              autoComplete="aaRow3Year6"
              value={values.aaRow3Year6}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow3Year6 &&
              touched.aaRow3Year6 && <Label basic color="red" pointing content={errors.aaRow3Year6} />}
          </CustomColumn>
          <CustomColumn style={{ backgroundColor: 'white' }} textAlign="center">
            0
          </CustomColumn>
          <CustomColumn textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox name="aaRow3YesNo" onChange={this._handleChangeCheckBox} checked={values.aaRow3YesNo} />
              </Form.Field>
            </Form>
          </CustomColumn>
        </Grid.Row>
        <Grid.Row columns={9}>
          <CustomColumn>
            <Input
              fluid
              tabIndex={8}
              name="aaRow4"
              autoComplete="aaRow4"
              value={values.aaRow4}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow4 && touched.aaRow4 && <Label basic color="red" pointing content={errors.aaRow4} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              type="number"
              fluid
              tabIndex={95}
              name="aaRow4Year1"
              autoComplete="aaRow4Year1"
              value={values.aaRow4Year1}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow4Year1 &&
              touched.aaRow4Year1 && <Label basic color="red" pointing content={errors.aaRow4Year1} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              type="number"
              fluid
              tabIndex={124}
              name="aaRow4Year2"
              autoComplete="aaRow4Year2"
              value={values.aaRow4Year2}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow4Year2 &&
              touched.aaRow4Year2 && <Label basic color="red" pointing content={errors.aaRow4Year2} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              type="number"
              fluid
              tabIndex={154}
              name="aaRow4Year3"
              autoComplete="aaRow4Year3"
              value={values.aaRow4Year3}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow4Year3 &&
              touched.aaRow4Year3 && <Label basic color="red" pointing content={errors.aaRow4Year3} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              type="number"
              fluid
              tabIndex={184}
              name="aaRow4Year4"
              autoComplete="aaRow4Year4"
              value={values.aaRow4Year4}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow4Year4 &&
              touched.aaRow4Year4 && <Label basic color="red" pointing content={errors.aaRow4Year4} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              type="number"
              fluid
              tabIndex={214}
              name="aaRow4Year5"
              autoComplete="aaRow4Year5"
              value={values.aaRow4Year5}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow4Year5 &&
              touched.aaRow4Year5 && <Label basic color="red" pointing content={errors.aaRow4Year5} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              type="number"
              fluid
              tabIndex={244}
              name="aaRow4Year6"
              autoComplete="aaRow4Year6"
              value={values.aaRow4Year6}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow4Year6 &&
              touched.aaRow4Year6 && <Label basic color="red" pointing content={errors.aaRow4Year6} />}
          </CustomColumn>
          <CustomColumn textAlign="center">0</CustomColumn>
          <CustomColumn textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox name="aaRow4YesNo" onChange={this._handleChangeCheckBox} checked={values.aaRow4YesNo} />
              </Form.Field>
            </Form>
          </CustomColumn>
        </Grid.Row>
        <Grid.Row style={{ backgroundColor: 'lightblue' }} columns={9}>
          <CustomColumn>
            <Input
              fluid
              tabIndex={9}
              name="aaRow5"
              autoComplete="aaRow5"
              value={values.aaRow5}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow5 && touched.aaRow5 && <Label basic color="red" pointing content={errors.aaRow5} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              type="number"
              fluid
              tabIndex={95}
              name="aaRow5Year1"
              autoComplete="aaRow5Year1"
              value={values.aaRow5Year1}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow5Year1 &&
              touched.aaRow5Year1 && <Label basic color="red" pointing content={errors.aaRow5Year1} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              type="number"
              fluid
              tabIndex={125}
              name="aaRow5Year2"
              autoComplete="aaRow5Year2"
              value={values.aaRow5Year2}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow5Year2 &&
              touched.aaRow5Year2 && <Label basic color="red" pointing content={errors.aaRow5Year2} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              type="number"
              fluid
              tabIndex={155}
              name="aaRow5Year3"
              autoComplete="aaRow5Year3"
              value={values.aaRow5Year3}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow5Year3 &&
              touched.aaRow5Year3 && <Label basic color="red" pointing content={errors.aaRow5Year3} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              type="number"
              fluid
              tabIndex={185}
              name="aaRow5Year4"
              autoComplete="aaRow5Year4"
              value={values.aaRow5Year4}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow5Year4 &&
              touched.aaRow5Year4 && <Label basic color="red" pointing content={errors.aaRow5Year4} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              type="number"
              fluid
              tabIndex={215}
              name="aaRow5Year5"
              autoComplete="aaRow5Year5"
              value={values.aaRow5Year5}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow5Year5 &&
              touched.aaRow5Year5 && <Label basic color="red" pointing content={errors.aaRow5Year5} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              type="number"
              fluid
              tabIndex={245}
              name="aaRow5Year6"
              autoComplete="aaRow5Year6"
              value={values.aaRow5Year6}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow5Year6 &&
              touched.aaRow5Year6 && <Label basic color="red" pointing content={errors.aaRow5Year6} />}
          </CustomColumn>
          <CustomColumn style={{ backgroundColor: 'white' }} textAlign="center">
            0
          </CustomColumn>
          <CustomColumn textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox name="aaRow5YesNo" onChange={this._handleChangeCheckBox} checked={values.aaRow5YesNo} />
              </Form.Field>
            </Form>
          </CustomColumn>
        </Grid.Row>
        <Grid.Row columns={9}>
          <CustomColumn>
            <Input
              fluid
              tabIndex={10}
              name="aaRow6"
              autoComplete="aaRow6"
              value={values.aaRow6}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow6 && touched.aaRow6 && <Label basic color="red" pointing content={errors.aaRow5} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              type="number"
              fluid
              tabIndex={96}
              name="aaRow6Year1"
              autoComplete="aaRow6Year1"
              value={values.aaRow6Year1}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow6Year1 &&
              touched.aaRow6Year1 && <Label basic color="red" pointing content={errors.aaRow6Year1} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              type="number"
              fluid
              tabIndex={126}
              name="aaRow6Year2"
              autoComplete="aaRow6Year2"
              value={values.aaRow6Year2}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow6Year2 &&
              touched.aaRow6Year2 && <Label basic color="red" pointing content={errors.aaRow6Year2} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              type="number"
              fluid
              tabIndex={156}
              name="aaRow6Year3"
              autoComplete="aaRow6Year3"
              value={values.aaRow6Year3}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow6Year3 &&
              touched.aaRow6Year3 && <Label basic color="red" pointing content={errors.aaRow6Year3} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              type="number"
              fluid
              tabIndex={186}
              name="aaRow6Year4"
              autoComplete="aaRow6Year4"
              value={values.aaRow6Year4}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow6Year4 &&
              touched.aaRow6Year4 && <Label basic color="red" pointing content={errors.aaRow6Year4} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              type="number"
              fluid
              tabIndex={216}
              name="aaRow6Year5"
              autoComplete="aaRow6Year5"
              value={values.aaRow6Year5}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow6Year5 &&
              touched.aaRow6Year5 && <Label basic color="red" pointing content={errors.aaRow6Year5} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              type="number"
              fluid
              tabIndex={246}
              name="aaRow6Year6"
              autoComplete="aaRow6Year6"
              value={values.aaRow6Year6}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow6Year6 &&
              touched.aaRow6Year6 && <Label basic color="red" pointing content={errors.aaRow6Year6} />}
          </CustomColumn>
          <CustomColumn textAlign="center">0</CustomColumn>
          <CustomColumn textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox name="aaRow6YesNo" onChange={this._handleChangeCheckBox} checked={values.aaRow6YesNo} />
              </Form.Field>
            </Form>
          </CustomColumn>
        </Grid.Row>
        <Grid.Row style={{ backgroundColor: 'lightblue' }} columns={9}>
          <CustomColumn>
            <Input
              fluid
              tabIndex={11}
              name="aaRow7"
              autoComplete="aaRow7"
              value={values.aaRow7}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow7 && touched.aaRow7 && <Label basic color="red" pointing content={errors.aaRow7} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              type="number"
              fluid
              tabIndex={97}
              name="aaRow7Year1"
              autoComplete="aaRow7Year1"
              value={values.aaRow7Year1}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow7Year1 &&
              touched.aaRow7Year1 && <Label basic color="red" pointing content={errors.aaRow7Year1} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              type="number"
              fluid
              tabIndex={127}
              name="aaRow7Year2"
              autoComplete="aaRow7Year2"
              value={values.aaRow7Year2}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow7Year2 &&
              touched.aaRow7Year2 && <Label basic color="red" pointing content={errors.aaRow7Year2} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              type="number"
              fluid
              tabIndex={157}
              name="aaRow7Year3"
              autoComplete="aaRow7Year3"
              value={values.aaRow7Year3}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow7Year3 &&
              touched.aaRow7Year3 && <Label basic color="red" pointing content={errors.aaRow7Year3} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              type="number"
              fluid
              tabIndex={187}
              name="aaRow7Year4"
              autoComplete="aaRow7Year4"
              value={values.aaRow7Year4}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow7Year4 &&
              touched.aaRow7Year4 && <Label basic color="red" pointing content={errors.aaRow7Year4} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              type="number"
              fluid
              tabIndex={217}
              name="aaRow7Year5"
              autoComplete="aaRow7Year5"
              value={values.aaRow7Year5}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow7Year5 &&
              touched.aaRow7Year5 && <Label basic color="red" pointing content={errors.aaRow7Year5} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              type="number"
              fluid
              tabIndex={247}
              name="aaRow7Year6"
              autoComplete="aaRow7Year6"
              value={values.aaRow7Year6}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow7Year6 &&
              touched.aaRow7Year6 && <Label basic color="red" pointing content={errors.aaRow7Year6} />}
          </CustomColumn>
          <CustomColumn style={{ backgroundColor: 'white' }} textAlign="center">
            0
          </CustomColumn>
          <CustomColumn textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox name="aaRow7YesNo" onChange={this._handleChangeCheckBox} checked={values.aaRow7YesNo} />
              </Form.Field>
            </Form>
          </CustomColumn>
        </Grid.Row>
        <Grid.Row columns={9}>
          <CustomColumn>
            <Input
              fluid
              tabIndex={12}
              name="aaRow8"
              autoComplete="aaRow8"
              value={values.aaRow8}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow8 && touched.aaRow8 && <Label basic color="red" pointing content={errors.aaRow8} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              type="number"
              fluid
              tabIndex={98}
              name="aaRow8Year1"
              autoComplete="aaRow8Year1"
              value={values.aaRow8Year1}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow8Year1 &&
              touched.aaRow8Year1 && <Label basic color="red" pointing content={errors.aaRow8Year1} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              type="number"
              fluid
              tabIndex={128}
              name="aaRow8Year2"
              autoComplete="aaRow8Year2"
              value={values.aaRow8Year2}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow8Year2 &&
              touched.aaRow8Year2 && <Label basic color="red" pointing content={errors.aaRow8Year2} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              type="number"
              fluid
              tabIndex={158}
              name="aaRow8Year3"
              autoComplete="aaRow8Year3"
              value={values.aaRow8Year3}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow8Year3 &&
              touched.aaRow8Year3 && <Label basic color="red" pointing content={errors.aaRow8Year3} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              type="number"
              fluid
              tabIndex={188}
              name="aaRow8Year4"
              autoComplete="aaRow8Year4"
              value={values.aaRow8Year4}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow8Year4 &&
              touched.aaRow8Year4 && <Label basic color="red" pointing content={errors.aaRow8Year4} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              type="number"
              fluid
              tabIndex={218}
              name="aaRow8Year5"
              autoComplete="aaRow8Year5"
              value={values.aaRow8Year5}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow8Year5 &&
              touched.aaRow8Year5 && <Label basic color="red" pointing content={errors.aaRow8Year5} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              type="number"
              fluid
              tabIndex={248}
              name="aaRow8Year6"
              autoComplete="aaRow8Year6"
              value={values.aaRow8Year6}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow8Year6 &&
              touched.aaRow8Year6 && <Label basic color="red" pointing content={errors.aaRow8Year6} />}
          </CustomColumn>
          <CustomColumn textAlign="center">0</CustomColumn>
          <CustomColumn textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox name="aaRow8YesNo" onChange={this._handleChangeCheckBox} checked={values.aaRow8YesNo} />
              </Form.Field>
            </Form>
          </CustomColumn>
        </Grid.Row>
        <Grid.Row style={{ backgroundColor: 'lightblue' }} columns={9}>
          <CustomColumn>
            <Input
              fluid
              tabIndex={13}
              name="aaRow9"
              autoComplete="aaRow9"
              value={values.aaRow9}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow9 && touched.aaRow9 && <Label basic color="red" pointing content={errors.aaRow9} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              type="number"
              fluid
              tabIndex={1412}
              name="aaRow9Year1"
              autoComplete="aaRow9Year1"
              value={values.aaRow9Year1}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow9Year1 &&
              touched.aaRow9Year1 && <Label basic color="red" pointing content={errors.aaRow9Year1} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              type="number"
              fluid
              tabIndex={129}
              name="aaRow9Year2"
              autoComplete="aaRow9Year2"
              value={values.aaRow9Year2}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow9Year2 &&
              touched.aaRow9Year2 && <Label basic color="red" pointing content={errors.aaRow9Year2} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              type="number"
              fluid
              tabIndex={159}
              name="aaRow9Year3"
              autoComplete="aaRow9Year3"
              value={values.aaRow9Year3}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow9Year3 &&
              touched.aaRow9Year3 && <Label basic color="red" pointing content={errors.aaRow9Year3} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              type="number"
              fluid
              tabIndex={189}
              name="aaRow9Year4"
              autoComplete="aaRow9Year4"
              value={values.aaRow9Year4}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow9Year4 &&
              touched.aaRow9Year4 && <Label basic color="red" pointing content={errors.aaRow9Year4} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              type="number"
              fluid
              tabIndex={219}
              name="aaRow9Year5"
              autoComplete="aaRow9Year5"
              value={values.aaRow9Year5}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow9Year5 &&
              touched.aaRow9Year5 && <Label basic color="red" pointing content={errors.aaRow9Year5} />}
          </CustomColumn>
          <CustomColumn>
            <Input
              type="number"
              fluid
              tabIndex={249}
              name="aaRow9Year6"
              autoComplete="aaRow9Year6"
              value={values.aaRow9Year6}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.aaRow9Year6 &&
              touched.aaRow9Year6 && <Label basic color="red" pointing content={errors.aaRow9Year6} />}
          </CustomColumn>
          <CustomColumn style={{ backgroundColor: 'white' }} textAlign="center">
            0
          </CustomColumn>
          <CustomColumn textAlign="center">
            <Form size="tiny">
              <Form.Field style={{ marginTop: '10px' }}>
                <Form.Checkbox name="aaRow9YesNo" onChange={this._handleChangeCheckBox} checked={values.aaRow9YesNo} />
              </Form.Field>
            </Form>
          </CustomColumn>
        </Grid.Row>
        <Grid.Row columns={9}>
          <CustomColumn>
            <Input
              fluid
              tabIndex={14}
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              tabIndex={15}
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              tabIndex={16}
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
              type="number"
              fluid
              tabIndex={12}
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              tabIndex={17}
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
              type="number"
              fluid
              tabIndex={13}
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              tabIndex={18}
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
              type="number"
              fluid
              tabIndex={14}
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              tabIndex={19}
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              tabIndex={20}
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              tabIndex={21}
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              tabIndex={22}
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              tabIndex={23}
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              tabIndex={24}
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              tabIndex={25}
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              tabIndex={26}
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
              fluid
              tabIndex={22}
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
              type="number"
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
              type="number"
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
              tabIndex={27}
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
              fluid
              tabIndex={23}
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
              type="number"
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
              type="number"
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
              tabIndex={28}
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
              fluid
              tabIndex={24}
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
              type="number"
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
              type="number"
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
              tabIndex={29}
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              tabIndex={30}
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              tabIndex={31}
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              tabIndex={32}
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              tabIndex={33}
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              tabIndex={34}
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
        </Grid.Row> */}

        <Grid.Row columns={9}>
          <CustomColumn>
            <b>Total Adjustments</b>
          </CustomColumn>
          <CustomColumn textAlign="center">{this._calcTotal(1)}</CustomColumn>
          <CustomColumn textAlign="center">{this._calcTotal(2)}</CustomColumn>
          <CustomColumn textAlign="center">{this._calcTotal(3)}</CustomColumn>
          <CustomColumn textAlign="center">{this._calcTotal(4)}</CustomColumn>
          <CustomColumn textAlign="center">{this._calcTotal(5)}</CustomColumn>
          <CustomColumn textAlign="center">{this._calcTotal(6)}</CustomColumn>
          <CustomColumn textAlign="center">0</CustomColumn>
        </Grid.Row>
        <Grid.Row columns={9}>
          <CustomColumn>
            <b>Total Adjusted Profit INCL. Owners Wages</b>
          </CustomColumn>
          <CustomColumn textAlign="center">{this._calcTotalAdjustedProfit(1)}</CustomColumn>
          <CustomColumn textAlign="center">{this._calcTotalAdjustedProfit(2)}</CustomColumn>
          <CustomColumn textAlign="center">{this._calcTotalAdjustedProfit(3)}</CustomColumn>
          <CustomColumn textAlign="center">{this._calcTotalAdjustedProfit(4)}</CustomColumn>
          <CustomColumn textAlign="center">{this._calcTotalAdjustedProfit(5)}</CustomColumn>
          <CustomColumn textAlign="center">{this._calcTotalAdjustedProfit(6)}</CustomColumn>
          <CustomColumn textAlign="center">0</CustomColumn>
        </Grid.Row>
        <Grid.Row columns={9}>
          <CustomColumn>
            <b>Adjusted Profit % </b>
          </CustomColumn>
          <CustomColumn textAlign="center">{this._calcAdjustedProfit(1)} %</CustomColumn>
          <CustomColumn textAlign="center">{this._calcAdjustedProfit(2)} %</CustomColumn>
          <CustomColumn textAlign="center">{this._calcAdjustedProfit(3)} %</CustomColumn>
          <CustomColumn textAlign="center">{this._calcAdjustedProfit(4)} %</CustomColumn>
          <CustomColumn textAlign="center">{this._calcAdjustedProfit(5)} %</CustomColumn>
          <CustomColumn textAlign="center">{this._calcAdjustedProfit(6)} %</CustomColumn>
          <CustomColumn textAlign="center">0</CustomColumn>
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
  setCalcTotalAddbacksAndAdjustments: PropTypes.func,
  updateAppraisal: PropTypes.func,
  appraisalObject: PropTypes.object
}

const mapPropsToValues = props => ({
  aaRow1Year1: props.appraisalObject ? props.appraisalObject.aaRow1Year1 : 0,
  aaRow1: props.appraisalObject ? props.appraisalObject.aaRow1 : '',
  aaRow2Year1: props.appraisalObject ? props.appraisalObject.aaRow2Year1 : 0,
  aaRow2: props.appraisalObject ? props.appraisalObject.aaRow2 : '',
  aaRow3Year1: 0,
  aaRow3: props.appraisalObject ? props.appraisalObject.aaRow3 : '',
  aaRow4Year1: 0,
  aaRow4: props.appraisalObject ? props.appraisalObject.aaRow4 : '',
  aaRow5Year1: 0,
  aaRow5: props.appraisalObject ? props.appraisalObject.aaRow5 : '',
  aaRow6Year1: 0,
  aaRow6: props.appraisalObject ? props.appraisalObject.aaRow6 : '',
  aaRow7Year1: 0,
  aaRow7: props.appraisalObject ? props.appraisalObject.aaRow7 : '',
  aaRow8Year1: 0,
  aaRow8: props.appraisalObject ? props.appraisalObject.aaRow8 : '',
  aaRow9Year1: 0,
  aaRow9: props.appraisalObject ? props.appraisalObject.aaRow9 : '',
  aaRow10Year1: 0,
  aaRow10: props.appraisalObject ? props.appraisalObject.aaRow10 : '',
  aaRow11Year1: 0,
  aaRow11: props.appraisalObject ? props.appraisalObject.aaRow11 : '',
  aaRow12Year1: 0,
  aaRow12: props.appraisalObject ? props.appraisalObject.aaRow12 : '',
  aaRow13Year1: 0,
  aaRow13: props.appraisalObject ? props.appraisalObject.aaRow13 : '',
  aaRow14Year1: 0,
  aaRow14: props.appraisalObject ? props.appraisalObject.aaRow14 : '',
  aaRow15Year1: 0,
  aaRow15: props.appraisalObject ? props.appraisalObject.aaRow15 : '',
  aaRow16Year1: 0,
  aaRow16: props.appraisalObject ? props.appraisalObject.aaRow16 : '',
  aaRow17Year1: 0,
  aaRow17: props.appraisalObject ? props.appraisalObject.aaRow17 : '',
  aaRow18Year1: 0,
  aaRow18: props.appraisalObject ? props.appraisalObject.aaRow18 : '',
  aaRow19Year1: 0,
  aaRow19: props.appraisalObject ? props.appraisalObject.aaRow19 : '',
  aaRow20Year1: 0,
  aaRow20: props.appraisalObject ? props.appraisalObject.aaRow20 : '',
  aaRow21Year1: 0,
  aaRow21: props.appraisalObject ? props.appraisalObject.aaRow21 : '',
  aaRow22Year1: 0,
  aaRow22: props.appraisalObject ? props.appraisalObject.aaRow22 : '',
  aaRow23Year1: 0,
  aaRow23: props.appraisalObject ? props.appraisalObject.aaRow23 : '',
  aaRow24Year1: 0,
  aaRow24: props.appraisalObject ? props.appraisalObject.aaRow24 : '',
  aaRow25Year1: 0,
  aaRow25: props.appraisalObject ? props.appraisalObject.aaRow25 : '',
  aaRow26Year1: 0,
  aaRow26: props.appraisalObject ? props.appraisalObject.aaRow26 : '',
  aaRow27Year1: 0,
  aaRow27: props.appraisalObject ? props.appraisalObject.aaRow27 : '',
  aaRow28Year1: 0,
  aaRow28: props.appraisalObject ? props.appraisalObject.aaRow28 : '',
  aaRow29Year1: 0,
  aaRow29: props.appraisalObject ? props.appraisalObject.aaRow29 : '',
  aaRow30Year1: 0,
  aaRow30: props.appraisalObject ? props.appraisalObject.aaRow30 : '',
  aaRow1Year2: props.appraisalObject ? props.appraisalObject.aaRow1Year2 : '',
  aaRow2Year2: props.appraisalObject ? props.appraisalObject.aaRow1Year2 : '',
  aaRow3Year2: props.appraisalObject ? props.appraisalObject.aaRow3Year2 : '',
  aaRow4Year2: 0,
  aaRow5Year2: 0,
  aaRow6Year2: 0,
  aaRow7Year2: 0,
  aaRow8Year2: 0,
  aaRow9Year2: 0,
  aaRow10Year2: 0,
  aaRow11Year2: 0,
  aaRow12Year2: 0,
  aaRow13Year2: 0,
  aaRow14Year2: 0,
  aaRow15Year2: 0,
  aaRow16Year2: 0,
  aaRow17Year2: 0,
  aaRow18Year2: 0,
  aaRow19Year2: 0,
  aaRow20Year2: 0,
  aaRow21Year2: 0,
  aaRow22Year2: 0,
  aaRow23Year2: 0,
  aaRow24Year2: 0,
  aaRow25Year2: 0,
  aaRow26Year2: 0,
  aaRow27Year2: 0,
  aaRow28Year2: 0,
  aaRow29Year2: 0,
  aaRow30Year2: 0,
  aaRow1Year3: props.appraisalObject ? props.appraisalObject.aaRow1Year3 : '',
  aaRow2Year3: props.appraisalObject ? props.appraisalObject.aaRow2Year3 : '',
  aaRow3Year3: props.appraisalObject ? props.appraisalObject.aaRow3Year3 : '',
  aaRow4Year3: 0,
  aaRow5Year3: 0,
  aaRow6Year3: 0,
  aaRow7Year3: 0,
  aaRow8Year3: 0,
  aaRow9Year3: 0,
  aaRow10Year3: 0,
  aaRow11Year3: 0,
  aaRow12Year3: 0,
  aaRow13Year3: 0,
  aaRow14Year3: 0,
  aaRow15Year3: 0,
  aaRow16Year3: 0,
  aaRow17Year3: 0,
  aaRow18Year3: 0,
  aaRow19Year3: 0,
  aaRow20Year3: 0,
  aaRow21Year3: 0,
  aaRow22Year3: 0,
  aaRow23Year3: 0,
  aaRow24Year3: 0,
  aaRow25Year3: 0,
  aaRow26Year3: 0,
  aaRow27Year3: 0,
  aaRow28Year3: 0,
  aaRow29Year3: 0,
  aaRow30Year3: 0,
  aaRow1Year4: props.appraisalObject ? props.appraisalObject.aaRow1Year4 : '',
  aaRow2Year4: props.appraisalObject ? props.appraisalObject.aaRow2Year4 : '',
  aaRow3Year4: props.appraisalObject ? props.appraisalObject.aaRow3Year4 : '',
  aaRow4Year4: 0,
  aaRow5Year4: 0,
  aaRow6Year4: 0,
  aaRow7Year4: 0,
  aaRow8Year4: 0,
  aaRow9Year4: 0,
  aaRow10Year4: 0,
  aaRow11Year4: 0,
  aaRow12Year4: 0,
  aaRow13Year4: 0,
  aaRow14Year4: 0,
  aaRow15Year4: 0,
  aaRow16Year4: 0,
  aaRow17Year4: 0,
  aaRow18Year4: 0,
  aaRow19Year4: 0,
  aaRow20Year4: 0,
  aaRow21Year4: 0,
  aaRow22Year4: 0,
  aaRow23Year4: 0,
  aaRow24Year4: 0,
  aaRow25Year4: 0,
  aaRow26Year4: 0,
  aaRow27Year4: 0,
  aaRow28Year4: 0,
  aaRow29Year4: 0,
  aaRow30Year4: 0,
  aaRow1Year5: props.appraisalObject ? props.appraisalObject.aaRow1Year5 : '',
  aaRow2Year5: props.appraisalObject ? props.appraisalObject.aaRow2Year5 : '',
  aaRow3Year5: props.appraisalObject ? props.appraisalObject.aaRow3Year5 : '',
  aaRow4Year5: 0,
  aaRow5Year5: 0,
  aaRow6Year5: 0,
  aaRow7Year5: 0,
  aaRow8Year5: 0,
  aaRow9Year5: 0,
  aaRow10Year5: 0,
  aaRow11Year5: 0,
  aaRow12Year5: 0,
  aaRow13Year5: 0,
  aaRow14Year5: 0,
  aaRow15Year5: 0,
  aaRow16Year5: 0,
  aaRow17Year5: 0,
  aaRow18Year5: 0,
  aaRow19Year5: 0,
  aaRow20Year5: 0,
  aaRow21Year5: 0,
  aaRow22Year5: 0,
  aaRow23Year5: 0,
  aaRow24Year5: 0,
  aaRow25Year5: 0,
  aaRow26Year5: 0,
  aaRow27Year5: 0,
  aaRow28Year5: 0,
  aaRow29Year5: 0,
  aaRow30Year5: 0,
  aaRow1Year6: props.appraisalObject ? props.appraisalObject.aaRow1Year6 : '',
  aaRow2Year6: props.appraisalObject ? props.appraisalObject.aaRow2Year6 : '',
  aaRow3Year6: props.appraisalObject ? props.appraisalObject.aaRow3Year6 : '',
  aaRow4Year6: 0,
  aaRow5Year6: 0,
  aaRow6Year6: 0,
  aaRow7Year6: 0,
  aaRow8Year6: 0,
  aaRow9Year6: 0,
  aaRow10Year6: 0,
  aaRow11Year6: 0,
  aaRow12Year6: 0,
  aaRow13Year6: 0,
  aaRow14Year6: 0,
  aaRow15Year6: 0,
  aaRow16Year6: 0,
  aaRow17Year6: 0,
  aaRow18Year6: 0,
  aaRow19Year6: 0,
  aaRow20Year6: 0,
  aaRow21Year6: 0,
  aaRow22Year6: 0,
  aaRow23Year6: 0,
  aaRow24Year6: 0,
  aaRow25Year6: 0,
  aaRow26Year6: 0,
  aaRow27Year6: 0,
  aaRow28Year6: 0,
  aaRow29Year6: 0,
  aaRow30Year6: 0,
  business_id: props.business ? props.business.id : '',
  id: props.appraisalObject ? props.appraisalObject.id : ''
})

const mapStateToProps = state => ({})

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

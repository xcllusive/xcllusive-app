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
      rows: this._createArrayWithTable(30)
    }
  }

  componentWillUnmount () {
    this.props.updateAppraisal(this.props.values, false)
  }

  _handleChangeCheckBox = (e, { name }) => {
    this.props.setFieldValue(name, !this.props.values[name])
  }

  _createArrayWithTable = (itens = 30) => {
    const array = []
    for (let row = 1; row <= itens; row++) {
      array.push({
        name: `aaRow${row}`,
        tabIndex: 100 + row,
        columns: [
          {
            name: `aaRow${row}Year1`,
            tabIndex: 200 + 1
          },
          {
            name: `aaRow${row}Year2`,
            tabIndex: 300 + 1
          },
          {
            name: `aaRow${row}Year3`,
            tabIndex: 400 + 1
          },
          {
            name: `aaRow${row}Year4`,
            tabIndex: 500 + 1
          },
          {
            name: `aaRow${row}Year5`,
            tabIndex: 600 + 1
          },
          {
            name: `aaRow${row}Year6`,
            tabIndex: 700 + 1
          }
        ]
      })
    }
    return array
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

  _handleChangeInputCurrency = (e, { value, name }) => {
    this.props.setFieldValue(name, numeral(value).value() || 0)
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
                  tabIndex={item.tabIndex}
                  name={subItem.name}
                  autoComplete={subItem.name}
                  value={`$ ${values[subItem.name]}`}
                  onChange={this._handleChangeInputCurrency}
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

const mapPropsToValues = props => {
  const values = {
    business_id: props.business ? props.business.id : '',
    id: props.appraisalObject ? props.appraisalObject.id : ''
  }
  for (let row = 1; row <= 30; row++) {
    values[`aaRow${row}`] = props.appraisalObject ? props.appraisalObject[`aaRow${row}`] : 0
    values[`aaRow${row}Year1`] = props.appraisalObject ? props.appraisalObject[`aaRow${row}Year1`] : 0
    values[`aaRow${row}Year2`] = props.appraisalObject ? props.appraisalObject[`aaRow${row}Year2`] : 0
    values[`aaRow${row}Year3`] = props.appraisalObject ? props.appraisalObject[`aaRow${row}Year3`] : 0
    values[`aaRow${row}Year4`] = props.appraisalObject ? props.appraisalObject[`aaRow${row}Year4`] : 0
    values[`aaRow${row}Year5`] = props.appraisalObject ? props.appraisalObject[`aaRow${row}Year5`] : 0
    values[`aaRow${row}Year6`] = props.appraisalObject ? props.appraisalObject[`aaRow${row}Year6`] : 0
    values[`aaRow${row}Year7`] = props.appraisalObject ? props.appraisalObject[`aaRow${row}Year7`] : 0
  }
  values['aaRow1'] = props.appraisalObject ? props.appraisalObject['aaRow1'] : ''
  values['aaRow2'] = props.appraisalObject ? props.appraisalObject['aaRow2'] : ''
  values['aaRow3'] = props.appraisalObject ? props.appraisalObject['aaRow3'] : ''
  values['aaRow4'] = props.appraisalObject ? props.appraisalObject['aaRow4'] : ''
  values['aaRow5'] = props.appraisalObject ? props.appraisalObject['aaRow5'] : ''
  values['aaRow6'] = props.appraisalObject ? props.appraisalObject['aaRow6'] : ''
  values['aaRow7'] = props.appraisalObject ? props.appraisalObject['aaRow7'] : ''
  values['aaRow8'] = props.appraisalObject ? props.appraisalObject['aaRow8'] : ''
  values['aaRow9'] = props.appraisalObject ? props.appraisalObject['aaRow9'] : ''
  values['aaRow10'] = props.appraisalObject ? props.appraisalObject['aaRow10'] : ''

  return values
}

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

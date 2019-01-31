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

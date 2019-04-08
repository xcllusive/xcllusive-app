import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Grid, Input, Form, Checkbox } from 'semantic-ui-react'
import * as Yup from 'yup'
import numeral from 'numeral'

import CustomColumn from '../../../../components/content/CustomGridColumn'

import { updateAppraisal } from '../../../../redux/ducks/appraisal'

class AddbacksAndAdjustmentsForm extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      rows: this._createArrayWithTable(30),
      totalAdjusment1: 0,
      totalAdjusment2: 0,
      totalAdjusment3: 0,
      totalAdjusment4: 0,
      totalAdjusment5: 0,
      totalAdjusment6: 0,
      totalAdjustedProfit1: 0,
      totalAdjustedProfit2: 0,
      totalAdjustedProfit3: 0,
      totalAdjustedProfit4: 0,
      totalAdjustedProfit5: 0,
      totalAdjustedProfit6: 0,
      totalAdjustedProfit1Perc: 0,
      totalAdjustedProfit2Perc: 0,
      totalAdjustedProfit3Perc: 0,
      totalAdjustedProfit4Perc: 0,
      totalAdjustedProfit5Perc: 0,
      totalAdjustedProfit6Perc: 0
    }
  }

  componentDidMount = () => {
    this._setCalcTotalAdjusment()
    this._calcTotalAdjustedProfit()
    this._calcAdjustedProfit()
  }

  componentWillUnmount () {
    for (let row = 1; row <= 30; row++) {
      this.props.values[`aaRow${row}Year1`] = this._replaceDollarAndComma(this.props.values[`aaRow${row}Year1`])
      this.props.values[`aaRow${row}Year2`] = this._replaceDollarAndComma(this.props.values[`aaRow${row}Year2`])
      this.props.values[`aaRow${row}Year3`] = this._replaceDollarAndComma(this.props.values[`aaRow${row}Year3`])
      this.props.values[`aaRow${row}Year4`] = this._replaceDollarAndComma(this.props.values[`aaRow${row}Year4`])
      this.props.values[`aaRow${row}Year5`] = this._replaceDollarAndComma(this.props.values[`aaRow${row}Year5`])
      this.props.values[`aaRow${row}Year6`] = this._replaceDollarAndComma(this.props.values[`aaRow${row}Year6`])
      this.props.values[`aaRow${row}Year7`] = this._replaceDollarAndComma(
        this.props.values[`aaRow${row}Year7`].toString()
      )
    }
    this.props.updateAppraisal(this.props.values, false)
  }

  _replaceDollarAndComma (replace) {
    replace = replace.replace('$', ',')
    replace = replace.replace(/,/g, '')
    return replace
  }

  _handleChangeCheckBox = async (e, { name, row, checked }) => {
    await this.props.setFieldValue(name, !this.props.values[name])
    const sizeIndex = row.tabIndex.toString().length
    let changeRow = 0
    if (sizeIndex <= 9) {
      changeRow = row.tabIndex.toString().substring(sizeIndex - 1, sizeIndex)
    } else {
      changeRow = row.tabIndex.toString().substring(sizeIndex - 2, sizeIndex)
    }
    if (checked) {
      this.props.setFieldValue(
        `aaRow${changeRow}Year7`,
        this._calcAnnualised(
          this.props.values[`aaRow${changeRow}Year6`],
          this.props.monthsCovered,
          this.props.seasonalAdjustment
        )
      )
    } else {
      this.props.setFieldValue(`aaRow${changeRow}Year7`, 0)
    }
  }

  _calcAnnualised = (yearValue, monthsCoveredValue, seasonalAdjustmentValue) => {
    const year = numeral(yearValue).value()
    const monthsCovered = numeral(monthsCoveredValue).value()
    const seasonalAdjustment = numeral(seasonalAdjustmentValue).value() / 100

    return (year / monthsCovered) * 12 + ((year / monthsCovered) * 12 - year) * seasonalAdjustment
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
        ],
        row: row
      })
    }
    return array
  }

  _setCalcTotalAdjusment = () => {
    let totalAdjusment1 = 0
    let totalAdjusment2 = 0
    let totalAdjusment3 = 0
    let totalAdjusment4 = 0
    let totalAdjusment5 = 0
    let totalAdjusment6 = 0
    for (let i = 1; i < 30; i++) {
      totalAdjusment1 = totalAdjusment1 + numeral(this.props.values[`aaRow${i}Year${1}`]).value()
      totalAdjusment2 = totalAdjusment2 + numeral(this.props.values[`aaRow${i}Year${2}`]).value()
      totalAdjusment3 = totalAdjusment3 + numeral(this.props.values[`aaRow${i}Year${3}`]).value()
      totalAdjusment4 = totalAdjusment4 + numeral(this.props.values[`aaRow${i}Year${4}`]).value()
      totalAdjusment5 = totalAdjusment5 + numeral(this.props.values[`aaRow${i}Year${5}`]).value()
      totalAdjusment6 = totalAdjusment6 + numeral(this.props.values[`aaRow${i}Year${6}`]).value()
    }
    this.setState({ totalAdjusment1: numeral(totalAdjusment1).format('0,0') })
    this.setState({ totalAdjusment2: numeral(totalAdjusment2).format('0,0') })
    this.setState({ totalAdjusment3: numeral(totalAdjusment3).format('0,0') })
    this.setState({ totalAdjusment4: numeral(totalAdjusment4).format('0,0') })
    this.setState({ totalAdjusment5: numeral(totalAdjusment5).format('0,0') })
    this.setState({ totalAdjusment6: numeral(totalAdjusment6).format('0,0') })
  }

  _calcTotalAdjustedProfit = async () => {
    const totalAdjustedProfit1 = this._calcTotal(1) + this.props.appraisalObject[`operatingProfit${1}`]
    const totalAdjustedProfit2 = this._calcTotal(2) + this.props.appraisalObject[`operatingProfit${2}`]
    const totalAdjustedProfit3 = this._calcTotal(3) + this.props.appraisalObject[`operatingProfit${3}`]
    const totalAdjustedProfit4 = this._calcTotal(4) + this.props.appraisalObject[`operatingProfit${4}`]
    const totalAdjustedProfit5 = this._calcTotal(5) + this.props.appraisalObject[`operatingProfit${5}`]
    const totalAdjustedProfit6 = this._calcTotal(6) + this.props.appraisalObject[`operatingProfit${6}`]
    this.setState({ totalAdjustedProfit1: numeral(totalAdjustedProfit1).format('0,0') })
    this.setState({ totalAdjustedProfit2: numeral(totalAdjustedProfit2).format('0,0') })
    this.setState({ totalAdjustedProfit3: numeral(totalAdjustedProfit3).format('0,0') })
    this.setState({ totalAdjustedProfit4: numeral(totalAdjustedProfit4).format('0,0') })
    this.setState({ totalAdjustedProfit5: numeral(totalAdjustedProfit5).format('0,0') })
    this.setState({ totalAdjustedProfit6: numeral(totalAdjustedProfit6).format('0,0') })
  }

  _calcAdjustedProfit = () => {
    const total1 = this._calcTotal(1) + this.props.appraisalObject[`operatingProfit${1}`]
    const totalAdjustedProfit1Perc = (total1 / numeral(this.props.appraisalObject[`sales${1}`]).value()) * 100
    const total2 = this._calcTotal(2) + this.props.appraisalObject[`operatingProfit${2}`]
    const totalAdjustedProfit2Perc = (total2 / numeral(this.props.appraisalObject[`sales${2}`]).value()) * 100
    const total3 = this._calcTotal(3) + this.props.appraisalObject[`operatingProfit${3}`]
    const totalAdjustedProfit3Perc = (total3 / numeral(this.props.appraisalObject[`sales${3}`]).value()) * 100
    const total4 = this._calcTotal(4) + this.props.appraisalObject[`operatingProfit${4}`]
    const totalAdjustedProfit4Perc = (total4 / numeral(this.props.appraisalObject[`sales${4}`]).value()) * 100
    const total5 = this._calcTotal(5) + this.props.appraisalObject[`operatingProfit${5}`]
    const totalAdjustedProfit5Perc = (total5 / numeral(this.props.appraisalObject[`sales${5}`]).value()) * 100
    const total6 = this._calcTotal(6) + this.props.appraisalObject[`operatingProfit${6}`]
    const totalAdjustedProfit6Perc = (total6 / numeral(this.props.appraisalObject[`sales${6}`]).value()) * 100

    this.setState({ totalAdjustedProfit1Perc: numeral(totalAdjustedProfit1Perc).format('0,0') })
    this.setState({ totalAdjustedProfit2Perc: numeral(totalAdjustedProfit2Perc).format('0,0') })
    this.setState({ totalAdjustedProfit3Perc: numeral(totalAdjustedProfit3Perc).format('0,0') })
    this.setState({ totalAdjustedProfit4Perc: numeral(totalAdjustedProfit4Perc).format('0,0') })
    this.setState({ totalAdjustedProfit5Perc: numeral(totalAdjustedProfit5Perc).format('0,0') })
    this.setState({ totalAdjustedProfit6Perc: numeral(totalAdjustedProfit6Perc).format('0,0') })
  }

  _handleChangeAddbackAndAdjusments = e => {
    e.preventDefault()
    this._setCalcTotalAdjusment()
    this._calcTotalAdjustedProfit()
    this._calcAdjustedProfit()
  }

  _calcTotal = column => {
    let total = 0
    for (let i = 1; i < 30; i++) {
      total = total + numeral(this.props.values[`aaRow${i}Year${column}`]).value()
    }

    return total
  }

  // _calcTotalAdjustedProfit = column => {
  //   const total = this._calcTotal(column) + this.props.appraisalObject[`operatingProfit${column}`]
  //   return numeral(total).format('0,0')
  // }

  _handleChangeInputCurrency = (e, { value, name }) => {
    this.props.setFieldValue(name, numeral(value).format('0,0') || 0)
  }

  render () {
    const { values, handleChange, handleBlur, financialYear, appraisalObject } = this.props

    return (
      <Fragment>
        <Grid.Row
          style={{
            backgroundColor: 'lightyellow',
            celledPadding: '.3em'
          }}
          columns={9}
        >
          <CustomColumn>
            <b> Financial Year </b>
          </CustomColumn>
          <CustomColumn textAlign="center">
            <b> {appraisalObject && appraisalObject.year1 > 0 ? appraisalObject.year1 : financialYear - 5} </b>
          </CustomColumn>
          <CustomColumn textAlign="center">
            <b> {appraisalObject && appraisalObject.year2 > 0 ? appraisalObject.year2 : financialYear - 4} </b>
          </CustomColumn>
          <CustomColumn textAlign="center">
            <b> {appraisalObject && appraisalObject.year3 > 0 ? appraisalObject.year3 : financialYear - 3} </b>
          </CustomColumn>
          <CustomColumn textAlign="center">
            <b> {appraisalObject && appraisalObject.year4 > 0 ? appraisalObject.year4 : financialYear - 2} </b>
          </CustomColumn>
          <CustomColumn textAlign="center">
            <b> {appraisalObject && appraisalObject.year5 > 0 ? appraisalObject.year5 : financialYear - 1} </b>
          </CustomColumn>
          <CustomColumn textAlign="center">
            <b>
              {appraisalObject && appraisalObject.year6 > 0 ? appraisalObject.year6 : financialYear}
              YTD
            </b>
          </CustomColumn>
          <CustomColumn textAlign="center">
            <b>
              {financialYear}
              Annualised
            </b>
          </CustomColumn>
          <CustomColumn textAlign="center">
            <b> Annualised Yes / No </b>
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
                  value={`$${values[subItem.name]}`}
                  onChange={this._handleChangeInputCurrency}
                  onBlur={e => this._handleChangeAddbackAndAdjusments(e, item)}
                />
              </CustomColumn>
            ))}
            <CustomColumn
              style={{
                backgroundColor: 'white'
              }}
              textAlign="center"
            >
              {numeral(values[`aaRow${item.row}Year7`]).format('$0,0')}
            </CustomColumn>
            <CustomColumn textAlign="center">
              <Form.Field
                style={{
                  marginTop: '10px'
                }}
              >
                <Checkbox
                  name={`${item.name}YesNo`}
                  onChange={this._handleChangeCheckBox}
                  row={item}
                  checked={values[`${item.name}YesNo`]}
                />
              </Form.Field>
            </CustomColumn>
          </Grid.Row>
        ))}
        <Grid.Row columns={9}>
          <CustomColumn>
            <b> Total Adjustments </b>
          </CustomColumn>
          <CustomColumn textAlign="center"> {this.state.totalAdjusment1} </CustomColumn>
          <CustomColumn textAlign="center"> {this.state.totalAdjusment2} </CustomColumn>
          <CustomColumn textAlign="center"> {this.state.totalAdjusment3} </CustomColumn>
          <CustomColumn textAlign="center"> {this.state.totalAdjusment4} </CustomColumn>
          <CustomColumn textAlign="center"> {this.state.totalAdjusment5} </CustomColumn>
          <CustomColumn textAlign="center"> {this.state.totalAdjusment6} </CustomColumn>
          <CustomColumn textAlign="center"> 0 </CustomColumn>
        </Grid.Row>
        <Grid.Row columns={9}>
          <CustomColumn>
            <b> Total Adjusted Profit INCL.Owners Wages </b>
          </CustomColumn>
          <CustomColumn textAlign="center"> {this.state.totalAdjustedProfit1} </CustomColumn>
          <CustomColumn textAlign="center"> {this.state.totalAdjustedProfit2} </CustomColumn>
          <CustomColumn textAlign="center"> {this.state.totalAdjustedProfit3} </CustomColumn>
          <CustomColumn textAlign="center"> {this.state.totalAdjustedProfit4} </CustomColumn>
          <CustomColumn textAlign="center"> {this.state.totalAdjustedProfit5} </CustomColumn>
          <CustomColumn textAlign="center"> {this.state.totalAdjustedProfit6} </CustomColumn>
          <CustomColumn textAlign="center"> 0 </CustomColumn>
        </Grid.Row>
        <Grid.Row columns={9}>
          <CustomColumn>
            <b> Adjusted Profit % </b>
          </CustomColumn>
          <CustomColumn textAlign="center"> {this.state.totalAdjustedProfit1Perc} % </CustomColumn>
          <CustomColumn textAlign="center"> {this.state.totalAdjustedProfit2Perc} % </CustomColumn>
          <CustomColumn textAlign="center"> {this.state.totalAdjustedProfit3Perc} % </CustomColumn>
          <CustomColumn textAlign="center"> {this.state.totalAdjustedProfit4Perc} % </CustomColumn>
          <CustomColumn textAlign="center"> {this.state.totalAdjustedProfit5Perc} % </CustomColumn>
          <CustomColumn textAlign="center"> {this.state.totalAdjustedProfit6Perc} % </CustomColumn>
          <CustomColumn textAlign="center"> 0 </CustomColumn>
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
  appraisalObject: PropTypes.object,
  monthsCovered: PropTypes.number,
  seasonalAdjustment: PropTypes.number
}

const mapPropsToValues = props => {
  const values = {
    business_id: props.business ? props.business.id : '',
    id: props.appraisalObject ? props.appraisalObject.id : ''
  }
  for (let row = 1; row <= 30; row++) {
    values[`aaRow${row}`] = props.appraisalObject ? props.appraisalObject[`aaRow${row}`] : 0
    values[`aaRow${row}Year1`] = props.appraisalObject
      ? numeral(props.appraisalObject[`aaRow${row}Year1`]).format('0,0')
      : 0
    values[`aaRow${row}Year2`] = props.appraisalObject
      ? numeral(props.appraisalObject[`aaRow${row}Year2`]).format('0,0')
      : 0
    values[`aaRow${row}Year3`] = props.appraisalObject
      ? numeral(props.appraisalObject[`aaRow${row}Year3`]).format('0,0')
      : 0
    values[`aaRow${row}Year4`] = props.appraisalObject
      ? numeral(props.appraisalObject[`aaRow${row}Year4`]).format('0,0')
      : 0
    values[`aaRow${row}Year5`] = props.appraisalObject
      ? numeral(props.appraisalObject[`aaRow${row}Year5`]).format('0,0')
      : 0
    values[`aaRow${row}Year6`] = props.appraisalObject
      ? numeral(props.appraisalObject[`aaRow${row}Year6`]).format('0,0')
      : 0
    values[`aaRow${row}Year7`] = props.appraisalObject
      ? numeral(props.appraisalObject[`aaRow${row}Year7`]).format('0,0')
      : 0
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
  return bindActionCreators(
    {
      updateAppraisal
    },
    dispatch
  )
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

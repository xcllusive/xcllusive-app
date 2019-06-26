import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Grid, Segment, Header, Form, Label } from 'semantic-ui-react'
import * as Yup from 'yup'
import numeral from 'numeral'
import { updateAppraisal } from '../../../../redux/ducks/appraisal'

import CustomColumn from '../../../../components/content/CustomGridColumn'

class StockForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentStockLevel: 0,
      stockNecessary: 0
    }
  }

  componentWillUnmount () {
    const obj = {
      currentStockLevel: this._replaceDollarAndComma(this.props.values.currentStockLevel),
      stockNecessary: this._replaceDollarAndComma(this.props.values.stockNecessary)
    }
    Object.assign(this.props.values, obj)
    this.props.updateAppraisal(this.props.values, false)
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (
      nextProps.appraisalObject &&
      (nextProps.appraisalObject.currentStockLevel !== prevState.currentStockLevel ||
        nextProps.appraisalObject.currentStockLevel === 0)
    ) {
      var currentStockLevel = numeral(nextProps.values.currentStockLevel).format('$0,0.[99]')
    }
    if (
      nextProps.appraisalObject &&
      (nextProps.appraisalObject.stockNecessary !== prevState.stockNecessary ||
        nextProps.appraisalObject.stockNecessary === 0)
    ) {
      var stockNecessary = numeral(nextProps.values.stockNecessary).format('$0,0.[99]')
    }

    return {
      currentStockLevel: currentStockLevel || prevState.currentStockLevel,
      stockNecessary: stockNecessary || prevState.stockNecessary
    }
  }

  _replaceDollarAndComma (replace) {
    if (replace.toString().substring(0, 1) >= 0) {
      return replace
    } else {
      let onlyNumber = replace.replace('$', ',')
      onlyNumber = onlyNumber.replace(/,/g, '')
      return onlyNumber
    }
  }

  _handleChangeCheckBox = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
  }

  render () {
    const { values, handleChange, handleBlur, errors, touched } = this.props
    return (
      <Fragment>
        <Segment style={{ backgroundColor: '#daf3e4' }}>
          <Header style={{ marginTop: '10px', marginBottom: '10px' }} as="h3" textAlign="center" color="blue">
            Stock
          </Header>
          <Grid celled="internally" divided>
            <Grid.Row columns={3}>
              <CustomColumn />
              <CustomColumn />
              <CustomColumn textAlign="center">Select to use in Valuation</CustomColumn>
            </Grid.Row>
            <Grid.Row style={{ backgroundColor: '#dcefff' }} columns={3}>
              <CustomColumn />
              <CustomColumn textAlign="center">No Stock</CustomColumn>
              <CustomColumn textAlign="center">
                <Form size="tiny">
                  <Form.Field>
                    <Form.Checkbox
                      name="stockValuationOption"
                      value={1}
                      onChange={this._handleChangeCheckBox}
                      checked={values.stockValuationOption === 1}
                    />
                  </Form.Field>
                </Form>
              </CustomColumn>
            </Grid.Row>
            <Grid.Row columns={3}>
              <CustomColumn textAlign="center">Current Stock Level</CustomColumn>
              <CustomColumn>
                <Form size="tiny">
                  <Form.Field>
                    <Form.Input
                      name="currentStockLevel"
                      autoComplete="currentStockLevel"
                      value={this.state.currentStockLevel}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.currentStockLevel && touched.currentStockLevel && (
                      <Label basic color="red" pointing content={errors.currentStockLevel} />
                    )}
                  </Form.Field>
                </Form>
              </CustomColumn>
              <CustomColumn textAlign="center">
                <Form size="tiny">
                  <Form.Field>
                    <Form.Checkbox
                      name="stockValuationOption"
                      value={2}
                      onChange={this._handleChangeCheckBox}
                      checked={values.stockValuationOption === 2}
                    />
                  </Form.Field>
                </Form>
              </CustomColumn>
            </Grid.Row>
            <Grid.Row style={{ backgroundColor: '#dcefff' }} columns={3}>
              <CustomColumn textAlign="center">Stock necessary for Operation of the business</CustomColumn>
              <CustomColumn>
                <Form size="tiny">
                  <Form.Field>
                    <Form.Input
                      name="stockNecessary"
                      autoComplete="stockNecessary"
                      value={this.state.stockNecessary}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.stockNecessary && touched.stockNecessary && (
                      <Label basic color="red" pointing content={errors.stockNecessary} />
                    )}
                  </Form.Field>
                </Form>
              </CustomColumn>
              <CustomColumn textAlign="center">
                <Form size="tiny">
                  <Form.Field>
                    <Form.Checkbox
                      name="stockValuationOption"
                      value={3}
                      onChange={this._handleChangeCheckBox}
                      checked={values.stockValuationOption === 3}
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

StockForm.propTypes = {
  values: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  errors: PropTypes.object,
  touched: PropTypes.object,
  setFieldValue: PropTypes.func,
  isValid: PropTypes.bool,
  financialYear: PropTypes.string,
  updateAppraisal: PropTypes.func,
  appraisalObject: PropTypes.object,
  business: PropTypes.object
}

const mapPropsToValues = props => ({
  business_id: props.business ? props.business.id : '',
  id: props.appraisalObject ? props.appraisalObject.id : '',
  stockValuationOption: props.appraisalObject ? props.appraisalObject.stockValuationOption : 0,
  currentStockLevel: props.appraisalObject ? props.appraisalObject.currentStockLevel : 0,
  stockNecessary: props.appraisalObject ? props.appraisalObject.stockNecessary : 0
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
  })(StockForm)
)

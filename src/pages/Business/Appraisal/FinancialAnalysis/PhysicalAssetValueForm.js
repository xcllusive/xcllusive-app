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

class AddbacksAndAdjustmentsForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      physicalAssetValue: 0
    }
  }

  componentWillUnmount () {
    const obj = {
      physicalAssetValue: this._replaceDollarAndComma(this.props.values.physicalAssetValue)
    }
    Object.assign(this.props.values, obj)
    this.props.updateAppraisal(this.props.values, false)
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (
      nextProps.appraisalObject &&
      (nextProps.appraisalObject.physicalAssetValue !== prevState.physicalAssetValue ||
        nextProps.appraisalObject.physicalAssetValue === 0)
    ) {
      var physicalAssetValue = numeral(nextProps.values.physicalAssetValue).format('$0,0.[99]')
    }

    return {
      physicalAssetValue: physicalAssetValue || prevState.physicalAssetValue
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

  _handleChangeCheckBox = (e, { name }) => {
    this.props.setFieldValue(name, !this.props.values[name])
  }

  render () {
    const { handleChange, handleBlur, errors, touched } = this.props
    return (
      <Fragment>
        <Segment>
          <Header style={{ marginTop: '10px', marginBottom: '10px' }} as="h3" textAlign="center" color="blue">
            Physical Asset Value
          </Header>
          <Grid celled="internally" divided>
            <Grid.Row columns={3}>
              <CustomColumn textAlign="center">Physical Asset Value (Excluding Stock)</CustomColumn>
              <CustomColumn>
                <Form size="tiny">
                  <Form.Field>
                    <Form.Input
                      name="physicalAssetValue"
                      autoComplete="physicalAssetValue"
                      value={this.state.physicalAssetValue}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.physicalAssetValue && touched.physicalAssetValue && (
                      <Label basic color="red" pointing content={errors.physicalAssetValue} />
                    )}
                  </Form.Field>
                </Form>
              </CustomColumn>
              <CustomColumn />
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
  updateAppraisal: PropTypes.func,
  appraisalObject: PropTypes.object,
  business: PropTypes.object
}

const mapPropsToValues = props => ({
  business_id: props.business ? props.business.id : '',
  id: props.appraisalObject ? props.appraisalObject.id : '',
  physicalAssetValue: props.appraisalObject ? props.appraisalObject.physicalAssetValue : 0
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

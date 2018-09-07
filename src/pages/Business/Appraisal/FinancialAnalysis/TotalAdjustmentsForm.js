import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Grid } from 'semantic-ui-react'
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
    // const {
    //   values,
    //   handleChange,
    //   handleBlur,
    //   errors,
    //   touched,
    //   financialYear
    // } = this.props
    return (
      <Fragment>
        <Grid.Row columns={9}>
          <CustomColumn>
            <b>Total Adjustments</b>
          </CustomColumn>
          <CustomColumn textAlign="center">0</CustomColumn>
          <CustomColumn textAlign="center">0</CustomColumn>
          <CustomColumn textAlign="center">0</CustomColumn>
          <CustomColumn textAlign="center">0</CustomColumn>
          <CustomColumn textAlign="center">0</CustomColumn>
          <CustomColumn textAlign="center">0</CustomColumn>
          <CustomColumn textAlign="center">0</CustomColumn>
        </Grid.Row>
        <Grid.Row columns={9}>
          <CustomColumn>
            <b>Total Adjusted Profit INCL. Owners Wages</b>
          </CustomColumn>
          <CustomColumn textAlign="center">0</CustomColumn>
          <CustomColumn textAlign="center">0</CustomColumn>
          <CustomColumn textAlign="center">0</CustomColumn>
          <CustomColumn textAlign="center">0</CustomColumn>
          <CustomColumn textAlign="center">0</CustomColumn>
          <CustomColumn textAlign="center">0</CustomColumn>
          <CustomColumn textAlign="center">0</CustomColumn>
        </Grid.Row>
        <Grid.Row columns={9}>
          <CustomColumn>
            <b>Adjusted Profit % </b>
          </CustomColumn>
          <CustomColumn textAlign="center">0 %</CustomColumn>
          <CustomColumn textAlign="center">0 %</CustomColumn>
          <CustomColumn textAlign="center">0 %</CustomColumn>
          <CustomColumn textAlign="center">0 %</CustomColumn>
          <CustomColumn textAlign="center">0 %</CustomColumn>
          <CustomColumn textAlign="center">0 %</CustomColumn>
          <CustomColumn textAlign="center">0 %</CustomColumn>
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

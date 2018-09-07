import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Form, Label, Segment } from 'semantic-ui-react'
import * as Yup from 'yup'
import { listAppraisalRegister } from '../../../../redux/ducks/appraisalRegister'

class AddbacksAndAdjustmentsForm extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.props.listAppraisalRegister('financialInfoSource', 5)
  }

  _handleChangeCheckBox = (e, { name }) => {
    this.props.setFieldValue(name, !this.props.values[name])
  }

  render () {
    const { values, errors, touched, financialInfoSourceOptions } = this.props
    console.log(financialInfoSourceOptions)
    return (
      <Fragment>
        <Segment>
          <Form>
            <Form.Field>
              <Form.Select
                label="Financial Information Source"
                options={financialInfoSourceOptions.label}
                name="businessType"
                autoComplete="businessType"
                value={values.businessType}
                onChange={this._handleSelectChange}
              />
              {errors.businessType &&
                touched.businessType && (
                <Label
                  basic
                  color="red"
                  pointing
                  content={errors.businessType}
                />
              )}
            </Form.Field>
          </Form>
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
  financialInfoSourceOptions: PropTypes.object,
  listAppraisalRegister: PropTypes.func
}

const mapPropsToValues = props => ({})

const mapStateToProps = state => {
  return {
    financialInfoSourceOptions:
      state.appraisalRegister.get.financialInfoSource.array
  }
}

const validationSchema = Yup.object().shape({})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ listAppraisalRegister }, dispatch)
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

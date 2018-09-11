import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Form, Label } from 'semantic-ui-react'
import * as Yup from 'yup'

class PremisesAndEmployeesForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      premisesOwnedRentedOptions: [
        { key: '1', text: 'Rented', value: 'Rented' },
        { key: '2', text: 'Owned', value: 'Owned' },
        { key: '3', text: 'Other', value: 'Other' }
      ]
    }
  }

  _handleChangeCheckBox = (e, { name }) => {
    this.props.setFieldValue(name, !this.props.values[name])
  }

  _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
  }

  render () {
    const {
      values,
      handleChange,
      handleBlur,
      errors,
      touched,
      isValid
    } = this.props
    const { premisesOwnedRentedOptions } = this.state
    return (
      <Fragment>
        <Form.Group>
          <Form.Field width={6}>
            <Form.Select
              label="Premises Owned or Rented"
              options={premisesOwnedRentedOptions}
              name="premisesOwnedRented"
              autoComplete="premisesOwnedRented"
              value={values.premisesOwnedRented}
              onChange={this._handleSelectChange}
            />
            {errors.premisesOwnedRented &&
              touched.premisesOwnedRented && (
              <Label
                basic
                color="red"
                pointing
                content={errors.premisesOwnedRented}
              />
            )}
          </Form.Field>
          {this.props.values.premisesOwnedRented === 'Rented' ? (
            <Fragment>
              <Form.Field width={5}>
                <Form.Input
                  label="Rent Cost"
                  name="rentCost"
                  autoComplete="rentCost"
                  value={values.rentCost}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.rentCost &&
                  touched.rentCost && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.rentCost}
                  />
                )}
              </Form.Field>
              <Form.Field width={5}>
                <Form.Input
                  label="Time remaining on Lease"
                  name="timeRemLease"
                  autoComplete="timeRemLease"
                  value={values.timeRemLease}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.timeRemLease &&
                  touched.timeRemLease && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.timeRemLease}
                  />
                )}
              </Form.Field>
            </Fragment>
          ) : null}
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field>
            <Form.TextArea
              label="Premises Notes"
              name="premisesNotes"
              autoComplete="premisesNotes"
              value={values.premisesNotes}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.premisesNotes &&
              touched.premisesNotes && (
              <Label
                basic
                color="red"
                pointing
                content={errors.premisesNotes}
              />
            )}
          </Form.Field>
        </Form.Group>
        <Form.Group>
          <h4>Number of Employees (Not including Owners)</h4>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field width={4}>
            <Form.Input
              label="Full Time"
              name="fullTime"
              autoComplete="fullTime"
              value={values.fullTime}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.fullTime &&
              touched.fullTime && (
              <Label basic color="red" pointing content={errors.fullTime} />
            )}
          </Form.Field>
          <Form.Field width={4}>
            <Form.Input
              label="Part Time"
              name="partTime"
              autoComplete="partTime"
              value={values.partTime}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.partTime &&
              touched.partTime && (
              <Label basic color="red" pointing content={errors.partTime} />
            )}
          </Form.Field>
          <Form.Field width={4}>
            <Form.Input
              label="Sub-Contractors"
              name="subContractors"
              autoComplete="subContractors"
              value={values.subContractors}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.subContractors &&
              touched.subContractors && (
              <Label
                basic
                color="red"
                pointing
                content={errors.subContractors}
              />
            )}
          </Form.Field>
          <Form.Field width={4}>
            <Form.Input
              label="Casuals"
              name="casuals"
              autoComplete="casuals"
              value={values.casuals}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.casuals &&
              touched.casuals && (
              <Label basic color="red" pointing content={errors.casuals} />
            )}
          </Form.Field>
        </Form.Group>
        <Form.Group>
          <Form.Field>
            <Form.Checkbox
              label="Please confirm that you have completed the above information"
              name="confirmAbout"
              onChange={this._handleChangeCheckBox}
              checked={values.confirmPremisesEnployees}
              disabled={!isValid}
            />
          </Form.Field>
        </Form.Group>
      </Fragment>
    )
  }
}

PremisesAndEmployeesForm.propTypes = {
  values: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  errors: PropTypes.object,
  touched: PropTypes.object,
  setFieldValue: PropTypes.func,
  isValid: PropTypes.bool
}

const mapPropsToValues = props => ({
  fullTime: 0,
  partTime: 0,
  subContractors: 0,
  casual: 0
})

const mapStateToProps = state => {
  return {}
}

const validationSchema = Yup.object().shape({
  premisesOwnedRented: Yup.string().required(
    'Premises Owned or Rented is required'
  ),
  premisesNotes: Yup.string().required('Premises Notes is required'),
  fullTime: Yup.number().typeError('You must type only numbers.'),
  partTime: Yup.number().typeError('You must type only numbers.'),
  subContractors: Yup.number().typeError('You must type only numbers.'),
  casuals: Yup.number().typeError('You must type only numbers.')
})

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
  })(PremisesAndEmployeesForm)
)

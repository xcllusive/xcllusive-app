import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Form, Label, Radio } from 'semantic-ui-react'
import * as Yup from 'yup'

import { OptionsLargestClient5TO } from '../../constants/OptionsLargestClient5TO'

class CustomersSuppliersForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      largestClient5TOOptions: OptionsLargestClient5TO,
      owners1sHoursOptions: [
        { key: '1', text: '< 5 days', value: '< 5 days' },
        { key: '2', text: '5 days', value: '5 days' },
        { key: '3', text: '6 days', value: '6 days' },
        { key: '4', text: '7 days', value: '7 days' },
        { key: '5', text: 'Under Management', value: 'Under Management' }
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
      // isSubmitting,
      isValid
    } = this.props
    const { largestClient5TOOptions } = this.state
    return (
      <Fragment>
        <Form.Group widths="equal">
          <Form.Field>
            <Form.TextArea
              label="Description & Customers"
              name="descriptionCustomers"
              autoComplete="descriptionCustomers"
              value={values.descriptionCustomers}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.descriptionCustomers &&
              touched.descriptionCustomers && (
              <Label
                basic
                color="red"
                pointing
                content={errors.descriptionCustomers}
              />
            )}
          </Form.Field>
        </Form.Group>
        <Form.Group>
          <label>Client Database Available?</label>
          <Form.Field
            width={2}
            control={Radio}
            label="Yes"
            name="clientDatabaseAvailable"
            onChange={this._handleChangeCheckBox}
            checked={values.clientDatabaseAvailable}
          />
          <Form.Field
            width={3}
            control={Radio}
            label="No"
            name="clientDatabaseAvailable"
            onChange={this._handleChangeCheckBox}
            checked={!values.clientDatabaseAvailable}
          />
          <label>
            Are there any clients taking up greater than 10% of the T/O?
          </label>
          <Form.Field
            width={2}
            control={Radio}
            label="Yes"
            name="client10TO"
            onChange={this._handleChangeCheckBox}
            checked={values.client10TO}
          />
          <Form.Field
            width={2}
            control={Radio}
            label="No"
            name="client10TO"
            onChange={this._handleChangeCheckBox}
            checked={!values.client10TO}
          />
        </Form.Group>
        {values.client10TO ? (
          <Form.Group widths="equal">
            <Form.Field>
              <Form.TextArea
                label="Description"
                name="description"
                autoComplete="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.description &&
                touched.description && (
                <Label
                  basic
                  color="red"
                  pointing
                  content={errors.description}
                />
              )}
            </Form.Field>
          </Form.Group>
        ) : null}
        <Form.Group>
          <Form.Field>
            <Form.Select
              label="Largest 5 clients % of T/O:"
              options={largestClient5TOOptions}
              name="client5TO"
              autoComplete="client5TO"
              value={values.client5TO}
              onChange={this._handleSelectChange}
            />
            {errors.client5TO &&
              touched.client5TO && (
              <Label basic color="red" pointing content={errors.client5TO} />
            )}
          </Form.Field>
          <Form.Field width={10}>
            <Form.TextArea
              label="Description of Suppliers"
              name="descriptionSuppliers"
              autoComplete="descriptionSuppliers"
              value={values.descriptionSuppliers}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.descriptionSuppliers &&
              touched.descriptionSuppliers && (
              <Label
                basic
                color="red"
                pointing
                content={errors.descriptionSuppliers}
              />
            )}
          </Form.Field>
        </Form.Group>
        <Form.Group>
          <Form.Field>
            <Form.Checkbox
              label="Please confirm that you have completed the above information"
              name="confirmAbout"
              onChange={this._handleChangeCheckBox}
              checked={values.confirmCustomersSuppliers}
              disabled={!isValid}
            />
          </Form.Field>
        </Form.Group>
      </Fragment>
    )
  }
}

CustomersSuppliersForm.propTypes = {
  values: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  errors: PropTypes.object,
  touched: PropTypes.object,
  setFieldValue: PropTypes.func,
  isSubmitting: PropTypes.bool,
  isValid: PropTypes.bool,
  business: PropTypes.object,
  typeOptions: PropTypes.array,
  industryOptions: PropTypes.array,
  getBusiness: PropTypes.func,
  openModal: PropTypes.func
}

const mapPropsToValues = props => ({
  tradingHours: 0,
  nOfBusinessLocations: 0
})

const mapStateToProps = state => {
  return {
    typeOptions: state.business.get.typeOptions,
    industryOptions: state.business.get.industryOptions
  }
}

const validationSchema = Yup.object().shape({
  businessType: Yup.string().required('Business Type is required'),
  businessIndustry: Yup.string().required('Business Industry is required'),
  businessCommenced: Yup.string().required('Business Commenced is required'),
  currentOwner: Yup.string().required('Current Owner is required'),
  productsServices: Yup.string()
    .required('This field is required.')
    .max(130, 'This field require max 130 characters.'),
  tradingHours: Yup.number().typeError('You must type only number here!'),
  nOfBusinessLocations: Yup.number().typeError(
    'You must type only number here!'
  )
})

const handleSubmit = (values, { props, setSubmitting }) => {
  props.updateBusiness(values).then(setSubmitting(false))
}

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
    handleSubmit,
    enableReinitialize: true
  })(CustomersSuppliersForm)
)

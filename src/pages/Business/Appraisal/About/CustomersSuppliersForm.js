import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Form, Label, Radio } from 'semantic-ui-react'

import { OptionsLargestClient5TO } from '../../../../constants/OptionsLargestClient5TO'

const CustomersSuppliersForm = ({ values,
  handleChange,
  handleBlur,
  errors,
  touched, isValid }) => {
  const state = {
    largestClient5TOOptions: OptionsLargestClient5TO,
    owners1sHoursOptions: [
      { key: '1', text: '< 5 days', value: '< 5 days' },
      { key: '2', text: '5 days', value: '5 days' },
      { key: '3', text: '6 days', value: '6 days' },
      { key: '4', text: '7 days', value: '7 days' },
      { key: '5', text: 'Under Management', value: 'Under Management' }
    ]
  }
  const _handleChangeCheckBox = (e, { name }) => {
    this.props.setFieldValue(name, !this.props.values[name])
  }

  const _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
  }

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
          onChange={_handleChangeCheckBox}
          checked={values.clientDatabaseAvailable}
        />
        <Form.Field
          width={3}
          control={Radio}
          label="No"
          name="clientDatabaseAvailable"
          onChange={_handleChangeCheckBox}
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
          onChange={_handleChangeCheckBox}
          checked={values.client10TO}
        />
        <Form.Field
          width={2}
          control={Radio}
          label="No"
          name="client10TO"
          onChange={_handleChangeCheckBox}
          checked={!values.client10TO}
        />
      </Form.Group>
      {values.client10TO ? (
        <Form.Group widths="equal">
          <Form.Field>
            <Form.TextArea
              label="Description"
              name="descriptionClient10TO"
              autoComplete="descriptionClient10TO"
              value={values.descriptionClient10TO}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.descriptionClient10TO &&
                touched.descriptionClient10TO && (
              <Label
                basic
                color="red"
                pointing
                content={errors.descriptionClient10TO}
              />
            )}
          </Form.Field>
        </Form.Group>
      ) : null}
      <Form.Group>
        <Form.Field>
          <Form.Select
            label="Largest 5 clients % of T/O:"
            options={state.largestClient5TOOptions}
            name="client5TO"
            autoComplete="client5TO"
            value={values.client5TO}
            onChange={_handleSelectChange}
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
            name="confirmCustomersSuppliers"
            onChange={this._handleChangeCheckBox}
            checked={values.confirmCustomersSuppliers}
            disabled={!isValid}
          />
        </Form.Field>
      </Form.Group>
    </Fragment>
  )
}

CustomersSuppliersForm.propTypes = {
  values: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  errors: PropTypes.object,
  touched: PropTypes.object,
  setFieldValue: PropTypes.func,
  isValid: PropTypes.bool,
  appraisalObject: PropTypes.object,
  updateAppraisal: PropTypes.func,
  business: PropTypes.object,
  sendValuesToAbout: PropTypes.func
}

export default CustomersSuppliersForm

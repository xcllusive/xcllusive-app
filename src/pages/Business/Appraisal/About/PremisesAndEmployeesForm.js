import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Form, Label } from 'semantic-ui-react'

const PremisesAndEmployeesForm = ({ values, handleChange, handleBlur, errors, touched, isValid, setFieldValue }) => {
  const state = {
    premisesOwnedRentedOptions: [
      { key: '1', text: 'Rented', value: 'Rented' },
      { key: '2', text: 'Owned', value: 'Owned' },
      { key: '3', text: 'Other', value: 'Other' }
    ]
  }

  const _handleSelectChange = (e, { name, value }) => {
    setFieldValue(name, value)
  }
  const _handleChangeTextArea = e => {
    if (e.target.type === 'textarea' && e.which === 13 /* Enter */) {
      e.preventDefault()
    }
  }

  return (
    <Fragment>
      <Form.Group>
        <Form.Field width={6}>
          <Form.Select
            label="Premises Owned or Rented"
            options={state.premisesOwnedRentedOptions}
            name="premisesOwnedRented"
            autoComplete="premisesOwnedRented"
            value={values.premisesOwnedRented}
            onChange={_handleSelectChange}
          />
          {errors.premisesOwnedRented && touched.premisesOwnedRented && (
            <Label basic color="red" pointing content={errors.premisesOwnedRented} />
          )}
        </Form.Field>
        {values.premisesOwnedRented === 'Rented' ? (
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
              {errors.rentCost && touched.rentCost && <Label basic color="red" pointing content={errors.rentCost} />}
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
              {errors.timeRemLease && touched.timeRemLease && (
                <Label basic color="red" pointing content={errors.timeRemLease} />
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
            onKeyDown={_handleChangeTextArea}
          />
          {errors.premisesNotes && touched.premisesNotes && (
            <Label basic color="red" pointing content={errors.premisesNotes} />
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
          {errors.fullTime && touched.fullTime && <Label basic color="red" pointing content={errors.fullTime} />}
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
          {errors.partTime && touched.partTime && <Label basic color="red" pointing content={errors.partTime} />}
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
          {errors.subContractors && touched.subContractors && (
            <Label basic color="red" pointing content={errors.subContractors} />
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
          {errors.casuals && touched.casuals && <Label basic color="red" pointing content={errors.casuals} />}
        </Form.Field>
      </Form.Group>
    </Fragment>
  )
}

PremisesAndEmployeesForm.propTypes = {
  values: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  errors: PropTypes.object,
  touched: PropTypes.object,
  setFieldValue: PropTypes.func,
  isValid: PropTypes.bool,
  appraisalObject: PropTypes.object,
  business: PropTypes.object
}

export default PremisesAndEmployeesForm

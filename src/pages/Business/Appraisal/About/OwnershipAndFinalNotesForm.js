import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Form, Label } from 'semantic-ui-react'

const OwnershipAndFinalNotesForm = ({ values, handleChange, handleBlur, errors, touched, isValid, setFieldValue }) => {
  const state = {
    owners1sHoursOptions: [
      { key: '1', text: '< 5 days', value: '< 5 days' },
      { key: '2', text: '5 days', value: '5 days' },
      { key: '3', text: '6 days', value: '6 days' },
      { key: '4', text: '7 days', value: '7 days' },
      { key: '5', text: 'Under Management', value: 'Under Management' },
      { key: '6', text: 'Not Applicable', value: 'Not Applicable' }
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
          <Form.Input
            label="Number of Owners"
            name="numberOwners"
            autoComplete="numberOwners"
            value={values.numberOwners}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.numberOwners && touched.numberOwners && (
            <Label basic color="red" pointing content={errors.numberOwners} />
          )}
        </Form.Field>
        <Form.Field width={10}>
          <Form.Select
            label="Owner 1's Hours"
            options={state.owners1sHoursOptions}
            name="owners1sHours"
            autoComplete="owners1sHours"
            value={values.owners1sHours}
            onChange={_handleSelectChange}
          />
          {errors.owners1sHours && touched.owners1sHours && (
            <Label basic color="red" pointing content={errors.owners1sHours} />
          )}
        </Form.Field>
      </Form.Group>
      <Form.Group>
        <Form.Field width={10}>
          <Form.TextArea
            label="Owner 1's Role"
            name="owners1sRole"
            autoComplete="owners1sRole"
            value={values.owners1sRole}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={_handleChangeTextArea}
          />
          {errors.owners1sRole && touched.owners1sRole && (
            <Label basic color="red" pointing content={errors.owners1sRole} />
          )}
        </Form.Field>
        <Form.Field width={6}>
          <Form.Select
            label="Other Owners' Hours"
            options={state.owners1sHoursOptions}
            name="otherOwnersHours"
            autoComplete="otherOwnersHours"
            value={values.otherOwnersHours}
            onChange={_handleSelectChange}
          />
          {errors.otherOwnersHours && touched.otherOwnersHours && (
            <Label basic color="red" pointing content={errors.otherOwnersHours} />
          )}
        </Form.Field>
      </Form.Group>
      <Form.Group>
        <Form.Field width={10}>
          <Form.TextArea
            label="Other Owners' Role"
            name="otherOwnersRole"
            autoComplete="otherOwnersRole"
            value={values.otherOwnersRole}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={_handleChangeTextArea}
          />
          {errors.otherOwnersRole && touched.otherOwnersRole && (
            <Label basic color="red" pointing content={errors.otherOwnersRole} />
          )}
        </Form.Field>
        <Form.Field width={10}>
          <Form.TextArea
            label="Other Relevant Notes"
            name="otherRelevantNotes"
            autoComplete="otherRelevantNotes"
            value={values.otherRelevantNotes}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={_handleChangeTextArea}
          />
          {errors.otherRelevantNotes && touched.otherRelevantNotes && (
            <Label basic color="red" pointing content={errors.otherRelevantNotes} />
          )}
        </Form.Field>
      </Form.Group>
    </Fragment>
  )
}

OwnershipAndFinalNotesForm.propTypes = {
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

export default OwnershipAndFinalNotesForm

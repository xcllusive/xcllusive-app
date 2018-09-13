import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Form, Label } from 'semantic-ui-react'
import * as Yup from 'yup'

class OwnershipAndFinalNotesForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
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
      isValid
    } = this.props
    const { owners1sHoursOptions } = this.state
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
            {errors.numberOwners &&
              touched.numberOwners && (
              <Label
                basic
                color="red"
                pointing
                content={errors.numberOwners}
              />
            )}
          </Form.Field>
          <Form.Field width={10}>
            <Form.Select
              label="Owner 1's Hours"
              options={owners1sHoursOptions}
              name="owners1sHours"
              autoComplete="owners1sHours"
              value={values.owners1sHours}
              onChange={this._handleSelectChange}
            />
            {errors.owners1sHours &&
              touched.owners1sHours && (
              <Label
                basic
                color="red"
                pointing
                content={errors.owners1sHours}
              />
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
            />
            {errors.owners1sRole &&
              touched.owners1sRole && (
              <Label
                basic
                color="red"
                pointing
                content={errors.owners1sRole}
              />
            )}
          </Form.Field>
          <Form.Field width={6}>
            <Form.Select
              label="Other Owners' Hours"
              options={owners1sHoursOptions}
              name="otherOwnersHours"
              autoComplete="otherOwnersHours"
              value={values.otherOwnersHours}
              onChange={this._handleSelectChange}
            />
            {errors.otherOwnersHours &&
              touched.otherOwnersHours && (
              <Label
                basic
                color="red"
                pointing
                content={errors.otherOwnersHours}
              />
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
            />
            {errors.otherOwnersRole &&
              touched.otherOwnersRole && (
              <Label
                basic
                color="red"
                pointing
                content={errors.otherOwnersRole}
              />
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
            />
            {errors.otherRelevantNotes &&
              touched.otherRelevantNotes && (
              <Label
                basic
                color="red"
                pointing
                content={errors.otherRelevantNotes}
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
              checked={values.confirmOwnershipFinalNotes}
              disabled={!isValid}
            />
          </Form.Field>
        </Form.Group>
      </Fragment>
    )
  }
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

const mapPropsToValues = props => ({
  business_id: props.business ? props.business.id : '',
  id: props.appraisalObject ? props.appraisalObject.id : '',
  numberOwners: props.appraisalObject ? props.appraisalObject.numberOwners : 0,
  owners1sHours: props.appraisalObject
    ? props.appraisalObject.owners1sHours
    : '',
  owners1sRole: props.appraisalObject ? props.appraisalObject.owners1sRole : '',
  otherOwnersHours: props.appraisalObject
    ? props.appraisalObject.otherOwnersHours
    : '',
  otherOwnersRole: props.appraisalObject
    ? props.appraisalObject.otherOwnersRole
    : '',
  otherRelevantNotes: props.appraisalObject
    ? props.appraisalObject.otherRelevantNotes
    : '',
  confirmOwnershipFinalNotes: props.appraisalObject
    ? props.appraisalObject.confirmOwnershipFinalNotes
    : false
})

const mapStateToProps = state => {
  return {}
}

const validationSchema = Yup.object().shape({
  numberOwners: Yup.number()
    .required('Number of Owners is required')
    .typeError('You must type only numbers.'),
  owners1sHours: Yup.string().required('Owner 1`s Hours is required'),
  owners1sRole: Yup.string().required('Owner 1`s Role is required'),
  otherOwnersHours: Yup.string().required('Other Owners` Hours is required'),
  otherOwnersRole: Yup.string().required('Other Owners` Role is required'),
  otherRelevantNotes: Yup.string().required('Other Relevant Notes is required')
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
  })(OwnershipAndFinalNotesForm)
)

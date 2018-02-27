import React, { Component } from 'react'
import PropTypes from 'prop-types'
//  import { connect } from 'react-redux'
//  import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Modal, Form, Label, Checkbox, Icon, Button } from 'semantic-ui-react'
import styled from 'styled-components'
import Yup from 'yup'

const CheckboxFormatted = styled.div`
  padding-right: 1em`

class NewBusinessRegisterForm extends Component {
  componentWillReceiveProps (nextProps) {
  }

  _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
  }

  _handleChangeCheckBox = (e, { value }) => {
    this.props.setFieldValue(value, !this.props.values[value])
  }

  render () {
    const {
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
      isValid,
      isLoading,
      modalOpen,
      toggleModal
    } = this.props
    return (
      <Modal
        dimmer={'blurring'}
        open={modalOpen}
      >
        <Modal.Header align='center'>New Business Register</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group widths='equal'>
              <Form.Field width={9}>
                <label>Business Register:</label>
              </Form.Field>
              <Form.Field width={2}>
                <Checkbox
                  as={CheckboxFormatted}
                  label='Business Source'
                  value='businessSource'
                  checked={values.businessSource}
                  onChange={this._handleChangeCheckBox}
                />
              </Form.Field>
              <Form.Field width={2}>
                <Checkbox
                  as={CheckboxFormatted}
                  label='Business Rating'
                  value='businessRating'
                  checked={values.businessRating}
                  onChange={this._handleChangeCheckBox}
                />
              </Form.Field>
              <Form.Field width={2}>
                <Checkbox
                  as={CheckboxFormatted}
                  label='Business Product'
                  value='businessProduct'
                  checked={values.businessProduct}
                  onChange={this._handleChangeCheckBox}
                />
              </Form.Field>
              <Form.Field width={2}>
                <Checkbox
                  as={CheckboxFormatted}
                  label='Business Industry'
                  value='businessIndustry'
                  checked={values.businessIndustry}
                  onChange={this._handleChangeCheckBox}
                />
              </Form.Field>
              <Form.Field width={2}>
                <Checkbox
                  as={CheckboxFormatted}
                  label='Business Type'
                  value='businessType'
                  checked={values.businessType}
                  onChange={this._handleChangeCheckBox}
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  as={CheckboxFormatted}
                  label='Business Owner`s Time'
                  value='businessOwnersTime'
                  checked={values.businessOwnersTime}
                  onChange={this._handleChangeCheckBox}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field width={1}>
                <Form.Input
                  label='ID'
                  name='id'
                  autoComplete='id'
                  value={values.id}
                  readOnly
                />
              </Form.Field>
              <Form.Field width={15}>
                <Form.Input
                  required
                  label='Label'
                  name='label'
                  autoComplete='label'
                  value={values.label}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.label && touched.label && <Label basic color='red' pointing content={errors.label} />}
              </Form.Field>
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color='blue'
            disabled={isSubmitting || !isValid}
            loading={isLoading}
            onClick={handleSubmit}
          >
            <Icon name='save' />
            Create Register
          </Button>
          <Button
            color='red'
            onClick={toggleModal}
          >
            <Icon name='cancel' />
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

NewBusinessRegisterForm.propTypes = {
  values: PropTypes.object,
  touched: PropTypes.object,
  errors: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  setFieldValue: PropTypes.func,
  toggleModal: PropTypes.func,
  isSubmitting: PropTypes.bool,
  isValid: PropTypes.bool,
  isLoading: PropTypes.bool,
  modalOpen: PropTypes.bool
}

const mapPropsToValues = () => ({
  id: '',
  label: ''
})

const validationSchema = Yup.object().shape({
  label: Yup.string()
    .required('Label is required.')
    .min(2, 'Label required minimum 2 characters.')
    .max(200, 'Label require max 200 characters.')
})

/* const handleSubmit = (values, { props, setSubmitting }) => {
  props.createUser(values)
  setSubmitting(false)
} */

/* const mapStateToProps = state => {
  return {
    isLoading: state.user.isLoading
  }
} */

/* const mapDispatchToProps = dispatch => {
  return bindActionCreators({ createUser }, dispatch)
} */

export default (
  withFormik({
    validationSchema,
    mapPropsToValues})(NewBusinessRegisterForm)
)

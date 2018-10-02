import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Modal, Form, Icon, Button, Label } from 'semantic-ui-react'
import * as Yup from 'yup'

import { closeModal } from '../../redux/ducks/modal'
import { getBusinessRegister } from '../../redux/ducks/businessRegister'

import { mapArrayToValuesForDropdown } from '../../utils/sharedFunctionArray'

class ModalNewBusiness extends Component {
  componentDidMount () {
    this.props.getBusinessRegister(1)
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
      handleSubmit,
      isSubmitting,
      isValid,
      isLoading,
      sourceOptions,
      dropDownLoading,
      title,
      closeModal
    } = this.props
    return (
      <Modal open dimmer={'blurring'}>
        <Modal.Header align="center">{title}</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group widths="equal">
              <Form.Field>
                <Form.Input
                  required
                  label="Business name"
                  name="businessName"
                  autoComplete="businessName"
                  value={values.businessName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.businessName &&
                  touched.businessName && <Label basic color="red" pointing content={errors.businessName} />}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  required
                  label="First name"
                  name="firstName"
                  autoComplete="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.firstName &&
                  touched.firstName && <Label basic color="red" pointing content={errors.firstName} />}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  required
                  label="Last name"
                  name="lastName"
                  autoComplete="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.lastName && touched.lastName && <Label basic color="red" pointing content={errors.lastName} />}
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <Form.Input
                  label="Telephone 1"
                  name="vendorPhone1"
                  autoComplete="vendorPhone1"
                  value={values.vendorPhone1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.vendorPhone1 &&
                  touched.vendorPhone1 && <Label basic color="red" pointing content={errors.vendorPhone1} />}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Telephone 2"
                  name="vendorPhone2"
                  autoComplete="vendorPhone2"
                  value={values.vendorPhone2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.vendorPhone2 &&
                  touched.vendorPhone2 && <Label basic color="red" pointing content={errors.vendorPhone2} />}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Telephone 3"
                  name="vendorPhone3"
                  autoComplete="vendorPhone3"
                  value={values.vendorPhone3}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.vendorPhone3 &&
                  touched.vendorPhone3 && <Label basic color="red" pointing content={errors.vendorPhone3} />}
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <Form.Input
                  required
                  label="Email"
                  name="vendorEmail"
                  autoComplete="vendorEmail"
                  value={values.vendorEmail}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.vendorEmail &&
                  touched.vendorEmail && <Label basic color="red" pointing content={errors.vendorEmail} />}
              </Form.Field>
              <Form.Field>
                <Form.Select
                  required
                  label="Source"
                  options={mapArrayToValuesForDropdown(sourceOptions)}
                  name="businessSource"
                  autoComplete="businessSource"
                  loading={dropDownLoading}
                  disabled={dropDownLoading}
                  value={values.businessSource}
                  onChange={this._handleSelectChange}
                />
                {errors.businessSource &&
                  touched.businessSource && <Label basic color="red" pointing content={errors.businessSource} />}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Source Notes"
                  name="sourceNotes"
                  autoComplete="sourceNotes"
                  value={values.sourceNotes}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.sourceNotes &&
                  touched.sourceNotes && <Label basic color="red" pointing content={errors.sourceNotes} />}
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <Form.TextArea
                  required
                  label="Notes"
                  name="description"
                  autoComplete="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.description &&
                  touched.description && <Label basic color="red" pointing content={errors.description} />}
              </Form.Field>
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="blue"
            disabled={isSubmitting || !isValid}
            loading={isLoading}
            onClick={handleSubmit}
            type="submit"
          >
            <Icon name="save" />
            Create Business
          </Button>
          <Button color="red" onClick={closeModal}>
            <Icon name="cancel" />
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

ModalNewBusiness.propTypes = {
  values: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  errors: PropTypes.object,
  touched: PropTypes.object,
  isSubmitting: PropTypes.bool,
  isValid: PropTypes.bool,
  isLoading: PropTypes.bool,
  handleSubmit: PropTypes.func,
  setFieldValue: PropTypes.func,
  sourceOptions: PropTypes.array,
  getBusinessRegister: PropTypes.func,
  dropDownLoading: PropTypes.bool,
  title: PropTypes.string,
  closeModal: PropTypes.func
}

const mapPropsToValues = () => ({
  businessName: '',
  firstName: '',
  lastName: '',
  vendorPhone1: '',
  vendorPhone2: '',
  vendorPhone3: '',
  vendorEmail: '',
  businessSource: '',
  sourceNotes: '',
  description: ''
})

const validationSchema = Yup.object().shape({
  businessName: Yup.string()
    .required('Business name is required.')
    .max(120, 'Business name require max 120 characters.'),
  firstName: Yup.string()
    .required('First name is required.')
    .max(40, 'First name require max 40 characters.'),
  lastName: Yup.string()
    .required('Last name is required.')
    .max(40, 'Last name require max 40 characters.'),
  vendorPhone1: Yup.string().max(15, 'Telephone 1 require max 15 characters.'),
  vendorPhone2: Yup.string().max(15, 'Telephone 2 require max 15 characters.'),
  vendorPhone3: Yup.string().max(15, 'Telephone 3 require max 15 characters.'),
  vendorEmail: Yup.string()
    .email('Invalid email address.')
    .required('Email is required.'),
  businessSource: Yup.number().required('Source is required.'),
  sourceNotes: Yup.string().max(40, 'Source Notes require max 40 characters.'),
  description: Yup.string()
    .required('Notes is required.')
    .max(2000, 'Source Notes require max 2000 characters.')
})

const handleSubmit = (values, { props, setSubmitting }) => {
  props.onConfirm(values)
}

const mapStateToProps = state => {
  return {
    isLoading: state.business.create.isLoading,
    sourceOptions: state.businessRegister.get.source.array,
    dropDownLoading: state.businessRegister.get.source.isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getBusinessRegister, closeModal }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues,
    validationSchema,
    handleSubmit
  })(ModalNewBusiness)
)

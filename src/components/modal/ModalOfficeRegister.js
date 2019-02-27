import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withFormik } from 'formik'
import { bindActionCreators } from 'redux'
import { Modal, Form, Label, Icon, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as Yup from 'yup'

import { closeModal } from '../../redux/ducks/modal'
import { createOfficeRegister, updateOfficeRegister, getOfficeRegister } from '../../redux/ducks/officeRegister'

class ModalOfficeRegister extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  static getDerivedStateFromProps = nextProps => {
    if (nextProps.isCreated || nextProps.isUpdated) {
      nextProps.getOfficeRegister(nextProps.values.officeRegister)
    }
    return null
  }

  _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
  }

  render () {
    const {
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      isValid,
      createLoading,
      updateLoading
    } = this.props
    return (
      <Modal open dimmer="blurring">
        <Modal.Header align="center">{this.props.title ? this.props.title : ''}</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group>
              <Form.Field width={16}>
                <Form.Input
                  required
                  label="Office Name"
                  name="label"
                  autoComplete="label"
                  value={values.label}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.label && touched.label && <Label basic color="red" pointing content={errors.label} />}
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field width={16}>
                <Form.Input
                  required
                  label="Address"
                  name="address"
                  autoComplete="address"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.address && touched.address && <Label basic color="red" pointing content={errors.address} />}
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field width={16}>
                <Form.Input
                  required
                  label="Phone Number"
                  name="phoneNumber"
                  autoComplete="phoneNumber"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.phoneNumber && touched.phoneNumber && (
                  <Label basic color="red" pointing content={errors.phoneNumber} />
                )}
              </Form.Field>
              <Form.Field width={16}>
                <Form.Input
                  required
                  label="License"
                  name="license"
                  autoComplete="license"
                  value={values.license}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.license && touched.license && <Label basic color="red" pointing content={errors.license} />}
              </Form.Field>
              <Form.Field width={16}>
                <Form.Input
                  required
                  label="ABN"
                  name="abn"
                  autoComplete="abn"
                  value={values.abn}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.abn && touched.abn && <Label basic color="red" pointing content={errors.abn} />}
              </Form.Field>
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            type="submit"
            color="blue"
            disabled={createLoading || updateLoading || !isValid}
            loading={createLoading || updateLoading}
            onClick={handleSubmit}
          >
            <Icon name="save" />
            {this.props.objectOfficeRegister ? 'Edit Register' : 'Create Register'}
          </Button>
          <Button color="red" onClick={this.props.closeModal}>
            <Icon name="cancel" />
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

ModalOfficeRegister.propTypes = {
  closeModal: PropTypes.func.isRequired,
  title: PropTypes.string,
  values: PropTypes.object,
  touched: PropTypes.object,
  errors: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  setFieldValue: PropTypes.func,
  isValid: PropTypes.bool,
  createLoading: PropTypes.bool,
  objectOfficeRegister: PropTypes.object,
  updateLoading: PropTypes.bool,
  isCreated: PropTypes.bool,
  isUpdated: PropTypes.bool,
  getOfficeRegister: PropTypes.func
}

const mapPropsToValues = props => ({
  id: props.objectOfficeRegister ? props.objectOfficeRegister.id : null,
  label: props.objectOfficeRegister ? props.objectOfficeRegister.label : '',
  address: props.objectOfficeRegister ? props.objectOfficeRegister.address : '',
  phoneNumber: props.objectOfficeRegister ? props.objectOfficeRegister.phoneNumber : '',
  license: props.objectOfficeRegister ? props.objectOfficeRegister.license : '',
  abn: props.objectOfficeRegister ? props.objectOfficeRegister.abn : ''
})

const validationSchema = Yup.object().shape({
  label: Yup.string()
    .required('Label is required.')
    .min(2, 'Label required minimum 2 characters.')
    .max(200, 'Label require max 200 characters.'),
  address: Yup.string()
    .required('Address is required.')
    .min(2, 'Address required minimum 2 characters.')
    .max(255, 'Address require max 255 characters.'),
  phoneNumber: Yup.string()
    .required('Phone Number is required.')
    .min(2, 'Phone Number required minimum 2 characters.')
    .max(255, 'Phone Number require max 45 characters.'),
  license: Yup.string()
    .required('License is required.')
    .min(2, 'License required minimum 2 characters.')
    .max(255, 'License require max 45 characters.'),
  abn: Yup.string()
    .required('ABN is required.')
    .min(2, 'ABN required minimum 2 characters.')
    .max(255, 'ABN require max 45 characters.')
})

const handleSubmit = (values, { props, setSubmitting }) => {
  if (props.objectOfficeRegister) {
    props.updateOfficeRegister(values)
  } else {
    props.createOfficeRegister(values)
  }
}

const mapStateToProps = state => ({
  createLoading: state.officeRegister.create.isLoading,
  isCreated: state.officeRegister.create.isCreated,
  updateLoading: state.officeRegister.update.isLoading,
  isUpdated: state.officeRegister.update.isUpdated
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      closeModal,
      createOfficeRegister,
      updateOfficeRegister,
      getOfficeRegister
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues,
    validationSchema,
    handleSubmit,
    enableReinitialize: true
  })(ModalOfficeRegister)
)

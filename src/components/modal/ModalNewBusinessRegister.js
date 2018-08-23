import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withFormik } from 'formik'
import { bindActionCreators } from 'redux'
import { Modal, Form, Label, Icon, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as Yup from 'yup'

import { closeModal } from '../../redux/ducks/modal'
import {
  createBusinessRegister,
  updateBusinessRegister,
  getBusinessRegister
} from '../../redux/ducks/businessRegister'

class ModalNewBusinessRegister extends Component {
  constructor (props) {
    super(props)
    this.state = {
      typesBusinessRegisters: [
        { key: 1, text: 'Business Source', value: 1 },
        { key: 2, text: 'Business Rating', value: 2 },
        { key: 3, text: 'Business Product', value: 3 },
        { key: 4, text: 'Business Industry', value: 4 },
        { key: 5, text: 'Business Type', value: 5 },
        { key: 6, text: 'Business Owner`s Time', value: 6 },
        { key: 7, text: 'Business Stage', value: 7 },
        { key: 8, text: 'Stage Not Signed', value: 8 },
        { key: 9, text: 'Stage Not Want', value: 9 }
      ],
      updatedSomething: null
    }
  }

  static getDerivedStateFromProps = nextProps => {
    if (nextProps.isCreated || nextProps.isUpdated) {
      nextProps.getBusinessRegister(nextProps.values.businessRegisterType)
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

    const { typesBusinessRegisters } = this.state

    return (
      <Modal open dimmer="blurring">
        <Modal.Header align="center">
          {this.props.title ? this.props.title : ''}
        </Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group>
              <Form.Field width={4}>
                <Form.Select
                  required
                  label="Business Register"
                  name="businessRegisterType"
                  options={typesBusinessRegisters}
                  autoComplete="businessRegisterType"
                  value={values.businessRegisterType}
                  onChange={this._handleSelectChange}
                  disabled={this.props.businessRegister !== undefined}
                />
                {errors.businessRegisterType &&
                  touched.businessRegisterType && (
                  <Label
                    basic
                    pointing
                    color="red"
                    content={errors.businessRegisterType}
                  />
                )}
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field width={16}>
                <Form.Input
                  required
                  label="Label"
                  name="label"
                  autoComplete="label"
                  value={values.label}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.label &&
                  touched.label && (
                  <Label basic color="red" pointing content={errors.label} />
                )}
              </Form.Field>
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="blue"
            disabled={createLoading || updateLoading || !isValid}
            loading={createLoading || updateLoading}
            onClick={handleSubmit}
          >
            <Icon name="save" />
            {this.props.businessRegister ? 'Edit Register' : 'Create Register'}
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

ModalNewBusinessRegister.propTypes = {
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
  businessRegister: PropTypes.object,
  businessRegisterType: PropTypes.number,
  updateLoading: PropTypes.bool,
  isCreated: PropTypes.bool,
  isUpdated: PropTypes.bool,
  getBusinessRegister: PropTypes.func
}

const mapPropsToValues = props => ({
  businessRegisterType: props.businessRegisterType
    ? props.businessRegisterType
    : '',
  label: props.businessRegister ? props.businessRegister.label : '',
  id: props.businessRegister ? props.businessRegister.id : null
})

const validationSchema = Yup.object().shape({
  label: Yup.string()
    .required('Label is required.')
    .min(2, 'Label required minimum 2 characters.')
    .max(200, 'Label require max 200 characters.'),
  businessRegisterType: Yup.number().required('Business Register is required.')
})

const handleSubmit = (values, { props, setSubmitting }) => {
  if (props.businessRegister) {
    props.updateBusinessRegister(values)
  } else {
    props.createBusinessRegister(values)
  }
}

const mapStateToProps = state => ({
  createLoading: state.businessRegister.create.isLoading,
  isCreated: state.businessRegister.create.isCreated,
  updateLoading: state.businessRegister.update.isLoading,
  isUpdated: state.businessRegister.update.isUpdated
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      closeModal,
      createBusinessRegister,
      updateBusinessRegister,
      getBusinessRegister
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
  })(ModalNewBusinessRegister)
)

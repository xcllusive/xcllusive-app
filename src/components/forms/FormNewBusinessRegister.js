import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Modal, Form, Label, Button, Icon } from 'semantic-ui-react'
import * as Yup from 'yup'

import { closeModal } from '../../redux/ducks/modal'
import {
  createBusinessRegister,
  updateBusinessRegister
} from '../../redux/ducks/businessRegister'

class FormNewBusinessRegister extends PureComponent {
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
      ]
    }
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
      updateLoading,
      businessRegister
    } = this.props

    return (
      <Modal open dimmer="blurring">
        <Modal.Header align="center">
          {this.props.editBusinessRegister &&
          this.props.editBusinessRegister.value
            ? 'Edit Business Register'
            : 'New Business Register'}
        </Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group>
              <Form.Field width={4}>
                <Form.Select
                  required
                  label="Business Register"
                  name="businessRegister"
                  options={businessRegister}
                  autoComplete="businessRegister"
                  value={values.businessRegister}
                  onChange={this._handleSelectChange}
                  disabled={
                    this.props.editBusinessRegister &&
                    this.props.editBusinessRegister.value !== false
                  }
                />
                {errors.businessRegister &&
                  touched.businessRegister && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.businessRegister}
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
            {this.props.editBusinessRegister &&
            this.props.editBusinessRegister.value
              ? 'Edit Register'
              : 'Create Register'}
          </Button>
          <Button color="red" onClick={closeModal()}>
            <Icon name="cancel" />
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

FormNewBusinessRegister.propTypes = {
  values: PropTypes.object,
  touched: PropTypes.object,
  errors: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  setFieldValue: PropTypes.func,
  closeModal: PropTypes.func,
  isValid: PropTypes.bool,
  createLoading: PropTypes.bool,
  businessRegister: PropTypes.object,
  businessRegisterType: PropTypes.number,
  updateLoading: PropTypes.bool,
  editBusinessRegister: PropTypes.object
}

const mapPropsToValues = props => ({
  businessRegister: props.editBusinessRegister
    ? props.editBusinessRegister
    : '',
  label: props.businessRegister.text ? props.businessRegister.text : '',
  id: props.businessRegister.value ? props.businessRegister.value : null
})

const validationSchema = Yup.object().shape({
  label: Yup.string()
    .required('Label is required.')
    .min(2, 'Label required minimum 2 characters.')
    .max(200, 'Label require max 200 characters.'),
  businessRegister: Yup.number().required('Business Register is required.')
})

const handleSubmit = (values, { props, setSubmitting }) => {
  if (props.businessRegister) {
    props.updateBusinessRegister(values).then(setSubmitting(false))
  } else {
    props.createBusinessRegister(values).then(setSubmitting(false))
  }
}

const mapStateToProps = state => ({
  createLoading: state.business.createBusinessRegister.isLoading,
  updateLoading: state.business.updateBusinessRegister.isLoading
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createBusinessRegister,
      updateBusinessRegister
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(
  withFormik({
    validationSchema,
    mapPropsToValues,
    handleSubmit
  })(FormNewBusinessRegister)
)

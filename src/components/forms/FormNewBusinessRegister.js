import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Modal, Form, Label, Button } from 'semantic-ui-react'
import Yup from 'yup'

import { closeModal } from '../../redux/ducks/modal'
import { createBusinessRegister, updateBusinessRegister } from '../../redux/ducks/businessRegister'

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
      businessRegister,
      businessRegisterType
    } = this.props
    const {
      typesBusinessRegisters
    } = this.state
    return (
      <Modal open >
        <Modal.Header align='center'>{businessRegister ? 'Edit Business Register' : 'New Business Register' }</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group>
              <Form.Field width={4}>
                <Form.Select
                  required
                  label='Business Register'
                  name='businessRegister'
                  options={typesBusinessRegisters}
                  autoComplete='businessRegister'
                  value={values.businessRegister}
                  onChange={this._handleSelectChange}
                  disabled={businessRegisterType !== undefined}
                />
                {errors.businessRegister && touched.businessRegister && <Label basic color='red' pointing content={errors.businessRegister} />}
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field width={16}>
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
            negative
            icon='cancel'
            content='Cancel'
            labelPosition='right'
            onClick={this.props.closeModal}
          />
          <Button
            color='blue'
            icon='save'
            content={(businessRegister && businessRegister.value) ? 'Edit Register' : 'Create Register'}
            labelPosition='right'
            disabled={createLoading || updateLoading || !isValid}
            loading={createLoading || updateLoading}
            onClick={handleSubmit}
          />
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
  updateLoading: PropTypes.bool
}

const mapPropsToValues = ({businessRegister, businessRegisterType}) => {
  if (businessRegister) {
    return {
      businessRegister: businessRegisterType,
      label: businessRegister.text,
      id: businessRegister.value
    }
  }
  return {
    businessRegister: '',
    label: ''
  }
}

const validationSchema = Yup.object().shape({
  label: Yup.string()
    .required('Label is required.')
    .min(2, 'Label required minimum 2 characters.')
    .max(200, 'Label require max 200 characters.'),
  businessRegister: Yup.number()
    .required('Business Register is required.')
})

const handleSubmit = (values, { props, setSubmitting }) => {
  if (props.businessRegister) {
    props.updateBusinessRegister(values).then(setSubmitting(false))
  } else {
    props.createBusinessRegister(values).then(setSubmitting(false))
  }
}

const mapStateToProps = state => {
  return {
    createLoading: state.businessRegister.create.isLoading,
    updateLoading: state.businessRegister.update.isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    createBusinessRegister, updateBusinessRegister, closeModal }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withFormik({
    validationSchema,
    mapPropsToValues,
    handleSubmit
  })(FormNewBusinessRegister)
)

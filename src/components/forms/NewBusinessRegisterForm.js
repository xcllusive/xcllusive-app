import React, { Component } from 'react'
import PropTypes from 'prop-types'
//  import { connect } from 'react-redux'
//  import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Modal, Form, Label, Icon, Button } from 'semantic-ui-react'
import Yup from 'yup'

class NewBusinessRegisterForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      businessRegister: [
        { key: '1', text: 'Business Source', value: '1' },
        { key: '2', text: 'Business Rating', value: '2' },
        { key: '3', text: 'Business Product', value: '3' },
        { key: '4', text: 'Business Industry', value: '4' },
        { key: '5', text: 'Business Type', value: '5' },
        { key: '6', text: 'Business Owner`s Time', value: '6' }
      ]
    }
  }

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
    const {
      businessRegister
    } = this.state
    return (
      <Modal
        dimmer={'blurring'}
        open={modalOpen}
      >
        <Modal.Header align='center'>New Business Register</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group>
              <Form.Field width={4}>
                <Form.Select
                  required
                  label='Business Register'
                  name='businessRegister'
                  options={businessRegister}
                  autoComplete='businessRegister'
                  value={values.businessRegister}
                  onChange={this._handleSelectChange}
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
  label: '',
  businessRegister: ''
})

const validationSchema = Yup.object().shape({
  label: Yup.string()
    .required('Label is required.')
    .min(2, 'Label required minimum 2 characters.')
    .max(200, 'Label require max 200 characters.'),
  businessRegister: Yup.string()
    .required('Business Register is required.')
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

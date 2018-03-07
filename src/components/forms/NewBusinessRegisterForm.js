import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Modal, Form, Label, Icon, Button } from 'semantic-ui-react'

import Yup from 'yup'

import { createBusinessRegister } from '../../redux/ducks/business'

class NewBusinessRegisterForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      businessRegister: [
        { key: 1, text: 'Business Source', value: 1 },
        { key: 2, text: 'Business Rating', value: 2 },
        { key: 3, text: 'Business Product', value: 3 },
        { key: 4, text: 'Business Industry', value: 4 },
        { key: 5, text: 'Business Type', value: 5 },
        { key: 6, text: 'Business Owner`s Time', value: 6 }
      ]
    }
  }

  /* componentDidMount () {
    this.props.getBusinessRegister(values.businessRegister)
  } */

  componentWillReceiveProps (nextProps) {
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
      isSubmitting,
      isValid,
      createLoading,
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
        <Modal.Header align='center'>{(this.props.editBusinessRegister && this.props.editBusinessRegister.value) ? 'Edit Business Register' : 'New Business Register' }</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group>
              <Form.Field width={4}>
                <Form.Select
                  required
                  label='Business Register'
                  name='businessRegister'
                  options={businessRegister}
                  //  options={(this.props.editBusinessRegister && this.props.editBusinessRegister.value) ? this.props.editBusinessRegister.value : businessRegister}
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
            loading={createLoading}
            onClick={handleSubmit}
          >
            <Icon name='save' />
            {(this.props.editBusinessRegister && this.props.editBusinessRegister.value) ? 'Edit Register' : 'Create Register'}
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
  createLoading: PropTypes.bool,
  modalOpen: PropTypes.bool,
  editBusinessRegister: PropTypes.object
}

const mapPropsToValues = props => {
  console.log('opsss, ', props.editBusinessRegister)
  return {
    label: '',
    businessRegister: ''
  }
}

/* const mapPropsToValues = props => {
  if (props && props.editBusinessRegister.value) {
    return {
      label: props.editBusinessRegister.text,
      businessRegister: props.editBusinessRegister.businessRegister
    }
  }
  return {
    label: '',
    businessRegister: ''
  }
} */

const validationSchema = Yup.object().shape({
  label: Yup.string()
    .required('Label is required.')
    .min(2, 'Label required minimum 2 characters.')
    .max(200, 'Label require max 200 characters.'),
  businessRegister: Yup.number()
    .required('Business Register is required.')
})

const handleSubmit = (values, { props, setSubmitting }) => {
  props.createBusinessRegister(values)
  setSubmitting(false)
}

const mapStateToProps = state => {
  return {
    createLoading: state.business.createBusinessRegister.isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    createBusinessRegister }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withFormik({
    validationSchema,
    mapPropsToValues,
    handleSubmit})(NewBusinessRegisterForm)
)

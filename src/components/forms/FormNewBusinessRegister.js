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
<<<<<<< HEAD:src/components/forms/NewBusinessRegisterForm.js
    const { businessRegister } = this.state
    return (
      <Modal dimmer="blurring" open={modalOpen}>
        <Modal.Header align="center">
          {this.props.editBusinessRegister &&
          this.props.editBusinessRegister.value
            ? 'Edit Business Register'
            : 'New Business Register'}
        </Modal.Header>
=======
    const {
      typesBusinessRegisters
    } = this.state
    return (
      <Modal open >
        <Modal.Header align='center'>{businessRegister ? 'Edit Business Register' : 'New Business Register' }</Modal.Header>
>>>>>>> 5123be2a5e83aa7c22613664a6f89675f1950419:src/components/forms/FormNewBusinessRegister.js
        <Modal.Content>
          <Form>
            <Form.Group>
              <Form.Field width={4}>
                <Form.Select
                  required
<<<<<<< HEAD:src/components/forms/NewBusinessRegisterForm.js
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
=======
                  label='Business Register'
                  name='businessRegister'
                  options={typesBusinessRegisters}
                  autoComplete='businessRegister'
                  value={values.businessRegister}
                  onChange={this._handleSelectChange}
                  disabled={businessRegisterType !== undefined}
>>>>>>> 5123be2a5e83aa7c22613664a6f89675f1950419:src/components/forms/FormNewBusinessRegister.js
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
<<<<<<< HEAD:src/components/forms/NewBusinessRegisterForm.js
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
          <Button color="red" onClick={toggleModal}>
            <Icon name="cancel" />
            Cancel
          </Button>
=======
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
>>>>>>> 5123be2a5e83aa7c22613664a6f89675f1950419:src/components/forms/FormNewBusinessRegister.js
        </Modal.Actions>
      </Modal>
    )
  }
}

<<<<<<< HEAD:src/components/forms/NewBusinessRegisterForm.js
NewBusinessRegisterForm.propTypes = {
  values: PropTypes.object.isRequired,
=======
FormNewBusinessRegister.propTypes = {
  values: PropTypes.object,
>>>>>>> 5123be2a5e83aa7c22613664a6f89675f1950419:src/components/forms/FormNewBusinessRegister.js
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

<<<<<<< HEAD:src/components/forms/NewBusinessRegisterForm.js
const mapPropsToValues = (props) => {
  if (props && props.editBusinessRegister) {
=======
const mapPropsToValues = ({businessRegister, businessRegisterType}) => {
  if (businessRegister) {
>>>>>>> 5123be2a5e83aa7c22613664a6f89675f1950419:src/components/forms/FormNewBusinessRegister.js
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
  businessRegister: Yup.number().required('Business Register is required.')
})

const handleSubmit = (values, { props, setSubmitting }) => {
  if (props.businessRegister) {
    props.updateBusinessRegister(values).then(setSubmitting(false))
  } else {
    props.createBusinessRegister(values).then(setSubmitting(false))
  }
}

<<<<<<< HEAD:src/components/forms/NewBusinessRegisterForm.js
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

export default connect(mapStateToProps, mapDispatchToProps)(withFormik({
  validationSchema,
  mapPropsToValues,
  handleSubmit
})(NewBusinessRegisterForm))
=======
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
>>>>>>> 5123be2a5e83aa7c22613664a6f89675f1950419:src/components/forms/FormNewBusinessRegister.js

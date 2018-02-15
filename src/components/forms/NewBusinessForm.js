import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withFormik } from 'formik'
import { Modal, Form, Icon, Button, Label } from 'semantic-ui-react'
//  import BusinessDetail from '../../components/BusinessDetail'
import Yup from 'yup'

const options = [
  { key: 1, text: 'Google', value: 'Google' },
  { key: 2, text: 'Sensis', value: 'Sensis' },
  { key: 3, text: 'Yahoo', value: 'Yahoo' }
]

class NewBusinessForm extends Component {
  render () {
    const {
      modalOpen,
      toggleModal,
      values,
      handleChange,
      handleBlur,
      errors,
      touched
    } = this.props
    return (
      <Modal
        dimmer={'blurring'}
        open={modalOpen}
      >
        <Modal.Header align='center'>New Business</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group widths='equal'>
              <Form.Field>
                <Form.Input
                  label='Business name'
                  name='businessName'
                  autoComplete='businessName'
                  value={values.businessName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.businessName && touched.businessName && <Label basic color='red' pointing content={errors.businessName} />}
              </Form.Field>
              <Form.Input required label='First name' />
              <Form.Input required label='Last name' />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input label='Telephone' />
              <Form.Input label='Telephone 2' />
              <Form.Input label='Fax' />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input required label='Email' />
              <Form.Dropdown label='Source' selection options={options} />
              <Form.Input label='Source Notes' />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.TextArea label='Notes' />
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color='blue'
            //  disabled={isSubmitting || !isValid}
            //  loading={isLoading}
            //  onClick={handleSubmit}
          >
            <Icon name='save' />
            Create User
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

NewBusinessForm.propTypes = {
  toggleModal: PropTypes.func,
  modalOpen: PropTypes.bool,
  values: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  errors: PropTypes.object,
  touched: PropTypes.object
}

const mapPropsToValues = () => ({
  businessName: ''
})

const validationSchema = Yup.object().shape({
  businessName: Yup.string()
    .required('Business name is required.')
    .max(20, 'Password require max 120 characters.')
})

export default (
  withFormik({
    mapPropsToValues,
    validationSchema
  })(NewBusinessForm)
)

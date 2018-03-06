import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Modal, Form, Icon, Button, Label } from 'semantic-ui-react'
//  import BusinessDetail from '../../components/BusinessDetail'
import Yup from 'yup'

import { createBusiness, getBusiness } from '../../redux/ducks/business'

class NewBusinessForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
  }

  componentDidMount () {
    this.props.getBusiness()
  }

  render () {
    const {
      modalOpen,
      toggleModal,
      values,
      handleChange,
      handleBlur,
      errors,
      touched,
      handleSubmit,
      isSubmitting,
      isValid,
      isLoading,
      sourceOptions
    } = this.props

    //  const {} = this.state

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
                  required
                  label='Business name'
                  name='businessName'
                  autoComplete='businessName'
                  value={values.businessName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.businessName && touched.businessName && <Label basic color='red' pointing content={errors.businessName} />}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  required
                  label='First name'
                  name='firstName'
                  autoComplete='firstName'
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.firstName && touched.firstName && <Label basic color='red' pointing content={errors.firstName} />}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  required
                  label='Last name'
                  name='lastName'
                  autoComplete='lastName'
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.lastName && touched.lastName && <Label basic color='red' pointing content={errors.lastName} />}
              </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field>
                <Form.Input
                  label='Telephone 1'
                  name='vendorPhone1'
                  autoComplete='vendorPhone1'
                  value={values.vendorPhone1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.vendorPhone1 && touched.vendorPhone1 && <Label basic color='red' pointing content={errors.vendorPhone1} />}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label='Telephone 2'
                  name='vendorPhone2'
                  autoComplete='vendorPhone2'
                  value={values.vendorPhone2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.vendorPhone2 && touched.vendorPhone2 && <Label basic color='red' pointing content={errors.vendorPhone2} />}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label='Telephone 3'
                  name='vendorPhone3'
                  autoComplete='vendorPhone3'
                  value={values.vendorPhone3}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.vendorPhone3 && touched.vendorPhone3 && <Label basic color='red' pointing content={errors.vendorPhone3} />}
              </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field>
                <Form.Input
                  required
                  label='Email'
                  name='vendorEmail'
                  autoComplete='vendorEmail'
                  value={values.vendorEmail}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.vendorEmail && touched.vendorEmail && <Label basic color='red' pointing content={errors.vendorEmail} />}
              </Form.Field>
              <Form.Field>
                <Form.Select
                  required
                  label='Source'
                  options={sourceOptions}
                  name='businessSource'
                  autoComplete='businessSource'
                  value={values.businessSource}
                  onChange={this._handleSelectChange}
                />
                {errors.businessSource && touched.businessSource && <Label basic color='red' pointing content={errors.businessSource} />}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label='Source Notes'
                  name='sourceNotes'
                  autoComplete='sourceNotes'
                  value={values.sourceNotes}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.sourceNotes && touched.sourceNotes && <Label basic color='red' pointing content={errors.sourceNotes} />}
              </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field>
                <Form.TextArea
                  required
                  label='Notes'
                  name='description'
                  autoComplete='description'
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.description && touched.description && <Label basic color='red' pointing content={errors.description} />}
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
            Create Business
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
  touched: PropTypes.object,
  isSubmitting: PropTypes.bool,
  isValid: PropTypes.bool,
  isLoading: PropTypes.bool,
  handleSubmit: PropTypes.func,
  setFieldValue: PropTypes.func,
  sourceOptions: PropTypes.array,
  getBusiness: PropTypes.func
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
  vendorPhone1: Yup.string()
    .max(15, 'Telephone 1 require max 15 characters.'),
  vendorPhone2: Yup.string()
    .max(15, 'Telephone 2 require max 15 characters.'),
  vendorPhone3: Yup.string()
    .max(15, 'Telephone 3 require max 15 characters.'),
  vendorEmail: Yup.string()
    .email('Invalid email address.')
    .required('Email is required.'),
  businessSource: Yup.string()
    .required('Source is required.'),
  sourceNotes: Yup.string()
    .max(40, 'Source Notes require max 40 characters.'),
  description: Yup.string()
    .required('Notes is required.')
    .max(2000, 'Source Notes require max 2000 characters.')
})

const handleSubmit = (values, {props, setSubmitting}) => {
  props.createBusiness(values)
  setSubmitting(false)
}

const mapStateToProps = state => {
  return {
    isLoading: state.business.create.isLoading,
    sourceOptions: state.business.get.sourceOptions
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ createBusiness, getBusiness }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withFormik({
    mapPropsToValues,
    validationSchema,
    handleSubmit
  })(NewBusinessForm)
)

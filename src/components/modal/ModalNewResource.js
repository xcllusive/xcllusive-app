import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withFormik } from 'formik'
import { bindActionCreators } from 'redux'
import { Modal, Form, Label, Icon, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as Yup from 'yup'

import { closeModal } from '../../redux/ducks/modal'
import { getResource, createResource, updateResource } from '../../redux/ducks/resource'

class ModalNewResource extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.props.getResource()
  }

  static getDerivedStateFromProps = nextProps => {
    if (nextProps.isCreated || nextProps.isUpdated) {
      nextProps.getResource()
    }
    return null
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
        <Modal.Header align="center">{this.props.titleModal ? this.props.titleModal : ''}</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group>
              <Form.Field width={16}>
                <Form.Input
                  required
                  label="Title"
                  name="title"
                  autoComplete="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.title && touched.title && <Label basic color="red" pointing content={errors.title} />}
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field width={16}>
                <Form.Input
                  required
                  label="Link"
                  name="link"
                  autoComplete="link"
                  value={values.link}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.link && touched.link && <Label basic color="red" pointing content={errors.link} />}
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field width={16}>
                <Form.TextArea
                  required
                  label="Description"
                  name="description"
                  autoComplete="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.description && touched.description && (
                  <Label basic color="red" pointing content={errors.description} />
                )}
              </Form.Field>
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="blue"
            type="submit"
            disabled={createLoading || updateLoading || !isValid}
            loading={createLoading || updateLoading}
            onClick={handleSubmit}
          >
            <Icon name="save" />
            {this.props.linkObject ? 'Edit Resource' : 'Create Resource'}
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

ModalNewResource.propTypes = {
  closeModal: PropTypes.func.isRequired,
  titleModal: PropTypes.string.isRequired,
  values: PropTypes.object,
  touched: PropTypes.object,
  errors: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  setFieldValue: PropTypes.func,
  isValid: PropTypes.bool,
  linkObject: PropTypes.object,
  createLoading: PropTypes.bool,
  updateLoading: PropTypes.bool,
  getResource: PropTypes.func,
  createResource: PropTypes.func,
  updateResource: PropTypes.func,
  isCreated: PropTypes.bool,
  isUpdated: PropTypes.bool
}

const mapPropsToValues = props => ({
  id: props.linkObject ? props.linkObject.id : null,
  title: props.linkObject ? props.linkObject.title : '',
  link: props.linkObject ? props.linkObject.link : '',
  description: props.linkObject ? props.linkObject.description : ''
})

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Label is required.')
    .min(2, 'Label required minimum 2 characters.')
    .max(200, 'Label require max 200 characters.'),
  link: Yup.string()
    .required('Label is required.')
    .min(2, 'Label required minimum 2 characters.')
    .max(5000, 'Label require max 5000 characters.'),
  description: Yup.string()
    .required('Label is required.')
    .min(2, 'Label required minimum 2 characters.')
    .max(255, 'Label require max 255 characters.')
})

const handleSubmit = (values, { props, setSubmitting }) => {
  if (props.linkObject) {
    props.updateResource(values)
  } else {
    props.createResource(values)
  }
}

const mapStateToProps = state => ({
  createLoading: state.resource.create.isLoading,
  isCreated: state.resource.create.isCreated,
  updateLoading: state.resource.update.isLoading,
  isUpdated: state.resource.update.isUpdated
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      closeModal,
      getResource,
      createResource,
      updateResource
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
  })(ModalNewResource)
)

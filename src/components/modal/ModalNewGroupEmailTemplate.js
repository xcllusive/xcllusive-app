import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withFormik } from 'formik'
import { bindActionCreators } from 'redux'
import { Modal, Form, Label, Icon, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as Yup from 'yup'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import { closeModal } from '../../redux/ducks/modal'
import {
  createGroupEmailTemplate,
  getGroupEmailFolder,
  updateGroupEmailTemplate,
  getGroupEmailTemplates
} from '../../redux/ducks/groupEmail'

class ModalNewGroupEmailTemplate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modules: {
        toolbar: null
      },
      formats: ['', '', '', '', '', '', '', '', '', '', ''],
      isCreated: true,
      isUpdated: true
    }
  }

  componentDidMount () {}

  _config = () => {}

  _handleChangeBody = value => {
    this.props.setFieldValue('body', value)
  }

  render () {
    const { values, touched, errors, handleChange, handleBlur, handleSubmit, isValid, createLoading } = this.props
    return (
      <Modal open>
        <Modal.Header align="center">{this.props.titleModal ? this.props.titleModal : ''}</Modal.Header>
        <Modal.Content>
          <Form>
            {!this.props.templateObject ? (
              <Form.Group>
                <Form.Field width={16}>
                  <Form.Input required label="Folder Name" name="nameFolder" value={values.nameFolder} readOnly />
                </Form.Field>
              </Form.Group>
            ) : null}
            <Form.Group>
              <Form.Field width={16}>
                <Form.Input
                  required
                  label="Email Template Name"
                  name="name"
                  autoComplete="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && touched.name && <Label basic color="red" pointing content={errors.name} />}
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field width={16}>
                <Form.Input
                  required
                  label="Subject"
                  name="subject"
                  value={values.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && touched.name && <Label basic color="red" pointing content={errors.name} />}
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field>
                <h4>Body</h4>
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field style={{ width: '100%' }}>
                <ReactQuill
                  value={values.body}
                  onChange={this._handleChangeBody}
                  style={{ height: '30vh' }}
                  modules={this.state.modules}
                  formats={this.state.formats}
                />
                {errors.body && touched.body && <Label basic color="red" pointing content={errors.body} />}
              </Form.Field>
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="blue"
            type="submit"
            disabled={createLoading || !isValid}
            loading={createLoading}
            onClick={handleSubmit}
          >
            <Icon name="save" />
            {this.props.templateObject ? 'Edit Template' : 'Create Template'}
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

ModalNewGroupEmailTemplate.propTypes = {
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
  createLoading: PropTypes.bool,
  getGroupEmailFolder: PropTypes.func,
  createGroupEmailTemplate: PropTypes.func,
  isCreated: PropTypes.bool,
  isUpdated: PropTypes.bool,
  folderObject: PropTypes.object,
  templateObject: PropTypes.object,
  updateGroupEmailTemplate: PropTypes.func,
  getGroupEmailTemplates: PropTypes.func,
  onConfirm: PropTypes.func
}

const mapPropsToValues = props => ({
  id: props.templateObject ? props.templateObject.id : null,
  folderId: props.folderObject ? props.folderObject.id : null,
  nameFolder: props.folderObject ? props.folderObject.name : '',
  name: props.templateObject ? props.templateObject.name : '',
  body: props.templateObject ? props.templateObject.body : '',
  subject: props.templateObject ? props.templateObject.subject : ''
})

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required.')
    .min(2, 'Name required minimum 2 characters.')
    .max(200, 'Name require max 200 characters.'),
  body: Yup.string()
    .required('Body is required.')
    .min(2, 'Body required minimum 2 characters.')
    .max(5000, 'Body require max 5000 characters.'),
  subject: Yup.string()
    .required('Subject is required.')
    .min(2, 'Subject required minimum 2 characters.')
    .max(200, 'Subject require max 200 characters.')
})

const handleSubmit = (values, { props, setSubmitting }) => {
  if (props.templateObject) {
    props.updateGroupEmailTemplate(values)
    props.onConfirm(values)
  } else {
    props.createGroupEmailTemplate(values)
    props.onConfirm(values)
  }
}

const mapStateToProps = state => ({
  createLoading: state.groupEmail.create.isLoading,
  isCreated: state.groupEmail.createTemplate.isCreated,
  isUpdated: state.groupEmail.update.isUpdated
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      closeModal,
      createGroupEmailTemplate,
      getGroupEmailFolder,
      updateGroupEmailTemplate,
      getGroupEmailTemplates
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
  })(ModalNewGroupEmailTemplate)
)

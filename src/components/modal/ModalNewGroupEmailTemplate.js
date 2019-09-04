import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withFormik } from 'formik'
import { bindActionCreators } from 'redux'
import { Modal, Form, Label, Icon, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as Yup from 'yup'
import 'jodit'
import 'jodit/build/jodit.min.css'
import JoditEditor from 'jodit-react'

import { closeModal } from '../../redux/ducks/modal'
import { createGroupEmailTemplate } from '../../redux/ducks/groupEmail'

class ModalNewGroupEmailTemplate extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {}

  static getDerivedStateFromProps = nextProps => {
    if (nextProps.isCreated || nextProps.isUpdated || nextProps.isDeleted || nextProps.isDeletedFile) {
      nextProps.getDocumentFolder()
    }
    return null
  }

  _config = () => {}

  _handleChangeBody = value => {
    this.props.setFieldValue('body', value)
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
      <Modal open>
        <Modal.Header align="center">{this.props.titleModal ? this.props.titleModal : ''}</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group>
              <Form.Field width={16}>
                <Form.Input required label="Folder Name" name="nameFolder" value={values.nameFolder} readOnly />
              </Form.Field>
            </Form.Group>
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
              <Form.Field>
                <h4>Body</h4>
              </Form.Field>
              <Form.Field>
                <JoditEditor name="body" value={values.body} config={this._config} onChange={this._handleChangeBody} />
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
            {this.props.documentFolder ? 'Edit Template' : 'Create Template'}
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
  updateLoading: PropTypes.bool,
  getDocumentFolder: PropTypes.func,
  createGroupEmailTemplate: PropTypes.func,
  updateDocumentFolder: PropTypes.func,
  isCreated: PropTypes.bool,
  isUpdated: PropTypes.bool,
  documentFolder: PropTypes.object,
  isDeleted: PropTypes.bool,
  isDeletedFile: PropTypes.bool,
  folderObject: PropTypes.object
}

const mapPropsToValues = props => ({
  folderId: props.folderObject ? props.folderObject.id : null,
  nameFolder: props.folderObject ? props.folderObject.name : '',
  name: props.groupEmail ? props.groupEmail.getEmailTemplate.name : '',
  body: props.groupEmail ? props.groupEmail.body : ''
})

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required.')
    .min(2, 'Name required minimum 2 characters.')
    .max(200, 'Name require max 200 characters.')
})

const handleSubmit = (values, { props, setSubmitting }) => {
  if (props.documentFolder) {
    props.updateDocumentFolder(values)
  } else {
    props.createGroupEmailTemplate(values)
  }
}

const mapStateToProps = state => ({
  createLoading: state.documentFolder.create.isLoading,
  isCreated: state.documentFolder.create.isCreated,
  updateLoading: state.documentFolder.update.isLoading,
  isUpdated: state.documentFolder.update.isUpdated,
  officeOptions: state.officeRegister.get.array,
  isDeleted: state.documentFolder.delete.isDeleted,
  isDeletedFile: state.documentFolder.deleteFile.isDeleted
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      closeModal,
      createGroupEmailTemplate
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

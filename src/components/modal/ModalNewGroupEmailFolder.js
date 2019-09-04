import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withFormik } from 'formik'
import { bindActionCreators } from 'redux'
import { Modal, Form, Label, Icon, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as Yup from 'yup'

import { closeModal } from '../../redux/ducks/modal'
import { createGroupEmailFolder } from '../../redux/ducks/groupEmail'

class ModalNewGroupEmailFolder extends Component {
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
                  label="Name"
                  name="name"
                  autoComplete="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && touched.name && <Label basic color="red" pointing content={errors.name} />}
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
            {this.props.documentFolder ? 'Edit Folder' : 'Create Folder'}
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

ModalNewGroupEmailFolder.propTypes = {
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
  createGroupEmailFolder: PropTypes.func,
  updateDocumentFolder: PropTypes.func,
  isCreated: PropTypes.bool,
  isUpdated: PropTypes.bool,
  documentFolder: PropTypes.object,
  isDeleted: PropTypes.bool,
  isDeletedFile: PropTypes.bool
}

const mapPropsToValues = props => ({
  id: props.documentFolder ? props.documentFolder.id : null,
  name: props.documentFolder ? props.documentFolder.name : ''
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
    props.createGroupEmailFolder(values)
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
      createGroupEmailFolder
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
  })(ModalNewGroupEmailFolder)
)

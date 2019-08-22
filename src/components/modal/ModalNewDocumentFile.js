import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withFormik } from 'formik'
import { bindActionCreators } from 'redux'
import { Modal, Form, Label, Icon, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as Yup from 'yup'
import { mapArrayToValuesForDropdown } from '../../utils/sharedFunctionArray'
import { closeModal } from '../../redux/ducks/modal'
import { getOfficeRegister } from '../../redux/ducks/officeRegister'
import {
  getFolderPerOffice,
  uploadDocumentFile /*, createDocumentFile, updateDocumentFile */
} from '../../redux/ducks/documentFolder'

class ModalNewDocumentFile extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.props.getOfficeRegister()
  }

  static getDerivedStateFromProps = nextProps => {
    if (nextProps.isUpdated) {
      nextProps.getDocumentFile()
    }
    return null
  }

  _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
    if (name === 'officeId') this.props.getFolderPerOffice(value)
  }

  _handleFileUpload = e => {
    const file = e.target.files[0]
    this.props.setFieldValue('attachment', file)
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
      isLoading,
      officeOptions,
      foldersPerOffice
    } = this.props
    return (
      <Modal open dimmer="blurring">
        <Modal.Header align="center">{this.props.titleModal ? this.props.titleModal : ''}</Modal.Header>
        <Modal.Content>
          <Form>
            <Fragment>
              <Form.Field>
                <Form.Select
                  required
                  label="Office Region"
                  name="officeId"
                  options={mapArrayToValuesForDropdown(officeOptions)}
                  value={values.officeId}
                  onChange={this._handleSelectChange}
                />
                {errors.officeId && touched.officeId && <Label basic color="red" pointing content={errors.officeId} />}
              </Form.Field>
              {values.officeId ? (
                <Fragment>
                  <Form.Field>
                    <Form.Select
                      required
                      label="Folder"
                      name="folderId"
                      options={mapArrayToValuesForDropdown(foldersPerOffice)}
                      value={values.folderId}
                      onChange={this._handleSelectChange}
                    />
                    {errors.folderId && touched.folderId && (
                      <Label basic color="red" pointing content={errors.folderId} />
                    )}
                  </Form.Field>
                  {values.folderId ? (
                    <Fragment>
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
                      <Form.Group>
                        <Form.Input
                          type="file"
                          label="Attachment"
                          name="attachment"
                          autoComplete="attachment"
                          onChange={this._handleFileUpload}
                        />
                      </Form.Group>
                    </Fragment>
                  ) : null}
                </Fragment>
              ) : null}
            </Fragment>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="blue"
            type="submit"
            disabled={isLoading || !isValid || !values.attachment}
            loading={isLoading}
            onClick={handleSubmit}
          >
            <Icon name="save" />
            {this.props.documentFile ? 'Edit File' : 'Upload File'}
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

ModalNewDocumentFile.propTypes = {
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
  isLoading: PropTypes.bool,
  getDocumentFile: PropTypes.func,
  uploadDocumentFile: PropTypes.func,
  isUploaded: PropTypes.bool,
  documentFile: PropTypes.object,
  getOfficeRegister: PropTypes.func,
  officeOptions: PropTypes.array,
  getFolderPerOffice: PropTypes.func,
  foldersPerOffice: PropTypes.array
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
    // props.updateDocumentFile(values)
  } else {
    props.uploadDocumentFile(values.attachment, values.folderId, values.name)
  }
}

const mapStateToProps = state => ({
  isLoading: state.documentFolder.uploadFile.isLoading,
  isUploaded: state.documentFolder.uploadFile.isUploaded,
  officeOptions: state.officeRegister.get.array,
  foldersPerOffice: state.documentFolder.listFolders.array
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      closeModal,
      getOfficeRegister,
      getFolderPerOffice,
      uploadDocumentFile
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
  })(ModalNewDocumentFile)
)

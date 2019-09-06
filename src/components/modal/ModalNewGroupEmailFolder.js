import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withFormik } from 'formik'
import { bindActionCreators } from 'redux'
import { Modal, Form, Label, Icon, Button, Divider, Checkbox } from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as Yup from 'yup'
import styled from 'styled-components'
import { closeModal } from '../../redux/ducks/modal'
import { createGroupEmailFolder, getGroupEmailFolder, updateGroupEmailFolder } from '../../redux/ducks/groupEmail'
const CheckboxFormatted = styled.div`
  padding-right: 1em;
`

class ModalNewGroupEmailFolder extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {}

  _handleChangeCheckBoxSubFolder (type) {
    this.props.setFieldValue('subFolder', type)
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
            <Divider horizontal clearing>
              Sub Folder
            </Divider>
            <Form.Group>
              <Form.Field>
                <Checkbox
                  as={CheckboxFormatted}
                  label="Brokers"
                  name="subFolder"
                  value={values.subFolder}
                  checked={values.subFolder === 'Brokers'}
                  onChange={() => this._handleChangeCheckBoxSubFolder('Brokers')}
                />
                <Checkbox
                  as={CheckboxFormatted}
                  label="Analysts"
                  name="subFolder"
                  value={values.subFolder}
                  checked={values.subFolder === 'Analysts'}
                  onChange={() => this._handleChangeCheckBoxSubFolder('Analysts')}
                />
                <Checkbox
                  label="General"
                  name="subFolder"
                  value={values.subFolder}
                  checked={values.subFolder === 'General'}
                  onChange={() => this._handleChangeCheckBoxSubFolder('General')}
                />
              </Form.Field>
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="blue"
            type="submit"
            disabled={createLoading || updateLoading || !isValid || !values.subFolder}
            loading={createLoading || updateLoading}
            onClick={handleSubmit}
          >
            <Icon name="save" />
            {this.props.folderObject ? 'Edit Folder' : 'Create Folder'}
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
  createGroupEmailFolder: PropTypes.func,
  isCreated: PropTypes.bool,
  isUpdated: PropTypes.bool,
  isDeleted: PropTypes.bool,
  folderObject: PropTypes.object,
  getGroupEmailFolder: PropTypes.func,
  updateGroupEmailFolder: PropTypes.func,
  onConfirm: PropTypes.func
}

const mapPropsToValues = props => ({
  id: props.folderObject ? props.folderObject.id : null,
  name: props.folderObject ? props.folderObject.name : '',
  subFolder: props.folderObject ? props.folderObject.subFolder : ''
})

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required.')
    .min(2, 'Name required minimum 2 characters.')
    .max(200, 'Name require max 200 characters.')
})

const handleSubmit = (values, { props, setSubmitting }) => {
  if (props.folderObject) {
    props.updateGroupEmailFolder(values)
    props.onConfirm(values)
  } else {
    props.createGroupEmailFolder(values)
    props.onConfirm(values)
  }
}

const mapStateToProps = state => ({
  createLoading: state.groupEmail.create.isLoading,
  isCreated: state.groupEmail.create.isCreated,
  updateLoading: state.groupEmail.update.isLoading,
  isUpdated: state.groupEmail.update.isUpdated,
  isDeleted: state.groupEmail.delete.isDeleted
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      closeModal,
      createGroupEmailFolder,
      getGroupEmailFolder,
      updateGroupEmailFolder
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

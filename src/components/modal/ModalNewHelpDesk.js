import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Modal, Form, Label, Icon, Button } from 'semantic-ui-react'
import * as Yup from 'yup'

import { closeModal } from '../../redux/ducks/modal'

class ModalNewHelpDesk extends Component {
  constructor (props) {
    super(props)
    this.state = {
      formOptions: {
        type: [
          { key: 1, text: 'New Implement', value: 'New Implement' },
          { key: 2, text: 'Technical Support', value: 'Technical Support' },
          { key: 3, text: 'System Operating Wrong', value: 'System Operating Wrong' }
        ],
        priority: [
          { key: 1, text: 'Low', value: 'Low' },
          { key: 2, text: 'Important', value: 'Important' },
          { key: 3, text: 'Critical', value: 'Critical' }
        ]
      }
    }
  }

  componentDidMount () {}

  _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
  }

  _removeFileUploaded = e => {
    if (this.timer) clearTimeout(this.timer)
    this.setState({ fileUpload: false })
    this.props.setFieldValue('attachment', null)
    this.timer = setTimeout(() => this.setState({ fileUpload: true }), 10)
  }

  render () {
    const { type, priority } = this.state.formOptions
    const {
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      isValid,
      createLoading,
      closeModal,
      title
    } = this.props
    return (
      <Modal open dimmer={'blurring'}>
        <Modal.Header align="center">{title}</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group widths="equal">
              <Form.Field>
                <Form.Select
                  required
                  label="Type"
                  name="type"
                  options={type}
                  value={values.type}
                  onChange={this._handleSelectChange}
                />
              </Form.Field>
              <Form.Field>
                <Form.Select
                  required
                  label="Priority"
                  name="priority"
                  options={priority}
                  value={values.priority}
                  onChange={this._handleSelectChange}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
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
            <Form.Group widths="equal">
              <Form.Field>
                <Form.TextArea
                  required
                  style={{ height: '150px' }}
                  label="Description"
                  name="description"
                  autoComplete="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.description && touched.description && (
                  <Label basic pointing color="red" content={errors.description} />
                )}
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field width={11}>
                <Form.Input
                  type="file"
                  label="Attachment"
                  name="attachment"
                  autoComplete="attachment"
                  onChange={this._handleFileUpload}
                />

                {errors.attachment && touched.attachment && (
                  <Label basic color="red" pointing content={errors.attachment} />
                )}
              </Form.Field>
              {/* <Form.Field width={5} style={{ alignSelf: 'flex-end' }}>
                <Form.Button floated="right" color="yellow" onClick={e => this._removeFileUploaded(e)}>
                  <Icon name="remove" />
                  Remove
                </Form.Button>
              </Form.Field> */}
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
            Create Help Desk
          </Button>
          <Button color="red" onClick={closeModal}>
            <Icon name="cancel" />
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

ModalNewHelpDesk.propTypes = {
  values: PropTypes.object,
  touched: PropTypes.object,
  errors: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  setFieldValue: PropTypes.func,
  closeModal: PropTypes.func,
  isValid: PropTypes.bool,
  createLoading: PropTypes.bool,
  title: PropTypes.string
}

const mapPropsToValues = props => {
  return {
    title: ''
    // id: props.user.id,
    // email: props.user.email,
    // password: false,
    // firstName: props.user.firstName ? props.user.firstName : '',
    // lastName: props.user.lastName ? props.user.lastName : '',
    // phoneHome: props.user.phoneHome ? props.user.phoneHome : ''
  }
}

const validationSchema = Yup.object().shape({
  type: Yup.string().required('Type is required.'),
  priority: Yup.string().required('Priority is required.'),
  title: Yup.string()
    .required('Title is required.')
    .max(255, 'Title require max 255 characteres.'),
  description: Yup.string()
    .required('Title is required.')
    .max(2000, 'Title require max 2000 characteres.')
})

const handleSubmit = (values, { props, setSubmitting }) => {
  props.onConfirm(values)
}

const mapStateToProps = state => {
  return {
    createLoading: state.user.create.isLoading,
    updateLoading: state.user.update.isLoading,
    officeOptions: state.officeRegister.get.array
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ closeModal }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues,
    validationSchema,
    handleSubmit,
    enableReinitialize: true
  })(ModalNewHelpDesk)
)

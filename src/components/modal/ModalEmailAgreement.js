import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, Form, Label, Grid, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { closeModal } from '../../redux/ducks/modal'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import * as Yup from 'yup'

import { getEmailTemplate } from '../../redux/ducks/emailTemplates'
import { sendAgreement } from '../../redux/ducks/agreement'

class ModalEmailAgreement extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' }
          ],
          ['link', 'image'],
          ['clean']
        ]
      },
      formats: [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image'
      ]
    }
    this.quillRef = null
    this.reactQuillRef = null
  }

  componentDidMount () {
    this.props.getEmailTemplate(13)
    this._attachQuillRefs()
  }

  _handleChangeBody = value => {
    this.props.setFieldValue('body', value)
  }

  _handleConfirm = isConfirmed => {
    if (!isConfirmed) {
      this.props.closeModal()
    }
    this.props.sendAgreement()
  }

  _handleChangeCheckBox = (e, { name }) => {
    this.props.setFieldValue(name, !this.props.values[name])
  }

  _attachQuillRefs = () => {
    // Ensure React-Quill reference is available:
    if (
      !this.reactQuillRef ||
      typeof this.reactQuillRef.getEditor !== 'function'
    ) {
      return false
    }
    // Skip if Quill reference is defined:
    if (this.quillRef !== null) return false

    const quillRef = this.reactQuillRef.getEditor()
    if (quillRef !== null) this.quillRef = quillRef
  }

  render () {
    const {
      options,
      values,
      touched,
      errors,
      isValid,
      handleChange,
      handleBlur
    } = this.props

    return (
      <Modal open size="small" onClose={() => this._handleConfirm(false)}>
        <Modal.Header>{options.title}</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group>
              <Message info size="small">
                <p>
                  When you send this email you will send the agreement attached.
                </p>
              </Message>
            </Form.Group>
            <Form.Group>
              <Form.Field width={16}>
                <Form.Input
                  label="To"
                  name="to"
                  autoComplete="to"
                  value={values.to}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.to &&
                  touched.to && (
                  <Label basic color="red" pointing content={errors.to} />
                )}
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field width={16}>
                <Form.Input
                  label="Subject"
                  name="subject"
                  autoComplete="subject"
                  value={values.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.subject &&
                  touched.subject && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.subject}
                  />
                )}
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field width={16}>
                <Form.Input
                  label="Attachment"
                  name="attachment"
                  autoComplete="attachment"
                  value={values.attachment}
                  readOnly
                />
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <h5 style={{ fontSize: '.92857143em', paddingLeft: '8px' }}>
                Body
              </h5>
            </Form.Group>
            <Grid.Row columns={1}>
              <Grid.Column
                floated="left"
                width={16}
                style={{ paddingLeft: '0px', paddingRight: 0 }}
              >
                <Form.Field>
                  <ReactQuill
                    ref={el => {
                      this.reactQuillRef = el
                    }}
                    value={values.body}
                    onChange={this._handleChangeBody}
                    style={{ height: '40vh' }}
                    modules={this.state.modules}
                    formats={this.state.formats}
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            negative
            content="Cancel"
            onClick={() => this._handleConfirm(false)}
          />
          <Button
            positive
            icon="send"
            labelPosition="right"
            content="Send"
            onClick={this._handleConfirm}
            disabled={!isValid}
          />
        </Modal.Actions>
      </Modal>
    )
  }
}

ModalEmailAgreement.propTypes = {
  closeModal: PropTypes.func.isRequired,
  options: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  values: PropTypes.object,
  touched: PropTypes.object,
  errors: PropTypes.object,
  setFieldValue: PropTypes.func,
  isValid: PropTypes.bool,
  getEmailTemplate: PropTypes.func,
  objectEmailTemplate: PropTypes.object,
  sendAgreement: PropTypes.func,
  vendorEmail: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  objectEmailTemplate: state.emailTemplates.get.object
})

const mapPropsToValues = props => ({
  to: props.vendorEmail ? props.vendorEmail : '',
  subject: props.objectEmailTemplate ? props.objectEmailTemplate.subject : '',
  attachment: 'agreement.pdf',
  body: props.objectEmailTemplate ? props.objectEmailTemplate.body : ''
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      closeModal,
      getEmailTemplate,
      sendAgreement
    },
    dispatch
  )

const validationSchema = Yup.object().shape({
  to: Yup.string()
    .required('To is required.')
    .email('Invalid email address.'),
  subject: Yup.string().required('Subject is required.'),
  body: Yup.string().required('Body is required.')
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues,
    enableReinitialize: true,
    validationSchema
  })(ModalEmailAgreement)
)

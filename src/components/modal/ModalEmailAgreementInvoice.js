import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, Form, Label, Grid, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import ReactQuill from 'react-quill'
import * as Yup from 'yup'

import { closeModal } from '../../redux/ducks/modal'
import {
  sendAgreement,
  getEmailTemplateAgreement
} from '../../redux/ducks/agreement'
import 'react-quill/dist/quill.snow.css'

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
    this.props.getEmailTemplateAgreement(13, this.props.businessId)
    this._attachQuillRefs()
  }

  _handleChangeBody = value => {
    this.props.setFieldValue('body', value)
  }

  _handleConfirm = object => {
    if (!object) {
      this.props.closeModal()
      return
    }
    this.props.onConfirm(this.props.values)
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

  _handleFileUpload = e => {
    const file = e.target.files[0]
    this.props.setFieldValue('attachment', file)
  }

  render () {
    const {
      options,
      values,
      touched,
      errors,
      isValid,
      handleChange,
      handleBlur,
      isLoading,
      isLoadingInvoice,
      fromInvoice,
      fromAgreement
    } = this.props
    return (
      <Modal open size="small" onClose={() => this._handleConfirm(false)}>
        <Modal.Header>{options.title}</Modal.Header>
        <Modal.Content scrolling>
          <Form>
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
            <Form.Group inline>
              <h4 style={{ marginRight: '-18px', fontSize: '.92857143em' }}>
                Attachment Agreement
              </h4>
              <Form.Input
                name="attachmentAgreement"
                autoComplete="attachmentAgreement"
                value={values.attachmentAgreement}
                readOnly
                disabled={
                  !values.attachAgreement || this.props.fileNameAgreement === ''
                }
                width={14}
              />
              <Header as="h4" style={{ marginTop: 0 }}>
                <Form.Checkbox
                  readOnly={fromAgreement}
                  label="Attach Agreement"
                  name="attachAgreement"
                  onChange={this._handleChangeCheckBox}
                  checked={values.attachAgreement}
                  disabled={this.props.fileNameAgreement === ''}
                />
              </Header>
            </Form.Group>
            <Form.Group inline>
              <h4 style={{ fontSize: '.92857143em' }}>Attachment Invoice</h4>
              <Form.Input
                name="attachmentInvoice"
                autoComplete="attachmentInvoice"
                value={values.attachmentInvoice}
                readOnly
                disabled={
                  !values.attachInvoice || this.props.fileNameInvoice === ''
                }
                width={14}
              />
              <Header as="h4" style={{ marginTop: 0 }}>
                <Form.Checkbox
                  readOnly={fromInvoice}
                  label="Attach Invoice"
                  name="attachInvoice"
                  onChange={this._handleChangeCheckBox}
                  checked={values.attachInvoice}
                  disabled={this.props.fileNameInvoice === ''}
                />
              </Header>
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

                {errors.attachment &&
                  touched.attachment && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.attachment}
                  />
                )}
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
                <Form.Field style={{ height: '40vh' }}>
                  <ReactQuill
                    ref={el => {
                      this.reactQuillRef = el
                    }}
                    value={values.body}
                    onChange={this._handleChangeBody}
                    style={{ height: '90%' }}
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
            loading={isLoading || isLoadingInvoice}
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
  getEmailTemplateAgreement: PropTypes.func,
  objectEmailTemplate: PropTypes.object,
  sendAgreement: PropTypes.func,
  vendorEmail: PropTypes.string.isRequired,
  businessId: PropTypes.number.isRequired,
  fileNameAgreement: PropTypes.string.isRequired,
  fileNameInvoice: PropTypes.string.isRequired,
  onConfirm: PropTypes.func,
  isLoading: PropTypes.bool,
  isLoadingInvoice: PropTypes.bool,
  fromInvoice: PropTypes.bool,
  fromAgreement: PropTypes.bool
}

const mapStateToProps = state => ({
  objectEmailTemplate: state.agreement.getEmailTemplate.object,
  isLoading: state.agreement.send.isLoading,
  isLoadingInvoice: state.invoice.send.isLoading
})

const mapPropsToValues = props => ({
  to: props.vendorEmail ? props.vendorEmail : '',
  subject: props.objectEmailTemplate ? props.objectEmailTemplate.subject : '',
  attachmentAgreement: props.fileNameAgreement,
  attachmentInvoice: props.fileNameInvoice,
  body: props.objectEmailTemplate ? props.objectEmailTemplate.body : '',
  attachment: '',
  attachAgreement: props.fileNameAgreement !== '',
  attachInvoice: props.fileNameInvoice !== ''
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      closeModal,
      getEmailTemplateAgreement,
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
    validationSchema,
    isInitialValid: true
  })(ModalEmailAgreement)
)

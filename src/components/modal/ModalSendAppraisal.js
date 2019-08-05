import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, Form, Label, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import ReactQuill from 'react-quill'
import * as Yup from 'yup'
import { sendAppraisal, getEmailTemplateAppraisal } from '../../redux/ducks/appraisal'
// import {Editor, EditorState} from 'draft-js'
import { closeModal } from '../../redux/ducks/modal'
import 'react-quill/dist/quill.snow.css'

class ModalEmailAgreement extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
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
    // this.props.getEmailTemplateWithHandleBars(12, this.props.appraisalObject.id, this.props.appraisalObject.business_id)
    this.props.getEmailTemplateAppraisal(12, this.props.appraisalObject.business_id)
    this._attachQuillRefs()
  }

  _attachQuillRefs = () => {
    // Ensure React-Quill reference is available:
    if (!this.reactQuillRef || typeof this.reactQuillRef.getEditor !== 'function') {
      return false
    }
    // Skip if Quill reference is defined:
    if (this.quillRef !== null) return false

    const quillRef = this.reactQuillRef.getEditor()
    if (quillRef !== null) this.quillRef = quillRef
  }

  _handleChangeBody = value => {
    this.props.setFieldValue('body', value)
  }

  _handleConfirm = async object => {
    if (!object) {
      this.props.closeModal()
      return
    }
    await this.props.sendAppraisal(this.props.values)
    this.props.onConfirm(true)
    this.props.closeModal()
  }

  render () {
    const { options, values, touched, errors, handleChange, handleBlur, isLoading } = this.props
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
                {errors.to && touched.to && <Label basic color="red" pointing content={errors.to} />}
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
                {errors.subject && touched.subject && <Label basic color="red" pointing content={errors.subject} />}
              </Form.Field>
            </Form.Group>
            <Form.Group inline>
              <h4 style={{ marginRight: '-18px', fontSize: '.92857143em' }}>Appraisal Attachment</h4>
              <Form.Input name="attachment" autoComplete="attachment" value={values.attachment} readOnly width={14} />
            </Form.Group>
            <Form.Group>
              <h5 style={{ fontSize: '.92857143em', paddingLeft: '8px' }}>Body</h5>
            </Form.Group>
            <Grid.Row columns={1}>
              <Grid.Column floated="left" width={16} style={{ paddingLeft: '0px', paddingRight: 0 }}>
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
          <Button negative content="Cancel" onClick={() => this._handleConfirm(false)} />
          <Button
            positive
            icon="send"
            labelPosition="right"
            content="Send"
            onClick={this._handleConfirm}
            loading={isLoading}
            // disabled={!isValid}
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
  business: PropTypes.object.isRequired,
  appraisalObject: PropTypes.object.isRequired,
  getEmailTemplate: PropTypes.func,
  objectEmailTemplate: PropTypes.object,
  sendAppraisal: PropTypes.func,
  getEmailTemplateAppraisal: PropTypes.func,
  isLoading: PropTypes.bool,
  onConfirm: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  objectEmailTemplate: state.appraisal.getEmailTemplateAppraisal.object,
  isLoading: state.appraisal.send.isLoading
})

const mapPropsToValues = props => ({
  to: props.business ? props.business.vendorEmail : '',
  attachment: props.business ? `${props.business.businessName}.pdf` : '',
  subject: props.objectEmailTemplate ? props.objectEmailTemplate.subject : '',
  body: props.objectEmailTemplate ? props.objectEmailTemplate.body : '',
  appraisalId: props.appraisalObject ? props.appraisalObject.id : null,
  businessId: props.appraisalObject ? props.appraisalObject.business_id : null
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      closeModal,
      sendAppraisal,
      getEmailTemplateAppraisal
    },
    dispatch
  )

const validationSchema = Yup.object().shape({
  to: Yup.string()
    .required('To is required.')
    .email('Invalid email address.'),
  copy: Yup.string()
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

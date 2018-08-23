import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  Button,
  Form,
  Grid,
  Dimmer,
  Loader,
  Label,
  Header
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { closeModal } from '../../redux/ducks/modal'
import { bindActionCreators } from 'redux'

import { mapArrayToValuesForDropdownTemplates } from '../../utils/sharedFunctionArray'

import {
  getEmailTemplates,
  getEmailTemplate,
  clearEmailTemplates
} from '../../redux/ducks/emailTemplates'

import { sendEmailBuyerBrokersEmail } from '../../redux/ducks/buyer'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { withFormik } from 'formik'

class ModalEmailTemplates extends Component {
  constructor () {
    super()

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
  }

  componentDidUpdate () {
    this._attachQuillRefs()
  }

  componentDidMount () {
    this.props.getEmailTemplates(true)
    this.props.clearEmailTemplates()
    this._attachQuillRefs()
  }

  // static getDerivedStateFromProps (nextProps) {
  //   if (this.props.isSentEmail !== nextProps.isSentEmail) {
  //     this.props.closeModal()
  //   }
  // }

  _handleChangeBody = value => {
    if (value === '<p><br></p>') {
      this.props.setFieldValue('body', '')
      return
    }
    this.props.setFieldValue('body', value)
  }

  _handleSelectChange = (e, { value }) => {
    this.props.getEmailTemplate(value)
  }

  _convertHtmlToRightText = html => {
    let htmlConverted = html.replace(/<style([\s\S]*?)<\/style>/gi, '')
    htmlConverted = htmlConverted.replace(/<script([\s\S]*?)<\/script>/gi, '')
    htmlConverted = htmlConverted.replace(/<\/div>/gi, '\n')
    htmlConverted = htmlConverted.replace(/<\/li>/gi, '\n')
    htmlConverted = htmlConverted.replace(/<li>/gi, '  *  ')
    htmlConverted = htmlConverted.replace(/<\/ul>/gi, '\n')
    htmlConverted = htmlConverted.replace(/<\/p>/gi, '\n')
    htmlConverted = htmlConverted.replace(/<br\s*[\\/]?>/gi, '\n')
    htmlConverted = htmlConverted.replace(/<[^>]+>/gi, '')

    return encodeURIComponent(htmlConverted)
  }

  _handleConfirm = isConfirmed => {
    if (!isConfirmed) {
      this.props.closeModal()
      return
    }
    // const sendEmail = this.props.objectEmailTemplate
    // sendEmail.body = this.props.values.body
    // sendEmail.subject = this.props.values.subject
    // sendEmail.buyerId = parseInt(this.props.buyerId)
    // this.props.sendEmailBuyerBrokersEmail(sendEmail)
    alert('Don`t worry! An e-mail app will be opened for you very shortly.')
    window.location.href = `mailto:${this.props.email} ?subject=${
      this.props.values.subject
    } &body=${this._convertHtmlToRightText(this.props.values.body)}`
    this.props.closeModal()
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
      listEmailTemplates,
      options,
      objectEmailTemplate,
      isLoadingEmailTemplates,
      isLoadingTemplate,
      values,
      handleBlur,
      handleChange,
      touched,
      errors,
      isLoadingSentEmail,
      isLoadingEmailTemplate
    } = this.props
    return (
      <Modal open size="large" onClose={() => this._handleConfirm(false)}>
        <Modal.Header>{options.title}</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group>
              <Form.Field width={16}>
                <Form.Select
                  style={{ zIndex: 9999 }}
                  label="Templates"
                  placeholder="Please select one template bellow..."
                  options={mapArrayToValuesForDropdownTemplates(
                    listEmailTemplates
                  )}
                  name="title"
                  autoComplete="title"
                  onChange={this._handleSelectChange}
                  loading={isLoadingEmailTemplates}
                />
                {listEmailTemplates.title}
              </Form.Field>
            </Form.Group>
            <Dimmer.Dimmable dimmed={!objectEmailTemplate || isLoadingTemplate}>
              <Dimmer
                inverted
                active={!objectEmailTemplate || isLoadingTemplate}
              >
                {isLoadingTemplate ? (
                  <Loader inverted />
                ) : (
                  <Header as="h2">Please, select one template!</Header>
                )}
              </Dimmer>
              <Form.Group>
                <Form.Field width={16}>
                  <Form.Input
                    readOnly
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
              <Grid padded="horizontally">
                <Grid.Row columns={1}>
                  <Grid.Column floated="left" width={16}>
                    <Form.Field>
                      <ReactQuill
                        readOnly
                        ref={el => {
                          this.reactQuillRef = el
                        }}
                        value={values.body}
                        onChange={this._handleChangeBody}
                        style={{ height: '100%' }}
                        modules={this.state.modules}
                        formats={this.state.formats}
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Dimmer.Dimmable>
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
            icon="mail"
            labelPosition="right"
            content="Confirm"
            loading={isLoadingSentEmail}
            disabled={!objectEmailTemplate || isLoadingEmailTemplate}
            onClick={this._handleConfirm}
          />
        </Modal.Actions>
      </Modal>
    )
  }
}

ModalEmailTemplates.propTypes = {
  closeModal: PropTypes.func.isRequired,
  options: PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired,
  listEmailTemplates: PropTypes.array,
  getEmailTemplates: PropTypes.func,
  getEmailTemplate: PropTypes.func,
  objectEmailTemplate: PropTypes.object,
  clearEmailTemplates: PropTypes.func,
  isLoadingEmailTemplates: PropTypes.bool,
  isLoadingTemplate: PropTypes.bool,
  values: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  touched: PropTypes.object,
  errors: PropTypes.object,
  setFieldValue: PropTypes.func,
  sendEmailBuyerBrokersEmail: PropTypes.func,
  buyerId: PropTypes.string,
  email: PropTypes.string,
  isLoadingSentEmail: PropTypes.bool,
  isSentEmail: PropTypes.bool,
  isLoadingEmailTemplate: PropTypes.bool
}

const mapStateToProps = state => ({
  listEmailTemplates: state.emailTemplates.getAll.array,
  isLoadingEmailTemplates: state.emailTemplates.getAll.isLoading,
  objectEmailTemplate: state.emailTemplates.get.object,
  isLoadingEmailTemplate: state.emailTemplates.get.isLoading,
  isLoadingSentEmail: state.buyer.sendEmailBuyerBrokersEmail.isLoading,
  isSentEmail: state.buyer.sendEmailBuyerBrokersEmail.isSent
})

const mapPropsToValues = props => {
  return {
    body: props.objectEmailTemplate ? props.objectEmailTemplate.body : '',
    subject: props.objectEmailTemplate ? props.objectEmailTemplate.subject : ''
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getEmailTemplates,
      getEmailTemplate,
      closeModal,
      clearEmailTemplates,
      sendEmailBuyerBrokersEmail
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues,
    enableReinitialize: true
  })(ModalEmailTemplates)
)

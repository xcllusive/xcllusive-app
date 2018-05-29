import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  Button,
  Form,
  Grid,
  Dimmer,
  Loader,
  Segment,
  Label,
  Message,
  Header
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { closeModal } from '../../redux/ducks/modal'
import { bindActionCreators } from 'redux'
import Yup from 'yup'
import _ from 'lodash'

import { mapArrayToValuesForDropdown } from '../../utils/sharedFunctionArray'

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

  componentDidMount () {
    this._attachQuillRefs()
  }

  componentDidUpdate () {
    this._attachQuillRefs()
  }

  componentWillMount () {
    this.props.getEmailTemplates(1)
    this.props.clearEmailTemplates()
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.isSentEmail !== nextProps.isSentEmail) {
      this.props.closeModal()
    }
  }

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

  _handleConfirm = isConfirmed => {
    if (!isConfirmed) {
      this.props.closeModal()
      return
    }
    const sendEmail = this.props.objectEmailTemplate
    sendEmail.body = this.props.values.body
    sendEmail.subject = this.props.values.subject
    sendEmail.buyerId = parseInt(this.props.buyerId)
    this.props.sendEmailBuyerBrokersEmail(sendEmail)
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

  insertTextQuill = word => {
    const range = this.quillRef.selection.savedRange
    const position = range ? range.index : 0
    this.quillRef.insertText(position, ` {{${word}}} `)
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
      isLoadingSentEmail
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
                  options={mapArrayToValuesForDropdown(listEmailTemplates)}
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
                    required
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
              {objectEmailTemplate &&
              objectEmailTemplate.handlebars &&
              objectEmailTemplate.handlebars.length > 0 ? (
                  <Fragment>
                    <Message info size="tiny">
                      <Message.Header>
                      Replace in the body`s email with tag names by what you
                      need to use. Ex: Hi ((buyerName)).
                      </Message.Header>
                    </Message>
                    <Segment>
                      <Label.Group color="teal">
                        {objectEmailTemplate &&
                        objectEmailTemplate.handlebars.map((item, key) => {
                          return (
                            <Label
                              horizontal
                              key={key}
                              onClick={() => this.insertTextQuill(item)}
                            >
                              {'{{'}
                              {item}
                              {'}}'}
                            </Label>
                          )
                        })}
                      </Label.Group>
                    </Segment>
                  </Fragment>
                ) : null}

              <Grid padded="horizontally">
                <Grid.Row columns={1}>
                  <Grid.Column floated="left" width={16}>
                    <Form.Field>
                      <ReactQuill
                        required
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
            content="Send Email"
            loading={isLoadingSentEmail}
            disabled={!_.isEmpty(errors)}
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
  isLoadingSentEmail: PropTypes.bool,
  isSentEmail: PropTypes.bool
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

const validationSchema = Yup.object().shape({
  subject: Yup.string().required('Subject must be required')
  // body: Yup.string().required('Body must be required')
})

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

export default connect(mapStateToProps, mapDispatchToProps)(
  withFormik({
    mapPropsToValues,
    validationSchema,
    enableReinitialize: true
  })(ModalEmailTemplates)
)

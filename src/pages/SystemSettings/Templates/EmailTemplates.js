import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Form, Label, Message, Icon, Grid, Segment, Dimmer, Loader, Header, Button } from 'semantic-ui-react'
import Wrapper from '../../../components/content/Wrapper'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import {
  getEmailTemplates,
  getEmailTemplate,
  updateTemplates,
  clearEmailTemplates
} from '../../../redux/ducks/emailTemplates'
import { mapArrayToValuesForDropdownTemplates } from '../../../utils/sharedFunctionArray'

class EmailTemplates extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '',
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
    this.props.getEmailTemplates()
    this.props.clearEmailTemplates()
    this._attachQuillRefs()
  }

  componentDidUpdate () {
    this._attachQuillRefs()
  }

  _handleChangeBody = value => {
    this.props.setFieldValue('body', value)
  }

  _handleSelectChange = (e, { value }) => {
    this.props.getEmailTemplate(value)
  }

  _handleFileUpload = e => {
    const file = e.target.files[0]
    this.props.setFieldValue('attachment', file)
  }

  _handleChangeCheckBox = (e, { name }) => {
    this.props.setFieldValue(name, !this.props.values[name])
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

  insertTextQuill = word => {
    const range = this.quillRef.selection.savedRange
    const position = range ? range.index : 0
    this.quillRef.insertText(position, ` {{${word}}} `)
  }

  _openFile = url => {
    if (url) {
      window.open(url, '_blank')
    }
  }

  render () {
    const {
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      listEmailTemplates,
      objectEmailTemplate,
      isLoadingUpdate,
      isSubmitting,
      handleSubmit,
      isValid,
      isLoadingTemplate
    } = this.props
    return (
      <Wrapper>
        <Form>
          <Form.Group widths={16}>
            <Form.Field width={6}>
              <Form.Select
                style={{ zIndex: 9999 }}
                label="Templates"
                placeholder="Please select one template bellow..."
                options={mapArrayToValuesForDropdownTemplates(listEmailTemplates)}
                name="title"
                autoComplete="title"
                value={values.title}
                onChange={this._handleSelectChange}
              />
              {errors.title && touched.title && <Label basic color="red" pointing content={errors.title} />}
            </Form.Field>
            {objectEmailTemplate ? (
              <Form.Field width={10} style={{ alignSelf: 'flex-end' }}>
                <Form.Button
                  floated="right"
                  type="submit"
                  color="red"
                  disabled={isSubmitting || !isValid}
                  loading={isLoadingUpdate}
                  onClick={handleSubmit}
                >
                  <Icon name="save" />
                  Save
                </Form.Button>
              </Form.Field>
            ) : null}
          </Form.Group>
          <Dimmer.Dimmable dimmed={!objectEmailTemplate || isLoadingTemplate}>
            <Dimmer inverted active={!objectEmailTemplate || isLoadingTemplate}>
              {isLoadingTemplate ? <Loader inverted /> : <Header as="h2">Please, select one template!</Header>}
            </Dimmer>
            <Form.Group>
              {/* <Form.Field width={4}>
                <Form.Input
                  label="Description"
                  name="description"
                  autoComplete="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.description &&
                  touched.description && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.description}
                  />
                )}
              </Form.Field> */}
              <Form.Field width={4}>
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
              <Form.Field style={{ alignSelf: 'center' }}>
                <Form.Checkbox
                  label="Brokers Email"
                  name="brokersEmail"
                  onChange={this._handleChangeCheckBox}
                  checked={values.brokersEmail === true}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  type="file"
                  label="Attachment"
                  name="attachment"
                  autoComplete="attachment"
                  onChange={this._handleFileUpload}
                  onBlur={handleBlur}
                />
                {errors.attachment && touched.attachment && (
                  <Label basic color="red" pointing content={errors.attachment} />
                )}
              </Form.Field>
              <Form.Field style={{ alignSelf: 'center' }}>
                <Form.Checkbox
                  label="Enable Attachment"
                  name="enableAttachment"
                  onChange={this._handleChangeCheckBox}
                  checked={values.enableAttachment}
                />
              </Form.Field>
              <Form.Field style={{ alignItems: 'flex-start', alignSelf: 'center' }}>
                <Button
                  size="tiny"
                  color="grey"
                  disabled={objectEmailTemplate && !objectEmailTemplate.attachmentPath}
                  onClick={() => this._openFile(objectEmailTemplate.attachmentPath)}
                >
                  <Icon name="folder open outline" />
                  Open Attachment
                </Button>
              </Form.Field>
            </Form.Group>

            {objectEmailTemplate && objectEmailTemplate.handlebars && objectEmailTemplate.handlebars.length > 0 ? (
              <Fragment>
                <Message info size="tiny">
                  <Message.Header>
                    Replace in the body`s email with tag names by what you need to use. Ex: Hi ((buyerName)).
                  </Message.Header>
                </Message>
                <Segment>
                  <Label.Group color="teal">
                    {objectEmailTemplate &&
                      objectEmailTemplate.handlebars.map((item, key) => {
                        return (
                          <Label horizontal key={key} onClick={() => this.insertTextQuill(item)}>
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
                <Grid.Column floated="left" width={16} style={{ paddingLeft: 0, paddingRight: 0 }}>
                  <Form.Field>
                    <ReactQuill
                      ref={el => {
                        this.reactQuillRef = el
                      }}
                      value={values.body}
                      onChange={this._handleChangeBody}
                      style={{ height: '50vh' }}
                      modules={this.state.modules}
                      formats={this.state.formats}
                    />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Dimmer.Dimmable>
        </Form>
      </Wrapper>
    )
  }
}

EmailTemplates.propTypes = {
  values: PropTypes.object,
  touched: PropTypes.object,
  errors: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  isValid: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  getEmailTemplates: PropTypes.func,
  listEmailTemplates: PropTypes.array,
  getEmailTemplate: PropTypes.func,
  objectEmailTemplate: PropTypes.object,
  setFieldValue: PropTypes.func,
  isLoadingUpdate: PropTypes.bool,
  clearEmailTemplates: PropTypes.func,
  isLoadingTemplate: PropTypes.bool
}

const mapPropsToValues = props => {
  if (props && props.objectEmailTemplate) {
    return {
      description: props.objectEmailTemplate.description,
      body: props.objectEmailTemplate.body,
      subject: props.objectEmailTemplate.subject,
      attachmentPath: props.objectEmailTemplate.attachmentPath,
      enableAttachment: props.objectEmailTemplate.enableAttachment,
      id: props.objectEmailTemplate.id,
      brokersEmail: props.objectEmailTemplate.brokersEmail
    }
  }
  return {
    description: '',
    body: '',
    subject: '',
    attachmentPath: '',
    enableAttachment: false,
    id: '',
    brokersEmail: ''
  }
}

const handleSubmit = (values, { props, setSubmitting }) => {
  props.updateTemplates(values).then(setSubmitting(false))
}

const mapStateToProps = state => ({
  listEmailTemplates: state.emailTemplates.getAll.array,
  objectEmailTemplate: state.emailTemplates.get.object,
  isLoadingTemplate: state.emailTemplates.get.isLoading,
  isLoadingUpdate: state.emailTemplates.update.isLoading
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getEmailTemplates,
      getEmailTemplate,
      updateTemplates,
      clearEmailTemplates
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues,
    handleSubmit,
    enableReinitialize: true
  })(EmailTemplates)
)

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Form, Label, Message, Icon, Grid } from 'semantic-ui-react'
import Wrapper from '../../components/content/Wrapper'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import {
  getEmailTemplates,
  getEmailTemplate,
  updateTemplates
} from '../../redux/ducks/emailTemplates'
import { mapArrayToValuesForDropdown } from '../../utils/sharedFunctionArray'

class EmailTemplates extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '',
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
  }

  componentWillMount () {
    this.props.getEmailTemplates()
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
      handleSubmit
    } = this.props
    return (
      <Wrapper>
        <Form>
          <Form.Group>
            <Form.Field width={6}>
              <Form.Select
                label="Templates"
                options={mapArrayToValuesForDropdown(listEmailTemplates)}
                name="title"
                autoComplete="title"
                value={values.title}
                onChange={this._handleSelectChange}
              />
              {errors.title &&
                touched.title && (
                <Label basic color="red" pointing content={errors.title} />
              )}
            </Form.Field>
          </Form.Group>
          {objectEmailTemplate ? (
            <div>
              <Form.Group>
                <Form.Field width={6}>
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
                </Form.Field>
                <Form.Field width={6}>
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
                <Form.Field width={6}>
                  <Form.Input
                    type="file"
                    label="Attachment"
                    name="attachment"
                    autoComplete="attachment"
                    onChange={this._handleFileUpload}
                    onBlur={handleBlur}
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
                <Form.Checkbox
                  label="Enable Attachment"
                  name="enableAttachment"
                  onChange={this._handleChangeCheckBox}
                  checked={values.enableAttachment}
                />
              </Form.Group>
              <Message info size="tiny">
                <Message.Header>
                  Replace in the body`s email with tag names by what you need to
                  use. Ex: Hi ((buyerName)).
                </Message.Header>
              </Message>
              <Form.Group>
                <Label color="teal" tag>
                  ((buyerName))
                </Label>
                <Label color="grey" tag>
                  ((businessName))
                </Label>
                <Label color="teal" tag>
                  ((businessID))
                </Label>
                <Label color="grey" tag>
                  ((buyerID))
                </Label>
                <Label color="teal" tag>
                  ((telephone))
                </Label>
                <Label color="grey" tag>
                  ((email))
                </Label>
              </Form.Group>
              <Grid padded="horizontally">
                <Grid.Row columns={1}>
                  <Grid.Column floated="left" width={14}>
                    <Form.Field>
                      <ReactQuill
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
              <Grid.Column>
                <Form.Button
                  floated="right"
                  type="submit"
                  color="red"
                  disabled={isSubmitting}
                  loading={isLoadingUpdate}
                  onClick={handleSubmit}
                >
                  <Icon name="save" />
                  Save
                </Form.Button>
              </Grid.Column>
            </div>
          ) : null}
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
  isLoadingUpdate: PropTypes.bool
}

const mapPropsToValues = props => {
  if (props && props.objectEmailTemplate) {
    return {
      description: props.objectEmailTemplate.description,
      body: props.objectEmailTemplate.body,
      subject: props.objectEmailTemplate.subject,
      attachmentPath: props.objectEmailTemplate.attachmentPath,
      enableAttachment: props.objectEmailTemplate.enableAttachment,
      id: props.objectEmailTemplate.id
    }
  }
  return {
    description: '',
    body: '',
    subject: '',
    attachmentPath: '',
    enableAttachment: '',
    id: ''
  }
}

const handleSubmit = (values, { props, setSubmitting }) => {
  props.updateTemplates(values).then(setSubmitting(false))
}

const mapStateToProps = state => ({
  listEmailTemplates: state.emailTemplates.getAll.array,
  objectEmailTemplate: state.emailTemplates.get.object,
  isLoadingUpdate: state.emailTemplates.update.isLoading
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getEmailTemplates,
      getEmailTemplate,
      updateTemplates
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(
  withFormik({
    mapPropsToValues,
    handleSubmit,
    enableReinitialize: true
  })(EmailTemplates)
)

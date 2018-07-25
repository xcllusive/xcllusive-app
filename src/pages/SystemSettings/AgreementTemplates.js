import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import {
  Form,
  Label,
  Icon,
  Grid,
  Segment,
  Dimmer,
  Loader,
  Header
} from 'semantic-ui-react'
import Wrapper from '../../components/content/Wrapper'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import {
  getEmailTemplates,
  getEmailTemplate,
  updateTemplates,
  clearEmailTemplates
} from '../../redux/ducks/emailTemplates'
import { mapArrayToValuesForDropdownEmailTemplate } from '../../utils/sharedFunctionArray'

class AgreementTemplates extends Component {
  constructor (props) {
    super(props)
    this.state = {
      state: [
        { key: '1', text: 'ACT', value: 'ACT' },
        { key: '2', text: 'NT', value: 'NT' },
        { key: '3', text: 'NSW', value: 'NSW' },
        { key: '4', text: 'QLD', value: 'QLD' },
        { key: '5', text: 'SA', value: 'SA' },
        { key: '6', text: 'TAS', value: 'TAS' },
        { key: '7', text: 'VIC', value: 'VIC' },
        { key: '8', text: 'WA', value: 'WA' }
      ],
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
    this.quillRef = null
    this.reactQuillRef = null
  }

  componentWillMount () {
    this.props.getEmailTemplates()
    this.props.clearEmailTemplates()
  }

  componentDidMount () {
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

  _handleSelectChangeState = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
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
      listEmailTemplates,
      objectEmailTemplate,
      isLoadingUpdate,
      isSubmitting,
      handleSubmit,
      isValid,
      isLoadingTemplate,
      handleChange,
      handleBlur
    } = this.props
    const { state } = this.state
    return (
      <Wrapper>
        <Form>
          <Form.Group widths={16}>
            <Form.Field width={6}>
              <Form.Select
                style={{ zIndex: 9999 }}
                label="Templates"
                placeholder="Please select one template bellow..."
                options={mapArrayToValuesForDropdownEmailTemplate(
                  listEmailTemplates
                )}
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
              {isLoadingTemplate ? (
                <Loader inverted />
              ) : (
                <Header as="h2">Please, select one template!</Header>
              )}
            </Dimmer>
            <Form.Group>
              <Form.Field>
                <Form.Select
                  label="State"
                  name="state"
                  options={state}
                  autoComplete="state"
                  value={values.state}
                  onChange={this._handleSelectChangeState}
                />
                {errors.state &&
                  touched.state && (
                  <Label basic color="red" pointing content={errors.state} />
                )}
              </Form.Field>
            </Form.Group>
            {objectEmailTemplate &&
            objectEmailTemplate.handlebars &&
            objectEmailTemplate.handlebars.length > 0 ? (
                <Fragment>
                  <Grid.Row style={{ paddingBottom: 0, paddingLeft: '0px' }}>
                    <h4>Contract Fields</h4>
                  </Grid.Row>
                  <Segment>
                    <Form.Group>
                      <Form.Field>
                        <Form.Input
                          label="Price"
                          name="lastNameV"
                          autoComplete="lastNameV"
                          value={values.lastNameV}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.lastNameV &&
                        touched.lastNameV && (
                          <Label
                            basic
                            color="red"
                            pointing
                            content={errors.lastNameV}
                          />
                        )}
                      </Form.Field>
                      <Form.Field>
                        <Form.Input
                          label="Quantity"
                          name="lastNameV"
                          autoComplete="lastNameV"
                          value={values.lastNameV}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.lastNameV &&
                        touched.lastNameV && (
                          <Label
                            basic
                            color="red"
                            pointing
                            content={errors.lastNameV}
                          />
                        )}
                      </Form.Field>
                      <Form.Field>
                        <Form.Input
                          label="Percentual"
                          name="lastNameV"
                          autoComplete="lastNameV"
                          value={values.lastNameV}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.lastNameV &&
                        touched.lastNameV && (
                          <Label
                            basic
                            color="red"
                            pointing
                            content={errors.lastNameV}
                          />
                        )}
                      </Form.Field>
                      <Form.Field>
                        <Form.Input
                          label="Tax"
                          name="lastNameV"
                          autoComplete="lastNameV"
                          value={values.lastNameV}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.lastNameV &&
                        touched.lastNameV && (
                          <Label
                            basic
                            color="red"
                            pointing
                            content={errors.lastNameV}
                          />
                        )}
                      </Form.Field>
                    </Form.Group>
                  </Segment>
                </Fragment>
              ) : null}
            <Grid padded="horizontally">
              <Grid.Row style={{ paddingBottom: 0, paddingLeft: '0px' }}>
                <h4>Header</h4>
              </Grid.Row>
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
                      style={{ height: '10vh' }}
                      modules={this.state.modules}
                      formats={this.state.formats}
                    />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Grid.Row style={{ paddingBottom: 0, paddingLeft: '0px' }}>
              <h4>Data Base Fields</h4>
            </Grid.Row>
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
            <Grid padded="horizontally">
              <Grid.Row style={{ paddingBottom: 0, paddingLeft: '0px' }}>
                <h4>Body</h4>
              </Grid.Row>
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
                      style={{ height: '50vh' }}
                      modules={this.state.modules}
                      formats={this.state.formats}
                    />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Grid padded="horizontally">
              <Grid.Row style={{ paddingBottom: 0, paddingLeft: '0px' }}>
                <h4>Footer</h4>
              </Grid.Row>
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
                      style={{ height: '10vh' }}
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

AgreementTemplates.propTypes = {
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
  })(AgreementTemplates)
)

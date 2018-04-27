import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Form, Label, Message, Icon, Grid } from 'semantic-ui-react'
import Wrapper from '../../components/content/Wrapper'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

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

  _handleChange = value => {
    this.setState({ text: value })
  }

  render () {
    const { values, touched, errors, handleChange, handleBlur } = this.props
    return (
      <Wrapper>
        <Form>
          <Form.Group>
            <Form.Field width={6}>
              <Form.Select
                required
                label="Templates"
                options={'test'}
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
          <Form.Group>
            <Form.Field width={6}>
              <Form.Input
                required
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
                <Label basic color="red" pointing content={errors.subject} />
              )}
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field width={6}>
              <Form.Input
                type="file"
                required
                label="Attachment"
                name="attachment"
                autoComplete="attachment"
                value={values.attachment}
                onChange={handleChange}
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
              label="Enable Atachment"
              name="enableAtachment"
              onChange={this._handleChangeCheckBox}
              checked={values.enableAtachment}
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
                    value={this.state.text}
                    onChange={this._handleChange}
                    style={{ height: '50vh' }}
                    modules={this.state.modules}
                    formats={this.state.formats}
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid.Column>
            <Form.Button floated="right" type="submit" color="red">
              <Icon name="save" />
              Save
            </Form.Button>
          </Grid.Column>
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
  isSubmitting: PropTypes.bool
}

const mapPropsToValues = props => {}

const handleSubmit = (values, { props, setSubmitting }) => {}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(
  withFormik({
    mapPropsToValues,
    handleSubmit
  })(EmailTemplates)
)

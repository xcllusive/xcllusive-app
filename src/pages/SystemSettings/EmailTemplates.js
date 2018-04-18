import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Form, Label } from 'semantic-ui-react'
import Wrapper from '../../components/content/Wrapper'

class EmailTemplates extends Component {
  render () {
    const { values, touched, errors, handleChange, handleBlur } = this.props
    return (
      <Wrapper>
        <Form>
          <Form.Group>
            <Form.Field>
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
            <Form.Field>
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
          </Form.Group>
          <Form.Group>
            <Form.Field>
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
            <Form.Field>
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
          </Form.Group>
          <Form.Group>
            <Form.Checkbox
              label="Enable Atachment"
              name="enableAtachment"
              onChange={this._handleChangeCheckBox}
              checked={values.enableAtachment}
            />
          </Form.Group>
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

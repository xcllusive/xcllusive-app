import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Form, Label, Icon } from 'semantic-ui-react'
import Wrapper from '../../../components/content/Wrapper'
import * as Yup from 'yup'
import { getSystemSettings, updateSystemSettings } from '../../../redux/ducks/systemSettings'

class EmailTemplates extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.props.getSystemSettings(1)
  }

  render () {
    const { values, touched, errors, handleChange, handleBlur, isSubmitting, handleSubmit, isValid } = this.props
    return (
      <Wrapper>
        <Form>
          <Form.Group>
            <Form.Field width={16} style={{ alignSelf: 'flex-end' }}>
              <Form.Button
                floated="right"
                type="submit"
                color="red"
                disabled={isSubmitting || !isValid}
                // loading={isLoadingUpdate}
                onClick={handleSubmit}
              >
                <Icon name="save" />
                Save
              </Form.Button>
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field width={6}>
              <Form.Input
                label="Email"
                name="emailOffice"
                autoComplete="emailOffice"
                value={values.emailOffice}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.emailOffice &&
                touched.emailOffice && <Label basic color="red" pointing content={errors.emailOffice} />}
            </Form.Field>
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
  isSubmitting: PropTypes.bool,
  getSystemSettings: PropTypes.func,
  updateSystemSettings: PropTypes.func
}

const validationSchema = Yup.object().shape({
  emailOffice: Yup.string()
    .email('Invalid email address.')
    .required('Email is required.')
})

const mapPropsToValues = props => {
  return {
    emailOffice: props.emailOffice ? props.emailOffice : ''
  }
}

const handleSubmit = (values, { props, setSubmitting }) => {
  props.updateSystemSettings(values).then(setSubmitting(false))
}

const mapStateToProps = state => ({
  emailOffice: state.systemSettings.get.object ? state.systemSettings.get.object.emailOffice : ''
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSystemSettings,
      updateSystemSettings
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
    enableReinitialize: true,
    validationSchema
  })(EmailTemplates)
)

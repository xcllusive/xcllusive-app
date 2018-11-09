import React from 'react'
import PropTypes from 'prop-types'
import { withFormik } from 'formik'
import { Form, Icon, Message } from 'semantic-ui-react'
import * as Yup from 'yup'

const LoginForm = ({
  values,
  touched,
  errors,
  isSubmitting,
  handleChange,
  handleBlur,
  handleSubmit,
  errorApi,
  isValid,
  isLoading
}) => (
  <Form onSubmit={handleSubmit}>
    <Form.Field>
      <Form.Input
        size="small"
        icon="envelope"
        placeholder="E-mail"
        name="email"
        autoComplete="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.email && touched.email}
      />
    </Form.Field>
    <Form.Field>
      <Form.Input
        size="small"
        icon="unlock"
        placeholder="Password"
        type="password"
        name="password"
        autoComplete="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.password && touched.password}
      />
    </Form.Field>
    <Form.Field>
      <Form.Button
        fluid
        icon
        labelPosition="right"
        size="small"
        color="blue"
        type="submit"
        disabled={isSubmitting || !isValid}
        loading={isLoading}
      >
        Login
        <Icon name="right arrow" />
      </Form.Button>
    </Form.Field>
    <Message
      error
      visible={(errors.email && touched.email) || (errors.password && touched.password) || errorApi !== null}
    >
      <Message.List>
        {errors.email && touched.email && <Message.Item>{errors.email}</Message.Item>}
        {errors.password && touched.password && <Message.Item>{errors.password}</Message.Item>}
        {errorApi && <Message.Item>{errorApi}</Message.Item>}
      </Message.List>
    </Message>
  </Form>
)

LoginForm.propTypes = {
  values: PropTypes.object,
  touched: PropTypes.object,
  errors: PropTypes.object,
  isSubmitting: PropTypes.bool,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  errorApi: PropTypes.string,
  isValid: PropTypes.bool,
  isLoading: PropTypes.bool
}

const mapPropsToValues = () => ({
  email: '',
  password: ''
})

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address.')
    .required('Email is required.'),
  password: Yup.string()
    .required('Password is required.')
    .min(4, 'Password required minimum 4 characters.')
    .max(128, 'Password required max 128 characters.')
})

const handleSubmit = ({ email, password }, { props, setSubmitting }) =>
  props.submit(email, password).then(setSubmitting(false))

export default withFormik({ mapPropsToValues, validationSchema, handleSubmit })(LoginForm)

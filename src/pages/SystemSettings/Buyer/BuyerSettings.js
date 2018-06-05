import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import {
  Form,
  Label,
  Icon
} from 'semantic-ui-react'
import Wrapper from '../../../components/content/Wrapper'

class EmailTemplates extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount () {
  }

  componentDidMount () {
  }

  render () {
    const {
      values,
      touched,
      errors,
      handleChange,
      // handleBlur,
      isSubmitting,
      // handleSubmit,
      isValid
    } = this.props
    return (
      <Wrapper>
        <Form>
          <Form.Group widths={16}>
            <Form.Field width={10} style={{ alignSelf: 'flex-end' }}>
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
            <Form.Field width={6}>
              <Form.Input
                label="Email"
                name="title"
                autoComplete="title"
                value={values.title}
                onChange={handleChange}
              />
              {errors.title &&
                touched.title && (
                <Label basic color="red" pointing content={errors.title} />
              )}
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
  isSubmitting: PropTypes.bool
}

const mapPropsToValues = props => {
}

const handleSubmit = (values, { props, setSubmitting }) => {
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
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

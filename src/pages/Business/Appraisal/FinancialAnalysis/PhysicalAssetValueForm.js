import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Grid, Segment, Header, Form, Label } from 'semantic-ui-react'
import * as Yup from 'yup'

import CustomColumn from '../../../../components/content/CustomGridColumn'

class AddbacksAndAdjustmentsForm extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  _handleChangeCheckBox = (e, { name }) => {
    this.props.setFieldValue(name, !this.props.values[name])
  }

  render () {
    const { values, handleChange, handleBlur, errors, touched } = this.props
    return (
      <Fragment>
        <Segment>
          <Header
            style={{ marginTop: '10px', marginBottom: '10px' }}
            as="h3"
            textAlign="center"
            color="blue"
          >
            Physical Asset Value
          </Header>
          <Grid celled="internally" divided>
            <Grid.Row columns={3}>
              <CustomColumn textAlign="center">
                Physical Asset Value (Excluding Stock)
              </CustomColumn>
              <CustomColumn>
                <Form size="tiny">
                  <Form.Field>
                    <Form.Input
                      name="physicaLAssetValue"
                      autoComplete="physicaLAssetValue"
                      value={values.physicaLAssetValue}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.physicaLAssetValue &&
                      touched.physicaLAssetValue && (
                      <Label
                        basic
                        color="red"
                        pointing
                        content={errors.physicaLAssetValue}
                      />
                    )}
                  </Form.Field>
                </Form>
              </CustomColumn>
              <CustomColumn />
            </Grid.Row>
          </Grid>
        </Segment>
      </Fragment>
    )
  }
}

AddbacksAndAdjustmentsForm.propTypes = {
  values: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  errors: PropTypes.object,
  touched: PropTypes.object,
  setFieldValue: PropTypes.func,
  isValid: PropTypes.bool,
  financialYear: PropTypes.string
}

const mapPropsToValues = props => ({})

const mapStateToProps = state => {
  return {}
}

const validationSchema = Yup.object().shape({})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues,
    validationSchema,
    enableReinitialize: true
  })(AddbacksAndAdjustmentsForm)
)

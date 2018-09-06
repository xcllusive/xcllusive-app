import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Grid, Segment, Header, Form, Label } from 'semantic-ui-react'
import * as Yup from 'yup'

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
            Stock
          </Header>
          <Grid celled="internally" divided>
            <Grid.Row columns={3}>
              <Grid.Column />
              <Grid.Column />
              <Grid.Column textAlign="center">
                Select to use in Valuation
              </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ backgroundColor: 'lightblue' }} columns={3}>
              <Grid.Column />
              <Grid.Column textAlign="center">No Stock</Grid.Column>
              <Grid.Column textAlign="center">
                <Form size="tiny">
                  <Form.Field>
                    <Form.Checkbox
                      name="noStock"
                      onChange={this._handleChangeCheckBox}
                      checked={values.noStock}
                    />
                  </Form.Field>
                </Form>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={3}>
              <Grid.Column textAlign="center">Current Stock Level</Grid.Column>
              <Grid.Column>
                <Form size="tiny">
                  <Form.Field>
                    <Form.Input
                      name="currentStockLevel"
                      autoComplete="currentStockLevel"
                      value={values.currentStockLevel}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.currentStockLevel &&
                      touched.currentStockLevel && (
                      <Label
                        basic
                        color="red"
                        pointing
                        content={errors.currentStockLevel}
                      />
                    )}
                  </Form.Field>
                </Form>
              </Grid.Column>
              <Grid.Column textAlign="center">
                <Form size="tiny">
                  <Form.Field>
                    <Form.Checkbox
                      name="currentStockLevelYesNo"
                      onChange={this._handleChangeCheckBox}
                      checked={values.currentStockLevelYesNo}
                    />
                  </Form.Field>
                </Form>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ backgroundColor: 'lightblue' }} columns={3}>
              <Grid.Column textAlign="center">
                Stock necessary for Operation of the business
              </Grid.Column>
              <Grid.Column>
                <Form size="tiny">
                  <Form.Field>
                    <Form.Input
                      name="stockNecessary"
                      autoComplete="stockNecessary"
                      value={values.stockNecessary}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.stockNecessary &&
                      touched.stockNecessary && (
                      <Label
                        basic
                        color="red"
                        pointing
                        content={errors.stockNecessary}
                      />
                    )}
                  </Form.Field>
                </Form>
              </Grid.Column>
              <Grid.Column textAlign="center">
                <Form size="tiny">
                  <Form.Field>
                    <Form.Checkbox
                      name="stockNecessaryYesNo"
                      onChange={this._handleChangeCheckBox}
                      checked={values.stockNecessaryYesNo}
                    />
                  </Form.Field>
                </Form>
              </Grid.Column>
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

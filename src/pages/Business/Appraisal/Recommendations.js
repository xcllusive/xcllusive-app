import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Message, Step, Segment, Grid, Header, Form, Label, Checkbox } from 'semantic-ui-react'
import * as Yup from 'yup'
import Wrapper from '../../../components/content/Wrapper'
import { updateAppraisal } from '../../../redux/ducks/appraisal'

class RecommendationsPage extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillUnmount () {}

  render () {
    const { values, handleChange, handleBlur, errors, touched } = this.props
    // const {} = this.state
    return (
      <Wrapper>
        <Step.Group size="large">
          <Step active icon="comment alternate outline" title="Step 6" description="Recommendations" />
          <Message info size="large">
            <p>Now that the value has been established, you need to complete the final step of information entry.</p>
          </Message>
        </Step.Group>
        <Segment style={{ backgroundColor: '#d4d4d53b' }}>
          <Form>
            <Grid>
              <Grid.Row>
                <Grid.Column width={5} style={{ margin: '0 auto' }} textAlign="center">
                  <Header as="h3" textAlign="center" color="blue">
                    Notes and Assumptions
                  </Header>
                  <label>
                    We have made the following assumptions when estimating the asking price for this business:
                  </label>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column width={8} style={{ margin: '0 auto' }} textAlign="center">
                  <h3>Type to enter or edit the Notes and Assumptions</h3>
                </Grid.Column>
                <Grid.Column width={8} style={{ margin: '0 auto' }} textAlign="center">
                  <h3>Check to include in appraisal</h3>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Form.TextArea
                    name="notesAndAssumptions1"
                    autoComplete="notesAndAssumptions1"
                    value={values.notesAndAssumptions1}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.notesAndAssumptions1 &&
                    touched.notesAndAssumptions1 && (
                    <Label basic pointing color="red" content={errors.notesAndAssumptions1} />
                  )}
                </Grid.Column>
                <Grid.Column style={{ margin: '0 auto' }} textAlign="center">
                  <Checkbox
                    name="inclStock"
                    value="inclStock"
                    style={{ marginTop: '15px' }}
                    checked={values.inclStock}
                    onChange={this._handleChangeCheckBoxStock}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </Segment>
      </Wrapper>
    )
  }
}

RecommendationsPage.propTypes = {
  values: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  errors: PropTypes.object,
  touched: PropTypes.object,
  setFieldValue: PropTypes.func,
  isSubmitting: PropTypes.bool,
  isValid: PropTypes.bool,
  business: PropTypes.object,
  appraisalObject: PropTypes.object,
  updateAppraisal: PropTypes.func
}

const mapPropsToValues = props => ({
  business_id: props.business ? props.business.id : '',
  id: props.appraisalObject ? props.appraisalObject.id : ''
})

const mapStateToProps = state => {
  return {}
}

const validationSchema = Yup.object().shape({})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateAppraisal
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues,
    validationSchema,
    enableReinitialize: true
  })(RecommendationsPage)
)

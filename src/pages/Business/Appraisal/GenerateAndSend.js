import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Message, Step, Segment, Grid, Header, Form, Label, Checkbox } from 'semantic-ui-react'
import * as Yup from 'yup'
import Wrapper from '../../../components/content/Wrapper'
import { updateAppraisal } from '../../../redux/ducks/appraisal'

class GenerateAndSendPage extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillUnmount () {
    this.props.updateAppraisal(this.props.values)
  }

  _handleChangeCheckBox = (e, { name }) => {
    this.props.setFieldValue(name, !this.props.values[name])
  }

  render () {
    const { values, handleChange, handleBlur, errors, touched } = this.props
    // const {} = this.state

    return (
      <Wrapper>
        <Step.Group size="large">
          <Step active icon="comment alternate outline" title="Step 7" description="Confirm And Send" />
          <Message info size="large">
            <p>Now that the value has been established, you need to complete the final step of information entry.</p>
          </Message>
        </Step.Group>
        <Segment style={{ backgroundColor: '#d4d4d53b' }} size="tiny">
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
              <Grid style={{ margin: '0 auto' }} textAlign="center" divided="vertically">
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
                      name="notesAndAssumptions1YesNo"
                      value="notesAndAssumptions1YesNo"
                      style={{ marginTop: '40px' }}
                      checked={values.notesAndAssumptions1YesNo}
                      onChange={this._handleChangeCheckBox}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <Form.TextArea
                      name="notesAndAssumptions2"
                      autoComplete="notesAndAssumptions2"
                      value={values.notesAndAssumptions2}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.notesAndAssumptions2 &&
                      touched.notesAndAssumptions2 && (
                      <Label basic pointing color="red" content={errors.notesAndAssumptions2} />
                    )}
                  </Grid.Column>
                  <Grid.Column style={{ margin: '0 auto' }} textAlign="center">
                    <Checkbox
                      name="notesAndAssumptions2YesNo"
                      value="notesAndAssumptions2YesNo"
                      style={{ marginTop: '40px' }}
                      checked={values.notesAndAssumptions2YesNo}
                      onChange={this._handleChangeCheckBox}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <Form.TextArea
                      name="notesAndAssumptions3"
                      autoComplete="notesAndAssumptions3"
                      value={values.notesAndAssumptions3}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.notesAndAssumptions3 &&
                      touched.notesAndAssumptions3 && (
                      <Label basic pointing color="red" content={errors.notesAndAssumptions3} />
                    )}
                  </Grid.Column>
                  <Grid.Column style={{ margin: '0 auto' }} textAlign="center">
                    <Checkbox
                      name="notesAndAssumptions3YesNo"
                      value="notesAndAssumptions3YesNo"
                      style={{ marginTop: '40px' }}
                      checked={values.notesAndAssumptions3YesNo}
                      onChange={this._handleChangeCheckBox}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <Form.TextArea
                      name="notesAndAssumptions4"
                      autoComplete="notesAndAssumptions4"
                      value={values.notesAndAssumptions4}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.notesAndAssumptions4 &&
                      touched.notesAndAssumptions4 && (
                      <Label basic pointing color="red" content={errors.notesAndAssumptions4} />
                    )}
                  </Grid.Column>
                  <Grid.Column style={{ margin: '0 auto' }} textAlign="center">
                    <Checkbox
                      name="notesAndAssumptions4YesNo"
                      value="notesAndAssumptions4YesNo"
                      style={{ marginTop: '40px' }}
                      checked={values.notesAndAssumptions4YesNo}
                      onChange={this._handleChangeCheckBox}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <Form.TextArea
                      name="notesAndAssumptions5"
                      autoComplete="notesAndAssumptions5"
                      value={values.notesAndAssumptions5}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.notesAndAssumptions5 &&
                      touched.notesAndAssumptions5 && (
                      <Label basic pointing color="red" content={errors.notesAndAssumptions5} />
                    )}
                  </Grid.Column>
                  <Grid.Column style={{ margin: '0 auto' }} textAlign="center">
                    <Checkbox
                      name="notesAndAssumptions5YesNo"
                      value="notesAndAssumptions5YesNo"
                      style={{ marginTop: '40px' }}
                      checked={values.notesAndAssumptions5YesNo}
                      onChange={this._handleChangeCheckBox}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <Form.TextArea
                      name="notesAndAssumptions6"
                      autoComplete="notesAndAssumptions6"
                      value={values.notesAndAssumptions6}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.notesAndAssumptions6 &&
                      touched.notesAndAssumptions6 && (
                      <Label basic pointing color="red" content={errors.notesAndAssumptions6} />
                    )}
                  </Grid.Column>
                  <Grid.Column style={{ margin: '0 auto' }} textAlign="center">
                    <Checkbox
                      name="notesAndAssumptions6YesNo"
                      value="notesAndAssumptions6YesNo"
                      style={{ marginTop: '40px' }}
                      checked={values.notesAndAssumptions6YesNo}
                      onChange={this._handleChangeCheckBox}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <Form.TextArea
                      name="notesAndAssumptions7"
                      autoComplete="notesAndAssumptions7"
                      value={values.notesAndAssumptions7}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.notesAndAssumptions7 &&
                      touched.notesAndAssumptions7 && (
                      <Label basic pointing color="red" content={errors.notesAndAssumptions7} />
                    )}
                  </Grid.Column>
                  <Grid.Column style={{ margin: '0 auto' }} textAlign="center">
                    <Checkbox
                      name="notesAndAssumptions7YesNo"
                      value="notesAndAssumptions7YesNo"
                      style={{ marginTop: '40px' }}
                      checked={values.notesAndAssumptions7YesNo}
                      onChange={this._handleChangeCheckBox}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <Form.TextArea
                      name="notesAndAssumptions8"
                      autoComplete="notesAndAssumptions8"
                      value={values.notesAndAssumptions8}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.notesAndAssumptions8 &&
                      touched.notesAndAssumptions8 && (
                      <Label basic pointing color="red" content={errors.notesAndAssumptions8} />
                    )}
                  </Grid.Column>
                  <Grid.Column style={{ margin: '0 auto' }} textAlign="center">
                    <Checkbox
                      name="notesAndAssumptions8YesNo"
                      value="notesAndAssumptions8YesNo"
                      style={{ marginTop: '40px' }}
                      checked={values.notesAndAssumptions8YesNo}
                      onChange={this._handleChangeCheckBox}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <Form.TextArea
                      name="notesAndAssumptions9"
                      autoComplete="notesAndAssumptions9"
                      value={values.notesAndAssumptions9}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.notesAndAssumptions9 &&
                      touched.notesAndAssumptions9 && (
                      <Label basic pointing color="red" content={errors.notesAndAssumptions9} />
                    )}
                  </Grid.Column>
                  <Grid.Column style={{ margin: '0 auto' }} textAlign="center">
                    <Checkbox
                      name="notesAndAssumptions9YesNo"
                      value="notesAndAssumptions9YesNo"
                      style={{ marginTop: '40px' }}
                      checked={values.notesAndAssumptions9YesNo}
                      onChange={this._handleChangeCheckBox}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <Form.TextArea
                      name="notesAndAssumptions10"
                      autoComplete="notesAndAssumptions10"
                      value={values.notesAndAssumptions10}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.notesAndAssumptions10 &&
                      touched.notesAndAssumptions10 && (
                      <Label basic pointing color="red" content={errors.notesAndAssumptions10} />
                    )}
                  </Grid.Column>
                  <Grid.Column style={{ margin: '0 auto' }} textAlign="center">
                    <Checkbox
                      name="notesAndAssumptions10YesNo"
                      value="notesAndAssumptions10YesNo"
                      style={{ marginTop: '40px' }}
                      checked={values.notesAndAssumptions10YesNo}
                      onChange={this._handleChangeCheckBox}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <Form.TextArea
                      name="notesAndAssumptions11"
                      autoComplete="notesAndAssumptions11"
                      value={values.notesAndAssumptions11}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.notesAndAssumptions11 &&
                      touched.notesAndAssumptions11 && (
                      <Label basic pointing color="red" content={errors.notesAndAssumptions11} />
                    )}
                  </Grid.Column>
                  <Grid.Column style={{ margin: '0 auto' }} textAlign="center">
                    <Checkbox
                      name="notesAndAssumptions11YesNo"
                      value="notesAndAssumptions11YesNo"
                      style={{ marginTop: '40px' }}
                      checked={values.notesAndAssumptions11YesNo}
                      onChange={this._handleChangeCheckBox}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <Form.TextArea
                      name="notesAndAssumptions12"
                      autoComplete="notesAndAssumptions12"
                      value={values.notesAndAssumptions12}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.notesAndAssumptions12 &&
                      touched.notesAndAssumptions12 && (
                      <Label basic pointing color="red" content={errors.notesAndAssumptions12} />
                    )}
                  </Grid.Column>
                  <Grid.Column style={{ margin: '0 auto' }} textAlign="center">
                    <Checkbox
                      name="notesAndAssumptions12YesNo"
                      value="notesAndAssumptions12YesNo"
                      style={{ marginTop: '40px' }}
                      checked={values.notesAndAssumptions12YesNo}
                      onChange={this._handleChangeCheckBox}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <Form.TextArea
                      name="notesAndAssumptions13"
                      autoComplete="notesAndAssumptions13"
                      value={values.notesAndAssumptions13}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.notesAndAssumptions13 &&
                      touched.notesAndAssumptions13 && (
                      <Label basic pointing color="red" content={errors.notesAndAssumptions13} />
                    )}
                  </Grid.Column>
                  <Grid.Column style={{ margin: '0 auto' }} textAlign="center">
                    <Checkbox
                      name="notesAndAssumptions13YesNo"
                      value="notesAndAssumptions13YesNo"
                      style={{ marginTop: '40px' }}
                      checked={values.notesAndAssumptions13YesNo}
                      onChange={this._handleChangeCheckBox}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <Form.TextArea
                      name="notesAndAssumptions14"
                      autoComplete="notesAndAssumptions14"
                      value={values.notesAndAssumptions14}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.notesAndAssumptions14 &&
                      touched.notesAndAssumptions14 && (
                      <Label basic pointing color="red" content={errors.notesAndAssumptions14} />
                    )}
                  </Grid.Column>
                  <Grid.Column style={{ margin: '0 auto' }} textAlign="center">
                    <Checkbox
                      name="notesAndAssumptions14YesNo"
                      value="notesAndAssumptions14YesNo"
                      style={{ marginTop: '40px' }}
                      checked={values.notesAndAssumptions14YesNo}
                      onChange={this._handleChangeCheckBox}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <Form.TextArea
                      name="notesAndAssumptions15"
                      autoComplete="notesAndAssumptions15"
                      value={values.notesAndAssumptions15}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.notesAndAssumptions15 &&
                      touched.notesAndAssumptions15 && (
                      <Label basic pointing color="red" content={errors.notesAndAssumptions15} />
                    )}
                  </Grid.Column>
                  <Grid.Column style={{ margin: '0 auto' }} textAlign="center">
                    <Checkbox
                      name="notesAndAssumptions15YesNo"
                      value="notesAndAssumptions15YesNo"
                      style={{ marginTop: '40px' }}
                      checked={values.notesAndAssumptions15YesNo}
                      onChange={this._handleChangeCheckBox}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <Form.TextArea
                      name="notesAndAssumptions16"
                      autoComplete="notesAndAssumptions16"
                      value={values.notesAndAssumptions16}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.notesAndAssumptions16 &&
                      touched.notesAndAssumptions16 && (
                      <Label basic pointing color="red" content={errors.notesAndAssumptions16} />
                    )}
                  </Grid.Column>
                  <Grid.Column style={{ margin: '0 auto' }} textAlign="center">
                    <Checkbox
                      name="notesAndAssumptions16YesNo"
                      value="notesAndAssumptions16YesNo"
                      style={{ marginTop: '40px' }}
                      checked={values.notesAndAssumptions16YesNo}
                      onChange={this._handleChangeCheckBox}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <Form.TextArea
                      name="notesAndAssumptions17"
                      autoComplete="notesAndAssumptions17"
                      value={values.notesAndAssumptions17}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.notesAndAssumptions17 &&
                      touched.notesAndAssumptions17 && (
                      <Label basic pointing color="red" content={errors.notesAndAssumptions17} />
                    )}
                  </Grid.Column>
                  <Grid.Column style={{ margin: '0 auto' }} textAlign="center">
                    <Checkbox
                      name="notesAndAssumptions17YesNo"
                      value="notesAndAssumptions17YesNo"
                      style={{ marginTop: '40px' }}
                      checked={values.notesAndAssumptions17YesNo}
                      onChange={this._handleChangeCheckBox}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <Form.TextArea
                      name="notesAndAssumptions18"
                      autoComplete="notesAndAssumptions18"
                      value={values.notesAndAssumptions18}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.notesAndAssumptions18 &&
                      touched.notesAndAssumptions18 && (
                      <Label basic pointing color="red" content={errors.notesAndAssumptions18} />
                    )}
                  </Grid.Column>
                  <Grid.Column style={{ margin: '0 auto' }} textAlign="center">
                    <Checkbox
                      name="notesAndAssumptions18YesNo"
                      value="notesAndAssumptions18YesNo"
                      style={{ marginTop: '40px' }}
                      checked={values.notesAndAssumptions18YesNo}
                      onChange={this._handleChangeCheckBox}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid>
          </Form>
        </Segment>
        <Form.Group>
          <Form.Field>
            <Form.Checkbox
              label="Please confirm that you have completed the above information"
              name="confirmNotesAndAssumptions"
              onChange={this._handleChangeCheckBox}
              checked={values.confirmNotesAndAssumptions}
              onClick={() =>
                this.props.confirmsCompleteSteps('confirmNotesAndAssumptions', !values.confirmNotesAndAssumptions)
              }
            />
          </Form.Field>
        </Form.Group>
      </Wrapper>
    )
  }
}

GenerateAndSendPage.propTypes = {
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
  updateAppraisal: PropTypes.func,
  confirmsCompleteSteps: PropTypes.func
}

const mapPropsToValues = props => ({
  business_id: props.business ? props.business.id : '',
  id: props.appraisalObject ? props.appraisalObject.id : '',
  notesAndAssumptions1:
    props.appraisalObject && props.appraisalObject.notesAndAssumptions1
      ? props.appraisalObject.notesAndAssumptions1
      : 'All equipment used by the business for day-to-day operations is adequate and in good working order.',
  notesAndAssumptions1YesNo: props.appraisalObject ? props.appraisalObject.notesAndAssumptions1YesNo : true,
  notesAndAssumptions2:
    props.appraisalObject && props.appraisalObject.notesAndAssumptions2
      ? props.appraisalObject.notesAndAssumptions2
      : 'All wages paid to employees are fair market wages.',
  notesAndAssumptions2YesNo: props.appraisalObject ? props.appraisalObject.notesAndAssumptions2YesNo : true,
  notesAndAssumptions3:
    props.appraisalObject && props.appraisalObject.notesAndAssumptions3
      ? props.appraisalObject.notesAndAssumptions3
      : 'All insurance policies are maintained and paid for this size and type of business.',
  notesAndAssumptions3YesNo: props.appraisalObject ? props.appraisalObject.notesAndAssumptions3YesNo : true,
  notesAndAssumptions4:
    props.appraisalObject && props.appraisalObject.notesAndAssumptions4
      ? props.appraisalObject.notesAndAssumptions4
      : 'The business has adequate licenses and approvals.',
  notesAndAssumptions4YesNo: props.appraisalObject ? props.appraisalObject.notesAndAssumptions4YesNo : true,
  notesAndAssumptions5:
    props.appraisalObject && props.appraisalObject.notesAndAssumptions5
      ? props.appraisalObject.notesAndAssumptions5
      : 'The owners have disclosed all material facts that could affect the business operations.',
  notesAndAssumptions5YesNo: props.appraisalObject ? props.appraisalObject.notesAndAssumptions5YesNo : true,
  notesAndAssumptions6:
    props.appraisalObject && props.appraisalObject.notesAndAssumptions6
      ? props.appraisalObject.notesAndAssumptions6
      : 'All the stock being sold with the business is current line stock.',
  notesAndAssumptions6YesNo: props.appraisalObject ? props.appraisalObject.notesAndAssumptions6YesNo : true,
  notesAndAssumptions7:
    props.appraisalObject && props.appraisalObject.notesAndAssumptions7
      ? props.appraisalObject.notesAndAssumptions7
      : 'The seller will pay all obligations and collect all outstanding monies for work completed as at the day of settlement.',
  notesAndAssumptions7YesNo: props.appraisalObject ? props.appraisalObject.notesAndAssumptions7YesNo : true,
  notesAndAssumptions8:
    props.appraisalObject && props.appraisalObject.notesAndAssumptions8
      ? props.appraisalObject.notesAndAssumptions8
      : 'All statutory obligations have been met and are in order.',
  notesAndAssumptions8YesNo: props.appraisalObject ? props.appraisalObject.notesAndAssumptions8YesNo : true,
  notesAndAssumptions9:
    props.appraisalObject && props.appraisalObject.notesAndAssumptions9
      ? props.appraisalObject.notesAndAssumptions9
      : 'The seller will provide an adequate training and business handover period to the purchaser.',
  notesAndAssumptions9YesNo: props.appraisalObject ? props.appraisalObject.notesAndAssumptions9YesNo : true,
  notesAndAssumptions10:
    props.appraisalObject && props.appraisalObject.notesAndAssumptions10
      ? props.appraisalObject.notesAndAssumptions10
      : 'All vehicles are adequate for their intended use and are roadworthy.',
  notesAndAssumptions10YesNo: props.appraisalObject ? props.appraisalObject.notesAndAssumptions10YesNo : false,
  notesAndAssumptions11:
    props.appraisalObject && props.appraisalObject.notesAndAssumptions11
      ? props.appraisalObject.notesAndAssumptions11
      : 'All suppliers will agree to pass on their supply agreements to the new owner under the same conditions as with the current owner.',
  notesAndAssumptions11YesNo: props.appraisalObject ? props.appraisalObject.notesAndAssumptions11YesNo : true,
  notesAndAssumptions12:
    props.appraisalObject && props.appraisalObject.notesAndAssumptions12
      ? props.appraisalObject.notesAndAssumptions12
      : 'All contracts are transferable under the same conditions as they are currently.',
  notesAndAssumptions12YesNo: props.appraisalObject ? props.appraisalObject.notesAndAssumptions12YesNo : true,
  notesAndAssumptions13:
    props.appraisalObject && props.appraisalObject.notesAndAssumptions13
      ? props.appraisalObject.notesAndAssumptions13
      : 'All leases and rental agreements can and will be transferred to the new owner under the same current conditions.',
  notesAndAssumptions13YesNo: props.appraisalObject ? props.appraisalObject.notesAndAssumptions13YesNo : true,
  notesAndAssumptions14:
    props.appraisalObject && props.appraisalObject.notesAndAssumptions14
      ? props.appraisalObject.notesAndAssumptions14
      : '',
  notesAndAssumptions14YesNo: props.appraisalObject ? props.appraisalObject.notesAndAssumptions14YesNo : false,
  notesAndAssumptions15:
    props.appraisalObject && props.appraisalObject.notesAndAssumptions15
      ? props.appraisalObject.notesAndAssumptions15
      : '',
  notesAndAssumptions15YesNo: props.appraisalObject ? props.appraisalObject.notesAndAssumptions15YesNo : false,
  notesAndAssumptions16:
    props.appraisalObject && props.appraisalObject.notesAndAssumptions16
      ? props.appraisalObject.notesAndAssumptions16
      : '',
  notesAndAssumptions16YesNo: props.appraisalObject ? props.appraisalObject.notesAndAssumptions16YesNo : false,
  notesAndAssumptions17:
    props.appraisalObject && props.appraisalObject.notesAndAssumptions17
      ? props.appraisalObject.notesAndAssumptions17
      : '',
  notesAndAssumptions17YesNo: props.appraisalObject ? props.appraisalObject.notesAndAssumptions17YesNo : false,
  notesAndAssumptions18:
    props.appraisalObject && props.appraisalObject.notesAndAssumptions18
      ? props.appraisalObject.notesAndAssumptions18
      : '',
  notesAndAssumptions18YesNo: props.appraisalObject ? props.appraisalObject.notesAndAssumptions18YesNo : false,
  confirmNotesAndAssumptions: props.appraisalObject ? props.appraisalObject.confirmNotesAndAssumptions : false
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
  })(GenerateAndSendPage)
)

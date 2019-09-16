import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import moment from 'moment'
import { closeModal } from '../../redux/ducks/modal'
import { Modal, Form, Label, Icon, Button, Radio, Divider, Message } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { updateStageLost, getBusiness } from '../../redux/ducks/business'

class StageLostForm extends Component {
  _handleDateChange = date => {
    this.props.setFieldValue('date', date)
  }

  _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
  }

  _handleChangeCheckBox = (e, { name }) => {
    this.props.setFieldValue(name, !this.props.values[name])

    if (name === 'saleNotesLostWant' && !this.props.values[name]) {
      this.props.setFieldValue('recoveryStageNotSigned', '')
      if (this.props.values['recoveryStageNotWant']) {
        this.props.setFieldValue('recoveryStageNotWant', false)
      }
    }
    if (name === 'saleNotesLostWant' && this.props.values['saleNotesLostWant']) {
      this.props.setFieldValue('recoveryStageNotWant', '')
      if (this.props.values['recoveryStageNotSigned']) {
        this.props.setFieldValue('recoveryStageNotSigned', false)
      }
    }
    if (name === 'followUpLog' && this.props.values[name]) {
      this.props.setFieldValue('text', false)
    }
    if (name === 'followUpLog' && !this.props.values[name]) {
      this.props.setFieldValue('text', '')
    }
  }

  _handleChangeCheckBoxWithoutDefault = yesNo => {
    if (yesNo === 'Yes') {
      this.props.setFieldValue('addLeadNurtureList', 'Yes')
    } else {
      this.props.setFieldValue('addLeadNurtureList', 'No')
    }
  }

  _handleConfirm = async isConfirmed => {
    if (!isConfirmed) {
      this.props.closeModal()
      this.props.callBack(isConfirmed)
      return
    }
    await this.props.updateStageLost(this.props.values)
    this.props.closeModal()
    this.props.getBusiness(this.props.business.id)
  }

  render () {
    const {
      values,
      touched,
      errors,
      isValid,
      ratingOptions,
      updateLoading,
      handleChange,
      handleBlur,
      stageNotSignedOptions,
      stageNotWantOptions,
      options
    } = this.props
    return (
      <Modal open size="small" onClose={() => this._handleConfirm(false)}>
        <Modal.Header>{options.title}</Modal.Header>
        <Modal.Content>
          <Message warning>
            <Message.Header>IMPORTANT:</Message.Header>
            Once you have marked this business as `Lost` you can change it back to a potential listing by searching for
            it and changing the stage manually.
          </Message>
          <Form>
            <Form.Group>
              <Form.Field width={10}>
                <Form.Select
                  required
                  label="Rating"
                  options={ratingOptions}
                  name="businessRating"
                  autoComplete="businessRating"
                  value={values.businessRating}
                  onChange={this._handleSelectChange}
                />
                {errors.businessRating && touched.businessRating && (
                  <Label basic color="red" pointing content={errors.businessRating} />
                )}
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field width={10}>
                <Form.TextArea
                  required
                  label="Lost Notes"
                  name="afterSalesNotes"
                  autoComplete="afterSalesNotes"
                  value={values.afterSalesNotes}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.afterSalesNotes && touched.afterSalesNotes && (
                  <Label basic color="red" pointing content={errors.afterSalesNotes} />
                )}
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Checkbox
                label="Mark all `Pending` communications with this Vendor as `Done`"
                name="pendingDone"
                onChange={this._handleChangeCheckBox}
                checked={values.pendingDone}
              />
            </Form.Group>
            <Form.Group>
              <label>Did you meet with this vendor? </label>
              <Form.Field
                control={Radio}
                label="Yes"
                name="saleNotesLostMeeting"
                onChange={this._handleChangeCheckBox}
                checked={values.saleNotesLostMeeting}
              />
              <Form.Field
                control={Radio}
                label="No"
                name="saleNotesLostMeeting"
                onChange={this._handleChangeCheckBox}
                checked={!values.saleNotesLostMeeting}
              />
            </Form.Group>
            <Form.Group>
              <label>Did we want this business?</label>
              <Form.Field
                control={Radio}
                label="Yes"
                name="saleNotesLostWant"
                onChange={this._handleChangeCheckBox}
                checked={values.saleNotesLostWant}
              />
              <Form.Field
                control={Radio}
                label="No"
                name="saleNotesLostWant"
                onChange={this._handleChangeCheckBox}
                checked={!values.saleNotesLostWant}
              />
            </Form.Group>
            <Form.Group>
              {this.props.values.saleNotesLostWant ? (
                <Form.Field width={10}>
                  <Form.Select
                    required
                    label="Why did they not sign with us?"
                    options={stageNotSignedOptions}
                    name="recoveryStageNotSigned"
                    autoComplete="recoveryStageNotSigned"
                    value={values.recoveryStageNotSigned}
                    onChange={this._handleSelectChange}
                  />
                  {errors.recoveryStageNotSigned && touched.recoveryStageNotSigned && (
                    <Label basic color="red" pointing content={errors.recoveryStageNotSigned} />
                  )}
                </Form.Field>
              ) : (
                <Form.Field width={10}>
                  <Form.Select
                    required
                    label="Why did we not want then?"
                    options={stageNotWantOptions}
                    name="recoveryStageNotWant"
                    autoComplete="recoveryStageNotWant"
                    value={values.recoveryStageNotWant}
                    onChange={this._handleSelectChange}
                  />
                  {errors.recoveryStageNotWant && touched.recoveryStageNotWant && (
                    <Label basic color="red" pointing content={errors.recoveryStageNotWant} />
                  )}
                </Form.Field>
              )}
            </Form.Group>
            <Form.Group>
              <label>Do you want to to add to Lead Nurture List</label>
              <Form.Field
                control={Radio}
                label="Yes"
                name="addLeadNurtureList"
                onChange={() => this._handleChangeCheckBoxWithoutDefault('Yes')}
                checked={values.addLeadNurtureList === 'Yes'}
              />
              <Form.Field
                control={Radio}
                label="No"
                name="addLeadNurtureList"
                onChange={() => this._handleChangeCheckBoxWithoutDefault('No')}
                checked={values.addLeadNurtureList === 'No'}
              />
            </Form.Group>
            {!this.props.business.vendorEmail && values.addLeadNurtureList === 'Yes' ? (
              <Form.Group>
                <Form.Field>
                  <Message info>
                    This business does not have an email address. If you want to add to Lead Nurture you must type a
                    valid email
                  </Message>
                </Form.Field>
                <Form.Field width={10}>
                  <Form.Input
                    label="Email"
                    name="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email && <Label basic color="red" pointing content={errors.email} />}
                </Form.Field>
              </Form.Group>
            ) : null}
            <Divider horizontal>(Optional) Set Follow up date</Divider>
            <Form.Group>
              <Form.Checkbox
                label="Make a Follow up log."
                name="followUpLog"
                onChange={this._handleChangeCheckBox}
                checked={values.followUpLog}
              />
              {this.props.values.followUpLog ? (
                <Form.Field>
                  <DatePicker selected={values.date} onChange={this._handleDateChange} />
                </Form.Field>
              ) : (
                <Form.Field>
                  <DatePicker selected={values.date} onChange={this._handleDateChange} disabled />
                </Form.Field>
              )}
            </Form.Group>
            <Form.Group>
              {this.props.values.followUpLog ? (
                <Form.Field width={10}>
                  <Form.TextArea
                    label=""
                    name="text"
                    autoComplete="text"
                    value={values.text}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.text && touched.text && <Label basic color="red" pointing content={errors.text} />}
                </Form.Field>
              ) : (
                <Form.Field width={10}>
                  <Form.TextArea disabled name=" " value={''} />
                </Form.Field>
              )}
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="blue"
            disabled={updateLoading || !isValid}
            loading={updateLoading}
            onClick={this._handleConfirm}
          >
            <Icon name="save" />
            Save and Return
          </Button>
          <Button color="red" onClick={() => this._handleConfirm(false)}>
            <Icon name="cancel" />
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

const validationSchema = Yup.object().shape({
  businessRating: Yup.string().required('Rating is required.'),
  afterSalesNotes: Yup.string().required('Lost Notes is required.'),
  saleNotesLostMeeting: Yup.string().required('This field is required.'),
  saleNotesLostWant: Yup.string().required('Lost Notes is required.'),
  // recoveryStageNotSigned: Yup.string()
  //   .required('This field is required.')
  //   .when('saleNotesLostWant', {
  //     is: saleNotesLostWant => saleNotesLostWant,
  //     then: Yup.string().required(),
  //     otherwise: Yup.string().notRequired()
  //   }),
  recoveryStageNotWant: Yup.string().when('saleNotesLostWant', {
    is: saleNotesLostWant => saleNotesLostWant === true,
    then: Yup.string().required(),
    otherwise: Yup.string().notRequired()
  }),
  addLeadNurtureList: Yup.string().required(),
  date: Yup.string().required('This field is required.'),
  // vendorEmail: Yup.string().when('addLeadNurtureList', {
  //   is: addLeadNurtureList => addLeadNurtureList === 'Yes',
  //   then: Yup.string().email('Invalid email address.'),
  //   otherwise: Yup.string().notRequired
  // })
  email: Yup.string()
    .notRequired()
    .when('addLeadNurtureList', {
      is: addLeadNurtureList => addLeadNurtureList === 'Yes',
      then: Yup.string().email('Invalid email address.'),
      otherwise: Yup.string().notRequired()
    })
})

StageLostForm.propTypes = {
  values: PropTypes.object,
  touched: PropTypes.object,
  errors: PropTypes.object,
  setFieldValue: PropTypes.func,
  isValid: PropTypes.bool,
  ratingOptions: PropTypes.array,
  updateLoading: PropTypes.bool,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  stageNotSignedOptions: PropTypes.array,
  stageNotWantOptions: PropTypes.array,
  closeModal: PropTypes.func.isRequired,
  options: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired,
  callBack: PropTypes.func.isRequired,
  updateStageLost: PropTypes.func,
  business: PropTypes.object,
  getBusiness: PropTypes.func
}

const mapPropsToValues = props => ({
  date: moment(),
  businessRating: props.business.ratingId ? props.business.ratingId : '',
  saleNotesLostMeeting: props.business.saleNotesLostMeeting === '1',
  pendingDone: true,
  saleNotesLostWant: false,
  recoveryStageNotSigned: false,
  followUpLog: false,
  businessId: props.business.id ? props.business.id : '',
  text: '',
  addLeadNurtureList: '',
  email: ''
})

const mapStateToProps = state => ({
  ratingOptions: state.business.get.ratingOptions,
  updateLoading: state.business.updateStageLost.isLoading,
  stageNotSignedOptions: state.business.get.stageNotSignedOptions,
  stageNotWantOptions: state.business.get.stageNotWantOptions
})

const mapDispatchToProps = dispatch => bindActionCreators({ updateStageLost, closeModal, getBusiness }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues,
    validationSchema,
    enableReinitialize: true
  })(StageLostForm)
)

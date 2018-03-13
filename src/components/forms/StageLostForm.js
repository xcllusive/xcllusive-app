import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { updateStageLost } from '../../redux/ducks/business'
import { Modal, Form, Label, Icon, Button, Radio, Divider } from 'semantic-ui-react'

class StageLostForm extends Component {
  _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
  }

  _handleChangeCheckBox = (e, { name }) => {
    this.props.setFieldValue(name, !this.props.values[name])
  }

  render () {
    const {
      values,
      touched,
      errors,
      handleSubmit,
      isSubmitting,
      isValid,
      modalOpen,
      toggleModal,
      ratingOptions,
      updateLoading,
      handleChange,
      handleBlur,
      stageNotSignedOptions,
      stageNotWantOptions
    } = this.props
    return (
      <Modal
        dimmer={'blurring'}
        open={modalOpen}
      >
        <Modal.Header align='center'>Change the business stage to 'Lost'</Modal.Header>
        <Modal.Content>
          <Form>
            <h5>Please select a business rating*. IMPORTANT: Once you have marked this business as 'Lost' you can change it back to a potential listing by searching for it and changing the stage manually.</h5>
            <Form.Group>
              <Form.Field width={10}>
                <Form.Select
                  required
                  label='Rating'
                  options={ratingOptions}
                  name='businessRating'
                  autoComplete='businessRating'
                  value={values.businessRating}
                  onChange={this._handleSelectChange}
                />
                {errors.businessRating && touched.businessRating && <Label basic color='red' pointing content={errors.businessRating} />}
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field width={10}>
                <Form.TextArea
                  label='Lost Notes'
                  name='afterSalesNotes'
                  autoComplete='afterSalesNotes'
                  value={values.afterSalesNotes}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.afterSalesNotes && touched.afterSalesNotes && <Label basic color='red' pointing content={errors.afterSalesNotes} />}
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Checkbox
                label='Mark all `Pending` communications with this Vendor as `Done`'
                name='pendingDone'
                onChange={this._handleChangeCheckBox}
                checked={values.pendingDone}
              />
            </Form.Group>
            <Form.Group>
              <label>Did you meet with this vendor? </label>
              <Form.Field
                control={Radio}
                label='Yes'
                name='saleNotesLostMeeting'
                onChange={this._handleChangeCheckBox}
                checked={values.saleNotesLostMeeting}
              />
              <Form.Field
                control={Radio}
                label='No'
                name='saleNotesLostMeeting'
                onChange={this._handleChangeCheckBox}
                checked={!values.saleNotesLostMeeting}
              />
            </Form.Group>
            <Form.Group>
              <label>Did we want this business?</label>
              <Form.Field
                control={Radio}
                label='Yes'
                name='saleNotesLostWant'
                onChange={this._handleChangeCheckBox}
                checked={values.saleNotesLostWant}
              />
              <Form.Field
                control={Radio}
                label='No'
                name='saleNotesLostWant'
                onChange={this._handleChangeCheckBox}
                checked={!values.saleNotesLostWant}
              />
            </Form.Group>
            <Form.Group>
              {
                this.props.values.saleNotesLostWant ? (
                  <Form.Field width={10}>
                    <Form.Select
                      required
                      label='Why did they not sign with us?'
                      options={stageNotSignedOptions}
                      name='recoveryStageNotSigned'
                      autoComplete='recoveryStageNotSigned'
                      value={values.recoveryStageNotSigned}
                      onChange={this._handleSelectChange}
                    />
                    {errors.recoveryStageNotSigned && touched.recoveryStageNotSigned && <Label basic color='red' pointing content={errors.recoveryStageNotSigned} />}
                  </Form.Field>
                ) : (
                  <Form.Field width={10}>
                    <Form.Select
                      required
                      label='Why did we not want then?'
                      options={stageNotWantOptions}
                      name='recoveryStageNotWant'
                      autoComplete='recoveryStageNotWant'
                      value={values.recoveryStageNotWant}
                      onChange={this._handleSelectChange}
                    />
                    {errors.recoveryStageNotWant && touched.recoveryStageNotWant && <Label basic color='red' pointing content={errors.recoveryStageNotWant} />}
                  </Form.Field>
                )
              }
            </Form.Group>
            <Divider horizontal>(Optional) Set Follow up date</Divider>
            <Form.Group>
              <Form.Checkbox
                label='Make a Follow up log.'
                name='notifyOwner'
                onChange={this._handleChangeCheckBox}
                //  checked={values.true}
              />
            </Form.Group>
            <Form.Group>
              <Form.Field width={10}>
                <Form.TextArea
                  label=''
                  name='afterSalesNotes'
                  autoComplete='afterSalesNotes'
                  value={values.afterSalesNotes}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.afterSalesNotes && touched.afterSalesNotes && <Label basic color='red' pointing content={errors.afterSalesNotes} />}
              </Form.Field>
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color='blue'
            disabled={isSubmitting || !isValid}
            loading={updateLoading}
            onClick={handleSubmit}
          >
            <Icon name='save' />
            Save and Return
          </Button>
          <Button
            color='red'
            onClick={() => toggleModal('modalOpenStageLost')}
          >
            <Icon name='cancel' />
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

StageLostForm.propTypes = {
  values: PropTypes.object,
  touched: PropTypes.object,
  errors: PropTypes.object,
  handleSubmit: PropTypes.func,
  setFieldValue: PropTypes.func,
  toggleModal: PropTypes.func,
  isSubmitting: PropTypes.bool,
  isValid: PropTypes.bool,
  modalOpen: PropTypes.bool,
  ratingOptions: PropTypes.array,
  updateLoading: PropTypes.bool,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  stageNotSignedOptions: PropTypes.array,
  stageNotWantOptions: PropTypes.array
}

const mapPropsToValues = props => {
  if (props.business) {
    const {
      ratingId,
      saleNotesLostMeeting
    } = props.business

    const business = {
      businessRating: ratingId,
      saleNotesLostMeeting
    }
    business.saleNotesLostMeeting = business.saleNotesLostMeeting === '1'
  }
  return {
    businessRating: '',
    saleNotesLostMeeting: false,
    pendingDone: true,
    saleNotesLostWant: false
  }
}

const handleSubmit = (values, {props, setSubmitting}) => {
  props.updateStageLost(values).then(setSubmitting(false))
}

const mapStateToProps = state => {
  return {
    ratingOptions: state.business.get.ratingOptions,
    updateLoading: state.business.updateStageLost.isLoading,
    stageNotSignedOptions: state.business.get.stageNotSignedOptions,
    stageNotWantOptions: state.business.get.stageNotWantOptions
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({updateStageLost}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withFormik({
    mapPropsToValues,
    handleSubmit})(StageLostForm)
)

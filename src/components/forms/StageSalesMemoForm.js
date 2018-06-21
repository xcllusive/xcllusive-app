import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { updateStageSalesMemo } from '../../redux/ducks/business'
import {
  Modal,
  Form,
  Label,
  Icon,
  Button,
  Radio,
  Divider
} from 'semantic-ui-react'
import Yup from 'yup'

class StageSalesMemoForm extends Component {
  _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
  }

  _mapValuesToArray = array => {
    if (array.length > 0) {
      return array.map((item, index) => ({
        key: index,
        text: item.firstName,
        value: item.firstName
      }))
    }
    return [{ key: 1, text: 'None users found', value: null }]
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
      productOptions,
      industryOptions,
      typeOptions,
      ratingOptions,
      usersStaff,
      updateLoading,
      handleChange,
      handleBlur
    } = this.props
    return (
      <Modal dimmer={'blurring'} open={modalOpen}>
        <Modal.Header align="center">
          What to enter for `Sales Memorandum` Stage
        </Modal.Header>
        <Modal.Content>
          <Form>
            <h5>
              IMPORTANT: Once you click `Save and Return` you will no longer be
              able to edit the `Stage` unless you contact the main office.
            </h5>
            <Form.Group>
              <Form.Field width={5}>
                <Form.Select
                  required
                  label="Product"
                  options={productOptions}
                  name="businessProduct"
                  autoComplete="businessProduct"
                  value={values.businessProduct}
                  onChange={this._handleSelectChange}
                />
                {errors.businessProduct &&
                  touched.businessProduct && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.businessProduct}
                  />
                )}
              </Form.Field>
              <Form.Field width={5}>
                <Form.Select
                  required
                  label="Agent"
                  options={usersStaff}
                  name="staffAccountName"
                  autoComplete="staffAccountName"
                  value={values.staffAccountName}
                  onChange={this._handleSelectChange}
                />
                {errors.staffAccountName &&
                  touched.staffAccountName && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.staffAccountName}
                  />
                )}
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <b>
                <label>
                  Is this business eligible for the 120 Day Guarantee?
                </label>
              </b>
              <Form.Field
                control={Radio}
                label="Yes"
                name="data120DayGuarantee"
                onChange={this._handleChangeCheckBox}
                checked={values.data120DayGuarantee}
              />
              <Form.Field
                control={Radio}
                label="No"
                name="data120DayGuarantee"
                onChange={this._handleChangeCheckBox}
                checked={!values.data120DayGuarantee}
              />
            </Form.Group>
            <Form.Group>
              <Form.Field width={5}>
                <Form.Select
                  required
                  label="Business Type"
                  options={typeOptions}
                  name="businessType"
                  autoComplete="businessType"
                  value={values.businessType}
                  onChange={this._handleSelectChange}
                />
                {errors.businessType &&
                  touched.businessType && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.businessType}
                  />
                )}
              </Form.Field>
              <Form.Field width={5}>
                <Form.Select
                  required
                  label="Industry"
                  options={industryOptions}
                  name="businessIndustry"
                  autoComplete="businessIndustry"
                  value={values.businessIndustry}
                  onChange={this._handleSelectChange}
                />
                {errors.businessIndustry &&
                  touched.businessIndustry && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.businessIndustry}
                  />
                )}
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field width={5}>
                <Form.Select
                  required
                  label="Rating"
                  options={ratingOptions}
                  name="businessRating"
                  autoComplete="businessRating"
                  value={values.businessRating}
                  onChange={this._handleSelectChange}
                />
                {errors.businessRating &&
                  touched.businessRating && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.businessRating}
                  />
                )}
              </Form.Field>
            </Form.Group>
            <Divider horizontal>Business Pricing</Divider>
            <Form.Group>
              <Form.Field>
                <Form.Input
                  required
                  label="Listed Price"
                  name="listedPrice"
                  autoComplete="listedPrice"
                  value={values.listedPrice}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.listedPrice &&
                  touched.listedPrice && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.listedPrice}
                  />
                )}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  required
                  label="Engagement Fee"
                  name="engagementFee"
                  autoComplete="engagementFee"
                  value={values.engagementFee}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.engagementFee &&
                  touched.engagementFee && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.engagementFee}
                  />
                )}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  required
                  label="Commission %"
                  name="commissionPerc"
                  autoComplete="commissionPerc"
                  value={values.commissionPerc}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.commissionPerc &&
                  touched.commissionPerc && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.commissionPerc}
                  />
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
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="blue"
            disabled={isSubmitting || !isValid}
            loading={updateLoading}
            onClick={handleSubmit}
          >
            <Icon name="save" />
            Save and Return
          </Button>
          <Button
            color="red"
            onClick={() => toggleModal('modalOpenStageSalesMemo')}
          >
            <Icon name="cancel" />
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

StageSalesMemoForm.propTypes = {
  values: PropTypes.object,
  touched: PropTypes.object,
  errors: PropTypes.object,
  handleSubmit: PropTypes.func,
  setFieldValue: PropTypes.func,
  toggleModal: PropTypes.func,
  isSubmitting: PropTypes.bool,
  isValid: PropTypes.bool,
  modalOpen: PropTypes.bool,
  productOptions: PropTypes.array,
  industryOptions: PropTypes.array,
  typeOptions: PropTypes.array,
  ratingOptions: PropTypes.array,
  usersStaff: PropTypes.array,
  updateLoading: PropTypes.bool,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func
}

const mapPropsToValues = props => {
  if (props.business) {
    const {
      productId,
      data120DayGuarantee,
      typeId,
      industryId,
      ratingId,
      staffAccountName
    } = props.business

    const business = {
      businessProduct: productId,
      data120DayGuarantee,
      businessType: typeId,
      businessIndustry: industryId,
      businessRating: ratingId,
      staffAccountName
    }
    business.data120DayGuarantee = business.data120DayGuarantee === '1'
    return _.mapValues(business, value => (value === null ? '' : value))
  }
  return {
    businessProduct: '',
    data120DayGuarantee: false,
    businessType: '',
    businessIndustry: '',
    businessRating: '',
    pendingDone: true
  }
}

const validationSchema = Yup.object().shape({
  businessProduct: Yup.string().required('This field is required.'),
  data120DayGuarantee: Yup.string().required('This field is required.'),
  staffAccountName: Yup.string().required('This field is required.'),
  businessType: Yup.string().required('This field is required.'),
  businessIndustry: Yup.string().required('This field is required.'),
  businessRating: Yup.string().required('This field is required.'),
  listedPrice: Yup.string().required('This field is required.'),
  engagementFee: Yup.string().required('This field is required.'),
  commissionPerc: Yup.string().required('This field is required.')
})

const handleSubmit = (values, { props, setSubmitting }) => {
  props.updateStageSalesMemo(values).then(setSubmitting(false))
}

const mapStateToProps = state => {
  return {
    productOptions: state.business.get.productOptions,
    industryOptions: state.business.get.industryOptions,
    typeOptions: state.business.get.typeOptions,
    ratingOptions: state.business.get.ratingOptions,
    usersStaff: state.business.get.usersStaff,
    updateLoading: state.business.updateStageSalesMemo.isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateStageSalesMemo }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    validationSchema,
    mapPropsToValues,
    handleSubmit
  })(StageSalesMemoForm)
)

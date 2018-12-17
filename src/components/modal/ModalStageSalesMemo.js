import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { updateStageSalesMemo } from '../../redux/ducks/business'
import { closeModal } from '../../redux/ducks/modal'
import { Modal, Form, Label, Icon, Button, Radio, Divider, Message } from 'semantic-ui-react'
import * as Yup from 'yup'
import numeral from 'numeral'

class ModalStageSalesMemo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      listedPrice: 0,
      engagementFee: 0
    }
  }

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

  _handleConfirm = async isConfirmed => {
    if (!isConfirmed) {
      this.props.closeModal()
      this.props.callBack(isConfirmed)
      return
    }
    await this.props.updateStageSalesMemo(this.props.values)
    this.props.closeModal()
  }

  _numberFormat = (e, { name, value }) => {
    const myNumeral = numeral(value)
    const numberFormated = myNumeral.format('$0,0.[99]')
    this.props.setFieldValue(name, myNumeral.value())
    this.setState({ [name]: numberFormated })
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.business && nextProps.business.listedPrice !== prevState.listedPrice) {
      var listedPrice = numeral(nextProps.values.listedPrice).format('$0,0.[99]')
    }
    if (nextProps.business && nextProps.business.engagementFee !== prevState.engagementFee) {
      var engagementFee = numeral(nextProps.values.engagementFee).format('$0,0.[99]')
    }
    return {
      listedPrice: listedPrice || prevState.listedPrice,
      engagementFee: engagementFee || prevState.engagementFee
    }
  }

  render () {
    const {
      values,
      touched,
      errors,
      isValid,
      productOptions,
      typeOptions,
      ratingOptions,
      usersBroker,
      updateLoading,
      handleChange,
      handleBlur,
      options
    } = this.props
    return (
      <Modal open size="small" onClose={() => this._handleConfirm(false)}>
        <Modal.Header>{options.title}</Modal.Header>
        <Modal.Content>
          <Message warning>
            <Message.Header>IMPORTANT:</Message.Header>
            Once you click `Save and Return` you will no longer be able to edit the `Stage` unless you contact the main
            office.
          </Message>
          <Form>
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
                {errors.businessProduct && touched.businessProduct && (
                  <Label basic color="red" pointing content={errors.businessProduct} />
                )}
              </Form.Field>
              <Form.Field width={5}>
                <Form.Select
                  required
                  label="Agent"
                  options={usersBroker}
                  name="brokerAccountName"
                  autoComplete="brokerAccountName"
                  value={values.brokerAccountName}
                  onChange={this._handleSelectChange}
                />
                {errors.brokerAccountName && touched.brokerAccountName && (
                  <Label basic color="red" pointing content={errors.brokerAccountName} />
                )}
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <b>
                <label>Is this business eligible for the 120 Day Guarantee?</label>
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
                  name="typeId"
                  autoComplete="typeId"
                  value={values.typeId}
                  onChange={this._handleSelectChange}
                />
                {errors.typeId && touched.typeId && <Label basic color="red" pointing content={errors.typeId} />}
              </Form.Field>
              <Form.Field width={5}>
                <Form.Input
                  required
                  label="Industry"
                  // options={industryOptions}
                  name="industry"
                  autoComplete="industry"
                  value={values.industry}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.industry && touched.industry && <Label basic color="red" pointing content={errors.industry} />}
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field width={5}>
                <Form.Select
                  required
                  label="Rating"
                  options={ratingOptions}
                  name="ratingId"
                  autoComplete="ratingId"
                  value={values.ratingId}
                  onChange={this._handleSelectChange}
                />
                {errors.ratingId && touched.ratingId && <Label basic color="red" pointing content={errors.ratingId} />}
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
                  value={this.state.listedPrice}
                  onChange={this._numberFormat}
                  onBlur={handleBlur}
                />
                {errors.listedPrice && touched.listedPrice && (
                  <Label basic color="red" pointing content={errors.listedPrice} />
                )}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  required
                  label="Engagement Fee"
                  name="engagementFee"
                  autoComplete="engagementFee"
                  value={this.state.engagementFee}
                  onChange={this._numberFormat}
                  onBlur={handleBlur}
                />
                {errors.engagementFee && touched.engagementFee && (
                  <Label basic color="red" pointing content={errors.engagementFee} />
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
                {errors.commissionPerc && touched.commissionPerc && (
                  <Label basic color="red" pointing content={errors.commissionPerc} />
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
          <Button color="blue" disabled={!isValid} loading={updateLoading} onClick={this._handleConfirm}>
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

ModalStageSalesMemo.propTypes = {
  values: PropTypes.object,
  touched: PropTypes.object,
  errors: PropTypes.object,
  setFieldValue: PropTypes.func,
  isValid: PropTypes.bool,
  productOptions: PropTypes.array,
  industryOptions: PropTypes.array,
  typeOptions: PropTypes.array,
  ratingOptions: PropTypes.array,
  usersBroker: PropTypes.array,
  updateLoading: PropTypes.bool,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  closeModal: PropTypes.func.isRequired,
  options: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired,
  updateStageSalesMemo: PropTypes.func,
  callBack: PropTypes.func.isRequired
}

const mapPropsToValues = props => {
  if (props.business) {
    const {
      id,
      productId,
      data120DayGuarantee,
      typeId,
      industry,
      ratingId,
      brokerAccountName,
      listedPrice,
      engagementFee,
      commissionPerc
    } = props.business

    const business = {
      business_id: id,
      businessProduct: productId,
      data120DayGuarantee,
      typeId,
      industry,
      ratingId,
      brokerAccountName,
      listedPrice,
      engagementFee,
      commissionPerc
    }
    business.data120DayGuarantee = business.data120DayGuarantee === '1'
    return _.mapValues(business, value => (value === null ? '' : value))
  }
  return {
    businessProduct: '',
    data120DayGuarantee: false,
    typeId: '',
    industry: '',
    ratingId: '',
    pendingDone: true,
    listedPrice: 0,
    engagementFee: 0,
    commissionPerc: 0
  }
}

const validationSchema = Yup.object().shape({
  businessProduct: Yup.string().required('This field is required.'),
  data120DayGuarantee: Yup.string().required('This field is required.'),
  brokerAccountName: Yup.string().required('This field is required.'),
  typeId: Yup.string().required('This field is required.'),
  industry: Yup.string().required('This field is required.'),
  ratingId: Yup.string().required('This field is required.'),
  listedPrice: Yup.string().required('This field is required.'),
  engagementFee: Yup.string().required('This field is required.'),
  commissionPerc: Yup.string().required('This field is required.')
})

const mapStateToProps = state => {
  return {
    productOptions: state.business.get.productOptions,
    // industryOptions: state.business.get.industryOptions,
    typeOptions: state.business.get.typeOptions,
    ratingOptions: state.business.get.ratingOptions,
    usersBroker: state.business.get.usersBroker,
    updateLoading: state.business.updateStageSalesMemo.isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateStageSalesMemo, closeModal }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    validationSchema,
    mapPropsToValues,
    enableReinitialize: true
  })(ModalStageSalesMemo)
)

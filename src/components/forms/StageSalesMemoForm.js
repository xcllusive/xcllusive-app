import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { updateBusiness } from '../../redux/ducks/business'
import { Modal, Form, Label, Icon, Button, Radio } from 'semantic-ui-react'
import Yup from 'yup'

const staffAccountName = [
  { key: 'Z', text: 'Zoran', value: 'Zoran' },
  { key: 'C', text: 'Cayo', value: 'Cayo' }
]

class StageSalesMemoForm extends Component {
  _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
  }

  _mapValuesToArray = (array) => {
    if (array.length > 0) {
      return array.map((item, index) => ({ key: index, text: item.firstName, value: item.firstName }))
    }
    return [{ key: 1, text: 'Nenhum usuario encontrado', value: null }]
  }

  render () {
    const {
      values,
      touched,
      errors,
      handleSubmit,
      isSubmitting,
      isValid,
      createLoading,
      modalOpen,
      toggleModal,
      productOptions,
      industryOptions,
      typeOptions,
      ownersTimeOptions,
      ratingOptions
    } = this.props
    return (
      <Modal
        dimmer={'blurring'}
        open={modalOpen}
      >
        <Modal.Header align='center'>What to enter for 'Sales Memorandum' Stage</Modal.Header>
        <Modal.Content>
          <Form>
            <h5>Fill in each box below. Make sure you fill in at least all the required fields (*). IMPORTANT: Once you click 'Save and Return' you will no longer be able to edit the 'Stage' unless you contact the main office.</h5>
            <Form.Group>
              <Form.Field>
                <Form.Select
                  required
                  label='Product'
                  options={productOptions}
                  name='businessProduct'
                  autoComplete='businessProduct'
                  value={values.businessProduct}
                  onChange={this._handleSelectChange}
                />
                {errors.businessProduct && touched.businessProduct && <Label basic color='red' pointing content={errors.businessProduct} />}
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <b><label>Is this business eligible for the 120 Day Guarantee?</label></b>
              <Form.Field
                control={Radio}
                label='Yes'
                name='data120DayGuarantee'
                onChange={this._handleChangeCheckBox}
                checked={values.data120DayGuarantee}
              />
              <Form.Field
                control={Radio}
                label='No'
                name='data120DayGuarantee'
                onChange={this._handleChangeCheckBox}
                checked={!values.data120DayGuarantee}
              />
            </Form.Group>
            <Form.Group>
              <Form.Field>
                <Form.Select
                  required
                  label='Agent'
                  options={staffAccountName}
                  name='staffAccountName'
                  autoComplete='staffAccountName'
                  value={values.staffAccountName}
                  onChange={this._handleSelectChange}
                />
                {errors.staffAccountName && touched.staffAccountName && <Label basic color='red' pointing content={errors.staffAccountName} />}
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field>
                <Form.Select
                  required
                  label='Business Type'
                  options={typeOptions}
                  name='businessType'
                  autoComplete='businessType'
                  value={values.businessType}
                  onChange={this._handleSelectChange}
                />
                {errors.businessType && touched.businessType && <Label basic color='red' pointing content={errors.businessType} />}
              </Form.Field>
              <Form.Field>
                <Form.Select
                  required
                  label='Industry'
                  options={industryOptions}
                  name='businessIndustry'
                  autoComplete='businessIndustry'
                  value={values.businessIndustry}
                  onChange={this._handleSelectChange}
                />
                {errors.businessIndustry && touched.businessIndustry && <Label basic color='red' pointing content={errors.businessIndustry} />}
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field>
                <Form.Select
                  required
                  label='Owner`s time'
                  options={ownersTimeOptions}
                  name='businessOwnersTime'
                  autoComplete='businessOwnersTime'
                  value={values.businessOwnersTime}
                  onChange={this._handleSelectChange}
                />
                {errors.businessOwnersTime && touched.businessOwnersTime && <Label basic color='red' pointing content={errors.businessOwnersTime} />}
              </Form.Field>
              <Form.Field>
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
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color='blue'
            disabled={isSubmitting || !isValid}
            loading={createLoading}
            onClick={handleSubmit}
          >
            <Icon name='save' />
            Save and Return
          </Button>
          <Button
            color='red'
            onClick={() => toggleModal('modalOpenStageSalesMemo')}
          >
            <Icon name='cancel' />
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
  createLoading: PropTypes.bool,
  productOptions: PropTypes.array,
  industryOptions: PropTypes.array,
  typeOptions: PropTypes.array,
  ownersTimeOptions: PropTypes.array,
  ratingOptions: PropTypes.array
}

const mapPropsToValues = props => {
  if (props.business) {
    const {
      productId,
      data120DayGuarantee,
      typeId,
      industryId,
      ownersTimeId,
      ratingId
    } = props.business

    const business = {
      businessProduct: productId,
      data120DayGuarantee,
      businessType: typeId,
      businessIndustry: industryId,
      businessOwnersTime: ownersTimeId,
      businessRating: ratingId
    }
    business.data120DayGuarantee = business.data120DayGuarantee === '1'
    return _.mapValues(business, value => value == null ? '' : value)
  }
  return {
    businessProduct: '',
    data120DayGuarantee: false,
    businessType: '',
    businessIndustry: '',
    businessOwnersTime: '',
    businessRating: ''
  }
}

const validationSchema = Yup.object().shape({
})

const handleSubmit = (values, {props, setSubmitting}) => {
  props.updateBusiness(values).then(setSubmitting(false))
}

const mapStateToProps = state => {
  return {
    productOptions: state.business.get.productOptions,
    industryOptions: state.business.get.industryOptions,
    typeOptions: state.business.get.typeOptions,
    ownersTimeOptions: state.business.get.ownersTimeOptions,
    ratingOptions: state.business.get.ratingOptions
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({updateBusiness}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withFormik({
    validationSchema,
    mapPropsToValues,
    handleSubmit})(StageSalesMemoForm)
)

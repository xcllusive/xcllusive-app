import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Modal, Form, Icon, Button, Label } from 'semantic-ui-react'
import * as Yup from 'yup'
import { closeModal } from '../../redux/ducks/modal'
import { getBusinessRegister } from '../../redux/ducks/businessRegister'
import { OptionsPriceSelectBuyer } from '../../constants/OptionsPriceSelect'
import { mapArrayToValuesForDropdown } from '../../utils/sharedFunctionArray'

class ModalEditBuyer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      state: [
        { key: 1, text: 'ACT', value: 'ACT' },
        { key: 2, text: 'NT', value: 'NT' },
        { key: 3, text: 'NSW', value: 'NSW' },
        { key: 4, text: 'QLD', value: 'QLD' },
        { key: 5, text: 'SA', value: 'SA' },
        { key: 6, text: 'TAS', value: 'TAS' },
        { key: 7, text: 'VIC', value: 'VIC' },
        { key: 8, text: 'WA', value: 'WA' },
        { key: 9, text: 'Outside Australia', value: 'Outside Australia' }
      ],
      priceOptions: OptionsPriceSelectBuyer
    }
  }
  componentDidMount () {
    this.props.getBusinessRegister(1)
  }

  _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
  }

  _handleChangeTelephone = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
    const onlyNumbers = value
    let replaced = onlyNumbers.replace(/-/gi, '')
    replaced = replaced.replace(/ /gi, '')
    replaced = replaced.replace(/;/gi, '')
    replaced = replaced.replace(/<[^>]+>/gi, '')
    replaced = replaced.replace(/<[^>]>/gi, '')
    replaced = replaced.replace(/[.*+?^${}()|[\]\\]/g, '')
    const toString = parseInt(replaced)
    this.props.setFieldValue('telephone1Number', toString.toString())
  }

  render () {
    const { state, priceOptions } = this.state
    const {
      values,
      handleChange,
      handleBlur,
      errors,
      touched,
      handleSubmit,
      isSubmitting,
      isValid,
      isLoading,
      sourceOptions,
      dropDownLoading,
      title,
      closeModal
    } = this.props
    return (
      <Modal open dimmer={'blurring'}>
        <Modal.Header align="center">{title}</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group widths="equal">
              <Form.Field>
                <Form.Input
                  required
                  label="First name"
                  name="firstName"
                  autoComplete="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.firstName && touched.firstName && (
                  <Label basic color="red" pointing content={errors.firstName} />
                )}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  required
                  label="Last name"
                  name="surname"
                  autoComplete="surname"
                  value={values.surname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.surname && touched.surname && <Label basic color="red" pointing content={errors.surname} />}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  required
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
            <Form.Group widths="equal">
              <Form.Field>
                <Form.Input
                  label="Email (optional)"
                  name="emailOptional"
                  autoComplete="emailOptional"
                  value={values.emailOptional}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.emailOptional && touched.emailOptional && (
                  <Label basic color="red" pointing content={errors.emailOptional} />
                )}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Street"
                  name="streetName"
                  autoComplete="streetName"
                  value={values.streetName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.streetName && touched.streetName && (
                  <Label basic color="red" pointing content={errors.streetName} />
                )}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Suburb"
                  name="suburb"
                  autoComplete="suburb"
                  value={values.suburb}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.suburb && touched.suburb && <Label basic color="red" pointing content={errors.suburb} />}
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field width={4}>
                <Form.Select
                  label="State"
                  name="state"
                  options={state}
                  value={values.state}
                  onChange={this._handleSelectChange}
                />
              </Form.Field>
              <Form.Field width={4}>
                <Form.Input
                  label="Post Code"
                  name="postCode"
                  autoComplete="postCode"
                  value={values.postCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.postCode && touched.postCode && <Label basic color="red" pointing content={errors.postCode} />}
              </Form.Field>
              <Form.Field width={4}>
                <Form.Input
                  label="Telephone"
                  name="telephone1"
                  autoComplete="telephone1"
                  value={values.telephone1}
                  onChange={this._handleChangeTelephone}
                  onBlur={handleBlur}
                />
                {errors.telephone1 && touched.telephone1 && (
                  <Label basic color="red" pointing content={errors.telephone1} />
                )}
              </Form.Field>
              <Form.Field width={4}>
                <Form.Input
                  label="Telephone 2"
                  name="telephone2"
                  autoComplete="telephone2"
                  value={values.telephone2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.telephone2 && touched.telephone2 && (
                  <Label basic color="red" pointing content={errors.telephone2} />
                )}
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <Form.Select
                  required
                  label="Source"
                  options={mapArrayToValuesForDropdown(sourceOptions)}
                  name="source_id"
                  autoComplete="source_id"
                  loading={dropDownLoading}
                  disabled={dropDownLoading}
                  value={values.source_id}
                  onChange={this._handleSelectChange}
                />
                {errors.source_id && touched.source_id && (
                  <Label basic color="red" pointing content={errors.source_id} />
                )}
              </Form.Field>
              <Form.Field>
                <Form.Select
                  label="Price From"
                  options={priceOptions}
                  name="priceFrom"
                  autoComplete="priceFrom"
                  value={values.priceFrom}
                  onChange={this._handleSelectChange}
                />
              </Form.Field>
              <Form.Field>
                <Form.Select
                  label="Price To"
                  options={priceOptions}
                  name="priceTo"
                  autoComplete="priceTo"
                  value={values.priceTo}
                  onChange={this._handleSelectChange}
                />
              </Form.Field>
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="blue"
            type="submit"
            disabled={isSubmitting || !isValid}
            loading={isLoading}
            onClick={handleSubmit}
          >
            <Icon name="save" />
            Update Buyer
          </Button>
          <Button color="red" onClick={closeModal}>
            <Icon name="cancel" />
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

ModalEditBuyer.propTypes = {
  values: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  errors: PropTypes.object,
  touched: PropTypes.object,
  isSubmitting: PropTypes.bool,
  isValid: PropTypes.bool,
  isLoading: PropTypes.bool,
  handleSubmit: PropTypes.func,
  setFieldValue: PropTypes.func,
  sourceOptions: PropTypes.array,
  getBusinessRegister: PropTypes.func,
  dropDownLoading: PropTypes.bool,
  buyer: PropTypes.object,
  title: PropTypes.string,
  closeModal: PropTypes.func
}

const mapPropsToValues = props => {
  return {
    id: props.buyer ? props.buyer.id : '',
    firstName: props.buyer ? props.buyer.firstName : '',
    surname: props.buyer ? props.buyer.surname : '',
    email: props.buyer ? props.buyer.email : '',
    source_id: props.buyer ? props.buyer.source_id : '',
    streetName: props.buyer ? props.buyer.streetName : '',
    suburb: props.buyer ? props.buyer.suburb : '',
    state: props.buyer ? props.buyer.state : '',
    postCode: props.buyer ? props.buyer.postCode : '',
    telephone1: props.buyer ? props.buyer.telephone1 : '',
    telephone2: props.buyer.telephone2 ? props.buyer.telephone2 : '',
    priceFrom: props.buyer ? props.buyer.priceFrom : '',
    priceTo: props.buyer ? props.buyer.priceTo : '',
    emailOptional: props.buyer && props.buyer.emailOptional ? props.buyer.emailOptional : '',
    telephone1Number: props.buyer ? props.buyer.telephone1Number : ''
  }
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required.')
    .max(40, 'First name require max 40 characters.'),
  surname: Yup.string()
    .required('Last name is required.')
    .max(40, 'Last name require max 40 characters.'),
  email: Yup.string()
    .email('Invalid email address.')
    .required('Email is required.'),
  source_id: Yup.number().required('Source is required.'),
  postCode: Yup.number().typeError('You must type only number here!'),
  telephone1: Yup.number().typeError('You must type only number here!'),
  telephone2: Yup.number().typeError('You must type only number here!'),
  emailOptional: Yup.string().email('Invalid email address.')
})

const handleSubmit = (values, { props, setSubmitting }) => props.onConfirm(values)

const mapStateToProps = state => ({
  isLoading: state.buyer.update.isLoading,
  sourceOptions: state.businessRegister.get.source.array,
  dropDownLoading: state.businessRegister.get.source.isLoading
})

const mapDispatchToProps = dispatch => bindActionCreators({ getBusinessRegister, closeModal }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues,
    validationSchema,
    handleSubmit,
    enableReinitialize: true
  })(ModalEditBuyer)
)

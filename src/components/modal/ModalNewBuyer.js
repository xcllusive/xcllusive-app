import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Modal, Form, Icon, Button, Label } from 'semantic-ui-react'
import * as Yup from 'yup'
import { getBusinessRegister } from '../../redux/ducks/businessRegister'
import { OptionsPriceSelectBuyer } from '../../constants/OptionsPriceSelect'
import { closeModal } from '../../redux/ducks/modal'

class NewBuyerForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      priceOptions: OptionsPriceSelectBuyer,
      state: [
        { key: 1, text: 'NSW', value: 'NSW' },
        { key: 2, text: 'QLD', value: 'QLD' },
        { key: 3, text: 'SA', value: 'SA' },
        { key: 4, text: 'TAS', value: 'TAS' },
        { key: 5, text: 'VIC', value: 'VIC' },
        { key: 6, text: 'WA', value: 'WA' }
      ]
    }
  }

  componentDidMount () {
    this.props.getBusinessRegister(1)
  }

  _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
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
                {errors.firstName &&
                  touched.firstName && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.firstName}
                  />
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
                {errors.surname &&
                  touched.surname && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.surname}
                  />
                )}
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
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
                {errors.email &&
                  touched.email && (
                  <Label basic color="red" pointing content={errors.email} />
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
                {errors.streetName &&
                  touched.streetName && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.streetName}
                  />
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
                {errors.suburb &&
                  touched.suburb && (
                  <Label basic color="red" pointing content={errors.suburb} />
                )}
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
                {errors.postCode &&
                  touched.postCode && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.postCode}
                  />
                )}
              </Form.Field>
              <Form.Field width={4}>
                <Form.Input
                  label="Telephone"
                  name="telephone1"
                  autoComplete="telephone1"
                  value={values.telephone1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.telephone1 &&
                  touched.telephone1 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.telephone1}
                  />
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
                {errors.telephone2 &&
                  touched.telephone2 && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.telephone2}
                  />
                )}
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <Form.Select
                  required
                  label="Source"
                  options={sourceOptions}
                  name="sourceId"
                  autoComplete="sourceId"
                  loading={dropDownLoading}
                  disabled={dropDownLoading}
                  value={values.sourceId}
                  onChange={this._handleSelectChange}
                />
                {errors.sourceId &&
                  touched.sourceId && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.sourceId}
                  />
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
            disabled={isSubmitting || !isValid}
            loading={isLoading}
            onClick={handleSubmit}
          >
            <Icon name="save" />
            Create Buyer
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

NewBuyerForm.propTypes = {
  toggleModal: PropTypes.func,
  modalOpen: PropTypes.bool,
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
  closeModal: PropTypes.func,
  title: PropTypes.string
}

const mapPropsToValues = () => ({
  firstName: '',
  surname: '',
  email: '',
  sourceId: '',
  streetName: '',
  suburb: '',
  state: '',
  postCode: '',
  telephone1: '',
  telephone2: '',
  priceFrom: '',
  priceTo: ''
})

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
  sourceId: Yup.number().required('Source is required.'),
  postCode: Yup.number().typeError('You must type only number here!'),
  telephone1: Yup.number().typeError('You must type only number here!'),
  telephone2: Yup.number().typeError('You must type only number here!'),
  priceFrom: Yup.number().typeError('You must type only number here!'),
  priceTo: Yup.number().typeError('You must type only number here!')
})

const handleSubmit = (values, { props, setSubmitting }) =>
  props.onConfirm(values)

const mapStateToProps = state => ({
  isLoading: state.buyer.update.isLoading,
  sourceOptions: state.businessRegister.get.source.array,
  dropDownLoading: state.businessRegister.get.source.isLoading
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getBusinessRegister, closeModal }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues,
    validationSchema,
    handleSubmit
  })(NewBuyerForm)
)

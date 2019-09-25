import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Modal, Form, Icon, Button, Label, Message, Dropdown } from 'semantic-ui-react'
import * as Yup from 'yup'
import { getBuyerRegister } from '../../redux/ducks/buyerRegister'
import { verifyDuplicatedBuyer, clearBuyer } from '../../redux/ducks/buyer'
import { OptionsPriceSelectBuyer } from '../../constants/OptionsPriceSelect'
import { closeModal } from '../../redux/ducks/modal'
import { mapArrayToValuesForDropdown } from '../../utils/sharedFunctionArray'

class ModalNewBuyer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      priceOptions: OptionsPriceSelectBuyer,
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
      ]
    }
  }

  componentDidMount () {
    this.props.clearBuyer()
    this.props.getBuyerRegister(2, 1000)
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
    let zero = ''
    if (replaced.substring(0, 1) === '0') zero = 0
    const toString = parseInt(replaced)
    this.props.setFieldValue('telephone1Number', `${zero}${toString.toString()}`)
  }

  _verifyDuplicatedBuyer = async values => {
    await this.props.verifyDuplicatedBuyer(values)
    if (!this.props.duplicatedBuyerObject) {
      this.props.onConfirm(values)
      this.props.closeModal(values)
    }
  }

  _closeModalAndSearchBuyer = (values, duplicatedBuyerObject) => {
    this.props.onConfirm(values, duplicatedBuyerObject)
  }

  render () {
    const { state, priceOptions } = this.state
    const {
      values,
      handleChange,
      handleBlur,
      errors,
      touched,
      isSubmitting,
      isValid,
      isLoading,
      sourceOptions,
      dropDownLoading,
      title,
      closeModal,
      duplicatedBuyerObject,
      disableButton,
      handleSubmit
    } = this.props
    return (
      <Modal open dimmer={'blurring'} size="large">
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
                  label="Last name"
                  name="surname"
                  autoComplete="surname"
                  value={values.surname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.surname && touched.surname && <Label basic color="red" pointing content={errors.surname} />}
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
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
                <label>Source</label>
                <Dropdown
                  name="sourceId"
                  placeholder="Source"
                  fluid
                  search
                  selection
                  loading={dropDownLoading}
                  options={mapArrayToValuesForDropdown(sourceOptions)}
                  value={values.sourceId}
                  onChange={this._handleSelectChange}
                  onSearchChange={this._handleSearchChange}
                />
                {errors.sourceId && touched.sourceId && <Label basic color="red" pointing content={errors.sourceId} />}
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
            <Form.Group>
              <Form.TextArea
                style={{ height: '15vh' }}
                label="Buyer Notes"
                width={16}
                name="buyerNotes"
                value={values.buyerNotes}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
          {duplicatedBuyerObject ? (
            <Message warning>
              <Message.Header>Duplicated Buyer Alert!!</Message.Header>
              <Message.List>
                <Message.Item>
                  {duplicatedBuyerObject.firstName} {duplicatedBuyerObject.surname}{' '}
                  <Icon
                    link
                    name="search"
                    onClick={() => this._closeModalAndSearchBuyer(values, duplicatedBuyerObject)}
                  />
                </Message.Item>
                <Message.Item>{duplicatedBuyerObject.email}</Message.Item>
                <Message.Item>{duplicatedBuyerObject.telephone1}</Message.Item>
              </Message.List>
            </Message>
          ) : null}
        </Modal.Content>
        <Modal.Actions>
          {duplicatedBuyerObject ? (
            <Button
              color="green"
              type="submit"
              disabled={isSubmitting || !isValid}
              loading={isLoading}
              onClick={handleSubmit}
            >
              <Icon name="save" />
              Create Duplicated Buyer
            </Button>
          ) : null}
          <Button
            color="blue"
            type="submit"
            disabled={isSubmitting || !isValid || disableButton}
            loading={isLoading}
            onClick={() => this._verifyDuplicatedBuyer(values)}
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

ModalNewBuyer.propTypes = {
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
  getBuyerRegister: PropTypes.func,
  dropDownLoading: PropTypes.bool,
  closeModal: PropTypes.func,
  onConfirm: PropTypes.func,
  title: PropTypes.string,
  verifyDuplicatedBuyer: PropTypes.func,
  duplicatedBuyerObject: PropTypes.object,
  disableButton: PropTypes.bool,
  clearBuyer: PropTypes.func,
  company: PropTypes.string
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
  priceFrom: 0,
  priceTo: 0,
  telephone1Number: '',
  buyerNotes: ''
})

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required.')
    .max(40, 'First name require max 40 characters.'),
  surname: Yup.string().max(40, 'Last name require max 40 characters.'),
  email: Yup.string().email('Invalid email address.'),
  sourceId: Yup.number().required('Source is required.'),
  postCode: Yup.number().typeError('You must type only number here!'),
  telephone1: Yup.string().max(30, 'Telephone 1 require max 30 characters.'),
  telephone2: Yup.string().max(30, 'Telephone 1 require max 30 characters.')
  // priceTo: Yup.string().test('field-match', 'Fields do not match', function (value) {
  //   const { priceFrom } = this.parent
  //   return parseInt(priceFrom) === parseInt(value)
  // })
  // priceFrom: Yup.number().typeError('You must type only number here!'),
  // priceTo: Yup.number().typeError('You must type only number here!')
})

const handleSubmit = (values, { props, setSubmitting }) => {
  props.onConfirm(values)
}

const mapStateToProps = state => ({
  isLoading: state.buyer.update.isLoading,
  sourceOptions: state.buyerRegister.get.source.array,
  dropDownLoading: state.buyerRegister.get.source.isLoading,
  duplicatedBuyerObject: state.buyer.verifyDuplicatedBuyer.object,
  disableButton: state.buyer.verifyDuplicatedBuyer.disable
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getBuyerRegister, closeModal, verifyDuplicatedBuyer, clearBuyer }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues,
    validationSchema,
    handleSubmit
  })(ModalNewBuyer)
)

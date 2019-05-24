import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withFormik } from 'formik'
import { bindActionCreators } from 'redux'
import { Modal, Form, Label, Icon, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as Yup from 'yup'

import { closeModal } from '../../redux/ducks/modal'
import { createBuyerRegister, updateBuyerRegister, getBuyerRegister } from '../../redux/ducks/buyerRegister'

class ModalNewBuyerRegister extends Component {
  constructor (props) {
    super(props)
    this.state = {
      typesBuyerRegisters: [{ key: 1, text: 'Buyer Type', value: 1 }, { key: 2, text: 'Buyer Source', value: 2 }]
    }
  }

  static getDerivedStateFromProps = nextProps => {
    if (nextProps.isCreated || nextProps.isUpdated) {
      nextProps.getBuyerRegister(nextProps.values.buyerRegister)
    }
    return null
  }

  _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
  }

  render () {
    const {
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      isValid,
      createLoading,
      updateLoading
    } = this.props

    const { typesBuyerRegisters } = this.state
    return (
      <Modal open dimmer="blurring">
        <Modal.Header align="center">{this.props.title ? this.props.title : ''}</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group>
              <Form.Field width={4}>
                <Form.Select
                  required
                  label="Buyer Register"
                  name="buyerRegister"
                  options={typesBuyerRegisters}
                  autoComplete="buyerRegister"
                  value={values.buyerRegister}
                  onChange={this._handleSelectChange}
                  disabled={this.props.buyerRegister !== undefined}
                />
                {errors.buyerRegister && touched.buyerRegister && (
                  <Label basic pointing color="red" content={errors.buyerRegister} />
                )}
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field width={16}>
                <Form.Input
                  required
                  label="Label"
                  name="label"
                  autoComplete="label"
                  value={values.label}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.label && touched.label && <Label basic color="red" pointing content={errors.label} />}
              </Form.Field>
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="blue"
            disabled={createLoading || updateLoading || !isValid}
            loading={createLoading || updateLoading}
            onClick={handleSubmit}
          >
            <Icon name="save" />
            {this.props.buyerRegister ? 'Edit Register' : 'Create Register'}
          </Button>
          <Button color="red" onClick={this.props.closeModal}>
            <Icon name="cancel" />
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

ModalNewBuyerRegister.propTypes = {
  closeModal: PropTypes.func.isRequired,
  title: PropTypes.string,
  values: PropTypes.object,
  touched: PropTypes.object,
  errors: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  setFieldValue: PropTypes.func,
  isValid: PropTypes.bool,
  createLoading: PropTypes.bool,
  objectBuyerRegister: PropTypes.object,
  buyerRegister: PropTypes.number,
  updateLoading: PropTypes.bool,
  isCreated: PropTypes.bool,
  isUpdated: PropTypes.bool,
  getBuyerRegister: PropTypes.func
}

const mapPropsToValues = props => ({
  buyerRegister: props.buyerRegister ? props.buyerRegister : '',
  label: props.objectBuyerRegister ? props.objectBuyerRegister.label : '',
  id: props.objectBuyerRegister ? props.objectBuyerRegister.id : null
})

const validationSchema = Yup.object().shape({
  label: Yup.string()
    .required('Label is required.')
    .min(2, 'Label required minimum 2 characters.')
    .max(200, 'Label require max 200 characters.'),
  buyerRegister: Yup.number().required('Buyer Register is required.')
})

const handleSubmit = (values, { props, setSubmitting }) => {
  if (props.buyerRegister) {
    props.updateBuyerRegister(values)
  } else {
    props.createBuyerRegister(values)
  }
}

const mapStateToProps = state => ({
  createLoading: state.buyerRegister.create.isLoading,
  isCreated: state.buyerRegister.create.isCreated,
  updateLoading: state.buyerRegister.update.isLoading,
  isUpdated: state.buyerRegister.update.isUpdated
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      closeModal,
      createBuyerRegister,
      updateBuyerRegister,
      getBuyerRegister
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues,
    validationSchema,
    handleSubmit,
    enableReinitialize: true
  })(ModalNewBuyerRegister)
)

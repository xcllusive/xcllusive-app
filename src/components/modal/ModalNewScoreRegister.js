import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withFormik } from 'formik'
import { bindActionCreators } from 'redux'
import { Modal, Form, Label, Icon, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import Yup from 'yup'

import { closeModal } from '../../redux/ducks/modal'
import {
  createScoreRegister,
  updateScoreRegister,
  getScoreRegister
} from '../../redux/ducks/scoreRegister'

class ModalNewScoreRegister extends Component {
  constructor (props) {
    super(props)
    this.state = {
      typesScoreRegisters: [
        { key: 1, text: 'Perceived Price from Buyers', value: 1 },
        { key: 2, text: 'Information / Transparency / Momentum', value: 2 },
        { key: 3, text: 'Current Interest', value: 3 },
        { key: 4, text: 'Buyer Perceived Risk', value: 4 }
      ]
    }
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.isCreated || nextProps.isUpdated) {
      this.props.getScoreRegister(this.props.values.scoreRegisterType)
    }
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

    const { typesScoreRegisters } = this.state

    return (
      <Modal open dimmer="blurring">
        <Modal.Header align="center">
          {this.props.title ? this.props.title : ''}
        </Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group>
              <Form.Field width={4}>
                <Form.Select
                  required
                  label="Business Register"
                  name="businessRegisterType"
                  options={typesScoreRegisters}
                  autoComplete="businessRegisterType"
                  value={values.businessRegisterType}
                  onChange={this._handleSelectChange}
                  disabled={this.props.scoreRegister !== undefined}
                />
                {errors.scoreRegisterType &&
                  touched.scoreRegisterType && (
                  <Label
                    basic
                    pointing
                    color="red"
                    content={errors.scoreRegisterType}
                  />
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
                {errors.label &&
                  touched.label && (
                  <Label basic color="red" pointing content={errors.label} />
                )}
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
            {this.props.scoreRegister ? 'Edit Register' : 'Create Register'}
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

ModalNewScoreRegister.propTypes = {
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
  scoreRegister: PropTypes.object,
  scoreRegisterType: PropTypes.number,
  updateLoading: PropTypes.bool,
  isCreated: PropTypes.bool,
  isUpdated: PropTypes.bool,
  getScoreRegister: PropTypes.func
}

const mapPropsToValues = props => ({
  scoreRegisterType: props.scoreRegisterType ? props.scoreRegisterType : '',
  label: props.scoreRegister ? props.scoreRegister.label : '',
  id: props.scoreRegister ? props.scoreRegister.id : null
})

const validationSchema = Yup.object().shape({
  label: Yup.string()
    .required('Label is required.')
    .min(2, 'Label required minimum 2 characters.')
    .max(200, 'Label require max 200 characters.'),
  scoreRegisterType: Yup.number().required('Score Register is required.')
})

const handleSubmit = (values, { props, setSubmitting }) => {
  if (props.businessRegister) {
    props.updateScoreRegister(values)
  } else {
    props.createScoreRegister(values)
  }
}

const mapStateToProps = state => ({
  createLoading: state.scoreRegister.create.isLoading,
  isCreated: state.scoreRegister.create.isCreated,
  updateLoading: state.scoreRegister.update.isLoading,
  isUpdated: state.scoreRegister.update.isUpdated
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      closeModal,
      createScoreRegister,
      updateScoreRegister,
      getScoreRegister
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
  })(ModalNewScoreRegister)
)

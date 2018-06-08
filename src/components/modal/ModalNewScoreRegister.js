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
  listScoreRegister
} from '../../redux/ducks/scoreRegister'

class ModalNewScoreRegister extends Component {
  constructor (props) {
    super(props)
    this.state = {
      typesScoreRegisters: [
        {
          key: 1,
          text: 'Perceived Price from Buyers',
          value: 'perceivedPrice'
        },
        {
          key: 2,
          text: 'Information / Transparency / Momentum',
          value: 'infoTransMomen'
        },
        { key: 3, text: 'Current Interest', value: 'currentInterest' },
        { key: 4, text: 'Buyer Perceived Risk', value: 'perceivedRisk' }
      ]
    }
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.isCreated || nextProps.isUpdated) {
      this.props.listScoreRegister(this.props.values.type)
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
              <Form.Field width={8}>
                <Form.Select
                  required
                  label="Score Register"
                  name="type"
                  options={typesScoreRegisters}
                  autoComplete="type"
                  value={values.type}
                  onChange={this._handleSelectChange}
                  disabled={this.props.scoreRegister !== undefined}
                />
                {errors.type &&
                  touched.type && (
                  <Label basic pointing color="red" content={errors.type} />
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
  scoreRegisterType: PropTypes.string,
  updateLoading: PropTypes.bool,
  isCreated: PropTypes.bool,
  isUpdated: PropTypes.bool,
  listScoreRegister: PropTypes.func
}

const mapPropsToValues = props => ({
  type: props.scoreRegister ? props.scoreRegister.type : '',
  label: props.scoreRegister ? props.scoreRegister.label : '',
  id: props.scoreRegister ? props.scoreRegister.id : null
})

const validationSchema = Yup.object().shape({
  label: Yup.string()
    .required('Label is required.')
    .min(2, 'Label required minimum 2 characters.')
    .max(200, 'Label require max 200 characters.'),
  type: Yup.string().required('Score Register is required.')
})

const handleSubmit = (values, { props, setSubmitting }) => {
  if (props.scoreRegister) {
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
      listScoreRegister
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

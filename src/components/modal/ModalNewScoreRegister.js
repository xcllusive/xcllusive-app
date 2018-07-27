import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withFormik } from 'formik'
import { bindActionCreators } from 'redux'
import { Modal, Form, Label, Icon, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as Yup from 'yup'

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
        { key: 4, text: 'Buyer Perceived Risk', value: 'perceivedRisk' },
        { key: 5, text: 'Enquiries', value: 'enquiries' }
      ]
    }
  }

  static getDerivedStateFromProps = nextProps => {
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
                  label={
                    values.type && values.type === 'enquiries'
                      ? 'Score'
                      : 'Select Options'
                  }
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
            <Form.Group>
              <Form.Field width={16}>
                <Form.Input
                  required
                  label="Text for Report"
                  name="textReport"
                  autoComplete="textReport"
                  value={values.textReport}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.textReport &&
                  touched.textReport && (
                  <Label
                    basic
                    color="red"
                    pointing
                    content={errors.textReport}
                  />
                )}
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field width={4}>
                <Form.Input
                  required
                  label="Weight"
                  name="weight"
                  autoComplete="weight"
                  value={values.weight}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.weight &&
                  touched.weight && (
                  <Label basic color="red" pointing content={errors.weight} />
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
  id: props.scoreRegister ? props.scoreRegister.id : '',
  textReport: props.scoreRegister ? props.scoreRegister.textReport : '',
  weight: props.scoreRegister ? props.scoreRegister.weight : ''
})

const validationSchema = Yup.object().shape({
  label: Yup.string()
    .required('Label is required.')
    .min(1, 'Label require minimum 1 characters.')
    .max(200, 'Label require max 200 characters.'),
  type: Yup.string().required('Score Register is required.'),
  textReport: Yup.string().required('Text Report is required.'),
  weight: Yup.number()
    .required('Weight is required.')
    .min(10, 'Weight require minimum 10')
    .max(100, 'Weight require maximum 100')
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

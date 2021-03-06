import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withFormik } from 'formik'
import { bindActionCreators } from 'redux'
import { Modal, Form, Label, Icon, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as Yup from 'yup'

import { closeModal } from '../../redux/ducks/modal'
import {
  createAppraisalRegister,
  updateAppraisalRegister,
  listAppraisalRegister
} from '../../redux/ducks/appraisalRegister'

class ModalNewAppraisalRegister extends Component {
  constructor (props) {
    super(props)
    this.state = {
      typesAppraisalRegisters: [
        {
          key: 1,
          text: 'Financial Information Source',
          value: 'financialInfoSource'
        },
        {
          key: 2,
          text: 'Risks',
          value: 'risks'
        },
        {
          key: 3,
          text: 'Value Drivers',
          value: 'valueDrivers'
        },
        {
          key: 4,
          text: 'Critical Issues',
          value: 'criticalIssues'
        },
        {
          key: 5,
          text: 'Description Business Risk',
          value: 'descriptionBusinessRisk'
        },
        {
          key: 6,
          text: 'Description Market',
          value: 'descriptionMarket'
        }
      ]
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

    const { typesAppraisalRegisters } = this.state
    return (
      <Modal open dimmer="blurring">
        <Modal.Header align="center">{this.props.title ? this.props.title : ''}</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group>
              <Form.Field width={8}>
                <Form.Select
                  required
                  label="Appraisal Register"
                  name="type"
                  options={typesAppraisalRegisters}
                  autoComplete="type"
                  value={values.type}
                  onChange={this._handleSelectChange}
                  disabled={this.props.appraisalRegister !== undefined || this.props.typeAdd !== undefined}
                />
                {errors.type && touched.type && <Label basic pointing color="red" content={errors.type} />}
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field width={16}>
                <Form.TextArea
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
            {values.type === 'descriptionBusinessRisk' || values.type === 'descriptionMarket' ? (
              <Form.Group>
                <Form.Field width={2}>
                  <Form.Input
                    label="Points"
                    name="points"
                    autoComplete="points"
                    value={values.points}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.points && touched.points && <Label basic color="red" pointing content={errors.points} />}
                </Form.Field>
              </Form.Group>
            ) : null}
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="blue"
            type="submit"
            disabled={createLoading || updateLoading || !isValid}
            loading={createLoading || updateLoading}
            onClick={handleSubmit}
          >
            <Icon name="save" />
            {this.props.appraisalRegister ? 'Save Register' : 'Create Register'}
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

ModalNewAppraisalRegister.propTypes = {
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
  appraisalRegister: PropTypes.object,
  appraisalRegisterType: PropTypes.string,
  updateLoading: PropTypes.bool,
  isCreated: PropTypes.bool,
  isUpdated: PropTypes.bool,
  listAppraisalRegister: PropTypes.func,
  typeAdd: PropTypes.string
}

const mapPropsToValues = props => ({
  type: props.appraisalRegister ? props.appraisalRegister.type : props.typeAdd ? props.typeAdd : '',
  label: props.appraisalRegister ? props.appraisalRegister.label : '',
  id: props.appraisalRegister ? props.appraisalRegister.id : '',
  points: props.appraisalRegister ? props.appraisalRegister.points : 0
})

const validationSchema = Yup.object().shape({
  label: Yup.string()
    .required('Label is required.')
    .min(1, 'Label require minimum 1 characters.')
    .when('type', {
      is: type => type === 'risks' || type === 'valueDrivers' || type === 'criticalIssues',
      then: Yup.string().max(100, 'Label require max 100 characters.'),
      otherwise: Yup.string().max(320, 'Label require max 320 characters.')
    }),
  type: Yup.string().required('Appraisal Register is required.'),
  points: Yup.number()
    .notRequired()
    .when('type', {
      is: type => type === 'descriptionBusinessRisk' || type === 'descriptionMarket',
      then: Yup.number().required('Points is required'),
      otherwise: Yup.number().notRequired()
    })
})

const handleSubmit = (values, { props, setSubmitting }) => {
  if (props.appraisalRegister) {
    props.updateAppraisalRegister(values)
  } else {
    props.createAppraisalRegister(values)
  }
}

const mapStateToProps = state => ({
  createLoading: state.appraisalRegister.create.isLoading,
  isCreated: state.appraisalRegister.create.isCreated,
  updateLoading: state.appraisalRegister.update.isLoading,
  isUpdated: state.appraisalRegister.update.isUpdated
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      closeModal,
      createAppraisalRegister,
      updateAppraisalRegister,
      listAppraisalRegister
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
  })(ModalNewAppraisalRegister)
)

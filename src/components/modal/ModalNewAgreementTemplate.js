import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Modal, Form, Label, Icon, Button } from 'semantic-ui-react'
import Yup from 'yup'
import { closeModal } from '../../redux/ducks/modal'
import { createAgreementTemplate } from '../../redux/ducks/agreementTemplates'

class ModalNewAgreementTemplate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      state: [
        { key: '1', text: 'ACT', value: 'ACT' },
        { key: '2', text: 'NT', value: 'NT' },
        { key: '3', text: 'NSW', value: 'NSW' },
        { key: '4', text: 'QLD', value: 'QLD' },
        { key: '5', text: 'SA', value: 'SA' },
        { key: '6', text: 'TAS', value: 'TAS' },
        { key: '7', text: 'VIC', value: 'VIC' },
        { key: '8', text: 'WA', value: 'WA' }
      ]
    }
  }

  _handleSelectChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
  }

  _handleConfirm = isConfirmed => {
    if (!isConfirmed) {
      this.props.closeModal()
      return
    }
    this.props.createAgreementTemplate(this.props.values)
    this.props.closeModal()
  }

  render () {
    const {
      values,
      touched,
      errors,
      isValid,
      createLoading,
      options,
      handleBlur,
      handleChange
    } = this.props
    const { state } = this.state
    return (
      <Modal open size="small" onClose={() => this._handleConfirm(false)}>
        <Modal.Header>{options.title}</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group>
              <Form.Field width={16}>
                <Form.Input
                  required
                  label="Title"
                  name="title"
                  autoComplete="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.title &&
                  touched.title && (
                  <Label basic color="red" pointing content={errors.title} />
                )}
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field>
                <Form.Select
                  required
                  label="State"
                  name="state"
                  options={state}
                  autoComplete="state"
                  value={values.state}
                  onChange={this._handleSelectChange}
                />
                {errors.state &&
                  touched.state && (
                  <Label basic color="red" pointing content={errors.state} />
                )}
              </Form.Field>
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="blue"
            disabled={createLoading || !isValid}
            loading={createLoading}
            onClick={this._handleConfirm}
          >
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

ModalNewAgreementTemplate.propTypes = {
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  values: PropTypes.object,
  touched: PropTypes.object,
  errors: PropTypes.object,
  setFieldValue: PropTypes.func,
  isValid: PropTypes.bool,
  createLoading: PropTypes.bool,
  closeModal: PropTypes.func.isRequired,
  options: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired,
  createAgreementTemplate: PropTypes.func
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required.'),
  state: Yup.string().required('State is required.')
})

const mapStateToProps = state => ({
  createLoading: state.agreementTemplates.create.isLoading
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      closeModal,
      createAgreementTemplate
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    validationSchema,
    enableReinitialize: true
  })(ModalNewAgreementTemplate)
)

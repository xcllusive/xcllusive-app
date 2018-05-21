import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, Form, Label } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { closeModal } from '../../redux/ducks/modal'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'

import { mapArrayToValuesForDropdown } from '../../utils/sharedFunctionArray'

import {
  getEmailTemplates,
  getEmailTemplate
} from '../../redux/ducks/emailTemplates'

class ModalEmailTemplates extends Component {
  // const ModalEmailTemplates = ({ onConfirm, closeModal, options }) => {
  componentWillMount () {
    this.props.getEmailTemplates()
  }

  _handleSelectChange = (e, { value }) => {
    this.props.getEmailTemplate(value)
  }

  _handleConfirm = isConfirmed => {
    this.props.closeModal()
    this.props.onConfirm(isConfirmed)
  }

  render () {
    const { listEmailTemplates, values, touched, errors, options } = this.props
    return (
      <Modal open size="tiny" onClose={this._handleConfirm(false)}>
        <Modal.Header>{options.title}</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group>
              <Form.Field width={16}>
                <Form.Select
                  style={{ zIndex: 9999 }}
                  label="Templates"
                  placeholder="Please select one template bellow..."
                  options={mapArrayToValuesForDropdown(listEmailTemplates)}
                  name="title"
                  autoComplete="title"
                  value={values.title}
                  onChange={this._handleSelectChange}
                />
                {errors.title &&
                  touched.title && (
                  <Label basic color="red" pointing content={errors.title} />
                )}
              </Form.Field>
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            negative
            content="Cancel"
            onClick={this._handleConfirm(false)}
          />
          <Button
            positive
            icon="checkmark"
            labelPosition="right"
            content="Confirm"
            onClick={this._handleConfirm(options)}
          />
        </Modal.Actions>
      </Modal>
    )
  }
}

ModalEmailTemplates.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  options: PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired,
  listEmailTemplates: PropTypes.array,
  getEmailTemplates: PropTypes.func,
  getEmailTemplate: PropTypes.func,
  values: PropTypes.object,
  touched: PropTypes.object,
  errors: PropTypes.object
}

const mapStateToProps = state => ({
  listEmailTemplates: state.emailTemplates.getAll.array
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getEmailTemplates,
      getEmailTemplate,
      closeModal
    },
    dispatch
  )

const mapPropsToValues = props => {}

export default connect(mapStateToProps, mapDispatchToProps)(
  withFormik({ mapPropsToValues })(ModalEmailTemplates)
)

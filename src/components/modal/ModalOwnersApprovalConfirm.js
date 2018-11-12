import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Modal, Form, Icon, Button, Message } from 'semantic-ui-react'
import * as Yup from 'yup'
import { closeModal } from '../../redux/ducks/modal'

class ModalOwnersApprovalConfirm extends Component {
  _handleChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value)
  }

  render () {
    const { values, handleSubmit, title, closeModal } = this.props
    return (
      <Modal open dimmer={'blurring'}>
        <Modal.Header align="center">{title}</Modal.Header>
        <Modal.Content>
          <Message info>
            <p>You must type only YES in capital letters</p>
          </Message>
          <Form>
            <Form.Group>
              <Form.Field>
                <Form.Input
                  label="Confirm YES"
                  name="confirmYes"
                  autoComplete="confirmYes"
                  value={values.confirmYes}
                  onChange={this._handleChange}
                />
              </Form.Field>
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            type="submit"
            positive
            icon="checkmark"
            labelPosition="right"
            content="YES"
            disabled={values.confirmYes !== 'YES'}
            onClick={handleSubmit}
          />
          <Button color="red" onClick={closeModal}>
            <Icon name="cancel" />
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

ModalOwnersApprovalConfirm.propTypes = {
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
  title: PropTypes.string,
  closeModal: PropTypes.func
}

const mapPropsToValues = props => {
  return {
    confirmYes: ''
  }
}

const validationSchema = Yup.object().shape({})

const handleSubmit = (values, { props, setSubmitting }) => props.onConfirm(values)

const mapStateToProps = state => ({
  isLoading: state.buyer.update.isLoading,
  sourceOptions: state.businessRegister.get.source.array,
  dropDownLoading: state.businessRegister.get.source.isLoading
})

const mapDispatchToProps = dispatch => bindActionCreators({ closeModal }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    mapPropsToValues,
    validationSchema,
    handleSubmit,
    enableReinitialize: true
  })(ModalOwnersApprovalConfirm)
)

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withFormik } from 'formik'
import { Modal, Form, Icon, Button } from 'semantic-ui-react'

import { closeModal } from '../../redux/ducks/modal'

class ModalOwnersApprovalConfirm extends Component {
  _handleChange = (e, { name, value }) => {
    this.props.setFieldValue(name, value.toUpperCase())
  }

  render () {
    const { values, handleSubmit, title, closeModal } = this.props
    return (
      <Modal open dimmer={'blurring'}>
        <Modal.Header align="center">{title}</Modal.Header>
        <Modal.Content>
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
          <Button type="submit" positive icon="checkmark" labelPosition="right" content="YES" onClick={handleSubmit} />
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
  handleSubmit: PropTypes.func,
  setFieldValue: PropTypes.func,
  closeModal: PropTypes.func,
  title: PropTypes.string,
  onConfirm: PropTypes.func.isRequired
}

const mapPropsToValues = () => ({
  confirmYes: ''
})

const handleSubmit = (values, { props, setSubmitting }) => {
  props.onConfirm(values)
}

const mapDispatchToProps = dispatch => bindActionCreators({ closeModal }, dispatch)

export default connect(mapDispatchToProps)(
  withFormik({
    mapPropsToValues,
    handleSubmit
  })(ModalOwnersApprovalConfirm)
)

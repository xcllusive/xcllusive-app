import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'semantic-ui-react'
import NewUserForm from '../../components/forms/NewUserForm'

class NewUserModal extends Component {
  render () {
    return (
      <Modal
        dimmer={'blurring'}
        open={this.props.modalOpen}
      >
        <NewUserForm
          userForm={this.props.user}
          toggleModal={this.props.toggleModal}
        />
      </Modal>
    )
  }
}

NewUserModal.propTypes = {
  user: PropTypes.object,
  modalOpen: PropTypes.bool,
  toggleModal: PropTypes.func
}

export default NewUserModal

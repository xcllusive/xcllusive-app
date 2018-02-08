import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, Icon } from 'semantic-ui-react'
import NewUserForm from '../../components/forms/NewUserForm'

class NewUserModal extends Component {
  _saveUser = user => {
    console.log(user)
  }

  render () {
    return (
      <Modal
        dimmer={'blurring'}
        open={this.props.modalOpen}
      >
        <Modal.Header align='center'>New User</Modal.Header>
        <Modal.Content>
          <NewUserForm
            userForm={this.props.user}
            saveUser={this._saveUser}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button color='blue'>
            <Icon name='save' />
            Create User
            {/* this.props.user.email !== undefined ? 'Update User' : 'Create User' */}
          </Button>
          <Button color='red' onClick={this.props.toggleModal}>
            <Icon name='cancel' />
            Cancel
          </Button>
        </Modal.Actions>
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

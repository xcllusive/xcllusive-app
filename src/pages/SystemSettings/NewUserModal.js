import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'semantic-ui-react'
import NewUserForm from '../../components/forms/NewUserForm'

class NewUserModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      inputSearch: '',
      user: ''
    }
  }

  _handleChangeCheckBox = (e, { value }) => {
    this.setState(prevState => ({
      [value]: !prevState[value]
    }))
  }

  render () {
    return (
      <Modal open={this.props.modalOpen}>
        <Modal.Header align='center'> {this.props.user.email !== undefined ? `${this.props.user.firstName} ${this.props.user.lastName}` : 'New User'}</Modal.Header>
        <Modal.Content>
          <NewUserForm userForm={this.props.user} />
        </Modal.Content>
      </Modal>
    )
  }
}

NewUserModal.propTypes = {
  user: PropTypes.object,
  modalOpen: PropTypes.bool
}

export default NewUserModal

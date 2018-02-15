import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'semantic-ui-react'
import NewBusinessForm from '../../components/forms/NewBusinessForm'

class NewBusinessModal extends Component {
  render () {
    return (
      <Modal
        dimmer={'blurring'}
        open={this.props.modalOpen}
      >
        <NewBusinessForm
          toggleModal={this.props.toggleModal}
        />
      </Modal>
    )
  }
}

NewBusinessModal.propTypes = {
  toggleModal: PropTypes.func,
  modalOpen: PropTypes.bool
}

export default NewBusinessModal

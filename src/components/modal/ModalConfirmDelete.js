import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { closeModal } from '../../redux/ducks/modal'

const ModalConfirmDelete = ({ onConfirm, closeModal, options }) => {
  const handleConfirm = isConfirmed => {
    closeModal()
    onConfirm(isConfirmed)
  }

  return (
    <Modal open size='tiny' onClose={() => handleConfirm(false)}>
      <Modal.Header>
        { options.title }
      </Modal.Header>
      <Modal.Content>
        <p>{ options.text }</p>
      </Modal.Content>
      <Modal.Actions>
        <Button negative content='No' onClick={() => handleConfirm(false)} />
        <Button positive icon='checkmark' labelPosition='right' content='Yes' onClick={() => handleConfirm(options)} />
      </Modal.Actions>
    </Modal>
  )
}

ModalConfirmDelete.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  options: PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired
}

export default connect(null, { closeModal })(ModalConfirmDelete)

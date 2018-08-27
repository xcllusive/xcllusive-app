import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { closeModal } from '../../redux/ducks/modal'

const ModalConfirm = ({ closeModal, options }) => {
  const handleConfirm = isConfirmed => {
    closeModal()
  }

  return (
    <Modal open size="tiny" onClose={() => handleConfirm(false)}>
      <Modal.Header>{options.title}</Modal.Header>
      <Modal.Content>
        <p>{options.text}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button
          positive
          icon="checkmark"
          labelPosition="right"
          content={options.content}
          onClick={() => handleConfirm(options)}
        />
      </Modal.Actions>
    </Modal>
  )
}

ModalConfirm.propTypes = {
  closeModal: PropTypes.func.isRequired,
  options: PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  }).isRequired
}

export default connect(
  null,
  { closeModal }
)(ModalConfirm)

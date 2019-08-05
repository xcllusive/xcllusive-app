import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { closeModal } from '../../redux/ducks/modal'

const ModalConfirm = ({ onConfirm, closeModal, options, message }) => {
  const handleConfirm = isConfirmed => {
    closeModal()
    onConfirm(isConfirmed)
  }

  return (
    <Modal open size="tiny" onClose={() => handleConfirm(false)}>
      <Modal.Header>{options.title}</Modal.Header>
      {message ? (
        <Message style={{marginBottom: '0px'}} warning>
          <Message.Header>{message}</Message.Header>
        </Message>
      ) : null}
      <Modal.Content>
        <p>{options.text}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button negative content="No" onClick={() => handleConfirm(false)} />
        <Button
          positive
          icon="checkmark"
          labelPosition="right"
          content="Yes"
          onClick={() => handleConfirm(options)}
        />
      </Modal.Actions>
    </Modal>
  )
}

ModalConfirm.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  options: PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired,
  message: PropTypes.string
}

export default connect(null, { closeModal })(ModalConfirm)

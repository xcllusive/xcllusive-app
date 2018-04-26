import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { closeModal } from '../../redux/ducks/modal'

const ModalUploadFile = ({
  onConfirm,
  closeModal,
  options,
  handleFileUpload
}) => {
  const handleConfirm = isConfirmed => {
    closeModal()
    isConfirmed && onConfirm(isConfirmed)
  }

  return (
    <Modal open size="tiny" onClose={() => handleConfirm(false)}>
      <Modal.Header>{options.title}</Modal.Header>
      <Modal.Content>
        <input type="file" onChange={handleFileUpload} />
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

ModalUploadFile.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  options: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired,
  handleFileUpload: PropTypes.func
}

export default connect(null, { closeModal })(ModalUploadFile)

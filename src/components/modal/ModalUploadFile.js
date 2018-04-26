import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { closeModal } from '../../redux/ducks/modal'

const ModalUploadFile = ({
  onConfirm,
<<<<<<< HEAD
  closeModal,
  options,
  handleFileUpload
=======
  handleFileUpload,
  closeModal,
  options
>>>>>>> 74dfdcdddda83405102f310495da2c014795d911
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
<<<<<<< HEAD
        <Button negative content="No" onClick={() => handleConfirm(false)} />
=======
        <Button
          negative
          content="Cancel"
          onClick={() => handleConfirm(false)}
        />
>>>>>>> 74dfdcdddda83405102f310495da2c014795d911
        <Button
          positive
          icon="checkmark"
          labelPosition="right"
<<<<<<< HEAD
          content="Yes"
          onClick={() => handleConfirm(options)}
=======
          content="Upload"
          onClick={() => handleConfirm(true)}
>>>>>>> 74dfdcdddda83405102f310495da2c014795d911
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
<<<<<<< HEAD
  handleFileUpload: PropTypes.func
=======
  handleFileUpload: PropTypes.func.isRequired
>>>>>>> 74dfdcdddda83405102f310495da2c014795d911
}

export default connect(null, { closeModal })(ModalUploadFile)

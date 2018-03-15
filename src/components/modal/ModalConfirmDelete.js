import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'semantic-ui-react'

const ModalConfirmDelete = ({ modalOpen, toogleModalDelete, options }) => (
  <Modal size='tiny' open={modalOpen} onClose={toogleModalDelete}>
    <Modal.Header>
      { options.title }
    </Modal.Header>
    <Modal.Content>
      <p>{ options.text }</p>
    </Modal.Content>
    <Modal.Actions>
      <Button negative content='No' onClick={toogleModalDelete} />
      <Button positive icon='checkmark' labelPosition='right' content='Yes' onClick={() => toogleModalDelete('confirm')} />
    </Modal.Actions>
  </Modal>
)

ModalConfirmDelete.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  toogleModalDelete: PropTypes.func.isRequired,
  options: PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired
}

export default ModalConfirmDelete

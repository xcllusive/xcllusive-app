import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { TypesModal } from '../../redux/ducks/modal'
import ModalConfirmDelete from './ModalConfirmDelete'
import FormNewBusinessRegister from '../forms/FormNewBusinessRegister'
import ModalUploadFile from './ModalUploadFile'
<<<<<<< HEAD

import { TypesModal } from '../../redux/ducks/modal'
=======
>>>>>>> 74dfdcdddda83405102f310495da2c014795d911

const MODAL_COMPONENTS = {
  [TypesModal.MODAL_TYPE_CONFIRM_DELETE]: ModalConfirmDelete,
  [TypesModal.MODAL_TYPE_NEW_BUSSINES_REGISTER]: FormNewBusinessRegister,
  [TypesModal.MODAL_TYPE_EDIT_BUSSINES_REGISTER]: FormNewBusinessRegister,
  [TypesModal.MODAL_TYPE_UPLOAD_FILE]: ModalUploadFile
}

const ModalRoot = ({ type, props }) => {
  if (!type) {
    return null
  }

  const ModalComponent = MODAL_COMPONENTS[type]
  return <ModalComponent {...props} />
}

ModalRoot.propTypes = {
  type: PropTypes.string,
  props: PropTypes.object
}

export default connect(state => state.modal)(ModalRoot)

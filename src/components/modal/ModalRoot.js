import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ModalConfirmDelete from './ModalConfirmDelete'

import { TypesModal } from '../../redux/ducks/modal'

const MODAL_COMPONENTS = {
  [TypesModal.MODAL_TYPE_CONFIRM_DELETE]: ModalConfirmDelete
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

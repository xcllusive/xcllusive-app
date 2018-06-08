import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { TypesModal } from '../../redux/ducks/modal'
import ModalConfirm from './ModalConfirm'
import ModalNewBusinessRegister from './ModalNewBusinessRegister'
import ModalNewBuyerRegister from './ModalNewBuyerRegister'
import ModalNewScoreRegister from './ModalNewScoreRegister'
import ModalUploadFile from './ModalUploadFile'
import ModalEmailTemplates from './ModalEmailTemplates'
import ModalGroupEmail from './ModalGroupEmail'

const MODAL_COMPONENTS = {
  [TypesModal.MODAL_TYPE_CONFIRM]: ModalConfirm,
  [TypesModal.MODAL_TYPE_NEW_BUSINESS_REGISTER]: ModalNewBusinessRegister,
  [TypesModal.MODAL_TYPE_EDIT_BUSINESS_REGISTER]: ModalNewBusinessRegister,
  [TypesModal.MODAL_TYPE_NEW_BUYER_REGISTER]: ModalNewBuyerRegister,
  [TypesModal.MODAL_TYPE_EDIT_BUYER_REGISTER]: ModalNewBuyerRegister,
  [TypesModal.MODAL_TYPE_NEW_SCORE_REGISTER]: ModalNewScoreRegister,
  [TypesModal.MODAL_TYPE_EDIT_SCORE_REGISTER]: ModalNewScoreRegister,
  [TypesModal.MODAL_TYPE_UPLOAD_FILE]: ModalUploadFile,
  [TypesModal.MODAL_TYPE_EMAIL_TEMPLATES]: ModalEmailTemplates,
  [TypesModal.MODAL_TYPE_GROUP_EMAIL]: ModalGroupEmail
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

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
import ModalStageSalesMemo from './ModalStageSalesMemo'
import ModalStageLost from './ModalStageLost'
import ModalReassignBusiness from './ModalReassignBusiness'
import ModalNewAgreementTemplate from './ModalNewAgreementTemplate'
import ModalListAgreements from './ModalListAgreements'
import ModalEmailAgreementInvoice from './ModalEmailAgreementInvoice'
import ModalNewInvoiceTemplate from './ModalNewInvoiceTemplate'
import ModalNewUser from './ModalNewUser'
import ModalNewBuyer from './ModalNewBuyer'
import ModalEditBuyer from './ModalEditBuyer'
import ModalNewBusiness from './ModalNewBusiness'
import ModalShowMsg from './ModalShowMsg'
import ModalNewAppraisalRegister from './ModalNewAppraisalRegister'
import ModalStageSold from './ModalStageSold'
import ModalSendAppraisal from './ModalSendAppraisal'
import ModalOwnersApprovalConfirm from './ModalOwnersApprovalConfirm'
import ModalBrokersWeeklyReport from './ModalBrokersWeeklyReport'

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
  [TypesModal.MODAL_TYPE_GROUP_EMAIL]: ModalGroupEmail,
  [TypesModal.MODAL_TYPE_STAGE_SALES_MEMO]: ModalStageSalesMemo,
  [TypesModal.MODAL_TYPE_STAGE_LOST]: ModalStageLost,
  [TypesModal.MODAL_TYPE_STAGE_REASSIGN_BUSINESS]: ModalReassignBusiness,
  [TypesModal.MODAL_TYPE_NEW_AGREEMENT_TEMPLATE]: ModalNewAgreementTemplate,
  [TypesModal.MODAL_TYPE_LIST_AGREEMENTS]: ModalListAgreements,
  [TypesModal.MODAL_TYPE_EMAIL_AGREEMENT_INVOICE]: ModalEmailAgreementInvoice,
  [TypesModal.MODAL_TYPE_NEW_INVOICE_TEMPLATE]: ModalNewInvoiceTemplate,
  [TypesModal.MODAL_TYPE_NEW_USER]: ModalNewUser,
  [TypesModal.MODAL_TYPE_NEW_BUYER]: ModalNewBuyer,
  [TypesModal.MODAL_TYPE_EDIT_BUYER]: ModalEditBuyer,
  [TypesModal.MODAL_TYPE_NEW_BUSINESS]: ModalNewBusiness,
  [TypesModal.MODAL_TYPE_SHOW_MSG]: ModalShowMsg,
  [TypesModal.MODAL_TYPE_NEW_APPRAISAL_REGISTER]: ModalNewAppraisalRegister,
  [TypesModal.MODAL_TYPE_EDIT_APPRAISAL_REGISTER]: ModalNewAppraisalRegister,
  [TypesModal.MODAL_TYPE_STAGE_SOLD]: ModalStageSold,
  [TypesModal.MODAL_TYPE_SEND_APPRAISAL]: ModalSendAppraisal,
  [TypesModal.MODAL_TYPE_OWNERS_APPRAISAL_CONFIRM]: ModalOwnersApprovalConfirm,
  [TypesModal.MODAL_TYPE_BROKERS_WEEKLY_REPORT]: ModalBrokersWeeklyReport
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

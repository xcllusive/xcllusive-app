// Action Types

export const Types = {
  MODAL_OPEN: 'MODAL_OPEN',
  MODAL_CLOSE: 'MODAL_CLOSE'
}

export const TypesModal = {
  MODAL_TYPE_CONFIRM: 'MODAL_TYPE_CONFIRM',
  MODAL_TYPE_NEW_BUSINESS_REGISTER: 'MODAL_TYPE_NEW_BUSINESS_REGISTER',
  MODAL_TYPE_EDIT_BUSINESS_REGISTER: 'MODAL_TYPE_EDIT_BUSINESS_REGISTER',
  MODAL_TYPE_NEW_BUYER_REGISTER: 'MODAL_TYPE_NEW_BUYER_REGISTER',
  MODAL_TYPE_EDIT_BUYER_REGISTER: 'MODAL_TYPE_EDIT_BUYER_REGISTER',
  MODAL_TYPE_NEW_SCORE_REGISTER: 'MODAL_TYPE_NEW_SCORE_REGISTER',
  MODAL_TYPE_EDIT_SCORE_REGISTER: 'MODAL_TYPE_EDIT_SCORE_REGISTER',
  MODAL_TYPE_UPLOAD_FILE: 'MODAL_TYPE_UPLOAD_FILE',
  MODAL_TYPE_EMAIL_TEMPLATES: 'MODAL_TYPE_EMAIL_TEMPLATES',
  MODAL_TYPE_GROUP_EMAIL: 'MODAL_TYPE_GROUP_EMAIL',
  MODAL_TYPE_STAGE_SALES_MEMO: 'MODAL_TYPE_STAGE_SALES_MEMO',
  MODAL_TYPE_STAGE_LOST: 'MODAL_TYPE_STAGE_LOST',
  MODAL_TYPE_STAGE_REASSIGN_BUSINESS: 'MODAL_TYPE_STAGE_REASSIGN_BUSINESS',
  MODAL_TYPE_NEW_AGREEMENT_TEMPLATE: 'MODAL_TYPE_NEW_AGREEMENT_TEMPLATE',
  MODAL_TYPE_LIST_AGREEMENTS: 'MODAL_TYPE_LIST_AGREEMENTS',
  MODAL_TYPE_EMAIL_AGREEMENT_INVOICE: 'MODAL_TYPE_EMAIL_AGREEMENT_INVOICE',
  MODAL_TYPE_NEW_INVOICE_TEMPLATE: 'MODAL_TYPE_NEW_INVOICE_TEMPLATE',
  MODAL_TYPE_NEW_USER: 'MODAL_TYPE_NEW_USER',
  MODAL_TYPE_NEW_BUYER: 'MODAL_TYPE_NEW_BUYER',
  MODAL_TYPE_EDIT_BUYER: 'MODAL_TYPE_EDIT_BUYER',
  MODAL_TYPE_NEW_BUSINESS: 'MODAL_TYPE_NEW_BUSINESS',
  MODAL_TYPE_SHOW_MSG: 'MODAL_TYPE_SHOW_MSG',
  MODAL_TYPE_NEW_APPRAISAL_REGISTER: 'MODAL_TYPE_NEW_APPRAISAL_REGISTER',
  MODAL_TYPE_EDIT_APPRAISAL_REGISTER: 'MODAL_TYPE_EDIT_APPRAISAL_REGISTER',
  MODAL_TYPE_STAGE_SOLD: 'MODAL_TYPE_STAGE_SOLD',
  MODAL_TYPE_SEND_APPRAISAL: 'MODAL_TYPE_SEND_APPRAISAL',
  MODAL_TYPE_OWNERS_APPRAISAL_CONFIRM: 'MODAL_TYPE_OWNERS_APPRAISAL_CONFIRM',
  MODAL_TYPE_BROKERS_WEEKLY_REPORT: 'MODAL_TYPE_BROKERS_WEEKLY_REPORT',
  MODAL_TYPE_BROKERS_WEEKLY_REPORT_TO_DO: 'MODAL_TYPE_BROKERS_WEEKLY_REPORT_TO_DO',
  MODAL_TYPE_OFFICE_REGISTER: 'MODAL_TYPE_OFFICE_REGISTER',
  MODAL_TYPE_NEW_HELP_DESK: 'MODAL_TYPE_NEW_HELP_DESK',
  MODAL_PICK_ANALYSTS: 'MODAL_PICK_ANALYSTS',
  MODAL_SEND_SMS: 'MODAL_SEND_SMS',
  MODAL_NEW_RESOURCE: 'MODAL_NEW_RESOURCE',
  MODAL_TYPE_GROUP_EMAIL_SMS_USER: 'MODAL_TYPE_GROUP_EMAIL_SMS_USER'
}

// Reducer

const initialState = {
  type: null,
  props: {}
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case Types.MODAL_OPEN:
      return {
        ...state,
        type: action.payload.type,
        props: action.payload.props
      }
    case Types.MODAL_CLOSE:
      return initialState
    default:
      return state
  }
}

// Action Creators

export const openModal = (type, props) => dispatch => {
  dispatch({
    type: Types.MODAL_OPEN,
    payload: {
      type,
      props
    }
  })
}

export const closeModal = () => dispatch => {
  dispatch({
    type: Types.MODAL_CLOSE
  })
}

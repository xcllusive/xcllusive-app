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
  MODAL_TYPE_GROUP_EMAIL: 'MODAL_TYPE_GROUP_EMAIL'
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

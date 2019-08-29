import { toast } from 'react-toastify'
import download from '../../utils/file-download'
import {
  create,
  getAll,
  get,
  update,
  downloadAppr,
  send,
  remove,
  duplicate,
  getEmailTemplateAppraisal as getEmailTemplateAppraisalAPI,
  moveFinancialYear as moveFinancialYearAPI
} from '../../services/api/appraisal'

// Action Types

export const Types = {
  CREATE_APPRAISAL_LOADING: 'CREATE_APPRAISAL_LOADING',
  CREATE_APPRAISAL_SUCCESS: 'CREATE_APPRAISAL_SUCCESS',
  CREATE_APPRAISAL_FAILURE: 'CREATE_APPRAISAL_FAILURE',
  GET_APPRAISAL_LOADING: 'GET_APPRAISAL_LOADING',
  GET_APPRAISAL_SUCCESS: 'GET_APPRAISAL_SUCCESS',
  GET_APPRAISAL_FAILURE: 'GET_APPRAISAL_FAILURE',
  GET_APPRAISALS_LOADING: 'GET_APPRAISALS_LOADING',
  GET_APPRAISALS_SUCCESS: 'GET_APPRAISALS_SUCCESS',
  GET_APPRAISALS_FAILURE: 'GET_APPRAISALS_FAILURE',
  UPDATE_APPRAISAL_LOADING: 'UPDATE_APPRAISAL_LOADING',
  UPDATE_APPRAISAL_SUCCESS: 'UPDATE_APPRAISAL_SUCCESS',
  UPDATE_APPRAISAL_FAILURE: 'UPDATE_APPRAISAL_FAILURE',
  CLEAR_APPRAISAL: 'CLEAR_APPRAISAL',
  DOWNLOAD_APPRAISAL_LOADING: 'DOWNLOAD_APPRAISAL_LOADING',
  DOWNLOAD_APPRAISAL_SUCCESS: 'DOWNLOAD_APPRAISAL_SUCCESS',
  DOWNLOAD_APPRAISAL_FAILURE: 'DOWNLOAD_APPRAISAL_FAILURE',
  SEND_APPRAISAL_LOADING: 'SEND_APPRAISAL_LOADING',
  SEND_APPRAISAL_SUCCESS: 'SEND_APPRAISAL_SUCCESS',
  SEND_APPRAISAL_FAILURE: 'SEND_APPRAISAL_FAILURE',
  REMOVE_APPRAISAL_LOADING: 'REMOVE_APPRAISAL_LOADING',
  REMOVE_APPRAISAL_SUCCESS: 'REMOVE_APPRAISAL_SUCCESS',
  REMOVE_APPRAISAL_FAILURE: 'REMOVE_APPRAISAL_FAILURE',
  DUPLICATE_APPRAISAL_LOADING: 'DUPLICATE_APPRAISAL_LOADING',
  DUPLICATE_APPRAISAL_SUCCESS: 'DUPLICATE_APPRAISAL_SUCCESS',
  DUPLICATE_APPRAISAL_FAILURE: 'DUPLICATE_APPRAISAL_FAILURE',
  CALC_COMPLETE_STEPS: 'CALC_COMPLETE_STEPS',
  SEND_MONTHS_SEASONAL: 'SEND_MONTHS_SEASONAL',
  MOVE_FINANCIAL_YEAR_LOADING: 'MOVE_FINANCIAL_YEAR_LOADING',
  MOVE_FINANCIAL_YEAR_SUCCESS: 'MOVE_FINANCIAL_YEAR_SUCCESS',
  MOVE_FINANCIAL_YEAR_FAILURE: 'MOVE_FINANCIAL_YEAR_FAILURE',
  CLEAR_MOVED_FINANCIAL_YEAR: 'CLEAR_MOVED_FINANCIAL_YEAR',
  GET_EMAIL_TEMPLATE_APPRAISAL_LOADING: 'GET_EMAIL_TEMPLATE_APPRAISAL_LOADING',
  GET_EMAIL_TEMPLATE_APPRAISAL_SUCCESS: 'GET_EMAIL_TEMPLATE_APPRAISAL_SUCCESS',
  GET_EMAIL_TEMPLATE_APPRAISAL_FAILURE: 'GET_EMAIL_TEMPLATE_APPRAISAL_FAILURE'
}

// Reducer

const initialState = {
  create: {
    isLoading: false,
    isCreated: false,
    appraisal: {},
    error: null
  },
  getAll: {
    array: [],
    isLoading: false,
    error: null
  },
  get: {
    object: null,
    isLoading: false,
    error: null
  },
  update: {
    isLoading: false,
    isUpdated: false,
    error: null,
    appraisal: {}
  },
  download: {
    isLoading: false,
    isDownloaded: false,
    error: null
  },
  send: {
    isLoading: false,
    isSent: false,
    error: null
  },
  delete: {
    isLoading: false,
    isDeleted: false,
    error: null
  },
  getCalcCompleteSteps: {
    confirm: {
      confirmBusinessDetail: {
        isConfirm: false,
        completedPerc: 0
      },
      confirmAbout: {
        isConfirm: false,
        completedPerc: 0
      },
      confirmCustomersSuppliers: {
        isConfirm: false,
        completedPerc: 0
      },
      confirmPremisesEnployees: {
        isConfirm: false,
        completedPerc: 0
      },
      confirmOwnershipFinalNotes: {
        isConfirm: false,
        completedPerc: 0
      },
      confirmBusinessAnalysis: {
        isConfirm: false,
        completedPerc: 0
      },
      confirmFinancialAnalysis: {
        isConfirm: false,
        completedPerc: 0
      },
      confirmComparableData: {
        isConfirm: false,
        completedPerc: 0
      },
      confirmPricing: {
        isConfirm: false,
        completedPerc: 0
      },
      confirmNotesAndAssumptions: {
        isConfirm: false,
        completedPerc: 0
      }
    },
    isCalculated: false
  },
  duplicate: {
    isLoading: false,
    isDuplicated: false,
    appraisal: {},
    error: null
  },
  sendMonthsSeasonal: {
    isLoading: false,
    object: null
  },
  moveFinancialYear: {
    isLoading: false,
    isMoved: false,
    appraisal: {},
    error: null
  },
  getEmailTemplateAppraisal: {
    object: null,
    isLoading: false,
    error: null
  }
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case Types.GET_APPRAISALS_LOADING:
      return {
        ...state,
        getAll: {
          ...state.getAll,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.GET_APPRAISALS_SUCCESS:
      return {
        ...state,
        getAll: {
          ...state.getAll,
          isLoading: false,
          array: action.payload,
          error: null
        }
      }
    case Types.GET_APPRAISALS_FAILURE:
      return {
        ...state,
        getAll: {
          ...state.getAll,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.GET_APPRAISAL_LOADING:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: true,
          object: null,
          error: null
        }
      }
    case Types.GET_APPRAISAL_SUCCESS:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: false,
          object: action.payload,
          error: null
        }
      }
    case Types.GET_APPRAISAL_FAILURE:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.GET_EMAIL_TEMPLATE_APPRAISAL_LOADING:
      return {
        ...state,
        getEmailTemplateAppraisal: {
          ...state.getEmailTemplateAppraisal,
          isLoading: true,
          object: null,
          error: null
        }
      }
    case Types.GET_EMAIL_TEMPLATE_APPRAISAL_SUCCESS:
      return {
        ...state,
        getEmailTemplateAppraisal: {
          ...state.getEmailTemplateAppraisal,
          isLoading: false,
          object: action.payload,
          error: null
        }
      }
    case Types.GET_EMAIL_TEMPLATE_APPRAISAL_FAILURE:
      return {
        ...state,
        getEmailTemplateAppraisal: {
          ...state.getEmailTemplateAppraisal,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.CREATE_APPRAISAL_LOADING:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: true,
          isCreated: false
        }
      }
    case Types.CREATE_APPRAISAL_SUCCESS:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: false,
          appraisal: action.payload,
          isCreated: true
        }
      }
    case Types.CREATE_APPRAISAL_FAILURE:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: false,
          isCreated: false,
          error: action.payload
        }
      }
    case Types.UPDATE_APPRAISAL_LOADING:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: action.payload,
          isUpdated: false,
          error: null
        }
      }
    case Types.UPDATE_APPRAISAL_SUCCESS:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          isUpdated: true,
          error: null
        },
        get: {
          ...state.get,
          isLoading: false,
          object: action.payload,
          error: null
        }
      }
    case Types.UPDATE_APPRAISAL_FAILURE:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          isUpdated: false,
          error: action.payload
        }
      }
    case Types.DOWNLOAD_APPRAISAL_LOADING:
      return {
        ...state,
        download: {
          ...state.download,
          isLoading: action.payload,
          isDownloaded: false,
          error: null
        }
      }
    case Types.DOWNLOAD_APPRAISAL_SUCCESS:
      return {
        ...state,
        download: {
          ...state.download,
          isLoading: false,
          isDownloaded: true
        }
      }
    case Types.DOWNLOAD_APPRAISAL_FAILURE:
      return {
        ...state,
        download: {
          ...state.download,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.SEND_APPRAISAL_LOADING:
      return {
        ...state,
        send: {
          ...state.send,
          isLoading: action.payload,
          isSent: false,
          error: null
        }
      }
    case Types.SEND_APPRAISAL_SUCCESS:
      return {
        ...state,
        send: {
          ...state.send,
          isLoading: false,
          isSent: true
        }
      }
    case Types.SEND_APPRAISAL_FAILURE:
      return {
        ...state,
        send: {
          ...state.send,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.REMOVE_APPRAISAL_LOADING:
      return {
        ...state,
        delete: {
          ...state.delete,
          isLoading: action.payload,
          isDeleted: false,
          error: null
        }
      }
    case Types.REMOVE_APPRAISAL_SUCCESS:
      return {
        ...state,
        delete: {
          ...state.delete,
          isLoading: false,
          isDeleted: true
        }
      }
    case Types.REMOVE_APPRAISAL_FAILURE:
      return {
        ...state,
        delete: {
          ...state.delete,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.DUPLICATE_APPRAISAL_LOADING:
      return {
        ...state,
        duplicate: {
          ...state.duplicate,
          isLoading: action.payload,
          isDuplicated: false,
          error: null
        }
      }
    case Types.DUPLICATE_APPRAISAL_SUCCESS:
      return {
        ...state,
        duplicate: {
          ...state.duplicate,
          isLoading: false,
          appraisal: action.payload,
          isDuplicated: true
        }
      }
    case Types.DUPLICATE_APPRAISAL_FAILURE:
      return {
        ...state,
        duplicate: {
          ...state.duplicate,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.CALC_COMPLETE_STEPS:
      return {
        ...state,
        getCalcCompleteSteps: {
          ...state.getCalcCompleteSteps,
          confirm: {
            ...state.getCalcCompleteSteps.confirm,
            ...(state.getCalcCompleteSteps.confirm[action.confirmName] = {
              isConfirm: action.isConfirm,
              completedPerc: action.completedPerc
            })
          },
          isCalculated: true
        }
      }
    case Types.SEND_MONTHS_SEASONAL:
      return {
        ...state,
        sendMonthsSeasonal: action.payload
      }
    case Types.MOVE_FINANCIAL_YEAR_LOADING:
      return {
        ...state,
        moveFinancialYear: {
          ...state.moveFinancialYear,
          isLoading: true,
          isMoved: false
        }
      }
    case Types.MOVE_FINANCIAL_YEAR_SUCCESS:
      return {
        ...state,
        moveFinancialYear: {
          ...state.moveFinancialYear,
          isLoading: false,
          appraisal: action.payload,
          isMoved: true
        }
      }
    case Types.MOVE_FINANCIAL_YEAR_FAILURE:
      return {
        ...state,
        moveFinancialYear: {
          ...state.moveFinancialYear,
          isLoading: false,
          isMoved: false,
          error: action.payload
        }
      }
    case Types.CLEAR_MOVED_FINANCIAL_YEAR:
      return {
        ...state,
        moveFinancialYear: {
          ...state.moveFinancialYear,
          isMoved: false
        }
      }
    case Types.GET_EMAIL_TEMPLATE_HANDLE_BARS_LOADING:
      return {
        ...state,
        getEmailTemplateWithHandleBars: {
          ...state.getEmailTemplateWithHandleBars,
          isLoading: action.payload,
          object: null,
          error: null
        }
      }
    case Types.GET_EMAIL_TEMPLATE_HANDLE_BARS_SUCCESS:
      return {
        ...state,
        getEmailTemplateWithHandleBars: {
          ...state.getEmailTemplateWithHandleBars,
          isLoading: false,
          object: action.payload,
          error: null
        }
      }
    case Types.GET_EMAIL_TEMPLATE_HANDLE_BARS_FAILURE:
      return {
        ...state,
        getEmailTemplateWithHandleBars: {
          ...state.getEmailTemplateWithHandleBars,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.CLEAR_APPRAISAL:
      return initialState
    default:
      return state
  }
}

// Action Creators
export const appraisalTemplateLoading = (value, type) => ({
  type: Types[type],
  payload: value
})

export const createAppraisal = businessId => async dispatch => {
  dispatch({
    type: Types.CREATE_APPRAISAL_LOADING,
    payload: true
  })
  try {
    const response = await create(businessId)
    dispatch({
      type: Types.CREATE_APPRAISAL_SUCCESS,
      payload: response.data
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.CREATE_APPRAISAL_FAILURE,
      payload: error
    })
  }
}

export const getAppraisals = businessId => async dispatch => {
  dispatch({
    type: Types.GET_APPRAISALS_LOADING,
    payload: true
  })
  try {
    const appraisal = await getAll(businessId)
    dispatch({
      type: Types.GET_APPRAISALS_SUCCESS,
      payload: appraisal.data.rows
    })
  } catch (error) {
    dispatch({
      type: Types.GET_APPRAISALS_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const getAppraisal = id => async dispatch => {
  dispatch({
    type: Types.GET_APPRAISAL_LOADING,
    payload: true
  })
  try {
    const appraisal = await get(id)
    dispatch(addTodo('confirmBusinessDetail', appraisal.data.confirmBusinessDetail))
    dispatch(addTodo('confirmAbout', appraisal.data.confirmAbout))
    dispatch(addTodo('confirmCustomersSuppliers', appraisal.data.confirmCustomersSuppliers))
    dispatch(addTodo('confirmPremisesEnployees', appraisal.data.confirmPremisesEnployees))
    dispatch(addTodo('confirmOwnershipFinalNotes', appraisal.data.confirmOwnershipFinalNotes))
    dispatch(addTodo('confirmBusinessAnalysis', appraisal.data.confirmBusinessAnalysis))
    dispatch(addTodo('confirmFinancialAnalysis', appraisal.data.confirmFinancialAnalysis))
    dispatch(addTodo('confirmComparableData', appraisal.data.confirmComparableData))
    dispatch(addTodo('confirmPricing', appraisal.data.confirmPricing))
    dispatch(addTodo('confirmNotesAndAssumptions', appraisal.data.confirmNotesAndAssumptions))
    dispatch({
      type: Types.GET_APPRAISAL_SUCCESS,
      payload: appraisal.data
    })
  } catch (error) {
    dispatch({
      type: Types.GET_APPRAISAL_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const updateAppraisal = (appraisal, showToast = true) => async dispatch => {
  dispatch({
    type: Types.UPDATE_APPRAISAL_LOADING,
    payload: true
  })
  try {
    const response = await update(appraisal)
    const getAppraisal = await get(appraisal.id)
    dispatch({
      type: Types.UPDATE_APPRAISAL_SUCCESS,
      payload: getAppraisal.data
    })
    if (showToast) {
      toast.success(response.message)
    }
  } catch (error) {
    dispatch({
      type: Types.UPDATE_APPRAISAL_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const downloadAppraisal = (appraisal, draft = false, fromAppraisalList = false) => async dispatch => {
  dispatch({
    type: Types.DOWNLOAD_APPRAISAL_LOADING,
    payload: true
  })
  try {
    if (draft) {
      const draftTrue = {
        draft
      }
      Object.assign(appraisal, draftTrue)
    } else {
      const draftFalse = {
        draft: false
      }
      Object.assign(appraisal, draftFalse)
    }
    const response = await downloadAppr(appraisal, fromAppraisalList)

    dispatch({
      type: Types.DOWNLOAD_APPRAISAL_SUCCESS
    })
    console.log(response)
    download(response, `BS${appraisal.Business.id}-${appraisal.Business.businessName}.pdf`)
  } catch (error) {
    dispatch({
      type: Types.DOWNLOAD_APPRAISAL_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const sendAppraisal = mail => async dispatch => {
  dispatch({
    type: Types.SEND_APPRAISAL_LOADING,
    payload: true
  })
  try {
    // const file = await downloadAppr(appraisal)
    const response = await send(mail)
    dispatch({
      type: Types.SEND_APPRAISAL_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.SEND_APPRAISAL_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const removeAppraisal = appraisalId => async dispatch => {
  dispatch({
    type: Types.REMOVE_APPRAISAL_LOADING,
    payload: true
  })
  try {
    const response = await remove(appraisalId)
    dispatch({
      type: Types.REMOVE_APPRAISAL_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.REMOVE_APPRAISAL_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const duplicateAppraisal = appraisalId => async dispatch => {
  dispatch({
    type: Types.DUPLICATE_APPRAISAL_LOADING,
    payload: true
  })
  try {
    const response = await duplicate(appraisalId)
    dispatch({
      type: Types.DUPLICATE_APPRAISAL_SUCCESS,
      payload: response.data
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.DUPLICATE_APPRAISAL_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const clearAppraisal = () => async dispatch => {
  dispatch({
    type: Types.CLEAR_APPRAISAL
  })
}

export const calcCompleteSteps = (confirmName, confirm) => async dispatch => {
  dispatch(addTodo(confirmName, confirm))
}

export const calcAnnualisedWhenChangeMonthsAndSeasonal = (monthsCovered, seasonalAdjustment) => async dispatch => {
  if (monthsCovered && seasonalAdjustment) {
    dispatch({
      type: Types.SEND_MONTHS_SEASONAL,
      payload: { monthsCovered, seasonalAdjustment }
    })
  } else {
    dispatch({
      type: Types.SEND_MONTHS_SEASONAL,
      payload: null
    })
  }
}

const addTodo = (confirmName, confirm) => {
  let completedPerc = null
  if (confirm) completedPerc = 10
  if (!confirm) completedPerc = 0
  return {
    type: Types.CALC_COMPLETE_STEPS,
    isConfirm: confirm,
    completedPerc,
    confirmName
  }
}

export const moveFinancialYear = appraisal => async dispatch => {
  dispatch({
    type: Types.MOVE_FINANCIAL_YEAR_LOADING,
    payload: true
  })
  try {
    const response = await moveFinancialYearAPI(appraisal)
    dispatch({
      type: Types.MOVE_FINANCIAL_YEAR_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.MOVE_FINANCIAL_YEAR_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}
export const clearMovedFinancialYear = () => async dispatch => {
  dispatch({
    type: Types.CLEAR_MOVED_FINANCIAL_YEAR
  })
}

export const getEmailTemplateAppraisal = (templateId, businessId) => async dispatch => {
  dispatch({
    type: Types.GET_EMAIL_TEMPLATE_APPRAISAL_LOADING,
    payload: true
  })
  try {
    const response = await getEmailTemplateAppraisalAPI(templateId, businessId)
    dispatch({
      type: Types.GET_EMAIL_TEMPLATE_APPRAISAL_SUCCESS,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: Types.GET_EMAIL_TEMPLATE_APPRAISAL_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

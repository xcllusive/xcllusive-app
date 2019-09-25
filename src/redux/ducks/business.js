import { toast } from 'react-toastify'
import { Types as ModalTypes } from './modal'
import {
  get,
  getAll,
  create,
  update,
  reassignBusiness as reassignBusinessAPI,
  updateStageSalesMemo as updateStageSalesMemoAPI,
  updateStageLost as updateStageLostAPI,
  getBuyersFromBusiness as getBuyersFromBusinessAPI,
  getBuyersGroupEmail as getBuyersGroupEmailAPI,
  getQtdeBusinessEachStagePerUser as getQtdeBusinessEachStagePerUserAPI,
  getAllPerUser,
  uploadIM as uploadIMAPI,
  verifyDuplicatedBusiness as verifyDuplicatedBusinessAPI,
  verifyBusinessFirstOpenByAgent as verifyBusinessFirstOpenByAgentAPI,
  addIssueToBusiness as addIssueToBusinessAPI,
  removeIssueFromBusiness as removeIssueFromBusinessAPI
} from '../../services/api/business'

import { getAllFromBusiness } from '../../services/api/businessLog'

import { setBusinessLogReducer } from './businessLog'

// Action Types

export const Types = {
  CREATE_BUSINESS_LOADING: 'CREATE_BUSINESS_LOADING',
  CREATE_BUSINESS_SUCCESS: 'CREATE_BUSINESS_SUCCESS',
  CREATE_BUSINESS_FAILURE: 'CREATE_BUSINESS_FAILURE',
  UPDATE_BUSINESS_LOADING: 'UPDATE_BUSINESS_LOADING',
  UPDATE_BUSINESS_SUCCESS: 'UPDATE_BUSINESS_SUCCESS',
  UPDATE_BUSINESS_FAILURE: 'UPDATE_BUSINESS_FAILURE',
  GET_BUSINESS_LOADING: 'GET_BUSINESS_LOADING',
  GET_BUSINESS_SUCCESS: 'GET_BUSINESS_SUCCESS',
  GET_BUSINESS_FAILURE: 'GET_BUSINESS_FAILURE',
  CLEAN_BUSINESS: 'CLEAN_BUSINESS',
  GET_BUSINESSES_LOADING: 'GET_BUSINESSES_LOADING',
  GET_BUSINESSES_SUCCESS: 'GET_BUSINESSES_SUCCESS',
  GET_BUSINESSES_FAILURE: 'GET_BUSINESSES_FAILURE',
  CREATE_REASSIGN_BUSINESS_LOADING: 'CREATE_REASSIGN_BUSINESS_LOADING',
  CREATE_REASSIGN_BUSINESS_SUCCESS: 'CREATE_REASSIGN_BUSINESS_SUCCESS',
  CREATE_REASSIGN_BUSINESS_FAILURE: 'CREATE_REASSIGN_BUSINESS_FAILURE',
  UPDATE_STAGE_SALES_MEMO_LOADING: 'UPDATE_STAGE_SALES_MEMO_LOADING',
  UPDATE_STAGE_SALES_MEMO_SUCCESS: 'UPDATE_STAGE_SALES_MEMO_SUCCESS',
  UPDATE_STAGE_SALES_MEMO_FAILURE: 'UPDATE_STAGE_SALES_MEMO_FAILURE',
  UPDATE_STAGE_LOST_LOADING: 'UPDATE_STAGE_LOST_LOADING',
  UPDATE_STAGE_LOST_SUCCESS: 'UPDATE_STAGE_LOST_SUCCESS',
  UPDATE_STAGE_LOST_FAILURE: 'UPDATE_STAGE_LOST_FAILURE',
  GET_BUYERS_FROM_BUSINESS_LOADING: 'GET_BUYERS_FROM_BUSINESS_LOADING',
  GET_BUYERS_FROM_BUSINESS_SUCCESS: 'GET_BUYERS_FROM_BUSINESS_SUCCESS',
  GET_BUYERS_FROM_BUSINESS_FAILURE: 'GET_BUYERS_FROM_BUSINESS_FAILURE',
  GET_BUYERS_GROUP_EMAIL_LOADING: 'GET_BUYERS_GROUP_EMAIL_LOADING',
  GET_BUYERS_GROUP_EMAIL_SUCCESS: 'GET_BUYERS_GROUP_EMAIL_SUCCESS',
  GET_BUYERS_GROUP_EMAIL_FAILURE: 'GET_BUYERS_GROUP_EMAIL_FAILURE',
  GET_QTDE_BUSINESS_STAGE_USER_LOADING: 'GET_QTDE_BUSINESS_STAGE_USER_LOADING',
  GET_QTDE_BUSINESS_STAGE_USER_SUCCESS: 'GET_QTDE_BUSINESS_STAGE_USER_SUCCESS',
  GET_QTDE_BUSINESS_STAGE_USER_FAILURE: 'GET_QTDE_BUSINESS_STAGE_USER_FAILURE',
  GET_BUSINESSES_PER_USER_LOADING: 'GET_BUSINESSES_PER_USER_LOADING',
  GET_BUSINESSES_PER_USER_SUCCESS: 'GET_BUSINESSES_PER_USER_SUCCESS',
  GET_BUSINESSES_PER_USER_FAILURE: 'GET_BUSINESSES_PER_USER_FAILURE',
  UPLOAD_IM_LOADING: 'UPLOAD_IM_LOADING',
  UPLOAD_IM_SUCCESS: 'UPLOAD_IM_SUCCESS',
  UPLOAD_IM_FAILURE: 'UPLOAD_IM_FAILURE',
  VERIFY_DUPLICATED_BUSINESS_LOADING: 'VERIFY_DUPLICATED_BUSINESS_LOADING',
  VERIFY_DUPLICATED_BUSINESS_SUCCESS: 'VERIFY_DUPLICATED_BUSINESS_SUCCESS',
  VERIFY_DUPLICATED_BUSINESS_FAILURE: 'VERIFY_DUPLICATED_BUSINESS_FAILURE',
  CLEAR_DUPLICATED_BUSINESS: 'CLEAR_DUPLICATED_BUSINESS',
  VERIFY_BUSINESS_FIRST_OPEN_BY_AGENT_LOADING: 'VERIFY_BUSINESS_FIRST_OPEN_BY_AGENT_LOADING',
  VERIFY_BUSINESS_FIRST_OPEN_BY_AGENT_SUCCESS: 'VERIFY_BUSINESS_FIRST_OPEN_BY_AGENT_SUCCESS',
  VERIFY_BUSINESS_FIRST_OPEN_BY_AGENT_FAILURE: 'VERIFY_BUSINESS_FIRST_OPEN_BY_AGENT_FAILURE',
  ADD_ISSUE_LOADING: 'ADD_ISSUE_LOADING',
  ADD_ISSUE_SUCCESS: 'ADD_ISSUE_SUCCESS',
  ADD_ISSUE_FAILURE: 'ADD_ISSUE_FAILURE',
  REMOVE_ISSUE_BUSINESS_LOADING: 'REMOVE_ISSUE_BUSINESS_LOADING',
  REMOVE_ISSUE_BUSINESS_SUCCESS: 'REMOVE_ISSUE_BUSINESS_SUCCESS',
  REMOVE_ISSUE_BUSINESS_FAILURE: 'REMOVE_ISSUE_BUSINESS_FAILURE',
  SET_BUSINESS_LAST_TAB_SELECTED: 'SET_BUSINESS_LAST_TAB_SELECTED'
}

// Reducer

const initialState = {
  getAll: {
    isLoading: false,
    array: [],
    error: null
  },
  get: {
    isLoading: true,
    object: {},
    totalEnquiry: 0,
    totalLastScore: null,
    stageOptions: [],
    sourceOptions: [],
    ratingOptions: [],
    productOptions: [],
    industryOptions: [],
    typeOptions: [],
    stageNotSignedOptions: [],
    stageNotWantOptions: [],
    ctcSourceOptions: [],
    ctcStageOptions: [],
    issueList: [],
    error: null
  },
  create: {
    isLoading: false,
    isCreated: false,
    object: null,
    error: null
  },
  update: {
    isLoading: false,
    isUpdated: false,
    error: null
  },
  reassignBusiness: {
    isLoading: false,
    isReassigned: false,
    error: null
  },
  updateStageSalesMemo: {
    isLoading: false,
    isUpdated: false,
    error: null
  },
  updateStageLost: {
    isLoading: false,
    isUpdated: false,
    error: null
  },
  getBuyersFromBusiness: {
    isLoading: true,
    array: [],
    countAll: 0,
    error: null
  },
  getBuyersGroupEmail: {
    isLoading: true,
    array: [],
    error: null
  },
  getQtdeBusinessStageUser: {
    isLoading: true,
    object: {},
    error: null
  },
  getAllPerUser: {
    isLoading: false,
    array: [],
    error: null
  },
  uploadIM: {
    isLoading: false,
    isUploaded: false,
    error: null
  },
  verifyDuplicatedBusiness: {
    isLoading: false,
    object: null,
    disableButton: false,
    error: null
  },
  verifyBusinessFirstOpenByAgent: {
    isLoading: false,
    object: null,
    error: null
  },
  add: {
    isLoading: false,
    isAdded: false,
    error: null
  },
  deleteIssue: {
    isLoading: false,
    isDeleted: false,
    error: null
  },
  setLastTabSelected: {
    index: 0
  }
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case Types.CREATE_BUSINESS_LOADING:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.CREATE_BUSINESS_SUCCESS:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: false,
          isCreated: true,
          object: action.payload,
          error: null
        }
      }
    case Types.CREATE_BUSINESS_FAILURE:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: false,
          isCreated: false,
          error: action.payload
        }
      }
    case Types.GET_BUSINESSES_LOADING:
      return {
        ...state,
        getAll: {
          ...state.getAll,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.GET_BUSINESSES_SUCCESS:
      return {
        ...state,
        getAll: {
          ...state.getAll,
          isLoading: false,
          array: action.payload.data,
          error: null
        }
      }
    case Types.GET_BUSINESSES_FAILURE:
      return {
        ...state,
        getAll: {
          ...state.getAll,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.GET_BUSINESS_LOADING:
      return {
        ...state,
        get: {
          ...state.get,
          object: {},
          isLoading: action.payload,
          error: null
        }
      }
    case Types.GET_BUSINESS_SUCCESS:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: false,
          object: action.payload.business,
          totalEnquiry: action.payload.countAllEnquiry,
          totalLastScore: action.payload.lastScore ? action.payload.lastScore.total : null,
          stageOptions: action.payload.stageList,
          sourceOptions: action.payload.sourceList,
          ratingOptions: action.payload.ratingList,
          productOptions: action.payload.productList,
          industryOptions: action.payload.industryList,
          typeOptions: action.payload.typeList,
          usersBroker: action.payload.usersBroker,
          stageNotSignedOptions: action.payload.stageNotSignedList,
          stageNotWantOptions: action.payload.stageNotWantList,
          ctcSourceOptions: action.payload.ctcSourceList,
          ctcStageOptions: action.payload.ctcStageList,
          issueList: action.payload.issueList,
          error: null
        },
        update: {
          ...state.update,
          isUpdated: false
        }
      }
    case Types.GET_BUSINESS_FAILURE:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.CLEAN_BUSINESS:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: true,
          object: {}
        }
      }
    case Types.UPDATE_BUSINESS_LOADING:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: action.payload,
          error: null,
          isUpdated: false
        }
      }
    case Types.UPDATE_BUSINESS_SUCCESS:
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
          object: action.payload.business,
          totalEnquiry: action.payload.countAllEnquiry,
          totalLastScore: action.payload.lastScore ? action.payload.lastScore.total : null,
          stageOptions: action.payload.stageList,
          sourceOptions: action.payload.sourceList,
          ratingOptions: action.payload.ratingList,
          productOptions: action.payload.productList,
          industryOptions: action.payload.industryList,
          typeOptions: action.payload.typeList,
          usersBroker: action.payload.usersBroker,
          stageNotSignedOptions: action.payload.stageNotSignedList,
          stageNotWantOptions: action.payload.stageNotWantList,
          ctcStageOptions: action.payload.ctcStageList,
          error: null
        }
      }
    case Types.UPDATE_BUSINESS_FAILURE:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          isUpdated: false,
          error: action.payload
        }
      }
    case Types.CREATE_REASSIGN_BUSINESS_LOADING:
      return {
        ...state,
        reassignBusiness: {
          ...state.reassignBusiness,
          isLoading: action.payload,
          isReassigned: false,
          error: null
        }
      }
    case Types.CREATE_REASSIGN_BUSINESS_SUCCESS:
      return {
        ...state,
        reassignBusiness: {
          ...state.reassignBusiness,
          isLoading: false,
          isReassigned: true,
          error: null
        }
      }
    case Types.CREATE_REASSIGN_BUSINESS_FAILURE:
      return {
        ...state,
        reassignBusiness: {
          ...state.reassignBusiness,
          isLoading: false,
          isReassigned: false,
          error: action.payload
        }
      }
    case Types.UPDATE_STAGE_SALES_MEMO_LOADING:
      return {
        ...state,
        updateStageSalesMemo: {
          ...state.updateStageSalesMemo,
          isLoading: action.payload,
          isUpdated: false,
          error: null
        }
      }
    case Types.UPDATE_STAGE_SALES_MEMO_SUCCESS:
      return {
        ...state,
        updateStageSalesMemo: {
          ...state.updateStageSalesMemo,
          isLoading: false,
          isUpdated: true,
          error: null
        },
        update: {
          ...state.update,
          isUpdated: true
        }
      }
    case Types.UPDATE_STAGE_SALES_MEMO_FAILURE:
      return {
        ...state,
        updateStageSalesMemo: {
          ...state.updateStageSalesMemo,
          isLoading: false,
          isUpdated: false,
          error: action.payload
        }
      }
    case Types.UPDATE_STAGE_LOST_LOADING:
      return {
        ...state,
        updateStageLost: {
          ...state.updateStageLost,
          isLoading: action.payload,
          isUpdated: false,
          error: null
        }
      }
    case Types.UPDATE_STAGE_LOST_SUCCESS:
      return {
        ...state,
        updateStageLost: {
          ...state.updateStageLost,
          isLoading: false,
          isUpdated: true,
          error: null
        }
      }
    case Types.UPDATE_STAGE_LOST_FAILURE:
      return {
        ...state,
        updateStageLost: {
          ...state.updateStageLost,
          isLoading: false,
          isUpdated: false,
          error: action.payload
        }
      }
    case Types.GET_BUYERS_FROM_BUSINESS_LOADING:
      return {
        ...state,
        getBuyersFromBusiness: {
          ...state.getBuyersFromBusiness,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.GET_BUYERS_FROM_BUSINESS_SUCCESS:
      return {
        ...state,
        getBuyersFromBusiness: {
          ...state.getBuyersFromBusiness,
          isLoading: false,
          array: action.payload.array,
          countAll: action.payload.countAll,
          error: null
        }
      }
    case Types.GET_BUYERS_FROM_BUSINESS_FAILURE:
      return {
        ...state,
        getBuyersFromBusiness: {
          ...state.getBuyersFromBusiness,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.GET_BUYERS_GROUP_EMAIL_LOADING:
      return {
        ...state,
        getBuyersGroupEmail: {
          ...state.getBuyersGroupEmail,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.GET_BUYERS_GROUP_EMAIL_SUCCESS:
      return {
        ...state,
        getBuyersGroupEmail: {
          ...state.getBuyersGroupEmail,
          isLoading: false,
          array: action.payload,
          error: null
        }
      }
    case Types.GET_BUYERS_GROUP_EMAIL_FAILURE:
      return {
        ...state,
        getBuyersGroupEmail: {
          ...state.getBuyersGroupEmail,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.GET_QTDE_BUSINESS_STAGE_USER_LOADING:
      return {
        ...state,
        getQtdeBusinessStageUser: {
          ...state.getQtdeBusinessStageUser,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.GET_QTDE_BUSINESS_STAGE_USER_SUCCESS:
      return {
        ...state,
        getQtdeBusinessStageUser: {
          ...state.getQtdeBusinessStageUser,
          isLoading: false,
          object: action.payload,
          error: null
        }
      }
    case Types.GET_QTDE_BUSINESS_STAGE_USER_FAILURE:
      return {
        ...state,
        getQtdeBusinessStageUser: {
          ...state.getQtdeBusinessStageUser,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.GET_BUSINESSES_PER_USER_LOADING:
      return {
        ...state,
        getAllPerUser: {
          ...state.getAllPerUser,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.GET_BUSINESSES_PER_USER_SUCCESS:
      return {
        ...state,
        getAllPerUser: {
          ...state.getAllPerUser,
          isLoading: false,
          array: action.payload.data,
          error: null
        }
      }
    case Types.GET_BUSINESSES_PER_USER_FAILURE:
      return {
        ...state,
        getAllPerUser: {
          ...state.getAllPerUser,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.UPLOAD_IM_LOADING:
      return {
        ...state,
        uploadIM: {
          ...state.uploadIM,
          isLoading: action.payload,
          isUploaded: false,
          error: null
        }
      }
    case Types.UPLOAD_IM_SUCCESS:
      return {
        ...state,
        uploadIM: {
          ...state.uploadIM,
          isLoading: false,
          isUploaded: true,
          error: null
        }
      }
    case Types.UPLOAD_IM_FAILURE:
      return {
        ...state,
        uploadIM: {
          ...state.uploadIM,
          isLoading: false,
          isUploaded: false,
          error: action.payload
        }
      }
    case Types.VERIFY_DUPLICATED_BUSINESS_LOADING:
      return {
        ...state,
        verifyDuplicatedBusiness: {
          ...state.verifyDuplicatedBusiness,
          isLoading: action.payload,
          disableButton: false,
          error: null
        }
      }
    case Types.VERIFY_DUPLICATED_BUSINESS_SUCCESS:
      return {
        ...state,
        verifyDuplicatedBusiness: {
          ...state.verifyDuplicatedBusiness,
          isLoading: false,
          object: action.payload,
          disableButton: true,
          error: null
        }
      }
    case Types.VERIFY_DUPLICATED_BUSINESS_FAILURE:
      return {
        ...state,
        verifyDuplicatedBusiness: {
          ...state.verifyDuplicatedBusiness,
          isLoading: false,
          disableButton: false,
          error: action.payload
        }
      }
    case Types.VERIFY_BUSINESS_FIRST_OPEN_BY_AGENT_LOADING:
      return {
        ...state,
        verifyBusinessFirstOpenByAgent: {
          ...state.verifyBusinessFirstOpenByAgent,
          isLoading: action.payload,
          disableButton: false,
          error: null
        }
      }
    case Types.VERIFY_BUSINESS_FIRST_OPEN_BY_AGENT_SUCCESS:
      return {
        ...state,
        verifyBusinessFirstOpenByAgent: {
          ...state.verifyBusinessFirstOpenByAgent,
          isLoading: false,
          object: action.payload,
          error: null
        }
      }
    case Types.VERIFY_BUSINESS_FIRST_OPEN_BY_AGENT_FAILURE:
      return {
        ...state,
        verifyBusinessFirstOpenByAgent: {
          ...state.verifyBusinessFirstOpenByAgent,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.CLEAR_DUPLICATED_BUSINESS:
      return {
        ...state,
        verifyDuplicatedBusiness: {
          object: null
        }
      }
    case Types.ADD_ISSUE_LOADING:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: action.payload,
          isAdded: false,
          error: null
        }
      }
    case Types.ADD_ISSUE_SUCCESS:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: false,
          isAdded: true,
          error: null
        }
      }
    case Types.ADD_ISSUE_FAILURE:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: false,
          isAdded: false,
          error: action.payload
        }
      }
    case Types.REMOVE_ISSUE_BUSINESS_LOADING:
      return {
        ...state,
        deleteIssue: {
          ...state.deleteIssue,
          isLoading: action.payload,
          isDeleted: false,
          error: null
        }
      }
    case Types.REMOVE_ISSUE_BUSINESS_SUCCESS:
      return {
        ...state,
        deleteIssue: {
          ...state.deleteIssue,
          isLoading: false,
          isDeleted: true,
          error: null
        }
      }
    case Types.REMOVE_ISSUE_BUSINESS_FAILURE:
      return {
        ...state,
        deleteIssue: {
          ...state.deleteIssue,
          isLoading: false,
          isDeleted: false,
          error: action.payload
        }
      }
    case Types.SET_BUSINESS_LAST_TAB_SELECTED:
      return {
        ...state,
        setLastTabSelected: {
          ...state.setLastTabSelected,
          index: action.payload
        }
      }
    default:
      return state
  }
}

// Action Creators
export const businessLoading = (value, type) => ({
  type: Types[type],
  payload: value
})

export const createBusiness = business => async dispatch => {
  dispatch({
    type: Types.CREATE_BUSINESS_LOADING,
    payload: true
  })
  try {
    const response = await create(business)
    dispatch({
      type: Types.CREATE_BUSINESS_SUCCESS,
      payload: response.data
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.CREATE_BUSINESS_FAILURE,
      payload: error
    })
  }
}

export const getBusiness = id => async dispatch => {
  dispatch({
    type: Types.GET_BUSINESS_LOADING,
    payload: true
  })
  try {
    const business = await get(id)
    dispatch({
      type: Types.GET_BUSINESS_SUCCESS,
      payload: business
    })
  } catch (error) {
    dispatch({
      type: Types.GET_BUSINESS_FAILURE,
      payload: error
    })
    toast.error(error.message)
  }
}

export const cleanBusiness = () => dispatch =>
  dispatch({
    type: Types.CLEAN_BUSINESS
  })

export const getBusinesses = (
  search = false,
  stageId = false,
  filterLog = false,
  company = false
) => async dispatch => {
  dispatch({
    type: Types.GET_BUSINESSES_LOADING,
    payload: true
  })
  try {
    const businesses = await getAll(search, stageId, filterLog, company)
    dispatch({
      type: Types.GET_BUSINESSES_SUCCESS,
      payload: businesses
    })
  } catch (error) {
    dispatch({
      type: Types.GET_BUSINESSES_FAILURE,
      payload: error
    })
    toast.error(error.message)
  }
}

export const updateBusiness = business => async dispatch => {
  dispatch({
    type: Types.UPDATE_BUSINESS_LOADING,
    payload: true
  })
  try {
    const response = await update(business)
    const getBusiness = await get(business.id)
    dispatch({
      type: Types.UPDATE_BUSINESS_SUCCESS,
      payload: getBusiness
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.UPDATE_BUSINESS_FAILURE,
      payload: error
    })
    toast.error('Error trying to upload the business. Please get in contact with IT department.')
  }
}

export const reassignBusiness = reassignBusiness => async dispatch => {
  dispatch({
    type: Types.CREATE_REASSIGN_BUSINESS_LOADING,
    payload: true
  })
  try {
    const response = await reassignBusinessAPI(reassignBusiness)
    dispatch({
      type: Types.CREATE_REASSIGN_BUSINESS_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.CREATE_REASSIGN_BUSINESS_FAILURE,
      payload: error
    })
    toast.error(error.message)
  }
}
export const updateStageLost = stageLost => async dispatch => {
  dispatch({
    type: Types.UPDATE_STAGE_LOST_LOADING,
    payload: true
  })
  try {
    const response = await updateStageLostAPI(stageLost)
    const business = await get(stageLost.businessId)
    const logs = await getAllFromBusiness(stageLost.businessId)
    dispatch({
      type: Types.UPDATE_STAGE_LOST_SUCCESS
    })
    dispatch(setGetBusinessReducer(business))
    dispatch(setBusinessLogReducer(logs.data))
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.UPDATE_STAGE_LOST_FAILURE,
      payload: error
    })
    toast.error(error.message)
  }
}

export const updateStageSalesMemo = stageSalesMemo => async dispatch => {
  dispatch({
    type: Types.UPDATE_STAGE_SALES_MEMO_LOADING,
    payload: true
  })
  try {
    // const business = await get(stageSalesMemo.business_id)
    const response = await updateStageSalesMemoAPI(stageSalesMemo)
    dispatch({
      type: Types.UPDATE_STAGE_SALES_MEMO_SUCCESS
    })
    // dispatch(setGetBusinessReducer(business))
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.UPDATE_STAGE_SALES_MEMO_FAILURE,
      payload: error
    })
    toast.error(error.message)
  }
}

export const getBuyersFromBusiness = (businessId, showAll = false) => async dispatch => {
  dispatch({
    type: Types.GET_BUYERS_FROM_BUSINESS_LOADING,
    payload: true
  })
  try {
    const buyers = await getBuyersFromBusinessAPI(businessId, showAll)
    dispatch({
      type: Types.GET_BUYERS_FROM_BUSINESS_SUCCESS,
      payload: buyers.data
    })
  } catch (error) {
    dispatch({
      type: Types.GET_BUYERS_FROM_BUSINESS_FAILURE,
      payload: error
    })
    toast.error(error.message)
  }
}

export const getBuyersGroupEmail = businessId => async dispatch => {
  dispatch({
    type: Types.GET_BUYERS_GROUP_EMAIL_LOADING,
    payload: true
  })
  try {
    const buyers = await getBuyersGroupEmailAPI(businessId)
    dispatch({
      type: Types.GET_BUYERS_GROUP_EMAIL_SUCCESS,
      payload: buyers.data
    })
  } catch (error) {
    dispatch({
      type: Types.GET_BUYERS_GROUP_EMAIL_FAILURE,
      payload: error
    })
    toast.error(error.message)
  }
}

export const getQtdeBusinessEachStagePerUser = () => async dispatch => {
  dispatch({
    type: Types.GET_QTDE_BUSINESS_STAGE_USER_LOADING,
    payload: true
  })
  try {
    const buyers = await getQtdeBusinessEachStagePerUserAPI()
    dispatch({
      type: Types.GET_QTDE_BUSINESS_STAGE_USER_SUCCESS,
      payload: buyers.data
    })
  } catch (error) {
    dispatch({
      type: Types.GET_QTDE_BUSINESS_STAGE_USER_FAILURE,
      payload: error
    })
    toast.error(error.message)
  }
}

export const getBusinessesPerUser = (
  search = false,
  stageId = false,
  filterLog = false,
  orderByDateTimeCreated = false
) => async dispatch => {
  dispatch({
    type: Types.GET_BUSINESSES_PER_USER_LOADING,
    payload: true
  })
  try {
    const businesses = await getAllPerUser(search, stageId, filterLog, orderByDateTimeCreated)
    dispatch({
      type: Types.GET_BUSINESSES_PER_USER_SUCCESS,
      payload: businesses
    })
  } catch (error) {
    dispatch({
      type: Types.GET_BUSINESSES_PER_USER_FAILURE,
      payload: error
    })
    toast.error(error.message)
  }
}

export const uploadIM = (file, businessId) => async dispatch => {
  dispatch({
    type: Types.UPLOAD_IM_LOADING,
    payload: true
  })
  try {
    const businesses = await uploadIMAPI(file, businessId)
    dispatch({
      type: Types.UPLOAD_IM_SUCCESS,
      payload: businesses
    })
    toast.success(businesses.message)
  } catch (error) {
    dispatch({
      type: Types.UPLOAD_IM_FAILURE,
      payload: error
    })
    // toast.error(error.message)
    toast.error('Error trying to upload the IM. Please get in contact with IT department.')
  }
}

const setGetBusinessReducer = business => {
  return {
    type: Types.GET_BUSINESS_SUCCESS,
    payload: business
  }
}

export const verifyDuplicatedBusiness = values => async dispatch => {
  dispatch({
    type: Types.VERIFY_DUPLICATED_BUSINESS_LOADING,
    payload: true
  })
  try {
    const verifyDuplicatedBusiness = await verifyDuplicatedBusinessAPI(values)
    dispatch({
      type: Types.VERIFY_DUPLICATED_BUSINESS_SUCCESS,
      payload: verifyDuplicatedBusiness.data
    })
  } catch (error) {
    dispatch({
      type: Types.VERIFY_DUPLICATED_BUSINESS_FAILURE,
      payload: error
    })
    toast.error(error.message)
  }
}

export const clearBusiness = () => async dispatch => {
  dispatch({
    type: Types.CLEAR_DUPLICATED_BUSINESS
  })
}

export const verifyBusinessFirstOpenByAgent = businessId => async dispatch => {
  dispatch({
    type: Types.VERIFY_BUSINESS_FIRST_OPEN_BY_AGENT_LOADING,
    payload: true
  })
  try {
    const verifyBusinessFirstOpenByAgent = await verifyBusinessFirstOpenByAgentAPI(businessId)
    dispatch({
      type: Types.VERIFY_BUSINESS_FIRST_OPEN_BY_AGENT_SUCCESS,
      payload: verifyBusinessFirstOpenByAgent.data
    })
  } catch (error) {
    dispatch({
      type: Types.VERIFY_BUSINESS_FIRST_OPEN_BY_AGENT_FAILURE,
      payload: error
    })
    toast.error(error.message)
  }
}

export const addIssueToBusiness = (issueId, business) => async dispatch => {
  dispatch({
    type: Types.ADD_ISSUE_LOADING,
    payload: true
  })
  try {
    const response = await addIssueToBusinessAPI(issueId, business)
    dispatch({
      type: Types.ADD_ISSUE_SUCCESS
    })
    toast.success(response.message)
    dispatch({
      type: ModalTypes.MODAL_CLOSE
    })
  } catch (error) {
    dispatch({
      type: Types.ADD_ISSUE_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const removeIssueFromBusiness = (issueId, businessId) => async dispatch => {
  dispatch({
    type: Types.REMOVE_ISSUE_BUSINESS_LOADING,
    payload: true
  })
  try {
    const response = await removeIssueFromBusinessAPI(issueId, businessId)
    dispatch({
      type: Types.REMOVE_ISSUE_BUSINESS_SUCCESS
    })
    toast.success(response.message)
    dispatch({
      type: ModalTypes.MODAL_CLOSE
    })
  } catch (error) {
    dispatch({
      type: Types.REMOVE_ISSUE_BUSINESS_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const setLastBusinessTabSelected = indexLastTab => async dispatch => {
  dispatch({
    type: Types.SET_BUSINESS_LAST_TAB_SELECTED,
    payload: indexLastTab
  })
}

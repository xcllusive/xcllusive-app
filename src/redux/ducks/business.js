import { toast } from 'react-toastify'
import {
  get,
  getAll,
  create,
  update,
  reassignBusiness as reassignBusinessAPI,
  updateStageSalesMemo as updateStageSalesMemoAPI,
  updateStageLost as updateStageLostAPI,
  getBuyersFromBusiness as getBuyersFromBusinessAPI
} from '../../services/api/business'

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
  GET_BUYERS_FROM_BUSINESS_FAILURE: 'GET_BUYERS_FROM_BUSINESS_FAILURE'
}

// Reducer

const initialState = {
  getAll: {
    isLoading: true,
    array: [],
    error: null
  },
  get: {
    isLoading: true,
    object: {},
    stageOptions: [],
    sourceOptions: [],
    ratingOptions: [],
    productOptions: [],
    industryOptions: [],
    typeOptions: [],
    ownersTimeOptions: [],
    stageNotSignedOptions: [],
    stageNotWantOptions: [],
    error: null
  },
  create: {
    isLoading: false,
    isCreated: false,
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
    error: null
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
          array: action.payload,
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
          stageOptions: action.payload.stageList,
          sourceOptions: action.payload.sourceList,
          ratingOptions: action.payload.ratingList,
          productOptions: action.payload.productList,
          industryOptions: action.payload.industryList,
          typeOptions: action.payload.typeList,
          ownersTimeOptions: action.payload.ownersTimeList,
          usersStaff: action.payload.usersStaff,
          stageNotSignedOptions: action.payload.stageNotSignedList,
          stageNotWantOptions: action.payload.stageNotWantList,
          error: null
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
          error: null
        }
      }
    case Types.UPDATE_BUSINESS_SUCCESS:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          isUpdated: action.payload,
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
          array: action.payload,
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
    await create(business)
    dispatch({
      type: Types.CREATE_BUSINESS_SUCCESS
    })
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
    toast.error(error)
  }
}

export const cleanBusiness = () => dispatch =>
  dispatch({
    type: Types.CLEAN_BUSINESS
  })

export const getBusinesses = (
  search = false,
  stageId = false
) => async dispatch => {
  dispatch({
    type: Types.GET_BUSINESSES_LOADING,
    payload: true
  })
  try {
    const businesses = await getAll(search, stageId)
    dispatch({
      type: Types.GET_BUSINESSES_SUCCESS,
      payload: businesses
    })
  } catch (error) {
    dispatch({
      type: Types.GET_BUSINESSES_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const updateBusiness = business => async dispatch => {
  dispatch({
    type: Types.UPDATE_BUSINESS_LOADING,
    payload: true
  })
  try {
    const response = await update(business)
    dispatch({
      type: Types.UPDATE_BUSINESS_SUCCESS,
      payload: response.message
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.UPDATE_BUSINESS_FAILURE,
      payload: error
    })
    toast.error(error)
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
    toast.error(error)
  }
}
export const updateStageLost = stageLost => async dispatch => {
  dispatch({
    type: Types.UPDATE_STAGE_LOST_LOADING,
    payload: true
  })
  try {
    const response = await updateStageLostAPI(stageLost)
    dispatch({
      type: Types.UPDATE_STAGE_LOST_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.UPDATE_STAGE_LOST_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const updateStageSalesMemo = stageSalesMemo => async dispatch => {
  dispatch({
    type: Types.UPDATE_STAGE_SALES_MEMO_LOADING,
    payload: true
  })
  try {
    const response = await updateStageSalesMemoAPI(stageSalesMemo)
    dispatch({
      type: Types.UPDATE_STAGE_SALES_MEMO_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.UPDATE_STAGE_SALES_MEMO_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const getBuyersFromBusiness = businessId => async dispatch => {
  dispatch({
    type: Types.GET_BUYERS_FROM_BUSINESS_LOADING,
    payload: true
  })
  try {
    const buyers = await getBuyersFromBusinessAPI(businessId)
    dispatch({
      type: Types.GET_BUYERS_FROM_BUSINESS_SUCCESS,
      payload: buyers.data
    })
  } catch (error) {
    dispatch({
      type: Types.GET_BUYERS_FROM_BUSINESS_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

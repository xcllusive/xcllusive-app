import { create, get, update, finalise, getAll, saveList, getList } from '../../services/api/businessSold'
import { getBuyersFromBusiness } from '../../services/api/business'
import { toast } from 'react-toastify'
import _ from 'lodash'

// Action Types

export const Types = {
  CREATE_BUSINESS_SOLD_LOADING: 'CREATE_BUSINESS_SOLD_LOADING',
  CREATE_BUSINESS_SOLD_SUCCESS: 'CREATE_BUSINESS_SOLD_SUCCESS',
  CREATE_BUSINESS_SOLD_FAILURE: 'CREATE_BUSINESS_SOLD_FAILURE',
  GET_BUSINESS_SOLD_LOADING: 'GET_BUSINESS_SOLD_LOADING',
  GET_BUSINESS_SOLD_SUCCESS: 'GET_BUSINESS_SOLD_SUCCESS',
  GET_BUSINESS_SOLD_FAILURE: 'GET_BUSINESS_SOLD_FAILURE',
  UPDATE_BUSINESS_SOLD_LOADING: 'UPDATE_BUSINESS_SOLD_LOADING',
  UPDATE_BUSINESS_SOLD_SUCCESS: 'UPDATE_BUSINESS_SOLD_SUCCESS',
  UPDATE_BUSINESS_SOLD_FAILURE: 'UPDATE_BUSINESS_SOLD_FAILURE',
  FINALISE_BUSINESS_SOLD_LOADING: 'FINALISE_BUSINESS_SOLD_LOADING',
  FINALISE_BUSINESS_SOLD_SUCCESS: 'FINALISE_BUSINESS_SOLD_SUCCESS',
  FINALISE_BUSINESS_SOLD_FAILURE: 'FINALISE_BUSINESS_SOLD_FAILURE',
  GET_BUYERS_BUSINESS_SOLD_LOADING: 'GET_BUYERS_BUSINESS_SOLD_LOADING',
  GET_BUYERS_BUSINESS_SOLD_SUCCESS: 'GET_BUYERS_BUSINESS_SOLD_SUCCESS',
  GET_BUYERS_BUSINESS_SOLD_FAILURE: 'GET_BUYERS_BUSINESS_SOLD_FAILURE',
  GET_BUSINESSES_SOLD_LOADING: 'GET_BUSINESSES_SOLD_LOADING',
  GET_BUSINESSES_SOLD_SUCCESS: 'GET_BUSINESSES_SOLD_SUCCESS',
  GET_BUSINESSES_SOLD_FAILURE: 'GET_BUSINESSES_SOLD_FAILURE',
  SAVE_SELECTED_LIST_LOADING: 'SAVE_SELECTED_LIST_LOADING',
  SAVE_SELECTED_LIST_SUCCESS: 'SAVE_SELECTED_LIST_SUCCESS',
  SAVE_SELECTED_LIST_FAILURE: 'SAVE_SELECTED_LIST_FAILURE',
  GET_SELECTED_LIST_LOADING: 'GET_SELECTED_LIST_LOADING',
  GET_SELECTED_LIST_SUCCESS: 'GET_SELECTED_LIST_SUCCESS',
  GET_SELECTED_LIST_FAILURE: 'GET_SELECTED_LIST_FAILURE',
  ADD_SELECTED_LIST: 'ADD_SELECTED_LIST',
  REMOVE_SELECTED_LIST: 'REMOVE_SELECTED_LIST',
  CALC_MIN_MAX_CHART: 'CALC_MIN_MAX_CHART'
}

// Reducer

const initialState = {
  create: {
    isLoading: false,
    isCreated: false,
    error: null,
    object: null
  },
  get: {
    object: {},
    isLoading: false,
    error: null
  },
  updateSold: {
    isLoading: false,
    isUpdated: false,
    error: null
  },
  finaliseSold: {
    isLoading: false,
    isUpdated: false,
    error: null
  },
  getBuyersBusiness: {
    array: [],
    isLoading: false,
    error: null
  },
  getAll: {
    isLoading: true,
    array: [],
    error: null
  },
  saveList: {
    isLoading: false,
    isSaved: false,
    error: null
  },
  getList: {
    isLoading: true,
    array: [],
    error: null,
    smallestMultiplier: 0,
    biggestMultiplier: 0
  },
  getCalcMinMax: {
    smallestMultiplier: 0,
    biggestMultiplier: 0
  }
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case Types.CREATE_BUSINESS_SOLD_LOADING:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: action.payload,
          error: null,
          object: null
        }
      }
    case Types.CREATE_BUSINESS_SOLD_SUCCESS:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: false,
          isCreated: true,
          error: null,
          object: action.payload
        }
      }
    case Types.CREATE_BUSINESS_SOLD_FAILURE:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: false,
          isCreated: false,
          error: action.payload
        }
      }
    case Types.GET_BUSINESS_SOLD_LOADING:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: true,
          error: null
        }
      }
    case Types.GET_BUSINESS_SOLD_SUCCESS:
      return {
        ...state,
        get: {
          ...state.get,
          object: action.payload,
          isLoading: false,
          error: null
        }
      }
    case Types.GET_BUSINESS_SOLD_FAILURE:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.UPDATE_BUSINESS_SOLD_LOADING:
      return {
        ...state,
        updateSold: {
          ...state.updateSold,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.UPDATE_BUSINESS_SOLD_SUCCESS:
      return {
        ...state,
        updateSold: {
          ...state.updateStatus,
          isLoading: false,
          isUpdated: action.payload,
          error: null
        }
      }
    case Types.UPDATE_BUSINESS_SOLD_FAILURE:
      return {
        ...state,
        updateSold: {
          ...state.updateSold,
          isLoading: false,
          isUpdated: false,
          error: action.payload
        }
      }
    case Types.FINALISE_BUSINESS_SOLD_LOADING:
      return {
        ...state,
        finaliseSold: {
          ...state.finaliseSold,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.FINALISE_BUSINESS_SOLD_SUCCESS:
      return {
        ...state,
        finaliseSold: {
          ...state.finaliseSold,
          isLoading: false,
          isUpdated: action.payload,
          error: null
        }
      }
    case Types.FINALISE_BUSINESS_SOLD_FAILURE:
      return {
        ...state,
        finaliseSold: {
          ...state.finaliseSold,
          isLoading: false,
          isUpdated: false,
          error: action.payload
        }
      }
    case Types.GET_BUYERS_BUSINESS_SOLD_LOADING:
      return {
        ...state,
        getBuyersBusiness: {
          ...state.getBuyersBusiness,
          array: [],
          isLoading: true
        }
      }
    case Types.GET_BUYERS_BUSINESS_SOLD_SUCCESS:
      return {
        ...state,
        getBuyersBusiness: {
          ...state.getBuyersBusiness,
          array: action.payload,
          isLoading: false
        }
      }
    case Types.GET_BUYERS_BUSINESS_SOLD_FAILURE:
      return {
        ...state,
        getBuyersBusiness: {
          ...state.getBuyersBusiness,
          array: [],
          isLoading: false,
          error: action.payload
        }
      }
    case Types.GET_BUSINESSES_SOLD_LOADING:
      return {
        ...state,
        getAll: {
          ...state.getAll,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.GET_BUSINESSES_SOLD_SUCCESS:
      return {
        ...state,
        getAll: {
          ...state.getAll,
          isLoading: false,
          array: action.payload.data.rows,
          error: null
        }
      }
    case Types.GET_BUSINESSES_SOLD_FAILURE:
      return {
        ...state,
        getAll: {
          ...state.getAll,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.SAVE_SELECTED_LIST_LOADING:
      return {
        ...state,
        saveList: {
          ...state.saveList,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.SAVE_SELECTED_LIST_SUCCESS:
      return {
        ...state,
        saveList: {
          ...state.saveList,
          isLoading: false,
          isSaved: action.payload,
          error: null
        }
      }
    case Types.SAVE_SELECTED_LIST_FAILURE:
      return {
        ...state,
        saveList: {
          ...state.saveList,
          isLoading: false,
          isSaved: false,
          error: action.payload
        }
      }
    case Types.GET_SELECTED_LIST_LOADING:
      return {
        ...state,
        getList: {
          ...state.getList,
          isLoading: true,
          error: null
        }
      }
    case Types.GET_SELECTED_LIST_SUCCESS:
      return {
        ...state,
        getList: {
          ...state.getList,
          array: action.payload.data,
          isLoading: false,
          error: null
        }
      }
    case Types.GET_SELECTED_LIST_FAILURE:
      return {
        ...state,
        getList: {
          ...state.getList,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.CALC_MIN_MAX_CHART:
      return {
        ...state,
        getCalcMinMax: {
          ...state.getCalcMinMax,
          smallestMultiplier: action.minValue,
          biggestMultiplier: action.maxValue
        }
      }
    case Types.ADD_SELECTED_LIST:
      return {
        ...state,
        getList: {
          ...state.getList,
          array: [...state.getList.array, action.payload]
        }
      }
    case Types.REMOVE_SELECTED_LIST:
      return {
        ...state,
        getList: {
          ...state.getList,
          array: [..._.remove(state.getList.array, item => item.id !== action.payload.id)]
        }
      }
    default:
      return state
  }
}

// Action Creators

export const createBusinessSold = businessSold => async dispatch => {
  dispatch({
    type: Types.CREATE_BUSINESS_SOLD_LOADING,
    payload: true
  })
  try {
    const response = await create(businessSold)
    dispatch({
      type: Types.CREATE_BUSINESS_SOLD_SUCCESS,
      payload: response.data
    })
    return response.data
  } catch (error) {
    dispatch({
      type: Types.CREATE_BUSINESS_SOLD_FAILURE,
      payload: error
    })
    return error
  }
}

export const getBusinessSold = businessId => async dispatch => {
  dispatch({
    type: Types.GET_BUSINESS_SOLD_LOADING,
    payload: true
  })
  try {
    const businessSold = await get(businessId)
    dispatch({
      type: Types.GET_BUSINESS_SOLD_SUCCESS,
      payload: businessSold
    })
  } catch (error) {
    dispatch({
      type: Types.GET_BUSINESS_SOLD_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const updateBusinessSold = businessSold => async dispatch => {
  dispatch({
    type: Types.UPDATE_BUSINESS_SOLD_LOADING,
    payload: true
  })
  try {
    await update(businessSold)
    dispatch({
      type: Types.UPDATE_BUSINESS_SOLD_SUCCESS
    })
  } catch (error) {
    dispatch({
      type: Types.UPDATE_BUSINESS_SOLD_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const finaliseStageSold = (businessSoldId, businessId) => async dispatch => {
  dispatch({
    type: Types.FINALISE_BUSINESS_SOLD_LOADING,
    payload: true
  })
  try {
    const response = await finalise(businessSoldId, businessId)
    dispatch({
      type: Types.FINALISE_BUSINESS_SOLD_SUCCESS,
      payload: response.data
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.FINALISE_BUSINESS_SOLD_FAILURE,
      payload: error
    })
  }
}

export const getBuyersBusinessSold = (businessId, showAll) => async dispatch => {
  dispatch({
    type: Types.GET_BUYERS_BUSINESS_SOLD_LOADING,
    payload: true
  })
  try {
    const businessSold = await getBuyersFromBusiness(businessId, showAll)
    dispatch({
      type: Types.GET_BUYERS_BUSINESS_SOLD_SUCCESS,
      payload: businessSold.data.array
    })
  } catch (error) {
    dispatch({
      type: Types.GET_BUYERS_BUSINESS_SOLD_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const getBusinessesSold = objectValues => async dispatch => {
  dispatch({
    type: Types.GET_BUSINESSES_SOLD_LOADING,
    payload: true
  })
  try {
    const businessesSold = await getAll(objectValues)
    dispatch({
      type: Types.GET_BUSINESSES_SOLD_SUCCESS,
      payload: businessesSold
    })
  } catch (error) {
    dispatch({
      type: Types.GET_BUSINESSES_SOLD_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

const _ebitdaLastYearChart = businessSold => {
  if (businessSold && businessSold.year4 > 0) {
    return businessSold.soldPrice / (businessSold.year4 - businessSold.agreedWageForWorkingOwners)
  }
  if (businessSold && businessSold.year3 > 0) {
    return businessSold.soldPrice / (businessSold.year3 - businessSold.agreedWageForWorkingOwners)
  }
  if (businessSold && businessSold.year2 > 0) {
    return businessSold.soldPrice / (businessSold.year2 - businessSold.agreedWageForWorkingOwners)
  }
  if (businessSold && businessSold.year1 > 0) {
    return businessSold.soldPrice / (businessSold.year1 - businessSold.agreedWageForWorkingOwners)
  }
}

export const calcMinMaxChart = (selectedList, func) => dispatch => {
  if (!func) func = _ebitdaLastYearChart
  const newArray = selectedList.map(item => func(item))
  const minValue = Math.min(...newArray)
  const maxValue = Math.max(...newArray)

  dispatch({
    type: Types.CALC_MIN_MAX_CHART,
    minValue,
    maxValue
  })
}

export const saveSelectedList = (list, appraisalId) => async dispatch => {
  dispatch({
    type: Types.SAVE_SELECTED_LIST_LOADING,
    payload: true
  })
  try {
    await saveList(list, appraisalId)
    dispatch({
      type: Types.SAVE_SELECTED_LIST_SUCCESS
    })
  } catch (error) {
    dispatch({
      type: Types.SAVE_SELECTED_LIST_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const getSelectedList = appraisalId => async dispatch => {
  dispatch({
    type: Types.GET_SELECTED_LIST_LOADING,
    payload: true
  })
  try {
    const selectedList = await getList(appraisalId)
    calcMinMaxChart(selectedList.data)
    dispatch({
      type: Types.GET_SELECTED_LIST_SUCCESS,
      payload: selectedList
    })
  } catch (error) {
    dispatch({
      type: Types.GET_SELECTED_LIST_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const addSelectedList = objectList => async dispatch => {
  dispatch({
    type: Types.ADD_SELECTED_LIST,
    payload: objectList
  })
}

export const removeSelectedList = objectList => async dispatch => {
  dispatch({
    type: Types.REMOVE_SELECTED_LIST,
    payload: objectList
  })
}

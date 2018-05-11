import { create, update, getAll, get } from '../../services/api/buyer'

// Action Types

export const Types = {
  CREATE_BUYER_LOADING: 'CREATE_BUYER_LOADING',
  CREATE_BUYER_SUCCESS: 'CREATE_BUYER_SUCCESS',
  CREATE_BUYER_FAILURE: 'CREATE_BUYER_FAILURE',
  GET_BUYERS_LOADING: 'GET_BUYERS_LOADING',
  GET_BUYERS_SUCCESS: 'GET_BUYERS_SUCCESS',
  GET_BUYERS_FAILURE: 'GET_BUYERS_FAILURE',
  UPDATE_BUYER_LOADING: 'UPDATE_BUYER_LOADING',
  UPDATE_BUYER_SUCCESS: 'UPDATE_BUYER_SUCCESS',
  UPDATE_BUYER_FAILURE: 'UPDATE_BUYER_FAILURE',
  GET_BUYER_LOADING: 'GET_BUYER_LOADING',
  GET_BUYER_SUCCESS: 'GET_BUYER_SUCCESS',
  GET_BUYER_FAILURE: 'GET_BUYER_FAILURE'
}

// Reducer

const initialState = {
  create: {
    isLoading: false,
    isCreated: false,
    error: null
  },
  update: {
    isLoading: false,
    isUpdated: false,
    error: null,
    buyer: {}
  },
  getAll: {
    array: [],
    isLoading: false,
    error: null
  },
  get: {
    isLoading: true,
    object: null,
    error: null
  }
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case Types.CREATE_BUYER_LOADING:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.CREATE_BUYER_SUCCESS:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: false,
          isCreated: true,
          error: null
        }
      }
    case Types.CREATE_BUYER_FAILURE:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: false,
          isCreated: false,
          error: action.payload
        }
      }
    case Types.UPDATE_BUYER_LOADING:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: action.payload,
          isUpdated: false,
          error: null
        }
      }
    case Types.UPDATE_BUYER_SUCCESS:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          isUpdated: true,
          error: null,
          buyer: action.payload
        }
      }
    case Types.UPDATE_BUYER_FAILURE:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          isUpdated: false,
          error: action.payload
        }
      }
    case Types.GET_BUYERS_LOADING:
      return {
        ...state,
        getAll: {
          ...state.getAll,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.GET_BUYERS_SUCCESS:
      return {
        ...state,
        getAll: {
          ...state.getAll,
          isLoading: false,
          array: action.payload,
          error: null
        }
      }
    case Types.GET_BUYERS_FAILURE:
      return {
        ...state,
        getAll: {
          ...state.getAll,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.GET_BUYER_LOADING:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.GET_BUYER_SUCCESS:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: false,
          object: action.payload,
          error: null
        }
      }
    case Types.GET_BUYER_FAILURE:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: false,
          error: action.payload
        }
      }
    default:
      return state
  }
}

// Action Creators
export const buyerLoading = (value, type) => ({
  type: Types[type],
  payload: value
})

export const createBuyer = buyer => async dispatch => {
  dispatch({
    type: Types.CREATE_BUYER_LOADING,
    payload: true
  })
  try {
    await create(buyer)
    dispatch({
      type: Types.CREATE_BUYER_SUCCESS
    })
  } catch (error) {
    dispatch({
      type: Types.CREATE_BUYER_FAILURE,
      payload: error
    })
  }
}

export const updateBuyer = buyer => async dispatch => {
  dispatch({
    type: Types.UPDATE_BUYER_LOADING,
    payload: true
  })
  try {
    await update(buyer)
    dispatch({
      type: Types.UPDATE_BUYER_SUCCESS,
      payload: buyer
    })
  } catch (error) {
    dispatch({
      type: Types.UPDATE_BUYER_FAILURE,
      payload: error
    })
  }
}

export const getBuyers = (search = false) => async dispatch => {
  dispatch({
    type: Types.GET_BUYERS_LOADING,
    payload: true
  })
  try {
    const buyers = await getAll(search)
    dispatch({
      type: Types.GET_BUYERS_SUCCESS,
      payload: buyers.data
    })
  } catch (error) {
    dispatch({
      type: Types.GET_BUYERS_FAILURE,
      payload: error
    })
  }
}

export const getBuyer = id => async dispatch => {
  dispatch({
    type: Types.GET_BUYER_LOADING,
    payload: true
  })
  try {
    const buyer = await get(id)
    dispatch({
      type: Types.GET_BUYER_SUCCESS,
      payload: buyer.data
    })
  } catch (error) {
    dispatch({
      type: Types.GET_BUYER_FAILURE,
      payload: error
    })
  }
}

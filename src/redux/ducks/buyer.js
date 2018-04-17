import { create } from '../../services/api/buyer'

// Action Types

export const Types = {
  CREATE_BUYER_LOADING: 'CREATE_BUYER_LOADING',
  CREATE_BUYER_SUCCESS: 'CREATE_BUYER_SUCCESS',
  CREATE_BUYER_FAILURE: 'CREATE_BUYER_FAILURE'
}

// Reducer

const initialState = {
  create: {
    isLoading: false,
    isCreated: false,
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

import { get } from '../../services/api/businessRegister'

// Action Types

export const Types = {
  GET_BUSINESS_REGISTER_LOADING: 'GET_BUSINESS_REGISTER_LOADING',
  GET_BUSINESS_REGISTER_SUCCESS: 'GET_BUSINESS_REGISTER_SUCCESS',
  GET_BUSINESS_REGISTER_FAILURE: 'GET_BUSINESS_REGISTER_FAILURE'
}

// Reducer

const initialState = {
  get: {
    source: {
      isLoading: true,
      array: [],
      error: null
    }
  }
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case Types.GET_BUSINESS_REGISTER_LOADING:
      return {
        ...state,
        get: {
          ...state.get,
          source: {
            ...state.get.source,
            isLoading: true,
            error: null
          }
        }
      }
    case Types.GET_BUSINESS_REGISTER_SUCCESS:
      return {
        ...state,
        get: {
          ...state.get,
          source: {
            ...state.get.source,
            isLoading: false,
            array: action.payload
          }
        }
      }
    case Types.GET_BUSINESS_REGISTER_FAILURE:
      return {
        ...state,
        get: {
          ...state.get,
          source: {
            ...state.get.source,
            isLoading: false,
            error: action.payload
          }
        }
      }
    default:
      return state
  }
}

// Action Creators

export const getBusinessRegister = id => async (dispatch) => {
  dispatch({
    type: Types.GET_BUSINESS_REGISTER_LOADING
  })
  try {
    const businessRegister = await get(id)
    dispatch({
      type: Types.GET_BUSINESS_REGISTER_SUCCESS,
      payload: businessRegister
    })
  } catch (error) {
    dispatch({
      type: Types.GET_BUSINESS_REGISTER_FAILURE,
      payload: error
    })
  }
}

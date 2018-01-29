import { getAll, getSearching } from '../../services/api/user';

// Action Types

export const Types = {
  USER_LOADING: 'USER_LOADING',
  USER_SUCCESS: 'USER_SUCCESS',
  USER_FAILURE: 'USER_FAILURE'
};

// Reducer

const initialState = {
  error: null,
  isLoading: false,
  users: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.USER_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case Types.USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: action.payload,
        error: null
      };
    case Types.USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
}

// Action Creators

export const userLoading = value => {
  return {
    type: Types.USER_LOADING,
    payload: value
  };
};

const userResponse = array => {
  return {
    type: Types.USER_SUCCESS,
    payload: array
  };
};

const userError = value => {
  return {
    type: Types.USER_FAILURE,
    payload: value
  };
};

export const getUsers = (search = false) => {
  return async dispatch => {
    dispatch(userLoading(true));
    try {
      const users = search ? await getSearching(search) : await getAll();
      dispatch(userResponse(users));
    } catch (error) {
      dispatch(userError(error));
    }
  };
};

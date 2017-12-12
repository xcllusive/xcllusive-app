// Action Types

export const Types = {
  AUTH_REQUEST: 'AUTH_REQUEST',
  AUTH_SUCCESS: 'AUTH_SUCCESS',
  AUTH_FAILURE: 'AUTH_FAILURE',
  AUTH_CLEAN_ERROR: 'AUTH_CLEAN_ERROR',
  AUTH_LOGOUT: 'AUTH_LOGOUT',
  AUTH_LOADING: 'AUTH_LOADING'
};

// Reducer

const initialState = {
  error: null,
  isLoading: false,
  user: null,
  isAuthenticated: true,
  isAppLoading: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.AUTH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        error: null,
        isAuthenticated: true,
        isAppLoading: false
      };
    case Types.AUTH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        error: action.payload,
        isAppLoading: false
      };
    case Types.AUTH_CLEAN_ERROR:
      return {
        ...state,
        error: null
      };
    case Types.AUTH_LOGOUT:
      return {
        ...initialState,
        isLoading: false
      };
    case Types.AUTH_LOADING:
      return {
        ...state,
        isLoading: action.payload,
        isAppLoading: action.payload
      };
    default:
      return state;
  }
}

// Action Creators

function loginError(error) {
  return {
    type: Types.AUTH_FAILURE,
    payload: error
  };
}

export function loginLoading(value) {
  return {
    type: Types.AUTH_LOADING,
    payload: value
  };
}

export function loginSuccess(obj) {
  return {
    type: Types.AUTH_SUCCESS,
    payload: obj
  };
}

export function login(email, password) {
  return async dispatch => {
    if (email === '' || password === '') {
      dispatch(loginError('Usuario ou senha em branco.'));
    } else {
      dispatch(loginLoading(true));
      try {
        // const user = await auth.signInWithEmailAndPassword(email, password)
        dispatch(loginSuccess({}));
      } catch (err) {
        dispatch(loginError(err.message));
      }
    }
  };
}

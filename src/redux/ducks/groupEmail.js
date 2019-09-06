import { toast } from 'react-toastify'
import { Types as ModalTypes } from './modal'
import {
  list,
  create,
  update,
  remove,
  listEmailTemplates,
  removeEmailTemplate,
  createEmailTemplate,
  updateEmailTemplate
} from '../../services/api/groupEmail'

// Action Types

export const Types = {
  GET_GROUP_EMAIL_FOLDER_LOADING: 'GET_GROUP_EMAIL_FOLDER_LOADING',
  GET_GROUP_EMAIL_FOLDER_SUCCESS: 'GET_GROUP_EMAIL_FOLDER_SUCCESS',
  GET_GROUP_EMAIL_FOLDER_FAILURE: 'GET_GROUP_EMAIL_FOLDER_FAILURE',
  CREATE_GROUP_EMAIL_FOLDER_LOADING: 'CREATE_GROUP_EMAIL_FOLDER_LOADING',
  CREATE_GROUP_EMAIL_FOLDER_SUCCESS: 'CREATE_GROUP_EMAIL_FOLDER_SUCCESS',
  CREATE_GROUP_EMAIL_FOLDER_FAILURE: 'CREATE_GROUP_EMAIL_FOLDER_FAILURE',
  UPDATE_GROUP_EMAIL_FOLDER_LOADING: 'UPDATE_GROUP_EMAIL_FOLDER_LOADING',
  UPDATE_GROUP_EMAIL_FOLDER_SUCCESS: 'UPDATE_GROUP_EMAIL_FOLDER_SUCCESS',
  UPDATE_GROUP_EMAIL_FOLDER_FAILURE: 'UPDATE_GROUP_EMAIL_FOLDER_FAILURE',
  REMOVE_GROUP_EMAIL_FOLDER_LOADING: 'REMOVE_GROUP_EMAIL_FOLDER_LOADING',
  REMOVE_GROUP_EMAIL_FOLDER_SUCCESS: 'REMOVE_GROUP_EMAIL_FOLDER_SUCCESS',
  REMOVE_GROUP_EMAIL_FOLDER_FAILURE: 'REMOVE_GROUP_EMAIL_FOLDER_FAILURE',
  CREATE_GROUP_EMAIL_TEMPLATE_LOADING: 'CREATE_GROUP_EMAIL_TEMPLATE_LOADING',
  CREATE_GROUP_EMAIL_TEMPLATE_SUCCESS: 'CREATE_GROUP_EMAIL_TEMPLATE_SUCCESS',
  CREATE_GROUP_EMAIL_TEMPLATE_FAILURE: 'CREATE_GROUP_EMAIL_TEMPLATE_FAILURE',
  GET_FOLDERS_LOADING: 'GET_FOLDERS_LOADING',
  GET_FOLDERS_SUCCESS: 'GET_FOLDERS_SUCCESS',
  GET_FOLDERS_FAILURE: 'GET_FOLDERS_FAILURE',
  GET_GROUP_EMAIL_TEMPLATES_LOADING: 'GET_GROUP_EMAIL_TEMPLATES_LOADING',
  GET_GROUP_EMAIL_TEMPLATES_SUCCESS: 'GET_GROUP_EMAIL_TEMPLATES_SUCCESS',
  GET_GROUP_EMAIL_TEMPLATES_FAILURE: 'GET_GROUP_EMAIL_TEMPLATES_FAILURE',
  REMOVE_GROUP_EMAIL_TEMPLATE_LOADING: 'REMOVE_DOCUMENT_FILE_LOADING',
  REMOVE_GROUP_EMAIL_TEMPLATE_SUCCESS: 'REMOVE_GROUP_EMAIL_TEMPLATE_SUCCESS',
  REMOVE_GROUP_EMAIL_TEMPLATE_FAILURE: 'REMOVE_GROUP_EMAIL_TEMPLATE_FAILURE',
  CLEAR_EMAIL_TEMPLATES: 'CLEAR_EMAIL_TEMPLATES',
  UPDATE_GROUP_EMAIL_TEMPLATE_LOADING: 'UPDATE_GROUP_EMAIL_TEMPLATE_LOADING',
  UPDATE_GROUP_EMAIL_TEMPLATE_SUCCESS: 'UPDATE_GROUP_EMAIL_TEMPLATE_SUCCESS',
  UPDATE_GROUP_EMAIL_TEMPLATE_FAILURE: 'UPDATE_GROUP_EMAIL_TEMPLATE_FAILURE'
}

// Reducer

const initialState = {
  get: {
    isLoading: true,
    array: [],
    folderAnalysts: [],
    folderBrokers: [],
    folderGeneral: [],
    error: null,
    pages: 0,
    activePage: 1
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
  delete: {
    isLoading: false,
    isDeleted: false,
    error: null
  },
  listFolders: {
    isLoading: true,
    array: [],
    error: null
  },
  createTemplate: {
    isLoading: false,
    isCreated: false,
    error: null
  },
  deleteTemplate: {
    isLoading: false,
    isDeleted: false,
    error: null
  },
  listEmailTemplates: {
    isLoading: true,
    array: [],
    error: null
  },
  updateTemplate: {
    isLoading: false,
    isUpdated: false,
    error: null
  }
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case Types.GET_GROUP_EMAIL_FOLDER_LOADING:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: true,
          error: null
        }
      }
    case Types.GET_GROUP_EMAIL_FOLDER_SUCCESS:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: false,
          array: action.payload.data,
          folderAnalysts: action.payload.folderAnalysts,
          folderBrokers: action.payload.folderBrokers,
          folderGeneral: action.payload.folderGeneral,
          error: null
        }
      }
    case Types.GET_GROUP_EMAIL_FOLDER_FAILURE:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.CREATE_GROUP_EMAIL_FOLDER_LOADING:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: action.payload,
          isCreated: false,
          error: null
        }
      }
    case Types.CREATE_GROUP_EMAIL_FOLDER_SUCCESS:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: false,
          isCreated: true,
          error: null
        }
      }
    case Types.CREATE_GROUP_EMAIL_FOLDER_FAILURE:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: false,
          isCreated: false,
          error: action.payload
        }
      }
    case Types.UPDATE_GROUP_EMAIL_FOLDER_LOADING:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: action.payload,
          isUpdated: false,
          error: null
        }
      }
    case Types.UPDATE_GROUP_EMAIL_FOLDER_SUCCESS:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          isUpdated: true,
          error: null
        }
      }
    case Types.UPDATE_GROUP_EMAIL_FOLDER_FAILURE:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          isUpdated: false,
          error: action.payload
        }
      }
    case Types.REMOVE_GROUP_EMAIL_FOLDER_LOADING:
      return {
        ...state,
        delete: {
          ...state.delete,
          isLoading: action.payload,
          isDeleted: false,
          error: null
        }
      }
    case Types.REMOVE_GROUP_EMAIL_FOLDER_SUCCESS:
      return {
        ...state,
        delete: {
          ...state.delete,
          isLoading: false,
          isDeleted: true
        }
      }
    case Types.REMOVE_GROUP_EMAIL_FOLDER_FAILURE:
      return {
        ...state,
        delete: {
          ...state.delete,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.GET_FOLDERS_LOADING:
      return {
        ...state,
        listFolders: {
          ...state.listFolders,
          isLoading: true,
          error: null
        }
      }
    case Types.GET_FOLDERS_SUCCESS:
      return {
        ...state,
        listFolders: {
          ...state.listFolders,
          isLoading: false,
          array: action.payload.data,
          error: null
        }
      }
    case Types.GET_FOLDERS_FAILURE:
      return {
        ...state,
        listFolders: {
          ...state.listFolders,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.GET_GROUP_EMAIL_TEMPLATES_LOADING:
      return {
        ...state,
        listEmailTemplates: {
          ...state.listEmailTemplates,
          isLoading: true,
          error: null
        }
      }
    case Types.GET_GROUP_EMAIL_TEMPLATES_SUCCESS:
      return {
        ...state,
        listEmailTemplates: {
          ...state.listEmailTemplates,
          isLoading: false,
          array: action.payload.data,
          error: null
        }
      }
    case Types.GET_GROUP_EMAIL_TEMPLATES_FAILURE:
      return {
        ...state,
        listEmailTemplates: {
          ...state.listEmailTemplates,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.REMOVE_GROUP_EMAIL_TEMPLATE_LOADING:
      return {
        ...state,
        deleteTemplate: {
          ...state.deleteTemplate,
          isLoading: action.payload,
          isDeleted: false,
          error: null
        }
      }
    case Types.REMOVE_GROUP_EMAIL_TEMPLATE_SUCCESS:
      return {
        ...state,
        deleteTemplate: {
          ...state.deleteTemplate,
          isLoading: false,
          isDeleted: true
        }
      }
    case Types.REMOVE_GROUP_EMAIL_TEMPLATE_FAILURE:
      return {
        ...state,
        deleteTemplate: {
          ...state.deleteTemplate,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.CLEAR_EMAIL_TEMPLATES:
      return {
        ...state,
        listEmailTemplates: {
          ...state.listEmailTemplates,
          isLoading: false,
          error: action.payload,
          array: null
        }
      }
    case Types.CREATE_GROUP_EMAIL_TEMPLATE_LOADING:
      return {
        ...state,
        createTemplate: {
          ...state.createTemplate,
          isLoading: action.payload,
          isCreated: false,
          error: null
        }
      }
    case Types.CREATE_GROUP_EMAIL_TEMPLATE_SUCCESS:
      return {
        ...state,
        createTemplate: {
          ...state.createTemplate,
          isLoading: false,
          isCreated: true,
          error: null
        }
      }
    case Types.CREATE_GROUP_EMAIL_TEMPLATE_FAILURE:
      return {
        ...state,
        createTemplate: {
          ...state.createTemplate,
          isLoading: false,
          isCreated: false,
          error: action.payload
        }
      }
    case Types.UPDATE_GROUP_EMAIL_TEMPLATE_LOADING:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: action.payload,
          isUpdated: false,
          error: null
        }
      }
    case Types.UPDATE_GROUP_EMAIL_TEMPLATE_SUCCESS:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          isUpdated: true,
          error: null
        }
      }
    case Types.UPDATE_GROUP_EMAIL_TEMPLATE_FAILURE:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          isUpdated: false,
          error: action.payload
        }
      }
    default:
      return state
  }
}

// Action Creators

export const getGroupEmailFolder = () => async dispatch => {
  dispatch({
    type: Types.GET_GROUP_EMAIL_FOLDER_LOADING
  })
  try {
    const groupEmail = await list()
    dispatch({
      type: Types.GET_GROUP_EMAIL_FOLDER_SUCCESS,
      payload: groupEmail
    })
  } catch (error) {
    dispatch({
      type: Types.GET_GROUP_EMAIL_FOLDER_FAILURE,
      payload: error
    })
  }
}

export const createGroupEmailFolder = groupEmail => async dispatch => {
  dispatch({
    type: Types.CREATE_GROUP_EMAIL_FOLDER_LOADING,
    payload: true
  })
  try {
    const response = await create(groupEmail)
    dispatch({
      type: Types.CREATE_GROUP_EMAIL_FOLDER_SUCCESS
    })
    dispatch({
      type: ModalTypes.MODAL_CLOSE
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.CREATE_GROUP_EMAIL_FOLDER_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const updateGroupEmailFolder = groupEmail => async dispatch => {
  dispatch({
    type: Types.UPDATE_GROUP_EMAIL_FOLDER_LOADING,
    payload: true
  })
  try {
    const response = await update(groupEmail)
    dispatch({
      type: Types.UPDATE_GROUP_EMAIL_FOLDER_SUCCESS
    })
    toast.success(response.message)
    dispatch({
      type: ModalTypes.MODAL_CLOSE
    })
  } catch (error) {
    dispatch({
      type: Types.UPDATE_GROUP_EMAIL_FOLDER_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const removeGroupEmailFolder = folderObject => async dispatch => {
  dispatch({
    type: Types.REMOVE_GROUP_EMAIL_FOLDER_LOADING,
    payload: true
  })
  try {
    const response = await remove(folderObject)
    dispatch({
      type: Types.REMOVE_GROUP_EMAIL_FOLDER_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.REMOVE_GROUP_EMAIL_FOLDER_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const createGroupEmailTemplate = template => async dispatch => {
  dispatch({
    type: Types.CREATE_GROUP_EMAIL_TEMPLATE_LOADING,
    payload: true
  })
  try {
    const response = await createEmailTemplate(template)
    dispatch({
      type: Types.CREATE_GROUP_EMAIL_TEMPLATE_SUCCESS
    })
    dispatch({
      type: ModalTypes.MODAL_CLOSE
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.CREATE_GROUP_EMAIL_TEMPLATE_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const getGroupEmailTemplates = folderId => async dispatch => {
  dispatch({
    type: Types.GET_GROUP_EMAIL_TEMPLATES_LOADING,
    payload: true
  })
  try {
    const templates = await listEmailTemplates(folderId)
    dispatch({
      type: Types.GET_GROUP_EMAIL_TEMPLATES_SUCCESS,
      payload: templates
    })
  } catch (error) {
    dispatch({
      type: Types.GET_GROUP_EMAIL_TEMPLATES_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const updateGroupEmailTemplate = groupEmail => async dispatch => {
  dispatch({
    type: Types.UPDATE_GROUP_EMAIL_TEMPLATE_LOADING,
    payload: true
  })
  try {
    const response = await updateEmailTemplate(groupEmail)
    dispatch({
      type: Types.UPDATE_GROUP_EMAIL_TEMPLATE_SUCCESS
    })
    toast.success(response.message)
    dispatch({
      type: ModalTypes.MODAL_CLOSE
    })
  } catch (error) {
    dispatch({
      type: Types.UPDATE_GROUP_EMAIL_TEMPLATE_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const removeGroupEmailTemplate = templateObject => async dispatch => {
  dispatch({
    type: Types.REMOVE_GROUP_EMAIL_TEMPLATE_LOADING,
    payload: true
  })
  try {
    const response = await removeEmailTemplate(templateObject)
    dispatch({
      type: Types.REMOVE_GROUP_EMAIL_TEMPLATE_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.REMOVE_GROUP_EMAIL_TEMPLATE_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const clearEmailTemplates = () => async dispatch => {
  dispatch({
    type: Types.CLEAR_EMAIL_TEMPLATES
  })
}

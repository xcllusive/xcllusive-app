import { toast } from 'react-toastify'
import { Types as ModalTypes } from './modal'
import { list, create, update, remove, listFolders, uploadFile } from '../../services/api/documentFolder'

// Action Types

export const Types = {
  GET_DOCUMENT_FOLDER_LOADING: 'GET_DOCUMENT_FOLDER_LOADING',
  GET_DOCUMENT_FOLDER_SUCCESS: 'GET_DOCUMENT_FOLDER_SUCCESS',
  GET_DOCUMENT_FOLDER_FAILURE: 'GET_DOCUMENT_FOLDER_FAILURE',
  CREATE_DOCUMENT_FOLDER_LOADING: 'CREATE_DOCUMENT_FOLDER_LOADING',
  CREATE_DOCUMENT_FOLDER_SUCCESS: 'CREATE_DOCUMENT_FOLDER_SUCCESS',
  CREATE_DOCUMENT_FOLDER_FAILURE: 'CREATE_DOCUMENT_FOLDER_FAILURE',
  UPDATE_DOCUMENT_FOLDER_LOADING: 'UPDATE_DOCUMENT_FOLDER_LOADING',
  UPDATE_DOCUMENT_FOLDER_SUCCESS: 'UPDATE_DOCUMENT_FOLDER_SUCCESS',
  UPDATE_DOCUMENT_FOLDER_FAILURE: 'UPDATE_DOCUMENT_FOLDER_FAILURE',
  REMOVE_DOCUMENT_FOLDER_LOADING: 'REMOVE_DOCUMENT_FOLDER_LOADING',
  REMOVE_DOCUMENT_FOLDER_SUCCESS: 'REMOVE_DOCUMENT_FOLDER_SUCCESS',
  REMOVE_DOCUMENT_FOLDER_FAILURE: 'REMOVE_DOCUMENT_FOLDER_FAILURE',
  GET_FOLDERS_LOADING: 'GET_FOLDERS_LOADING',
  GET_FOLDERS_SUCCESS: 'GET_FOLDERS_SUCCESS',
  GET_FOLDERS_FAILURE: 'GET_FOLDERS_FAILURE',
  UPLOAD_FILE_LOADING: 'UPLOAD_FILE_LOADING',
  UPLOAD_FILE_SUCCESS: 'UPLOAD_FILE_SUCCESS',
  UPLOAD_FILE_FAILURE: 'UPLOAD_FILE_FAILURE'
}

// Reducer

const initialState = {
  get: {
    isLoading: true,
    array: [],
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
  uploadFile: {
    isLoading: false,
    isUploaded: false,
    error: null
  }
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case Types.GET_DOCUMENT_FOLDER_LOADING:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: true,
          error: null
        }
      }
    case Types.GET_DOCUMENT_FOLDER_SUCCESS:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: false,
          array: action.payload.data,
          error: null
        }
      }
    case Types.GET_DOCUMENT_FOLDER_FAILURE:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.CREATE_DOCUMENT_FOLDER_LOADING:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: action.payload,
          isCreated: false,
          error: null
        }
      }
    case Types.CREATE_DOCUMENT_FOLDER_SUCCESS:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: false,
          isCreated: true,
          error: null
        }
      }
    case Types.CREATE_DOCUMENT_FOLDER_FAILURE:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: false,
          isCreated: false,
          error: action.payload
        }
      }
    case Types.UPDATE_DOCUMENT_FOLDER_LOADING:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: action.payload,
          isUpdated: false,
          error: null
        }
      }
    case Types.UPDATE_DOCUMENT_FOLDER_SUCCESS:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          isUpdated: true,
          error: null
        }
      }
    case Types.UPDATE_DOCUMENT_FOLDER_FAILURE:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          isUpdated: false,
          error: action.payload
        }
      }
    case Types.REMOVE_DOCUMENT_FOLDER_LOADING:
      return {
        ...state,
        delete: {
          ...state.delete,
          isLoading: action.payload,
          isDeleted: false,
          error: null
        }
      }
    case Types.REMOVE_DOCUMENT_FOLDER_SUCCESS:
      return {
        ...state,
        delete: {
          ...state.delete,
          isLoading: false,
          isDeleted: true
        }
      }
    case Types.REMOVE_DOCUMENT_FOLDER_FAILURE:
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
    case Types.UPLOAD_FILE_LOADING:
      return {
        ...state,
        uploadIM: {
          ...state.uploadFile,
          isLoading: action.payload,
          isUploaded: false,
          error: null
        }
      }
    case Types.UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        uploadIM: {
          ...state.uploadFile,
          isLoading: false,
          isUploaded: true,
          error: null
        }
      }
    case Types.UPLOAD_FILE_FAILURE:
      return {
        ...state,
        uploadIM: {
          ...state.uploadFile,
          isLoading: false,
          isUploaded: false,
          error: action.payload
        }
      }
    default:
      return state
  }
}

// Action Creators

export const getDocumentFolder = () => async dispatch => {
  dispatch({
    type: Types.GET_DOCUMENT_FOLDER_LOADING
  })
  try {
    const documentFolder = await list()
    dispatch({
      type: Types.GET_DOCUMENT_FOLDER_SUCCESS,
      payload: documentFolder
    })
  } catch (error) {
    dispatch({
      type: Types.GET_DOCUMENT_FOLDER_FAILURE,
      payload: error
    })
  }
}

export const createDocumentFolder = documentFolder => async dispatch => {
  dispatch({
    type: Types.CREATE_DOCUMENT_FOLDER_LOADING,
    payload: true
  })
  try {
    const response = await create(documentFolder)
    dispatch({
      type: Types.CREATE_DOCUMENT_FOLDER_SUCCESS
    })
    dispatch({
      type: ModalTypes.MODAL_CLOSE
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.CREATE_DOCUMENT_FOLDER_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const updateDocumentFolder = documentFolder => async dispatch => {
  dispatch({
    type: Types.UPDATE_DOCUMENT_FOLDER_LOADING,
    payload: true
  })
  try {
    const response = await update(documentFolder)
    dispatch({
      type: Types.UPDATE_DOCUMENT_FOLDER_SUCCESS
    })
    toast.success(response.message)
    dispatch({
      type: ModalTypes.MODAL_CLOSE
    })
  } catch (error) {
    dispatch({
      type: Types.UPDATE_DOCUMENT_FOLDER_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const removeDocumentFolder = documentFolder => async dispatch => {
  dispatch({
    type: Types.REMOVE_DOCUMENT_FOLDER_LOADING,
    payload: true
  })
  try {
    const response = await remove(documentFolder)
    dispatch({
      type: Types.REMOVE_DOCUMENT_FOLDER_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.REMOVE_DOCUMENT_FOLDER_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const getFolderPerOffice = officeId => async dispatch => {
  dispatch({
    type: Types.GET_FOLDERS_LOADING,
    payload: true
  })
  try {
    const folders = await listFolders(officeId)
    dispatch({
      type: Types.GET_FOLDERS_SUCCESS,
      payload: folders
    })
  } catch (error) {
    dispatch({
      type: Types.GET_FOLDERS_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const uploadDocumentFile = (file, folderId, fileName) => async dispatch => {
  dispatch({
    type: Types.UPLOAD_FILE_LOADING,
    payload: true
  })
  try {
    const businesses = await uploadFile(file, folderId, fileName)
    dispatch({
      type: Types.UPLOAD_FILE_SUCCESS,
      payload: businesses
    })
    toast.success(businesses.message)
  } catch (error) {
    dispatch({
      type: Types.UPLOAD_FILE_FAILURE,
      payload: error
    })
    // toast.error(error.message)
    toast.error('Error trying to uploading file. Please get in contact with IT department.')
  }
}

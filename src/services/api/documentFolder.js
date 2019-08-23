import request from '.'

export const list = (limit = null, page = null) => {
  return request({
    method: 'get',
    url: '/document/documentFolder',
    params: { limit, page }
  })
}

export const create = documentFolder => {
  return request({
    method: 'post',
    url: '/document/documentFolder',
    data: documentFolder
  })
}

export const update = documentFolder => {
  return request({
    method: 'put',
    url: `/document/documentFolder/${documentFolder.id}`,
    data: documentFolder
  })
}

export const remove = documentFolder => {
  return request({
    method: 'delete',
    url: `/documentFolder/${documentFolder.id}`,
    data: documentFolder
  })
}

export const listFolders = officeId => {
  return request({
    method: 'get',
    url: `/document/listFolders/${officeId}`
  })
}

export const uploadFile = (file, folderId, fileName) => {
  const data = new FormData()
  data.append('file', file)
  data.append('folderId', folderId)
  data.append('fileName', fileName)
  return request({
    method: 'post',
    url: '/document/upload-file',
    data,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export const listFiles = folderId => {
  return request({
    method: 'get',
    url: `/document/listFiles/${folderId}`
  })
}

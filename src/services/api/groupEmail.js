import request from '.'

export const list = () => {
  return request({
    method: 'get',
    url: '/groupEmail/folder'
  })
}

export const create = folder => {
  return request({
    method: 'post',
    url: '/groupEmail/folder',
    data: folder
  })
}

export const get = documentFolder => {
  return request({
    method: 'get',
    url: `/groupEmail/documentFolder/${documentFolder.id}`,
    data: documentFolder
  })
}

export const update = documentFolder => {
  return request({
    method: 'put',
    url: `/groupEmail/documentFolder/${documentFolder.id}`,
    data: documentFolder
  })
}

export const remove = documentFolder => {
  return request({
    method: 'delete',
    url: `/groupEmail/documentFolder/${documentFolder.id}`,
    data: documentFolder
  })
}

export const createEmailTemplate = template => {
  return request({
    method: 'post',
    url: `/groupEmail/template/${template.folderId}`,
    data: template
  })
}

export const listEmailTemplates = folderId => {
  return request({
    method: 'get',
    url: `/groupEmail/template/${folderId}`
  })
}

export const removeFile = documentFile => {
  return request({
    method: 'delete',
    url: `/groupEmail/documentFile/${documentFile.id}`,
    data: documentFile
  })
}

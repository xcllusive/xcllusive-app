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

export const update = folder => {
  return request({
    method: 'put',
    url: '/groupEmail/folder',
    data: folder
  })
}

export const remove = folderObject => {
  return request({
    method: 'delete',
    url: '/groupEmail/folder',
    data: folderObject
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

export const removeEmailTemplate = templateObject => {
  return request({
    method: 'delete',
    url: `/groupEmail/template/${templateObject.id}`,
    data: templateObject
  })
}

export const updateEmailTemplate = template => {
  return request({
    method: 'put',
    url: `/groupEmail/template/${template.id}`,
    data: template
  })
}

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

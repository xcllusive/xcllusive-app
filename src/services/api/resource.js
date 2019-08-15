import request from '.'

export const list = (limit = null, page = null) => {
  return request({
    method: 'get',
    url: '/resource',
    params: { limit, page }
  })
}

export const create = resource => {
  return request({
    method: 'post',
    url: '/resource',
    data: resource
  })
}

export const update = resource => {
  return request({
    method: 'put',
    url: `/resource/${resource.id}`,
    data: resource
  })
}

export const remove = resource => {
  return request({
    method: 'delete',
    url: `/resource/${resource.id}`,
    data: resource
  })
}

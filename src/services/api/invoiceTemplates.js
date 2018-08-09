import request from './'

export const create = template => {
  return request({
    method: 'post',
    url: '/invoice-template',
    data: template
  })
}

export const getAll = state => {
  const params = {}

  if (state && state.length > 0) params.state = state

  return request({
    method: 'get',
    url: '/invoice-template',
    params
  })
}

export const get = id =>
  request({
    method: 'get',
    url: `/invoice-template/${id}`
  })

export const getState = state => {
  const params = {}

  if (state && state.length > 0) params.state = state

  return request({
    method: 'get',
    url: '/invoice-template',
    params
  })
}

export const update = template => {
  return request({
    method: 'put',
    url: `/invoice-template/${template.id}`,
    data: template
  })
}

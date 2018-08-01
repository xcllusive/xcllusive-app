import request from './'

export const create = template => {
  return request({
    method: 'post',
    url: '/agreement-template',
    data: template
  })
}

export const getAll = state => {
  const params = {}

  if (state && state.length > 0) params.state = state

  return request({
    method: 'get',
    url: '/agreement-template',
    params
  })
}

export const get = id =>
  request({
    method: 'get',
    url: `/agreement-template/${id}`
  })

export const update = template => {
  return request({
    method: 'put',
    url: `/agreement-template/${template.id}`,
    data: template
  })
}

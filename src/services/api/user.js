import request from './'

export const get = id => {
  return request({
    url: `/user/${id}`
  })
}

export const getAll = (options, search) => {
  if (search && search.length > 0) options.search = search
  if (search.length < 1) delete options.search
  return request({
    url: '/user',
    params: options
  })
}

export const create = user => {
  return request({
    method: 'post',
    url: '/user',
    data: user
  })
}

export const update = user => {
  return request({
    method: 'put',
    url: '/user',
    data: user
  })
}

export const getLogged = id => {
  return request({
    url: '/user/user-logged',
    params: { id }
  })
}

export const activeInactive = user => {
  return request({
    method: 'put',
    url: '/user/active-inactive',
    data: user
  })
}

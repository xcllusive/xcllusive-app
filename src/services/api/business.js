import request from './'

export const get = id => {
  return request({
    url: `/business/${id}`
  })
}

export const getAll = (options, search) => {
  if (search && search.length > 0) options.search = search
  if (search.length < 1) delete options.search
  return request({
    url: '/business',
    params: options
  })
}

export const create = business => {
  return request({
    method: 'post',
    url: '/business',
    data: business
  })
}

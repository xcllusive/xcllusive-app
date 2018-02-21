import request from './'

export const get = id => {
  return request({
    url: `/business/${id}`
  })
}

export const getAll = (search) => {
  return request({
    url: '/business',
    params: search
  })
}

export const create = business => {
  return request({
    method: 'post',
    url: '/business',
    data: business
  })
}

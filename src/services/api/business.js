import request from './'

export const get = id => {
  return request({
    url: `/business/${id}`
  })
}

export const getAll = (search) => {
  const params = {}

  if (search && search.length > 0) params.search = search
  return request({
    url: '/business',
    params
  })
}

export const create = business => {
  return request({
    method: 'post',
    url: '/business',
    data: business
  })
}

export const update = business => {
  return request({
    method: 'post',
    url: `/business/${business.id}`,
    data: business
  })
}

export const createBusinessRegister = () => {
  console.log('test1')
  /* return request({
    method: 'post',
    url: `/business/${business.id}`,
    data: businessSource
  }) */
}

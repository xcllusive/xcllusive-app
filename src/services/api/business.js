import request from './'

export const get = id => {
  return request({
    url: `/business/${id}`
  })
}

export const getAll = search => {
  const params = {}

  if (search && search.length > 0) params.search = search
  return request({
    url: '/business/',
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
    method: 'put',
    url: `/business/${business.id}`,
    data: business
  })
}

export const createBusinessRegister = businessRegister => {
  return request({
    method: 'post',
    url: '/business-register',
    data: businessRegister
  })
}

export const reassignBusiness = () => {
  console.log('dale')
}

export const getBusinessRegister = id => {
  return request({
    url: '/business-register',
    params: {businessRegister: id}
  })
}

import request from './'

export const get = id => {
  return request({
    url: `/business/${id}`
  })
}

export const getAll = (search, typeId) => {
  const params = {}

  if (search && search.length > 0) params.search = search
  if (typeId && typeId > 0) params.typeId = typeId
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

export const reassignBusiness = options => {
  return request({
    method: 'put',
    url: `/business/listing-agent/${options.businessId}`,
    data: options
  })
}

export const getBusinessRegister = id => {
  return request({
    url: '/business-register',
    params: { businessRegister: id }
  })
}

export const updateStageSalesMemo = () => {
  console.log('updateStageSalesMemo')
}

export const updateStageLost = () => {
  console.log('updateStageLost')
}

import request from './'

export const get = id => {
  return request({
    url: `/business/${id}`
  })
}

export const getAll = (search, stageId, filterLog) => {
  const params = {}

  if (search && search.length > 0) params.search = search
  if (stageId && stageId.length > 0) {
    params.stageId = JSON.stringify(stageId)
  }
  if (stageId && stageId > 0) {
    params.stageId = stageId
  }
  if (filterLog) {
    params.filterLog = filterLog
  }

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

export const updateStageLost = stageLost => {
  return request({
    method: 'put',
    url: `/business/${stageLost.businessId}/stage-lost`,
    data: stageLost
  })
}

export const getBuyersFromBusiness = (businessId, showAll) => {
  return request({
    url: `/business/${businessId}/buyer`,
    params: showAll ? { showAll } : null
  })
}

export const getBuyersGroupEmail = businessId => {
  return request({
    url: `/business/${businessId}/group-email`
  })
}

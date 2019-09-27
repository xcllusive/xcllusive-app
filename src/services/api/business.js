import request from './'

export const get = id => {
  return request({
    url: `/business/${id}`
  })
}

export const getAll = (search, stageId, filterLog, company, allStages) => {
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
  if (company) {
    params.company = company
  }
  if (allStages) {
    params.allStages = allStages
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

export const updateStageSalesMemo = stageSalesMemo => {
  return request({
    method: 'put',
    url: `/business/${stageSalesMemo.business_id}/stage-sales-memo`,
    data: stageSalesMemo
  })
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

export const getQtdeBusinessEachStagePerUser = () => {
  return request({
    url: '/business/qtde-business-stage-user'
  })
}

export const getAllPerUser = (search, stageId, filterLog, orderByDateTimeCreated) => {
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
  if (orderByDateTimeCreated) {
    params.orderByDateTimeCreated = orderByDateTimeCreated
  }

  return request({
    url: '/business/businesses-user',
    params
  })
}

export const uploadIM = (imFile, businessId) => {
  const data = new FormData()
  data.append('imFile', imFile)
  data.append('businessId', businessId)
  return request({
    method: 'post',
    url: '/business/upload-im',
    data,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export const verifyDuplicatedBusiness = values => {
  return request({
    url: '/business/duplicated-business',
    params: values
  })
}

export const verifyBusinessFirstOpenByAgent = businessId => {
  return request({
    method: 'put',
    url: `/business/${businessId}/verify-first-open-by-agent`
  })
}

export const addIssueToBusiness = (issueId, business) => {
  return request({
    method: 'put',
    url: '/business/issue',
    data: { issueId, business }
  })
}

export const removeIssueFromBusiness = (issueId, businessId) => {
  return request({
    method: 'delete',
    url: '/business/issue',
    data: { issueId, businessId }
  })
}

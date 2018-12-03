import request from './'

export const create = buyer =>
  request({
    method: 'post',
    url: '/buyer',
    data: buyer
  })

export const update = buyer => {
  return request({
    method: 'put',
    url: `/buyer/${buyer.id}`,
    data: buyer
  })
}

export const getAll = search => {
  return request({
    method: 'get',
    url: '/buyer',
    params: {
      search: search && search.length > 0 ? search : ''
    }
  })
}

export const get = id => {
  return request({
    url: `/buyer/${id}`
  })
}

export const getBusinessesFromBuyer = id => {
  return request({
    url: `/buyer/${id}/business`
  })
}

export const sendEmailBuyerBrokersEmail = sendEmail => {
  return request({
    method: 'post',
    url: '/email-template/send-email',
    data: sendEmail
  })
}

export const sendGroupEmail = (sendGroupEmail, array) => {
  const data = new FormData()
  data.append('attachment', sendGroupEmail.attachment)
  data.append('subject', sendGroupEmail.subject)
  data.append('body', sendGroupEmail.body)
  data.append('to', JSON.stringify(array))

  return request({
    method: 'post',
    url: '/buyer/send-group-email',
    data,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export const getBuyerBusinesses = (search, stageId) => {
  const params = {}

  if (search && search.length > 0) params.search = search
  if (stageId && stageId.length > 0) {
    params.stageId = JSON.stringify(stageId)
  }
  if (stageId && stageId > 0) {
    params.stageId = stageId
  }

  return request({
    url: '/buyer/business/',
    params
  })
}

export const getBuyersFromBusiness = (businessId, showAll) => {
  return request({
    url: `/buyer/from-business/${businessId}`,
    params: showAll ? { showAll } : null
  })
}

export const getBusinessFromBuyer = id => {
  return request({
    url: `/buyer/business-from-buyer/${id}`
  })
}

export const getBuyersGroupEmail = businessId => {
  return request({
    url: `/buyer/${businessId}/group-email`
  })
}

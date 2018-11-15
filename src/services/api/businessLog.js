import request from './'

export const getAllFromBusiness = (businessId, search) => {
  const params = {
    businessId
  }
  if (search && search.length > 0) params.search = search
  return request({
    url: '/business-log',
    params
  })
}

export const update = businessLog => {
  return request({
    method: 'put',
    url: `/business-log/${businessLog.businessId}`,
    data: businessLog
  })
}

export const finalise = businessLog => {
  return request({
    method: 'post',
    url: `/business-log/${businessLog.businessId}/finalise`
  })
}

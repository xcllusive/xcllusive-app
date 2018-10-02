import request from '.'

export const create = businessSold =>
  request({
    method: 'post',
    url: `/business/${businessSold.businessId}/sold`,
    data: businessSold
  })

export const get = businessId => {
  return request({
    url: `/business/${businessId}/sold`
  })
}

export const update = businessSold => {
  return request({
    method: 'put',
    url: `/business/${businessSold.businessId}/sold/${businessSold.id}`,
    data: businessSold
  })
}

export const finalise = businessSold => {
  return request({
    method: 'post',
    url: `/business/${businessSold.businessId}/sold/${businessSold.id}/finalise`,
    data: businessSold
  })
}

export const getBuyersBusiness = businessId => {
  return request({
    url: `/business-sold/${businessId}`
  })
}

export const getAll = objectValues => {
  const params = {}

  if (objectValues.lastBusiness && objectValues.lastBusiness > 0) params.limit = objectValues.lastBusiness
  if (objectValues.businessType && objectValues.businessType.length > 0) params.type = objectValues.businessType
  if (objectValues.priceFrom && objectValues.priceFrom.length > 0) {
    params.priceRangeStart = objectValues.priceFrom
  }
  if (objectValues.priceTo && objectValues.priceTo.length > 0) {
    params.priceRangeEnd = objectValues.priceTo
  }
  if (objectValues.trend && objectValues.trend.length > 0) params.trend = objectValues.trend
  return request({
    url: '/comparable-data/',
    params
  })
}

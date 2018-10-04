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

export const finalise = (businessSoldId, businessId) => {
  return request({
    method: 'post',
    url: `/business/${businessId}/sold/${businessSoldId}/finalise`
  })
}

export const getBuyersBusiness = businessId => {
  return request({
    url: `/business-sold/${businessId}`
  })
}

export const getAll = objectValues => {
  const params = {}

  if (objectValues.lastBusiness) params.limit = objectValues.lastBusiness
  if (objectValues.businessType) params.type = objectValues.businessType
  if (objectValues.priceFrom && objectValues.priceFrom > 0) params.priceRangeStart = objectValues.priceFrom
  if (objectValues.priceTo && objectValues.priceTo > 0) params.priceRangeEnd = objectValues.priceTo
  if (objectValues.trend && objectValues.trend.length > 0) params.trend = JSON.stringify(objectValues.trend)

  return request({
    url: '/comparable-data/',
    params
  })
}

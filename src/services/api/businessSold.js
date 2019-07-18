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
  if (objectValues.industry) params.industry = objectValues.industry
  if (objectValues.pebitdaFrom) params.pebitdaFrom = objectValues.pebitdaFrom
  if (objectValues.pebitdaTo) params.pebitdaTo = objectValues.pebitdaTo
  if (objectValues.pebitdaLastYearOrAvg) params.pebitdaLastYearOrAvg = objectValues.pebitdaLastYearOrAvg
  if (objectValues.ebitdaFrom) params.ebitdaFrom = objectValues.ebitdaFrom
  if (objectValues.ebitdaTo) params.ebitdaTo = objectValues.ebitdaTo
  if (objectValues.ebitdaLastYearOrAvg) params.ebitdaLastYearOrAvg = objectValues.ebitdaLastYearOrAvg
  if (objectValues.priceFrom && objectValues.priceFrom > 0) params.priceRangeStart = objectValues.priceFrom
  if (objectValues.priceTo && objectValues.priceTo > 0) params.priceRangeEnd = objectValues.priceTo
  if (objectValues.trend && objectValues.trend.length > 0) params.trend = JSON.stringify(objectValues.trend)
  if (objectValues.stockValue && objectValues.stockValue > 0) params.stockValue = objectValues.stockValue

  console.log(params)

  return request({
    url: '/comparable-data/',
    params
  })
}

export const saveList = (selectedList, appraisalId) => {
  return request({
    method: 'post',
    url: '/comparable-data/save',
    data: {
      appraisalId,
      selectedList
    }
  })
}

export const getList = appraisalId => {
  return request({
    url: `comparable-data/selected-list/${appraisalId}`
  })
}

export const getBusinessTypeAny = () => {
  return request({
    url: 'comparable-data/business-type-any'
  })
}

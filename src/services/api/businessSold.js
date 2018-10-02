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

export const getAll = (search, quantity) => {
  const params = {}

  if (search && search.length > 0) params.search = search
  if (quantity && quantity.length > 0) {
    params.quantity = JSON.stringify(quantity)
  }
  if (quantity && quantity > 0) {
    params.quantity = quantity
  }

  return request({
    url: '/business-sold/',
    params
  })
}

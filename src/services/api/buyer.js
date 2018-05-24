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

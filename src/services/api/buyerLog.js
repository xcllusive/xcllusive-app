import request from './'

export const get = (buyerId, limit, page) =>
  request({
    method: 'get',
    url: `/buyer/log/${buyerId}`,
    params: { limit, page }
  })

export const create = newLog => {
  return request({
    method: 'post',
    url: '/buyer/log',
    data: newLog
  })
}

export const update = buyerLog =>
  request({
    method: 'put',
    url: `/buyer/log/${buyerLog.buyerLog_id}`,
    data: buyerLog
  })

export const getBusBuyLog = (buyerId, businessId, limit, page) => {
  if (!page) page = null
  return request({
    method: 'get',
    url: `/buyer/log/from-business/${buyerId}`,
    params: { businessId, limit, page }
  })
}

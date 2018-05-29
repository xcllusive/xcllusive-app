import request from './'

export const get = buyerId =>
  request({
    method: 'get',
    url: `/buyer/log/${buyerId}`
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

export const getBusBuyLog = (buyerId, businessId) =>
  request({
    method: 'get',
    url: `/buyer/log/from-business/${buyerId}`,
    params: { businessId }
  })

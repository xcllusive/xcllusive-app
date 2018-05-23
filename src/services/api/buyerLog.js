import request from './'

export const get = buyerId =>
  request({
    method: 'get',
    url: `/buyer/log/${buyerId}`
  })

export const update = buyerLog => console.log('testando...')
//   request({
//     method: 'put',
//     url: `/buyer/${buyerLog.id}`,
//     data: buyerLog
//   })

export const getBusBuyLog = (buyerId, businessId) =>
  request({
    method: 'get',
    url: `/buyer/log/from-business/${buyerId}`,
    params: { businessId }
  })

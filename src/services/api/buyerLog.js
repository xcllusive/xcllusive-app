import request from './'

export const get = buyerId =>
  request({
    method: 'get',
    url: `/buyer/log/${buyerId}`
  })

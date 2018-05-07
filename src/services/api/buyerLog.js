import request from './'

export const get = id =>
  request({
    method: 'get',
    url: '/buyer/log',
    data: id
  })

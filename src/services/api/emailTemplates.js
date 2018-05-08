import request from './'

export const getAll = () =>
  request({
    method: 'get',
    url: '/email-template'
  })

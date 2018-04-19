import request from './'

export const create = buyer =>
  request({
    method: 'post',
    url: '/buyer',
    data: buyer
  })

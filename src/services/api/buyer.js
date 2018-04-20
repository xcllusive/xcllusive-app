import request from './'

export const create = buyer =>
  request({
    method: 'post',
    url: '/buyer',
    data: buyer
  })

export const update = buyer => console.log('updated buyer')
/* request({
    method: 'put',
    url: '/buyer',
    data: buyer
  }) */

export const list = () =>
  request({
    method: 'get',
    url: '/buyer'
  })

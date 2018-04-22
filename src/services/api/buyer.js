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

export const list = search => {
  return request({
    method: 'get',
    url: '/buyer',
    params: {
      search: search && search.length > 0 ? search : ''
    }
  })
}

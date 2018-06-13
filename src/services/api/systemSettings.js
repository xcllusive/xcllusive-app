import request from './'

export const get = () => {
  return request({
    url: '/system-settings'
  })
}

export const update = systemSettings => {
  return request({
    method: 'put',
    url: '/system-settings',
    data: systemSettings
  })
}

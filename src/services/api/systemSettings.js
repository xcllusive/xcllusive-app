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

export const execute = () => {
  return request({
    url: '/system-settings/execute-javascript'
  })
}

export const exportBuyers = (dateFrom, dateTo) => {
  return request({
    method: 'post',
    url: '/system-settings/export-buyers',
    data: { dateFrom, dateTo },
    responseType: 'blob'
  })
}

import request from './'

export const getAll = business => {
  return request({
    url: '/business-log',
    params: {
      business
    }
  })
}

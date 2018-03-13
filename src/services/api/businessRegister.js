import request from './'

export const get = businessRegister => {
  return request({
    method: 'get',
    url: `/business-register/${businessRegister}`

  })
}

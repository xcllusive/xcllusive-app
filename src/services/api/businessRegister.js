import request from './'

export const get = businessRegister => {
  return request({
    method: 'get',
    url: `/business-register/${businessRegister}`

  })
}

export const create = businessRegister => {
  return request({
    method: 'post',
    url: '/business-register',
    data: businessRegister
  })
}

export const update = businessRegister => {
  return request({
    method: 'put',
    url: `/business-register/${businessRegister.id}`,
    data: businessRegister
  })
}

export const remove = businessRegister => {
  return request({
    method: 'delete',
    url: `/business-register/${businessRegister.id}`,
    data: businessRegister
  })
}

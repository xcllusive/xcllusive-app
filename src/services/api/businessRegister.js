import request from './'

export const get = (businessRegisterType, limit = null, page = null) => {
  return request({
    method: 'get',
    url: `/business-register/${businessRegisterType}`,
    params: { limit, page }
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

export const remove = businessRegisterType => {
  console.log(businessRegisterType)
  return request({
    method: 'delete',
    url: `/business-register/${businessRegisterType.id}`,
    data: businessRegisterType
  })
}

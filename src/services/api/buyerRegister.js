import request from './'

export const get = (buyerRegisterType, limit = null, page = null) => {
  return request({
    method: 'get',
    url: `/buyer-register/${buyerRegisterType}`,
    params: { limit, page }
  })
}

export const create = buyerRegister => {
  return request({
    method: 'post',
    url: '/buyer-register',
    data: buyerRegister
  })
}

export const update = buyerRegister => {
  return request({
    method: 'put',
    url: `/business-register/${buyerRegister.id}`,
    data: buyerRegister
  })
}

export const remove = buyerRegister => {
  return request({
    method: 'delete',
    url: `/buyer-register/${buyerRegister.id}`,
    data: buyerRegister
  })
}

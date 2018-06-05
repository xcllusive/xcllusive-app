import request from './'

export const list = (buyerRegister, limit = null, page = null) => {
  return request({
    method: 'get',
    url: '/buyer-register',
    params: { buyerRegister, limit, page }
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
    url: `/buyer-register/${buyerRegister.id}`,
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

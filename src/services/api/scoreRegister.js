import request from './'

export const get = (scoreRegisterType, limit = null, page = null) => {
  return request({
    method: 'get',
    url: `/score-register/${scoreRegisterType}`,
    params: { limit, page }
  })
}

export const create = scoreRegister => {
  return request({
    method: 'post',
    url: '/score-register',
    data: scoreRegister
  })
}

export const update = scoreRegister => {
  return request({
    method: 'put',
    url: `/score-register/${scoreRegister.id}`,
    data: scoreRegister
  })
}

export const remove = scoreRegister => {
  return request({
    method: 'delete',
    url: `/score-register/${scoreRegister.id}`,
    data: scoreRegister
  })
}

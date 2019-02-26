import request from '.'

export const list = (limit = null, page = null) => {
  return request({
    method: 'get',
    url: '/office-register',
    params: { limit, page }
  })
}

export const create = officeRegister => {
  return request({
    method: 'post',
    url: '/office-register',
    data: officeRegister
  })
}

export const update = officeRegister => {
  return request({
    method: 'put',
    url: `/office-register/${officeRegister.id}`,
    data: officeRegister
  })
}

export const remove = officeRegister => {
  return request({
    method: 'delete',
    url: `/office-register/${officeRegister.id}`,
    data: officeRegister
  })
}

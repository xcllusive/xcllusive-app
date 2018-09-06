import request from '.'

export const list = (appraisalRegister, limit = null, page = null) => {
  return request({
    method: 'get',
    url: '/appraisal-register',
    params: { appraisalRegister, limit, page }
  })
}

export const create = appraisalRegister => {
  return request({
    method: 'post',
    url: '/appraisal-register',
    data: appraisalRegister
  })
}

export const update = appraisalRegister => {
  return request({
    method: 'put',
    url: `/appraisal-register/${appraisalRegister.id}`,
    data: appraisalRegister
  })
}

export const remove = id => {
  return request({
    method: 'delete',
    url: `/appraisal-register/${id}`
  })
}

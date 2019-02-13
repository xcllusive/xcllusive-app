import request from '.'

export const create = businessId => {
  return request({
    method: 'post',
    url: '/appraisal',
    data: businessId
  })
}

export const get = id =>
  request({
    method: 'get',
    url: `/appraisal/${id}`
  })

export const update = appraisal => {
  return request({
    method: 'put',
    url: `/appraisal/${appraisal.id}`,
    data: appraisal
  })
}

export const getAll = businessId => {
  return request({
    method: 'get',
    url: '/appraisal',
    params: { businessId }
  })
}

export const downloadAppr = object => {
  return request({
    method: 'post',
    url: `/appraisal/${object.id}/generate`,
    responseType: 'blob',
    data: {
      draft: object.draft
    }
  })
}

export const send = object => {
  // const data = new FormData()
  // data.append('body', object.body)
  // data.append('appraisalId', object.appraisalId)
  // data.append('businessId', object.businessId)
  // data.append('mail', JSON.stringify(object.mail))
  // if (object.mail.attachment) {
  //   data.append('attachment', object.mail.attachment)
  // }
  // return request({
  //   method: 'post',
  //   url: '/appraisal/send-email',
  //   data,
  //   headers: { 'Content-Type': 'multipart/form-data' }
  // })
}

export const remove = appraisalId => {
  return request({
    method: 'delete',
    url: `/appraisal/${appraisalId}`
  })
}

export const duplicate = appraisalId => {
  // It needs to talk to zoran to define how we gonna make it
  // return request({
  //   method: 'post',
  //   url: `/appraisal/duplicate${appraisalId}`
  // })
}

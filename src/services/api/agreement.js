import request from './'

export const get = id =>
  request({
    method: 'get',
    url: `/agreement/${id}`
  })

export const update = agreement => {
  return request({
    method: 'put',
    url: `/agreement/${agreement.id}`,
    data: agreement
  })
}

export const downloadAgree = object => {
  return request({
    method: 'post',
    url: '/agreement/generate',
    data: {
      body: object.body,
      businessId: object.businessId,
      mail: object.mail
    },
    responseType: 'blob'
  })
}

export const send = object => {
  const data = new FormData()

  data.append('body', object.body)
  data.append('businessId', object.businessId)
  data.append('mail', JSON.stringify(object.mail))
  if (object.mail.attachment) {
    data.append('attachment', object.mail.attachment)
  }

  return request({
    method: 'post',
    url: '/agreement/send-email',
    data,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export const getEmailTemplate = (idAgreement, businessId) => {
  return request({
    method: 'get',
    url: `/agreement/template-compiled/${idAgreement}`,
    params: {
      businessId: businessId
    }
  })
}

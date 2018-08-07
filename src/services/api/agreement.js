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

export const generate = object => {
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
  data.append('mail', object.mail)
  if (object.attachment) {
    data.append('attachment', object.attachment)
  }

  return request({
    method: 'post',
    url: '/agreement/send-email',
    data,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

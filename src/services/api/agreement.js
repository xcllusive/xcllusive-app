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
    }
  })
}

export const send = object => {
  return request({
    method: 'post',
    url: '/agreement/send-email',
    data: {
      body: object.body,
      businessId: object.businessId,
      mail: object.mail
    }
  })
}

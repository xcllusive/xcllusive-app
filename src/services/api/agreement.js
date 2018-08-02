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

export const generate = agreementId => {
  return request({
    method: 'post',
    url: `/agreement/${agreementId}/generate-pdf`
  })
}

export const send = agreementId => {
  return request({
    method: 'post',
    url: `/agreement/${agreementId}/send-pdf`
  })
}

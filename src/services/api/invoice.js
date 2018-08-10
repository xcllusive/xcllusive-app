import request from './'

export const create = invoice => {
  return request({
    method: 'post',
    url: '/invoice',
    data: invoice
  })
}

export const get = id =>
  request({
    method: 'get',
    url: `/invoice/${id}`
  })

export const update = invoice => {
  return request({
    method: 'put',
    url: `/invoice/${invoice.id}`,
    data: invoice
  })
}

export const getAll = businessId => {
  return request({
    method: 'get',
    url: '/invoice',
    params: { businessId }
  })
}

export const getLast = businessId =>
  request({
    method: 'get',
    url: '/invoice/last/',
    params: { businessId }
  })

// export const downloadAgree = object => {
//   return request({
//     method: 'post',
//     url: '/agreement/generate',
//     data: {
//       body: object.body,
//       businessId: object.businessId,
//       mail: object.mail
//     },
//     responseType: 'blob'
//   })
// }

// export const send = object => {
//   const data = new FormData()

//   data.append('body', object.body)
//   data.append('businessId', object.businessId)
//   data.append('mail', JSON.stringify(object.mail))
//   if (object.mail.attachment) {
//     data.append('attachment', object.mail.attachment)
//   }

//   return request({
//     method: 'post',
//     url: '/agreement/send-email',
//     data,
//     headers: { 'Content-Type': 'multipart/form-data' }
//   })
// }

// export const getEmailTemplate = (idAgreement, businessId) => {
//   return request({
//     method: 'get',
//     url: `/agreement/template-compiled/${idAgreement}`,
//     params: {
//       businessId: businessId
//     }
//   })
// }

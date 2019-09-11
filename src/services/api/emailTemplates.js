import request from './'

export const getAll = (brokersEmail, smsTemplate) => {
  return request({
    method: 'get',
    url: '/email-template',
    params: {
      brokersEmail,
      smsTemplate
    }
  })
}

export const get = id =>
  request({
    method: 'get',
    url: `/email-template/${id}`
  })

export const update = template => {
  const data = new FormData()

  if (template.attachment) {
    data.append('attachment', template.attachment)
  }
  if (template.title) {
    data.append('title', template.title)
  }
  if (template.description) {
    data.append('description', template.description)
  }
  if (template.subject) {
    data.append('subject', template.subject)
  }
  if (template.body) {
    data.append('body', template.body)
  }
  if (template.enableAttachment) {
    data.append('enableAttachment', template.enableAttachment)
  }

  return request({
    method: 'put',
    url: `/email-template/${template.id}`,
    data,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export const getCompiled = (id, businessId, buyerId) => {
  return request({
    method: 'get',
    url: '/email-template/compiled',
    params: { id, businessId, buyerId }
  })
}

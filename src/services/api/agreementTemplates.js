import request from './'

export const create = template => {
  return request({
    method: 'post',
    url: '/agreement-template',
    data: template
  })
}

export const getAll = () => {
  return request({
    method: 'get',
    url: '/agreement-template'
  })
}

export const get = id =>
  request({
    method: 'get',
    url: `/agreement-template/${id}`
  })

export const update = template => {
  const data = new FormData()

  if (template.title) {
    data.append('title', template.title)
  }
  if (template.state) {
    data.append('state', template.state)
  }
  if (template.body) {
    data.append('header', template.header)
  }
  if (template.body) {
    data.append('body', template.body)
  }
  if (template.footer) {
    data.append('footer', template.footer)
  }

  return request({
    method: 'put',
    url: `/agreement-template/${template.id}`,
    data,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

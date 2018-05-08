import request from './'

export const getAll = () =>
  request({
    method: 'get',
    url: '/email-template'
  })

export const get = id =>
  request({
    method: 'get',
    url: `/email-template/${id}`
  })

export const update = templates =>
  request({
    method: 'put',
    url: `/email-template/${templates.id}`,
    data: templates
  })

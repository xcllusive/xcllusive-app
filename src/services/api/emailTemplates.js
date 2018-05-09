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

export const update = templates => {
  const data = new FormData()
  data.append(
    'attachment',
    templates.attachment !== '' ? templates.attachment : null
  )
  data.append('title', templates.title !== '' ? templates.title : null)
  data.append(
    'description',
    templates.description !== '' ? templates.description : null
  )
  data.append('subject', templates.subject !== '' ? templates.subject : null)
  data.append('body', templates.body !== '' ? templates.body : null)

  request({
    method: 'put',
    url: `/email-template/${templates.id}`,
    data: { templates },
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

import request from './'

export const list = (limit = null, page = null, listIssue = false, businessId = false) => {
  return request({
    method: 'get',
    url: '/issue',
    params: { limit, page, listIssue, businessId }
  })
}

export const create = issue => {
  return request({
    method: 'post',
    url: '/issue',
    data: issue
  })
}

export const update = issue => {
  return request({
    method: 'put',
    url: `/issue/${issue.id}`,
    data: issue
  })
}

export const remove = issueId => {
  return request({
    method: 'delete',
    url: `/issue/${issueId}`
  })
}

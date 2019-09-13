import request from './'

export const list = (limit = null, page = null, listIssue) => {
  return request({
    method: 'get',
    url: '/issue',
    params: { limit, page, listIssue }
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

export const remove = issueType => {
  return request({
    method: 'delete',
    url: `/issue/${issueType.id}`,
    data: issueType
  })
}

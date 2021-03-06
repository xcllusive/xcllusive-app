import request from './'

export const calculate = calculateScore => {
  return request({
    method: 'post',
    url: '/score',
    data: calculateScore
  })
}

export const list = (business, limit = null, page = null) => {
  return request({
    method: 'get',
    url: '/score',
    params: { business, limit, page }
  })
}

export const get = scoreId => {
  return request({
    method: 'get',
    url: `/score/${scoreId}`
  })
}

export const update = score => {
  return request({
    method: 'put',
    url: `/score/${score.scoreId}`,
    data: score
  })
}

export const enquiries = business => {
  return request({
    method: 'get',
    url: '/score/initial',
    params: { business }
  })
}

export const remove = scoreId => {
  return request({
    method: 'delete',
    url: `/score/${scoreId}`
  })
}

export const send = scoreId => {
  return request({
    method: 'get',
    url: `/score/${scoreId}/generate-pdf`
  })
}

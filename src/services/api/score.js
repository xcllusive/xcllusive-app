import request from './'

export const calculate = calculateScore => {
  return request({
    method: 'post',
    url: '/score',
    data: calculateScore
  })
}

export const list = business => {
  return request({
    method: 'get',
    url: '/score',
    params: { business }
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

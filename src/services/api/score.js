import request from './'

export const calculate = calculateScore => {
  return request({
    method: 'post',
    url: '/score',
    data: calculateScore
  })
}

export const list = businessId => {
  return request({
    method: 'get',
    url: '/score',
    params: { businessId }
  })
}

export const get = scoreId => {
  return request({
    method: 'get',
    url: `/score/${scoreId}`
  })
}

export const update = score => {
  console.log('test')
  // return request({
  //   method: 'put',
  //   url: `/score/${score.id}`,
  //   data: score
  // })
}

export const enquiries = business => {
  return request({
    method: 'get',
    url: '/score/initial',
    params: { business }
  })
}

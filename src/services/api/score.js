import request from './'

export const calculate = calculateScore => {
  return request({
    method: 'post',
    url: '/score',
    data: calculateScore
  })
}

export const list = businessId => {
  console.log(businessId)
  return request({
    method: 'get',
    url: '/score',
    params: { businessId }
  })
}

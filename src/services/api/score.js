import request from './'

export const calculate = calculateScore => {
  console.log(calculateScore)
  return request({
    method: 'post',
    url: '/score',
    data: calculateScore
  })
}

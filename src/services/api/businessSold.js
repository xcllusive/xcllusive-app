import request from '.'

export const get = businessId => {
  return request({
    url: `/business-sold/${businessId}`
  })
}

export const update = businessId => {
  console.log('test update ')
  // return request({
  // method: 'put'
  // url: `/business-sold/${business.id}`,
  //  data: business
  // })
}

export const finalise = businessId => {
  console.log('test finalise ')
  // return request({
  // method: 'put'
  // url: `/business-sold/${business.id}`,
  //  data: business
  // })
}

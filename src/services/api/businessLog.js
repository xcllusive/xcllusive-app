import request from './'

export const getAllFromBusiness = (businessId, search) => {
  const params = {
    businessId
  }
  if (search && search.length > 0) params.search = search
  return request({
    url: '/business-log',
    params
  })
}

export const update = businessLog => {
  console.log('test update ')
  // return request({
  // method: 'put'
  // url: `/business/${business.id}`,
  //  data: business
  // })
}

export const finalise = businessLog => {
  console.log('test finalise ')
  // return request({
  // method: 'put'
  // url: `/business/${business.id}`,
  //  data: business
  // })
}

import request from './'

export const getAllFromBusiness = businessId => {
  return request({
    url: '/business-log',
    params: {
      businessId
    }
  })
}

export const updateStatus = businessLog => {
  console.log('test update status')
  // return request({
  // method: 'put'
  // url: `/business/${business.id}`,
  //  data: business
  // })
}

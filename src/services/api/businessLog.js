import request from './'

export const getAllFromBusiness = businessId => {
  return request({
    url: '/business-log',
    params: {
      businessId
    }
  })
}

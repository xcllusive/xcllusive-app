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

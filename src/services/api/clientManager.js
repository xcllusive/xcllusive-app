import request from './'

export const enquiryBusiness = (buyerId, businessId) =>
  request({
    method: 'post',
    url: '/business/enquiry-business',
    data: {
      buyerId,
      businessId
    }
  })

export const sendCa = (buyerId, businessId) =>
  request({
    method: 'post',
    url: '/buyer/send-ca',
    data: {
      buyerId,
      businessId
    }
  })

export const sendIm = (buyerId, businessId) =>
  request({
    method: 'post',
    url: '/buyer/send-im',
    data: {
      buyerId,
      businessId
    }
  })

export const caReceived = (caFile, buyerId, businessId) => {
  const data = new FormData()
  data.append('caFile', caFile)
  data.append('buyerId', buyerId)
  data.append('businessId', businessId)

  request({
    method: 'post',
    url: '/buyer/received-ca',
    data,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export const emailBuyer = (buyerId, businessId) =>
  request({
    method: 'post',
    url: '/business/email-to-buyer',
    data: {
      buyerId,
      businessId
    }
  })

export const requestOwnersApproval = (buyerId, businessId) =>
  request({
    method: 'post',
    url: '/business/requestOwners-approval',
    data: {
      buyerId,
      businessId
    }
  })

import request from './'

export const enquiry = buyer => console.log('enquiry')

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

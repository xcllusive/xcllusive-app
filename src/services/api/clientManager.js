import request from './'

export const enquiry = buyer => console.log('enquiry')

export const send = (buyerId, businessId) =>
  request({
    method: 'post',
    url: '/buyer/send-ca',
    data: {
      buyerId,
      businessId
    }
  })

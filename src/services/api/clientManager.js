import request from './'

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

  return request({
    method: 'post',
    url: '/buyer/received-ca',
    data,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export const enquiryBusiness = (buyerId, businessId) =>
  request({
    method: 'post',
    url: '/business/enquiry-business',
    data: {
      buyerId,
      businessId
    }
  })

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

export const sendEnquiryToOwner = (buyerId, businessId) =>
  request({
    method: 'post',
    url: '/business/send-enquiry-owner',
    data: {
      buyerId,
      businessId
    }
  })

export const sendEmailCtcBusiness = (values, buyer, business) =>
  request({
    method: 'post',
    url: '/business/send-email-ctc-business',
    data: {
      values,
      buyer,
      business
    }
  })

export const sendSms = (buyer, business, phone, message) =>
  request({
    method: 'post',
    url: '/business/send-sms',
    data: {
      buyer,
      business,
      phone,
      message
    }
  })

export const getAllEnquiries = business => {
  const params = {}
  params.businessId = business.id
  return request({
    url: '/business/show-enquiries',
    params
  })
}

export const getBusinessesAdvancedSearch = (values, limit, page) => {
  const params = {}

  if (limit) params.limit = limit
  if (page) params.page = page

  if (values.businessName && values.businessName !== '') params.businessName = values.businessName
  if (values.firstNameV && values.firstNameV !== '') params.firstNameV = values.firstNameV
  if (values.lastNameV && values.lastNameV !== '') params.lastNameV = values.lastNameV
  if (values.vendorEmail && values.vendorEmail !== '') params.vendorEmail = values.vendorEmail
  if (values.vendorPhone1 && values.vendorPhone1 !== '') params.vendorPhone1 = values.vendorPhone1
  if (values.suburb && values.suburb !== '') params.suburb = values.suburb
  if (values.postCode && values.postCode !== '') params.postCode = values.postCode
  if (values.businessType && values.businessType !== '') params.businessType = values.businessType
  if (values.businessProduct && values.businessProduct !== '') params.businessProduct = values.businessName
  if (values.industry && values.industry !== '') params.industry = values.industry
  if (values.priceFrom && values.priceFrom !== '') params.priceFrom = values.priceFrom
  if (values.priceTo && values.priceTo !== '') params.priceTo = values.priceTo
  if (values.brokerAccountName && values.brokerAccountName !== '') params.brokerAccountName = values.brokerAccountName
  if (values.listingAgent_id && values.listingAgent_id !== '') params.xcllusiveAnalyst = values.listingAgent_id
  if (values.listingAgentCtc_id && values.listingAgentCtc_id !== '') {
    params.ctcAnalyst = values.listingAgentCtc_id
  }
  if (values.sourceId && values.sourceId !== '') params.sourceId = values.sourceId
  if (values.stageId && values.stageId !== '') params.stageId = values.stageId
  if (values.ctcStageId && values.ctcStageId !== '') params.ctcStageId = values.ctcStageId
  if (values.ctcSourceId && values.ctcSourceId !== '') params.ctcSourceId = values.ctcSourceId
  params.company = !!values.company

  return request({
    url: '/business/advanced-search',
    params
  })
}

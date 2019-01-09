import request from '.'

export const createWeeklyReport = create => {
  return request({
    method: 'post',
    url: '/buyer/broker/weekly-report',
    data: create
  })
}

export const getLastWeeklyReport = businessId => {
  return request({
    method: 'get',
    url: '/buyer/broker/weekly-report',
    params: { businessId }
  })
}

export const updateWeeklyReport = weeklyReport => {
  return request({
    method: 'put',
    url: '/buyer/broker/weekly-report',
    data: weeklyReport
  })
}

export const getBrokersPerRegion = region => {
  return request({
    method: 'get',
    url: '/buyer/broker/brokers-region',
    params: { region }
  })
}

export const getBusinessesPerBroker = brokerId => {
  return request({
    method: 'get',
    url: '/buyer/broker/businesses-broker',
    params: { brokerId }
  })
}

export const getBusinessHistoricalWeekly = businessId => {
  return request({
    method: 'get',
    url: '/buyer/broker/business-historical-weekly',
    params: { businessId }
  })
}

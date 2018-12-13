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

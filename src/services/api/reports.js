import request from '.'

export const getMarketingReport = (dateFrom, dateTo) => {
  return request({
    method: 'get',
    url: 'reports/marketing-report',
    params: { dateFrom, dateTo }
  })
}

export const getMarketingReportTest = (dateFrom, dateTo) => {
  return request({
    method: 'get',
    url: 'reports/marketing-report-test',
    params: { dateFrom, dateTo }
  })
}

export const getAllAnalysts = companyId => {
  return request({
    method: 'get',
    url: 'reports/all-analysts',
    params: { companyId }
  })
}

export const getAnalystReport = (analystId, dateFrom, dateTo, stageId) => {
  return request({
    method: 'get',
    url: 'reports/analyst-report',
    params: { analystId, dateFrom, dateTo, stageId }
  })
}

export const getQtdeBusinessesStagePerUser = (analystId, dateFrom, dateTo) => {
  return request({
    method: 'get',
    url: 'reports/qtde-businesses-stage-per-user',
    params: { analystId, dateFrom, dateTo }
  })
}

export const getBusinessesPerAnalystSource = (analystSourceId, dateFrom, dateTo, type, officeId) => {
  return request({
    method: 'get',
    url: 'reports/businesses-list-analyst-source',
    params: { analystSourceId, dateFrom, dateTo, type, officeId }
  })
}

export const getCtcBusinessesPerOffice = (dataRegion, dateFrom, dateTo) => {
  return request({
    method: 'get',
    url: 'reports/ctc-businesses-list-office',
    params: { dataRegion, dateFrom, dateTo }
  })
}

export const getEnquiryReport = (dateFrom, dateTo, listOfIdOfAnalysts) => {
  return request({
    method: 'get',
    url: 'reports/enquiry-report',
    params: { dateFrom, dateTo, listOfIdOfAnalysts }
  })
}

export const activityRequestControlPerUser = (officeId, userIdSelected, dateFrom, dateTo) => {
  return request({
    method: 'get',
    url: 'reports/activity-request-per-user-report',
    params: { userIdSelected, dateFrom, dateTo }
  })
}

export const getUsersPerRegion = region => {
  return request({
    method: 'get',
    url: '/reports/users-per-region',
    params: { region }
  })
}

export const getDailyTimeActivityReport = (id, date) => {
  return request({
    method: 'get',
    url: '/reports/daily-time-activity-report',
    params: { id, date }
  })
}

export const getSoldBySource = (dateFrom, dateTo) => {
  return request({
    method: 'get',
    url: 'reports/sold-by-source',
    params: { dateFrom, dateTo }
  })
}

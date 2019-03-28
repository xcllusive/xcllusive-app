import request from '.'

export const getMarketingReport = (dateFrom, dateTo) => {
  return request({
    method: 'get',
    url: 'reports/marketing-report',
    params: { dateFrom, dateTo }
  })
}

export const getAllAnalysts = () => {
  return request({
    method: 'get',
    url: 'reports/all-analysts'
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

export const getBusinessesPerAnalyst = (analystId, dateFrom, dateTo) => {
  return request({
    method: 'get',
    url: 'reports/businesses-list-analyst',
    params: { analystId, dateFrom, dateTo }
  })
}

export const getEnquiryReport = (dateFrom, dateTo) => {
  return request({
    method: 'get',
    url: 'reports/enquiry-report',
    params: { dateFrom, dateTo }
  })
}

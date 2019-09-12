import request from '../.'

export const getMarketingReport = (dateFrom, dateTo) => {
  return request({
    method: 'get',
    url: 'ctc-reports/marketing-report',
    params: { dateFrom, dateTo }
  })
}

export const getBusinessesPerAnalyst = (analystId, dateFrom, dateTo) => {
  return request({
    method: 'get',
    url: 'ctc-reports/businesses-list-analyst',
    params: { analystId, dateFrom, dateTo }
  })
}

export const getAllAnalysts = () => {
  return request({
    method: 'get',
    url: 'ctc-reports/all-analysts'
  })
}

export const getQtdeBusinessesStagePerUser = (analystId, dateFrom, dateTo) => {
  return request({
    method: 'get',
    url: 'ctc-reports/qtde-businesses-stage-per-user',
    params: { analystId, dateFrom, dateTo }
  })
}

export const getAnalystReport = (analystId, dateFrom, dateTo, stageId) => {
  return request({
    method: 'get',
    url: 'ctc-reports/analyst-report',
    params: { analystId, dateFrom, dateTo, stageId }
  })
}

export const getEnquiryReport = (dateFrom, dateTo, listOfIdOfAnalysts) => {
  return request({
    method: 'get',
    url: 'ctc-reports/enquiry-report',
    params: { dateFrom, dateTo, listOfIdOfAnalysts }
  })
}

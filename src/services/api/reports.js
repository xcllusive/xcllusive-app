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

export const getAnalystReport = (analystId, dateFrom, dateTo) => {
  return request({
    method: 'get',
    url: 'reports/analyst-report',
    params: { analystId, dateFrom, dateTo }
  })
}

import request from '.'

export const getMarketingReport = (dateFrom, dateTo) => {
  return request({
    method: 'get',
    url: 'reports/marketing-report',
    params: { dateFrom, dateTo }
  })
}

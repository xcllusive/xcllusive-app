import request from '.'

export const getMarketingReport = () => {
  return request({
    method: 'get',
    url: 'reports/marketing-report'
    // params: { businessId }
  })
}

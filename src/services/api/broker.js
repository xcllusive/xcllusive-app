import request from '.'

export const createWeeklyReport = create => {
  return request({
    method: 'post',
    url: '/buyer/broker/weekly-report',
    data: create
  })
}

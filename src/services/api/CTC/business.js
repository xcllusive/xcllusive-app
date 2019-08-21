import request from '.././'

export const getCtcAllPerUser = (search, stageId, filterLog, orderByDateTimeCreated) => {
  const params = {}

  if (search && search.length > 0) params.search = search
  if (stageId && stageId.length > 0) {
    params.stageId = JSON.stringify(stageId)
  }
  if (stageId && stageId > 0) {
    params.stageId = stageId
  }
  if (filterLog) {
    params.filterLog = filterLog
  }
  if (orderByDateTimeCreated) {
    params.orderByDateTimeCreated = orderByDateTimeCreated
  }

  return request({
    url: '/business/ctc-businesses-user',
    params
  })
}

export const getCtcQtdeBusinessEachStagePerUser = () => {
  return request({
    url: '/business/ctc-qtde-business-stage-user'
  })
}

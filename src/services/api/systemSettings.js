import request from './'

export const get = id => {
  console.log('get SystemSettings')
  return request({
  //   url: `/systemSettings/${id}`
  })
}

export const update = systemSettings => {
  console.log('update SystemSettings')
  return request({
    //  method: 'put',
    //  url: `/systemSettings/${systemSettings.id}`
    // data: buyer
  })
}

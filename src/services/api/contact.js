import request from '.'

export const sendSmsUsers = (users, message) =>
  request({
    method: 'post',
    url: '/contact/send-sms-users',
    data: {
      users,
      message
    }
  })

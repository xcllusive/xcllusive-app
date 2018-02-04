import request from './';

export const login = (email, password) => {
  return request({
    method: 'post',
    url: '/auth/login',
    data: {
      email,
      password
    }
  });
};

export const loginWithToken = () => {
  return request({
    method: 'get',
    url: '/auth/loginWithToken'
  });
};

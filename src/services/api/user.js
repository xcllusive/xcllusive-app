import request from './';

export const get = id => {
  return request({
    url: `/user/${id}`
  });
};

export const getAll = (options = false) => {
  return request({
    url: '/users',
    params: options
  });
};

export const getSearching = search => {
  return request({
    url: '/users',
    params: search
  });
};

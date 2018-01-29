import request from './';

const get = id => {
  return request({
    url: `/user/${id}`
  });
};

const getAll = search => {
  return request({
    url: '/users'
  });
};

const getSearching = search => {
  return request({
    url: `/users?search=${search}`
  });
};

export { get, getAll, getSearching };

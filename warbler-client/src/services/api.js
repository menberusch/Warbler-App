import axios from 'axios';

export function setTokenHeader(token) {
  if(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export function apiCall(method, path, data, config) {
  return new Promise((resolve, rej) => {
    return axios[method.toLowerCase()](path, data, config)
    .then(res => {
      return resolve(res.data);
    })
    .catch(err => {
      console.log(err.response.data);
      return rej(err.response.data.error);
    })
  })
};
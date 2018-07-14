import axios from 'axios';

export function apiCall(method, path, data) {
  return new Promise((resolve, rej) => {
    return axios[method](path, data)
    .then(res => {
      return resolve(res.data);
    })
    .catch(err => {
      return rej(err.response.data.error);
    })
  })
};
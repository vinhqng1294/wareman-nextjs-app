import axios from 'axios';
import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_DOMAIN;

export const updateWarehouseIdToHeader = function ({ id }) {
  if (stringIsNotEmpty(id)) {
    axios.defaults.headers['X-Warehouse-Id'] = `${id}`;
  }
};

export const getAxios = function ({ accessToken = '' }) {
  // axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_DOMAIN;
  // axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
  if (stringIsNotEmpty(accessToken)) {
    axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  // axios.interceptors.request.use(
  //   function (config) {
  //     if (stringIsNotEmpty(accessToken)) {
  //       config.headers['Authorization'] = `Bearer ${accessToken}`;
  //     }
  //   },
  //   function (err) {
  //     return Promise.reject(err);
  //   }
  // );
  return axios;
};

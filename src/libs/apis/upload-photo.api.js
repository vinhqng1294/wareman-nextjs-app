import { stringIsNotEmpty } from '@/utils/commons/validateNotEmpty.utils';
import axios from 'axios';

export const uploadPhoto = function ({ contentType, binaryData, url }) {
  return axios.put(`${url}`, binaryData, {
    headers: {
      Authorization: '',
      'Content-Type': contentType,
    },
  });
};

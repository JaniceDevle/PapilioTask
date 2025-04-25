import { request } from '@umijs/max';

export const fetchLabelList = () => {
  return request('/api/labels/list', {
    method: 'GET',
  });
};

export const fetchEventList = () => {
  return request('/api/events/list', {
    method: 'GET',
});
};

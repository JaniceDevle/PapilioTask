import { request } from '@umijs/max';

export const fetchLabelList = () => {
  return request('/api/labels/list', {
    method: 'GET',
  });
};

export const fetchIssueList = () => {
  return request('/api/issues/list', {
    method: 'GET',
  });
};

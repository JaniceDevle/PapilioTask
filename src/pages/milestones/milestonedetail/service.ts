import { request } from '@umijs/max';

export const fetchMilestoneDetail = (title: string) => {
  return request('/api/milestone/detail', {
    method: 'GET',
    params: { title },
  });
};

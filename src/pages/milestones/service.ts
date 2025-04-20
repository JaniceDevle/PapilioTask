import { request } from '@umijs/max';

export const fetchMilestoneList = () => {
  return request('/api/milestones/list', {
    method: 'GET',
  });
};

export const fetchMilestoneEvents = () => {
  return request('/api/milestones/events', {
    method: 'GET',
  });
};

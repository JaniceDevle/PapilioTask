import { request } from '@umijs/max';

export const fetchPriorityDistribution = () =>
  request('/api/analytics/priority-distribution');

export const fetchTaskAssignment = () =>
  request('/api/analytics/task-assignment');

export const fetchTimeline = () =>
  request('/api/analytics/timeline');

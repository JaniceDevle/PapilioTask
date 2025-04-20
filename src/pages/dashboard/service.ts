import { request } from '@umijs/max';

export const fetchOverview = () =>
  request('/api/dashboard/overview');

export const fetchPriorityDistribution = () =>
  request('/api/dashboard/priority-distribution');

export const fetchTaskProgress = () =>
  request('/api/dashboard/task-progress');

export const fetchLineChart = () =>
  request('/api/dashboard/line-chart');

export const fetchAiSuggestions = () =>
  request('/api/dashboard/ai-suggestions');

export const fetchQuickActions = () =>
  request('/api/dashboard/quick-actions');

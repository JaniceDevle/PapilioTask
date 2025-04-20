import { request } from '@umijs/max';

export const fetchEventList = () => request('/api/events/list');
export const fetchTodaySchedule = () => request('/api/events/today');
export const fetchEventDetail = (id: string | number) =>
  request('/api/events/detail', { params: { id } });

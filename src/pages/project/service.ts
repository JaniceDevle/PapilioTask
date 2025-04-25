import { request } from '@umijs/max';

export const fetchBoardData = () => {
  return request('/api/board', {
    method: 'GET',
  });
};

export const addEventToBoard = (eventId: number, columnType: string) => {
  return request('/api/board/addEvent', {
    method: 'POST',
    data: {
      eventId,
      columnType,
    },
  });
};

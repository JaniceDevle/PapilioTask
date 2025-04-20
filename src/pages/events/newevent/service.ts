import { request } from '@umijs/max';
import type { BasicListItemDataType } from './data.d';

type ParamsType = {
  count?: number;
} & Partial<BasicListItemDataType>;

export async function queryFakeList(
  params: ParamsType,
): Promise<{ data: { list: BasicListItemDataType[] } }> {
  return request('/api/get_list', {
    params,
  });
}

export async function removeFakeList(
  params: ParamsType,
): Promise<{ data: { list: BasicListItemDataType[] } }> {
  return request('/api/post_fake_list', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addFakeList(
  params: ParamsType,
): Promise<{ data: { list: BasicListItemDataType[] } }> {
  return request('/api/post_fake_list', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateFakeList(
  params: ParamsType,
): Promise<{ data: { list: BasicListItemDataType[] } }> {
  return request('/api/post_fake_list', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}

export async function addRule(data: any) {
  console.log('Add mock:', data);
  return Promise.resolve();
}

export async function removeRule(data: any) {
  console.log('Remove mock:', data);
  return Promise.resolve();
}

export async function rule() {
  // mock fetch
  return Promise.resolve({
    data: Array.from({ length: 10 }).map((_, index) => ({
      key: index,
      name: 'Event Name',
      assignees: 'Assignee',
      timeframe: '2025/04/01 - 2025/04/10',
      labels: index % 2 === 0 ? 'Meeting' : 'Discussion',
      status: index % 3 === 0 ? 'Completed' : index % 3 === 1 ? 'Pending' : 'Overdue',
    })),
    success: true,
  });
}
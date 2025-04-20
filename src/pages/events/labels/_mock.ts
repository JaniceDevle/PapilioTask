import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';

const prisma = new PrismaClient();

// ✅ 从 Prisma 查询事件列表
const getEventList = async (_: Request, res: Response) => {
  const events = await prisma.event.findMany({
    include: { assignee: true },
    orderBy: { startDate: 'asc' },
  });

  const result = events.map((e) => ({
    key: e.id,
    eventNumber: e.eventNumber,
    eventName: e.name,
    assignees: e.assignee?.username || '',
    timeframe: `${dayjs(e.startDate).format('YYYY/MM/DD')} - ${dayjs(e.endDate).format('YYYY/MM/DD')}`,
    labels: e.labels?.split(',') || [],
    status: e.status ? [e.status] : ['Pending'],
  }));

  res.json(result);
};

// ✅ 查询事件详情
const getEventDetail = async (req: Request, res: Response) => {
  const id = parseInt(req.query.id as string, 10);
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

  const e = await prisma.event.findUnique({
    where: { id },
    include: { assignee: true },
  });

  if (!e) return res.status(404).json({ error: 'Event not found' });

  res.json({
    key: e.id,
    eventNumber: e.eventNumber,
    eventName: e.name,
    description: 'This is a detailed view of the event.',
    timeframe: `${dayjs(e.startDate).format('YYYY/MM/DD')} - ${dayjs(e.endDate).format('YYYY/MM/DD')}`,
    labels: e.labels?.split(',') || [],
    status: e.status ? [e.status] : ['Pending'],
    participants: [e.assignee?.username || 'Unassigned'],
  });
};

export default {
  // ✅ 原始接口
  'GET /api/labels/list': (_: Request, res: Response) => {
    res.json([
      { name: 'api-approved', description: 'API was approved in API review', color: 'green', count: 124 },
      { name: 'api-needs-work', description: 'API needs work before approval', color: 'gold', count: 177 },
      { name: 'api-ready-for-review', description: 'Ready for review', color: 'purple', count: 16 },
      { name: 'api-suggestion', description: 'Early discussion', color: 'geekblue', count: 1104 },
      { name: 'apx', description: 'Intel APX related', color: 'volcano', count: 14 },
    ]);
  },

  'GET /api/issues/list': (_: Request, res: Response) => {
    res.json([
      {
        id: '114427',
        title: '[browser] Inline boot config',
        labels: ['arch-wasm', 'area-Build-mono', 'os-browser'],
        author: 'maraf',
        time: '2 hours ago',
        comments: 1,
        milestone: '10.0.0',
      },
      {
        id: '114665',
        title: 'ML-DSA: Assert signing empty span',
        labels: ['area-System.Security'],
        author: 'vcsjones',
        time: '13 hours ago',
        comments: 1,
        milestone: '10.0.0',
      },
    ]);
  },

  // ✅ 事件相关接口（Prisma 驱动）
  'GET /api/events/list': getEventList,
  'GET /api/events/detail': getEventDetail,
};

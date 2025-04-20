import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';

const prisma = new PrismaClient();

// 获取事件列表（Event Schedule）
const getEventList = async (_: Request, res: Response) => {
  const events = await prisma.event.findMany({
    include: {
      assignee: true,
    },
    orderBy: {
      startDate: 'asc',
    },
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

// 获取今日的日程安排
const getTodaySchedule = async (_: Request, res: Response) => {
  const todayStart = dayjs().startOf('day').toDate();
  const todayEnd = dayjs().endOf('day').toDate();

  const events = await prisma.event.findMany({
    where: {
      startDate: { lte: todayEnd },
      endDate: { gte: todayStart },
    },
    include: {
      assignee: true,
    },
  });

  const result = events.map((e) => ({
    key: e.id.toString(),
    title: `${e.name} – hosted by ${e.assignee?.username || 'Unassigned'}`,
    time: `${dayjs(e.startDate).format('YYYY/MM/DD HH:mm')} – ${dayjs(e.endDate).format('HH:mm')}`,
    urgent: e.status === 'Overdue',
    url: 'https://yourlink.example.com',
  }));

  res.json(result);
};

// 获取事件详情
const getEventDetail = async (req: Request, res: Response) => {
  const id = parseInt(req.query.id as string, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  const e = await prisma.event.findUnique({
    where: { id },
    include: { assignee: true },
  });

  if (!e) {
    return res.status(404).json({ error: 'Event not found' });
  }

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
  'GET /api/events/list': getEventList,
  'GET /api/events/today': getTodaySchedule,
  'GET /api/events/detail': getEventDetail,
};

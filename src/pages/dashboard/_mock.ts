import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

// 总览统计
const getDashboardOverview = async (_: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany();

    const overview = {
      pending: events.filter(e => e.status === 'Pending').length,
      inProgress: events.filter(e => e.status === 'In Progress').length,
      completed: events.filter(e => e.status === 'Completed').length,
      overdue: events.filter(e => e.status === 'Overdue').length,
    };

    res.json(overview);
  } catch (error) {
    console.error('Error getting dashboard overview:', error);
    res.status(500).json({ error: 'Failed to get dashboard overview' });
  }
};

// 优先级分布（与任务对应）
const getPriorityDistribution = (_: Request, res: Response) => {
  res.json([
    { type: 'High Priority', value: 1 },
    { type: 'Medium Priority', value: 1 },
    { type: 'Low Priority', value: 1 },
    { type: 'Completed', value: 2 },
  ]);
};

// 状态统计（任务状态分布）
const getTaskProgress = (_: Request, res: Response) => {
  res.json([
    { type: 'Pending', count: 38 },
    { type: 'Ongoing', count: 52 },
    { type: 'Finished', count: 61 },
    { type: 'Overdue', count: 20 },
  ]);
};

// 折线图数据：任务增长趋势或完成趋势
const getLineChartData = (_: Request, res: Response) => {
  res.json([
    { date: 'Apr-01', value: 1 },
    { date: 'Apr-03', value: 2 },
    { date: 'Apr-06', value: 3 },
    { date: 'Apr-10', value: 4 },
    { date: 'Apr-15', value: 6 },
  ]);
};

// AI 建议模拟
const getAiSuggestions = (_: Request, res: Response) => {
  res.json([
    { type: 'Expiring Soon', message: 'Task "Design landing page" is due in 2 days.' },
    { type: 'Prioritize', message: 'Task "Presentation" is still pending and marked high priority.' },
    { type: 'Optimization', message: 'Split event "Product Launch" into smaller tasks.' },
  ]);
};

// 快速动作选项（可选静态）
const getQuickActions = (_: Request, res: Response) => {
  res.json([
    'Add New Task',
    'Assigning Tasks',
    'Exporting Reports',
    'Filter tasks (by priority / status / time)',
  ]);
};

export default {
  'GET /api/dashboard/overview': getDashboardOverview,
  'GET /api/dashboard/priority-distribution': getPriorityDistribution,
  'GET /api/dashboard/task-progress': getTaskProgress,
  'GET /api/dashboard/line-chart': getLineChartData,
  'GET /api/dashboard/ai-suggestions': getAiSuggestions,
  'GET /api/dashboard/quick-actions': getQuickActions,
};

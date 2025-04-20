import { Request, Response } from 'express';

export default {
  'GET /api/milestones/list': (_: Request, res: Response) => {
    res.json([
      {
        title: '10.0.0',
        status: 'open',
        percent: 48,
        open: 1451,
        closed: 1387,
        updatedMinutesAgo: 5,
        description: '.NET 10 release series',
      },
      {
        title: 'Future',
        status: 'open',
        percent: 50,
        open: 6570,
        closed: 6788,
        updatedHoursAgo: 2,
        description: 'Long-term goals and pending research',
      },
    ]);
  },

  'GET /api/milestones/events': (_: Request, res: Response) => {
    res.json([
      { id: 1, name: 'Sample Event', status: 'Ongoing' },
      { id: 2, name: 'AI Migration', status: 'Pending' },
      { id: 3, name: 'Legacy Phase-out', status: 'Finished' },
    ]);
  },
};

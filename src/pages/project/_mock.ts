import { PrismaClient } from '@prisma/client';
import { columnTypes } from './types';
const prisma = new PrismaClient();

export default {
  'GET /api/board': async (_: any, res: any) => {
    try {
      const events = await prisma.event.findMany({
        where: { projectId: 1 },
        include: { assignee: true }
      });

      const boardData = columnTypes.map(columnType => ({
        columnTitle: columnType,
        tasks: events
          .filter(event => event.columnType === columnType)
          .map(event => ({
            id: event.id,
            number: event.eventNumber,
            name: event.name,
            tags: event.labels ? event.labels.split(',') : []
          })),
        count: events.filter(event => event.columnType === columnType).length
      }));

      res.json(boardData);
    } catch (error) {
      console.error('Error fetching board data:', error);
      res.status(500).json({ error: 'Failed to load board data' });
    }
  },

  'POST /api/board/addEvent': async (req: any, res: any) => {
    const { eventId, columnType } = req.body;

    try {
      // 首先确保项目存在
      let project = await prisma.project.findFirst({
        where: { id: 1 }
      });

      // 如果项目不存在，创建一个默认项目
      if (!project) {
        project = await prisma.project.create({
          data: {
            id: 1,
            name: 'Default Project'
          }
        });
      }

      // 检查事件是否存在
      const event = await prisma.event.findUnique({
        where: { id: eventId }
      });

      if (!event) {
        return res.status(404).json({
          error: 'Event not found',
          details: `Event with id ${eventId} does not exist`
        });
      }

      // 验证 columnType
      if (!columnTypes.includes(columnType)) {
        return res.status(400).json({
          error: 'Invalid column type',
          details: `Column type ${columnType} is not valid`
        });
      }

      // 更新事件
      const updatedEvent = await prisma.event.update({
        where: { id: eventId },
        data: {
          projectId: project.id,
          columnType
        }
      });

      res.json({
        success: true,
        data: updatedEvent
      });
    } catch (error) {
      console.error('Failed to add event to board:', error);
      res.status(500).json({
        error: 'Failed to add event to board',
        details: error.message
      });
    }
  },

  'POST /api/project/create': async (req: any, res: any) => {
    try {
      const project = await prisma.project.create({
        data: {
          name: req.body.name,
          description: req.body.description
        }
      });
      res.json(project);
    } catch (error) {
      console.error('Failed to create project:', error);
      res.status(500).json({
        error: 'Failed to create project',
        details: error.message
      });
    }
  }
};

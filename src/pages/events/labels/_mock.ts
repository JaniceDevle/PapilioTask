import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Request, Response } from 'express';

dayjs.extend(relativeTime);

const prisma = new PrismaClient();

// 获取标签统计信息
const getLabelStats = async (_: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany({
      select: {
        status: true,
        labels: true,
      }
    });

    const labelStats = new Map<string, { count: number; color: string }>();

    // 确保每个事件都至少有一个标签（状态）
    events.forEach(event => {
      // 添加状态作为标签
      if (event.status) {
        const statusLabel = labelStats.get(event.status) || {
          count: 0,
          color: getColorForStatus(event.status)
        };
        statusLabel.count += 1;
        labelStats.set(event.status, statusLabel);
      }

      // 处理自定义标签
      const customLabels = event.labels?.split(',').filter(Boolean) || [];
      customLabels.forEach(label => {
        const existingLabel = labelStats.get(label) || {
          count: 0,
          color: getColorForLabel(label)
        };
        existingLabel.count += 1;
        labelStats.set(label, existingLabel);
      });
    });

    const result = Array.from(labelStats.entries()).map(([name, stats]) => ({
      name,
      description: getLabelDescription(name),
      color: stats.color,
      count: stats.count
    }));

    console.log('标签统计结果:', result); // 调试日志
    res.json(result);
  } catch (error) {
    console.error('获取标签统计失败:', error);
    res.status(500).json({
      success: false,
      error: '获取标签统计失败',
      details: error instanceof Error ? error.message : '未知错误'
    });
  }
};

// 辅助函数
function getColorForLabel(label: string): string {
  const colorMap: Record<string, string> = {
    'Meeting': 'blue',
    'Discussion': 'cyan',
    'Doing': 'processing',
    'Done': 'success',
    'Pending': 'gold',
    'Ongoing': 'blue',
    'Finished': 'green'
  };
  return colorMap[label] || 'blue';
}

function getColorForStatus(status: string): string {
  const statusColors: Record<string, string> = {
    'Pending': 'gold',
    'Ongoing': 'blue',
    'Finished': 'green'
  };
  return statusColors[status] || 'default';
}

function getLabelDescription(label: string): string {
  const descriptions: Record<string, string> = {
    'Pending': '待处理的事件',
    'Ongoing': '进行中的事件',
    'Finished': '已完成的事件',
    'api-approved': 'API已通过审核',
    'api-needs-work': 'API需要修改',
    'api-ready-for-review': '准备审核',
    'api-suggestion': '早期讨论',
    'apx': 'Intel APX相关'
  };
  return descriptions[label] || '事件标签';
}

export default {
  'GET /api/labels/list': getLabelStats,
};

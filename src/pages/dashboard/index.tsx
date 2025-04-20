import { Bar, Line, Pie } from '@ant-design/charts';
import { SoundOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { Button, Calendar, Flex, Typography } from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  fetchLineChart,
  fetchOverview,
  fetchPriorityDistribution,
  fetchTaskProgress,
} from './service';

dayjs.extend(relativeTime);

const { Text, Title } = Typography;

const Chart: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchLineChart().then(setData);
  }, []);

  const config = {
    data,
    autoFit: true,
    height: 300,
    xField: 'date',
    yField: 'value',
    point: {
      size: 5,
      shape: 'diamond',
    },
  };

  return (
    <Flex vertical gap={8} style={{ width: '100%' }}>
      <Title level={5}>Event Insights</Title>
      <ProCard
        extra={
          <Button type="link" onClick={() => navigate('/analytics')}>
            More
          </Button>
        }
      >
        <Line {...config} />
      </ProCard>
    </Flex>
  );
};

const TaskProgressChart: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchTaskProgress().then(setData);
  }, []);

  const config = {
    data,
    xField: 'type',
    yField: 'count',
    height: 300,
    autoFit: true,
    isStack: false,
    barWidthRatio: 0.7,
    padding: [50, 40, 50, 40], // 增加上下内边距，确保垂直居中
    label: {
      position: 'right',
      style: {
        fill: '#333',
        fontSize: 14,
        fontWeight: 500,
      },
    },
    yAxis: {
      label: {
        style: {
          fontSize: 14,
          fontWeight: 500,
        },
      },
    },
    xAxis: {
      min: 0,
      label: {
        style: {
          fontSize: 12,
          fill: '#999',
        },
      },
    },
    barStyle: {
      radius: [6, 6, 6, 6],
    },
    meta: {
      type: {
        alias: 'Task Status',
      },
      count: {
        alias: 'Count',
      },
    },
    // 可选颜色
    color: ({ type }: { type: 'Pending' | 'Ongoing' | 'Finished' | 'Overdue' }) => {
      const colorMap: Record<string, string> = {
        Pending: '#F59E0B',
        Ongoing: '#3B82F6',
        Finished: '#10B981',
        Overdue: '#EF4444',
      };
      return colorMap[type] || '#8884d8';
    },
  };

  return (
    <Flex vertical gap={8}>
      <Title level={5}>Task Progress</Title>
      <ProCard
        extra={
          <Button type="link" onClick={() => navigate('/analytics')}>
            More
          </Button>
        }
      >
        <Bar {...config} />
      </ProCard>
    </Flex>
  );
};

export const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Flex vertical gap={8}>
      <Title level={5}>Quick Actions</Title>
      <ProCard
        extra={
          <Button type="link" onClick={() => navigate('/events')}>
            More
          </Button>
        }
      >
        <Flex vertical gap={10}>
          {[
            'Add New Task',
            'Assigning tasks',
            'Exporting Reports',
            'Filter tasks (by priority / status / time)',
          ].map((text) => (
            <ProCard bordered key={text}>
              <Flex gap="middle" justify="space-between" align="center">
                <Text style={{ fontSize: '20px' }}>{text}</Text>
              </Flex>
            </ProCard>
          ))}
        </Flex>
      </ProCard>
    </Flex>
  );
};

const AITaskSuggestions: React.FC = () => (
  <Flex vertical gap={8}>
    <Title level={5}>AI Task Suggestions</Title>
    <ProCard>
      <Flex vertical gap={8}>
        {[
          'Tasks that are about to expire',
          'Tasks that may need to be prioritised',
          'Task optimisation recommendations',
        ].map((text) => (
          <ProCard bordered key={text}>
            <Flex gap="middle" justify="space-between" align="center">
              <Text style={{ fontSize: '18px' }}>{text}</Text>
            </Flex>
          </ProCard>
        ))}
      </Flex>
    </ProCard>
  </Flex>
);

const PriorityPieChart: React.FC = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchPriorityDistribution().then(setData);
  }, []);

  const config = {
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }: any) => `${(percent * 100).toFixed(0)}%`,
    },
  };

  return (
    <Flex vertical gap={8}>
      <Title level={5}>Priority</Title>
      <ProCard>
        <Pie {...config} />
      </ProCard>
    </Flex>
  );
};

const CalendarCard: React.FC = () => (
  <Flex vertical gap={8}>
    <Title level={5}>Calendar</Title>
    <ProCard bordered style={{ height: '100%' }}>
      <Calendar fullscreen={false} />
    </ProCard>
  </Flex>
);

const OverviewCards: React.FC = () => {
  const [overview, setOverview] = useState({ pending: 0, inProgress: 0, completed: 0, overdue: 0 });

  useEffect(() => {
    fetchOverview().then(setOverview);
  }, []);

  const items = [
    { label: 'Pending Tasks', value: overview.pending },
    { label: 'In progress', value: overview.inProgress },
    { label: 'Completed Tasks', value: overview.completed },
    { label: 'Overdue Tasks', value: overview.overdue },
  ];

  return (
    <ProCard style={{ marginBlockStart: 8 }} gutter={[16, 16]} wrap>
      {items.map(({ label, value }) => (
        <ProCard bordered key={label}>
          <Flex gap="middle" justify="space-between" align="center">
            <Flex gap="middle">
              <SoundOutlined style={{ fontSize: '18px' }} />
              <Text style={{ fontSize: '16px' }}>{label}</Text>
            </Flex>
            <Text style={{ fontSize: '18px' }}>{value}</Text>
          </Flex>
        </ProCard>
      ))}
    </ProCard>
  );
};

export default () => {
  return (
    <Flex gap="middle" vertical>
      <Flex gap={24} wrap="wrap" style={{ width: '100%' }}>
        <div style={{ flex: 1, minWidth: 300 }}>
          <Title level={5}>Overview</Title>
          <OverviewCards />
        </div>

        <div style={{ flex: 1, minWidth: 300 }}>
          <Title level={5}>Notifications</Title>
          <ProCard style={{ marginBlockStart: 8 }} gutter={[16, 16]} wrap>
            {[
              'Task due reminders',
              'New task Assignment',
              'Abnormal task notification',
              'Completed tasks',
            ].map((text) => (
              <ProCard bordered key={text}>
                <Flex gap="middle" justify="space-between" align="center">
                  <SoundOutlined style={{ fontSize: '20px' }} />
                  <Text style={{ fontSize: '18px' }}>{text}</Text>
                </Flex>
              </ProCard>
            ))}
          </ProCard>
        </div>

        <div style={{ flex: 1, minWidth: 300 }}>
          <Title level={5}>Recent Activities</Title>
          <ProCard style={{ marginBlockStart: 8 }} gutter={[16, 16]} wrap>
            {[
              {
                title: 'Task update log',
                description: 'Task: 1 update by Janice 1min ago',
              },
              {
                title: 'Task status changes',
                description: 'Janice create a new Task 2min ago',
              },
              {
                title: 'Collaborative activities of team',
                description: 'Your teammate change for Task 1min ago',
              },
            ].map(({ title, description }) => (
              <ProCard bordered key={title}>
                <Flex gap="small" vertical>
                  <Flex gap="small">
                    <SoundOutlined style={{ fontSize: '18px' }} />
                    <Text style={{ fontSize: '16px' }}>{title}</Text>
                  </Flex>
                  <Text style={{ paddingLeft: 37 }}>{description}</Text>
                </Flex>
              </ProCard>
            ))}
          </ProCard>
        </div>
      </Flex>

      <Flex gap="middle">
        <Flex gap={24} wrap="wrap" style={{ width: '100%' }}>
          <div style={{ flex: 1, minWidth: 300 }}>
            <Chart />
          </div>
          <div style={{ flex: 1, minWidth: 300 }}>
            <TaskProgressChart />
          </div>
          <div style={{ flex: 1, minWidth: 300 }}>
            <QuickActions />
          </div>
        </Flex>
      </Flex>

      <Flex gap="middle">
        <Flex gap={24} wrap="wrap" style={{ width: '100%' }}>
          <div style={{ flex: 1, minWidth: 300 }}>
            <AITaskSuggestions />
          </div>
          <div style={{ flex: 1, minWidth: 300 }}>
            <PriorityPieChart />
          </div>
          <div style={{ flex: 1, minWidth: 300 }}>
            <CalendarCard />
          </div>
        </Flex>
      </Flex>
    </Flex>
  );
};

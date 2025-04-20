import { ProCard } from '@ant-design/pro-components';
import { Avatar, Button, Card, Flex, Space, Tag, Typography, Divider } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const { Title, Text, Paragraph } = Typography;

const mockData = [
  {
    key: 1,
    title: 'Sample Event',
    description: 'description description description...',
    notes: 'write something about the task...',
    labels: ['Meeting'],
    assignees: ['Tom'],
    type: 'Discussion',
    project: 'AI Research',
    milestone: '2025.5.1',
  },
  {
    key: 2,
    title: 'Event 2',
    description: 'another event description',
    notes: 'discussion and results...',
    labels: ['Discussion'],
    assignees: ['Jerry'],
    type: 'Feature',
    project: 'Frontend Refactor',
    milestone: '2025.5.20',
  },
];

const TaskDetail: React.FC = () => {
  const { id } = useParams(); // 读取 URL 参数
  const [event, setEvent] = useState<any | null>(null);

  useEffect(() => {
    const found = mockData.find((item) => String(item.key) === id);
    setEvent(found || null);
  }, [id]);

  if (!event) {
    return <Text type="danger">Event not found.</Text>;
  }
  return (
    <Flex gap={24} style={{ padding: 24 }} align="start">
      {/* Left: Main Content */}
      <Flex vertical gap={24} style={{ flex: 2 }}>
        <ProCard bordered>
          <Title level={4}>Task Name #task number</Title>
          <Text type="secondary">Janice opened 3 hours ago</Text>
        </ProCard>

        <ProCard title="Brief description of the task" bordered>
          <Paragraph>
            description description description description description description description
            description description...
          </Paragraph>
        </ProCard>

        <ProCard title="You can write any part about the task" bordered>
          <Paragraph>
            write something something something something something something something something
            something something...
          </Paragraph>
        </ProCard>

        {/* Activity log */}
        <ProCard bordered>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Card size="small" title="Jerry added this label 4 days ago">
              <Tag color="gold">Meeting</Tag>
            </Card>
            <Card size="small" title="Harry added this link 4 days ago">
              <Text>Link to the project</Text>
            </Card>
            <Card size="small" title="Tom left a comment 4 days ago">
              <Paragraph italic>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut quam ut risus...
              </Paragraph>
            </Card>
          </Space>
        </ProCard>
      </Flex>

      {/* Right: Sidebar Info */}
      <Flex vertical gap={16} style={{ width: 300 }}>
        <ProCard title="Assignees" bordered>
          <Text>No one assigned</Text>
        </ProCard>

        <ProCard title="Labels" bordered>
          <Tag color="magenta">Discussion</Tag>
        </ProCard>

        <ProCard title="Type" bordered>
          <Text type="secondary">No type</Text>
        </ProCard>

        <ProCard title="Projects" bordered>
          <Text type="secondary">No projects</Text>
        </ProCard>

        <ProCard title="Milestone" bordered>
          <Text>Due date: 2025.5.1</Text>
        </ProCard>

        <ProCard title="Notification" bordered>
          <Button type="primary" block>
            Subscribe
          </Button>
          <Text type="secondary">You're not receiving notifications from this thread.</Text>
        </ProCard>

        <ProCard title="Participants" bordered>
          <Avatar.Group maxCount={5}>
            <Avatar src="https://api.dicebear.com/7.x/pixel-art/svg?seed=Janice" />
            <Avatar>K</Avatar>
            <Avatar>R</Avatar>
            <Avatar style={{ backgroundColor: '#87d068' }}>+2</Avatar>
          </Avatar.Group>
        </ProCard>
      </Flex>
    </Flex>
  );
};

export default TaskDetail;

import {
  LeftOutlined,
  MessageOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { history, useParams } from '@umijs/max';
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Progress,
  Row,
  Select,
  Space,
  Tag,
  Typography,
} from 'antd';
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

// 🎯 可选的事件编号和名称（固定选项）
const eventNumbers = ['EVT-001', 'EVT-002', 'EVT-003'];
const eventNames = ['Marketing Sync', 'Design Review', 'Product Launch'];

const milestones = [
  {
    title: '10.0.0',
    status: 'closed',
    percent: 48,
    open: 1451,
    closed: 1387,
    updatedDaysAgo: 2,
    closedOn: 'Mar 6',
    description: 'Release Candidates for .NET 10',
    issues: [
      {
        id: '#114793',
        title: '[API Proposal]: VectorData.Abstractions',
        labels: ['api-suggestion', 'blocking'],
        author: 'jeffhandley',
        time: '5 minutes ago',
        comments: 1,
      },
    ],
  },
];

const MilestoneDetailPage: React.FC = () => {
  const { title } = useParams();
  const [tab, setTab] = useState<'open' | 'closed'>('open');
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  const milestone = milestones.find(
    (m) =>
      decodeURIComponent(m.title).toLowerCase() ===
      (title || '').toLowerCase()
  );

  const [issueList, setIssueList] = useState(milestone?.issues || []);

  const issues = useMemo(() => {
    return issueList.filter((i) => (tab === 'open' ? true : false));
  }, [issueList, tab]);

  if (!milestone) {
    return (
      <div style={{ padding: 24 }}>
        <Text type="danger">Milestone not found.</Text>
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      {/* Header */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Button
            type="link"
            icon={<LeftOutlined />}
            onClick={() => history.push('/milestones')}
          >
            Back to Milestones
          </Button>
        </Col>
        <Col>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{ background: '#2da44e', borderColor: '#2da44e' }}
            onClick={() => setModalVisible(true)}
          >
            Add Event
          </Button>
        </Col>
      </Row>

      {/* Milestone Header Info */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Title level={2} style={{ margin: 0 }}>
            {milestone.title}
          </Title>
          <Space style={{ marginTop: 8 }}>
            <Tag color="purple">Open</Tag>
            <Text type="secondary">No due date</Text>
            <Text type="secondary">Closed {milestone.closedOn}</Text>
          </Space>
        </Col>
        <Col style={{ textAlign: 'right' }}>
          <Text strong style={{ marginRight: 12 }}>
            {milestone.percent}% complete
          </Text>
          <Progress
            percent={milestone.percent}
            strokeColor="#2da44e"
            showInfo={false}
            style={{ width: 300 }}
          />
        </Col>
      </Row>

      {/* Tabs */}
      <div
        style={{
          border: '1px solid #d8dee4',
          borderRadius: 6,
          background: '#f6f8fa',
          padding: '8px 16px',
          marginBottom: 0,
        }}
      >
        <Space>
          <Button
            type="text"
            onClick={() => setTab('open')}
            style={{
              fontWeight: tab === 'open' ? 600 : 400,
              background: tab === 'open' ? '#fff' : 'transparent',
              border: tab === 'open' ? '1px solid #d0d7de' : 'none',
              borderRadius: 20,
              padding: '4px 16px',
            }}
          >
            Open ({milestone.open})
          </Button>
          <Button
            type="text"
            onClick={() => setTab('closed')}
            style={{
              fontWeight: tab === 'closed' ? 600 : 400,
              background: tab === 'closed' ? '#fff' : 'transparent',
              border: tab === 'closed' ? '1px solid #d0d7de' : 'none',
              borderRadius: 20,
              padding: '4px 16px',
            }}
          >
            Closed ({milestone.closed})
          </Button>
        </Space>
      </div>

      {/* Issues List */}
      <div
        style={{
          border: '1px solid #d8dee4',
          borderTop: 'none',
          borderRadius: '0 0 6px 6px',
          padding: '24px',
          background: '#fff',
          textAlign: issues.length === 0 ? 'center' : 'left',
        }}
      >
        {issues.length === 0 ? (
          <>
            <Text strong style={{ fontSize: 16, display: 'block', marginBottom: 8 }}>
              There are no open issues in this milestone
            </Text>
            <Text style={{ fontSize: 14 }}>
              Add issues to milestones to help organize your work. Find and add{' '}
              <a href="#" style={{ color: '#0969da' }}>
                issues with no milestones
              </a>
              .
            </Text>
          </>
        ) : (
          issues.map((issue) => (
            <Row
              key={issue.id}
              justify="space-between"
              align="middle"
              style={{ padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}
            >
              <Col>
                <Link to={`/events/eventdetail/${issue.id.replace('#', '')}`}>
                  <Text strong style={{ fontSize: 16 }}>{issue.title}</Text>
                </Link>
                <div style={{ marginTop: 4 }}>
                  {issue.labels.map((l) => (
                    <Tag key={l}>{l}</Tag>
                  ))}
                  <Text type="secondary" style={{ marginLeft: 8 }}>
                    {issue.id} opened {issue.time} by {issue.author}
                  </Text>
                </div>
              </Col>
              <Col>
                <Space>
                  <MessageOutlined />
                  <Text type="secondary">{issue.comments}</Text>
                </Space>
              </Col>
            </Row>
          ))
        )}
      </div>

      {/* Modal */}
      <Modal
        open={modalVisible}
        title="Create New Event"
        onCancel={() => setModalVisible(false)}
        onOk={async () => {
          try {
            const values = await form.validateFields();

            const newIssue = {
              id: `#${Math.floor(Math.random() * 1000000)}`,
              title: `${values.eventNumber} - ${values.eventName}`,
              labels: ['new'],
              author: 'admin',
              time: 'just now',
              comments: 0,
            };

            setIssueList((prev) => [newIssue, ...prev]);
            message.success('Task created!');
            form.resetFields();
            setModalVisible(false);
          } catch (err) {
            console.log(err);
          }
        }}
        okText="Create"
        cancelText="Cancel"
        width={480}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            name="eventNumber"
            label="Event Number"
            rules={[{ required: true, message: 'Please select an Event Number' }]}
          >
            <Select
              placeholder="Select Event Number"
              options={eventNumbers.map((e) => ({ value: e }))}
            />
          </Form.Item>

          <Form.Item
            name="eventName"
            label="Event Name"
            rules={[{ required: true, message: 'Please select an Event Name' }]}
          >
            <Select
              placeholder="Select Event Name"
              options={eventNames.map((e) => ({ value: e }))}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MilestoneDetailPage;

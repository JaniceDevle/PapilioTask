import React, { useState, useMemo } from 'react';
import {
  Typography,
  Row,
  Col,
  Progress,
  Space,
  Button,
  Input,
  Modal,
  Form,
  Select,
  DatePicker,
} from 'antd';
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Text, Paragraph } = Typography;

const initialMilestones = [
  {
    title: '10.0.0',
    status: 'open',
    percent: 48,
    open: 1451,
    closed: 1387,
    updatedMinutesAgo: 5,
    description:
      'Preview, Release Candidates (RC), and General Availability (GA) releases for .NET 10',
  },
  {
    title: 'Future',
    status: 'open',
    percent: 50,
    open: 6570,
    closed: 6788,
    updatedHoursAgo: 2,
  },
];

const events = [
  { id: 1, name: 'Sample Event', status: 'Ongoing' },
  { id: 2, name: 'AI Migration', status: 'Pending' },
  { id: 3, name: 'Legacy Phase-out', status: 'Finished' },
];

const MilestonesPage: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<'open' | 'closed'>('open');
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [milestoneList, setMilestoneList] = useState(initialMilestones);
  const [form] = Form.useForm();

  const handleAddMilestone = () => {
    form.validateFields().then((values) => {
      const newMilestone = {
        title: values.name,
        status: 'open',
        percent: 0,
        open: 0,
        closed: 0,
        updatedMinutesAgo: 0,
        eventId: values.eventId,
        description: `Related to event: ${
          events.find((e) => e.id === values.eventId)?.name
        }`,
      };
      setMilestoneList([newMilestone, ...milestoneList]);
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const filteredMilestones = useMemo(
    () =>
      milestoneList.filter(
        (m) =>
          m.status === statusFilter &&
          m.title.toLowerCase().includes(searchText.toLowerCase())
      ),
    [statusFilter, searchText, milestoneList]
  );

  const openCount = milestoneList.filter((m) => m.status === 'open').length;
  const closedCount = milestoneList.filter((m) => m.status === 'closed').length;

  const renderDateLine = (m: any) => {
    const updatedText = m.updatedMinutesAgo
      ? `${m.updatedMinutesAgo} minutes ago`
      : m.updatedHoursAgo
      ? `about ${m.updatedHoursAgo} hours ago`
      : m.updatedDaysAgo !== undefined
      ? `${m.updatedDaysAgo} days ago`
      : `undefined days ago`;

    return (
      <Text type="secondary">
        {m.closedOn ? (
          <>
            <Text strong>Closed</Text> on {m.closedOn} <ClockCircleOutlined /> Last updated {updatedText}
          </>
        ) : (
          <>
            No due date <ClockCircleOutlined /> Last updated {updatedText}
          </>
        )}
      </Text>
    );
  };

  return (
    <div style={{ padding: 24 }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Space>
            <CheckCircleOutlined />
            <Title level={4} style={{ margin: 0 }}>Milestones</Title>
          </Space>
        </Col>
        <Col>
          <Space>
            <Input
              allowClear
              placeholder="Search milestones"
              style={{ width: 200 }}
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button
              type="default"
              style={{
                backgroundColor: statusFilter === 'open' ? '#f6f8fa' : undefined,
                border: statusFilter === 'open' ? '1px solid #d0d7de' : undefined,
                fontWeight: statusFilter === 'open' ? 600 : undefined,
              }}
              onClick={() => setStatusFilter('open')}
            >
              {openCount} Open
            </Button>
            <Button
              type="default"
              style={{
                backgroundColor: statusFilter === 'closed' ? '#f6f8fa' : undefined,
                border: statusFilter === 'closed' ? '1px solid #d0d7de' : undefined,
                fontWeight: statusFilter === 'closed' ? 600 : undefined,
              }}
              onClick={() => setStatusFilter('closed')}
            >
              {closedCount} Closed
            </Button>
            <Button type="primary" onClick={() => setIsModalVisible(true)}>
              Add Milestone
            </Button>
          </Space>
        </Col>
      </Row>

      <div style={{ background: '#fff', border: '1px solid #d8dee4', borderRadius: 6 }}>
        {filteredMilestones.map((m, index) => (
          <div key={m.title} style={{
            padding: '20px 24px',
            borderTop: index !== 0 ? '1px solid #d8dee4' : undefined,
          }}>
            <Title level={5} style={{ marginBottom: 4 }}>
              <Link to={`/milestones/${encodeURIComponent(m.title)}`}>
                {m.title}
              </Link>
            </Title>
            {renderDateLine(m)}
            {m.description && (
              <Paragraph style={{ marginTop: 8, marginBottom: 12 }}>
                {m.description}
              </Paragraph>
            )}
            <Row justify="space-between" align="middle">
              <Col flex="auto">
                <div style={{ maxWidth: 600 }}>
                  <Progress percent={m.percent} strokeColor="green" showInfo={false} />
                </div>
              </Col>
              <Col>
                <Text style={{ color: '#1a7f37', fontWeight: 500 }}>
                  {m.percent}% complete
                </Text>{' '}
                <Text type="secondary">
                  &nbsp;&nbsp; {m.open.toLocaleString()} open &nbsp; {m.closed.toLocaleString()} closed
                </Text>
              </Col>
            </Row>
          </div>
        ))}
      </div>

      <Modal
        title="Create New Milestone"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleAddMilestone}
        okText="Create"
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Milestone Name"
            name="name"
            rules={[{ required: true, message: 'Please input milestone name' }]}
          >
            <Input placeholder="e.g. New Feature Beta" />
          </Form.Item>
          <Form.Item
            label="Event"
            name="eventId"
            rules={[{ required: true, message: 'Please select event' }]}
          >
            <Select
              showSearch
              placeholder="Select related event"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.children as string)
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            >
              {events
                .filter((e) => e.status !== 'Finished')
                .map((e) => (
                  <Select.Option key={e.id} value={e.id}>
                    {e.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item label="Timeframe" name="timeframe">
            <DatePicker.RangePicker style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MilestonesPage;

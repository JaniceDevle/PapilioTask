import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Space, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { RangePicker } = DatePicker;

const NewEventPage: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    console.log('Submitted:', values);
    // TODO: 提交后端 API 请求
    navigate('/project/board'); // 成功后跳转
  };

  return (
    <div style={{ padding: 24 }}>
      <Card>
        <Title level={4}>Create New Milestone</Title>

        <Form layout="vertical" onFinish={onFinish}>
          <Row gutter={32}>
            <Col span={12}>
              {/* Milestone Number */}
              <Form.Item
                label="Milestone Number"
                name="milestoneNumber"
                rules={[{ required: true, message: 'Please input the event number!' }]}
              >
                <Input placeholder="e.g. #123" />
              </Form.Item>

              {/* Milestone Name */}
              <Form.Item
                label="Milestone Name"
                name="milestoneName"
                rules={[{ required: true, message: 'Please input the event name!' }]}
              >
                <Input placeholder="Event name" />
              </Form.Item>

              {/* Labels */}
              <Form.Item label="Label" name="label">
                <Select
                  mode="tags"
                  placeholder="Type and press Enter to add labels"
                  style={{ width: '100%' }}
                />
              </Form.Item>

              {/* Status */}
              <Form.Item
                label="Status"
                name="status"
                rules={[{ required: true, message: 'Please select status!' }]}
              >
                <Select placeholder="Select status">
                  <Select.Option value="open">Open</Select.Option>
                  <Select.Option value="closed">Closed</Select.Option>
                </Select>
              </Form.Item>

              {/* Timeframe */}
              <Form.Item label="Timeframe" name="timeframe">
                <RangePicker style={{ width: '100%' }} />
              </Form.Item>

              {/* Action Buttons */}
              <Space>
                <Button onClick={() => navigate('/project/board')}>Cancel</Button>
                <Button type="primary" htmlType="submit">
                  Create
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default NewEventPage;

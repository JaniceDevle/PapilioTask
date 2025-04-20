import React from 'react';
import {
  Card,
  Col,
  Row,
  Input,
  Typography,
  Button,
  Space,
  Select,
  Form,
  Checkbox,
  DatePicker,
} from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const EventFormPage: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    console.log('Form submitted:', values);
    navigate('/'); // 返回主页
  };

  return (
    <div style={{ padding: 24 }}>
      <Card>
        <Title level={4}>Create new event</Title>

        <Form layout="vertical" onFinish={onFinish}>
          <Row gutter={32}>
            {/* 左侧区域 */}
            <Col span={16}>
              <Form.Item
                label="Add a title"
                name="title"
                rules={[{ required: true, message: 'Please input the title!' }]}
              >
                <Input placeholder="Title" />
              </Form.Item>

              <Form.Item label="Add a description" name="description">
                <TextArea placeholder="Type your description here..." rows={8} />
              </Form.Item>

              <Form.Item name="createMore" valuePropName="checked">
                <Checkbox>Create more</Checkbox>
              </Form.Item>

              <Space>
                <Button onClick={() => navigate('/')}>Cancel</Button>
                <Button type="primary" htmlType="submit">Create</Button>
              </Space>
            </Col>

            {/* 右侧区域 */}
            <Col span={8}>
              <Form.Item label="Assignees" name="assignees">
                <Select placeholder="Select" mode="multiple" />
              </Form.Item>

              <Form.Item label="Labels" name="labels">
                <Select placeholder="Select" mode="multiple" />
              </Form.Item>

              <Form.Item label="Type" name="type">
                <Select placeholder="Select">
                  <Select.Option value="bug">Bug</Select.Option>
                  <Select.Option value="feature">Feature</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item label="Projects" name="projects">
                <Select placeholder="Select" />
              </Form.Item>

              <Form.Item label="Milestone" name="milestone">
                <Select placeholder="Select" />
              </Form.Item>

              <Form.Item label="Timeframe" name="timeframe">
                <RangePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default EventFormPage;

import { DatePicker, Form, Input, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { fetchEventList } from '@/pages/events/service';

interface AddMilestoneModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
  form: any;
}

const AddMilestoneModal: React.FC<AddMilestoneModalProps> = ({
  visible,
  onCancel,
  onSubmit,
  form,
}) => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      loadEvents();
    }
  }, [visible]);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await fetchEventList();
      setEvents(data || []);
    } catch (error) {
      console.error('Failed to load events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log('Form values:', values); // 调试用

      // 处理表单数据
      const submitData = {
        title: values.title,        // 保持与后端期望的字段名一致
        description: values.description,
        events: values.events,
        timeframe: values.timeframe,
        status: 'open',            // 默认状态
        percent: 0,                // 默认进度
        openCount: 0,              // 默认开放数量
        closedCount: 0             // 默认关闭数量
      };

      onSubmit(submitData);
    } catch (error) {
      console.error('Form validation failed:', error);
    }
  };

  return (
    <Modal
      title="Create New Milestone"
      open={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
      okText="Create"
      cancelText="Cancel"
      confirmLoading={loading}
    >
      <Form layout="vertical" form={form} onFinish={onSubmit}>
        <Form.Item
          label="Milestone Name"
          name="title"  // 改为title
          rules={[{ required: true, message: 'Please enter milestone name' }]}
        >
          <Input placeholder="e.g.: New Feature Beta" />
        </Form.Item>
        <Form.Item
          label="Related Events"
          name="events"
          rules={[{ required: true, message: 'Please select related events' }]}
        >
          <Select
            mode="multiple"
            showSearch
            placeholder="Select related events"
            optionFilterProp="children"
            loading={loading}
            filterOption={(input, option) =>
              ((option?.label as string) || '').toLowerCase().includes(input.toLowerCase())
            }
            options={events.map(e => ({
              value: e.key,
              label: `${e.eventNumber} - ${e.eventName}`
            }))}
          />
        </Form.Item>
        <Form.Item
          label="Timeframe"
          name="timeframe"
        >
          <DatePicker.RangePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
        >
          <Input.TextArea placeholder="Describe the goals and scope of this milestone..." rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddMilestoneModal;

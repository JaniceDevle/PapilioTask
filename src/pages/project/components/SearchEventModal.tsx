import { Modal, Select, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { fetchEventList } from '../../events/service';

interface SearchEventModalProps {
  visible: boolean;
  onCancel: () => void;
  onSelect: (eventId: number, columnType: string) => void;
  columnTypes: string[];
}

export const SearchEventModal: React.FC<SearchEventModalProps> = ({
  visible,
  onCancel,
  onSelect,
  columnTypes,
}) => {
  const [events, setEvents] = useState<any[]>([]);
  const [selectedColumn, setSelectedColumn] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      loadEvents();
    }
  }, [visible]);

  const loadEvents = async () => {
    setLoading(true);
    try {
      const data = await fetchEventList();
      setEvents(data);
    } catch (error) {
      console.error('Failed to load events:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: '编号',
      dataIndex: 'eventNumber',
      key: 'eventNumber',
    },
    {
      title: '名称',
      dataIndex: 'eventName',
      key: 'eventName',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record: any) => (
        <Space>
          <Select
            style={{ width: 120 }}
            placeholder="选择列"
            onChange={(value) => setSelectedColumn(value)}
          >
            {columnTypes.map(type => (
              <Select.Option key={type} value={type}>
                {type}
              </Select.Option>
            ))}
          </Select>
          <a
            onClick={() => {
              if (selectedColumn) {
                onSelect(record.key, selectedColumn);
              }
            }}
            disabled={!selectedColumn}
          >
            添加到看板
          </a>
        </Space>
      ),
    },
  ];

  return (
    <Modal
      title="选择要添加的事件"
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={800}
    >
      <Table
        columns={columns}
        dataSource={events}
        loading={loading}
        rowKey="key"
      />
    </Modal>
  );
};

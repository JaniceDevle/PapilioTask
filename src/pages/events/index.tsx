import { fetchEventList } from './service';
import {
  ColumnHeightOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  ReloadOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { ModalForm } from '@ant-design/pro-components';
import {
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Dropdown,
  Flex,
  Form,
  Input,
  Menu,
  Modal,
  Pagination,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { history } from 'umi';

const { Text, Link, Title } = Typography;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const EventSchedulePage: React.FC = () => {
  const [columnModalVisible, setColumnModalVisible] = useState(false);
  const [tableSize, setTableSize] = useState<'default' | 'middle' | 'small'>('middle');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isEventModalVisible, setIsEventModalVisible] = useState(false);

  const [tableData, setTableData] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [filteredData, setFilteredData] = useState<any[]>([]);

  useEffect(() => {
    fetchEventList().then((res) => {
      setTableData(res);
      setFilteredData(res);
    });
  }, []);

  const getInitialColumns = () => [
    {
      title: 'Event Number',
      dataIndex: 'eventNumber',
      key: 'eventNumber',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: 'Event Name',
      dataIndex: 'eventName',
      key: 'eventName',
      render: (text: string, record: any) => (
        <a
          onClick={() => history.push(`/events/eventdetail/${record.key}`)}
          style={{ color: '#1677ff' }}
        >
          {text}
        </a>
      ),
      filters: [
        { text: 'Event 1', value: 'Event 1' },
        { text: 'Event 2', value: 'Event 2' },
        { text: 'Event 3', value: 'Event 3' },
      ],
      onFilter: (value, record) => record.eventName.includes(value),
    },
    {
      title: 'Assignees',
      dataIndex: 'assignees',
      key: 'assignees',
      filters: [
        { text: 'text', value: 'text' },
        { text: 'text 1', value: 'text 1' },
      ],
      onFilter: (value, record) => record.assignees === value,
    },
    {
      title: 'Timeframe',
      dataIndex: 'timeframe',
      key: 'timeframe',
      filters: [
        { text: 'time', value: 'time' },
        { text: 'time 1', value: 'time 1' },
      ],
      onFilter: (value, record) => record.assignees === value,
    },
    {
      title: 'Labels',
      dataIndex: 'labels',
      key: 'labels',
      render: (labels: string[]) => (
        <>
          {labels.map((label) => (
            <Tag key={label} color={label === 'Discussion' ? 'pink' : 'gold'}>
              {label}
            </Tag>
          ))}
        </>
      ),
    },

    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string[]) => (
        <>
          {status.map((s) => {
            let color = 'default';
            switch (s) {
              case 'Pending':
                color = 'blue';
                break;
              case 'Doing':
                color = 'gold';
                break;
              case 'Finished':
                color = 'green';
                break;
              case 'Overdue':
                color = 'red';
                break;
            }

            return (
              <Tag key={s} color={color}>
                {s}
              </Tag>
            );
          })}
        </>
      ),
    }
  ];

  const columns = useMemo(() => getInitialColumns(), []);
  const [visibleColumnKeys, setVisibleColumnKeys] = useState<string[]>(
    columns.map((col) => col.key),
  );
  const [columnFixedState, setColumnFixedState] = useState<
    Record<string, 'left' | 'right' | undefined>
  >({});

  const scheduleData = [
    {
      key: '1',
      title: 'The curse of revision - Hermione',
      time: '2025/03/05 – 2025/03/12',
      urgent: true,
      url: 'www.revision.com',
    },
    {
      key: '2',
      title: 'Meeting - Sponsor of the meeting: Tom',
      time: '2025/03/05 12:00 – 15:00',
      urgent: true,
      url: 'www.revision.com',
    },
  ];

  const handleRefresh = () => setTableData([...tableData]);

  const handleDensityChange = ({ key }: { key: string }) => {
    setTableSize(key as 'default' | 'middle' | 'small');
  };

  const renderColumnSettingItem = (col: any) => (
    <div key={col.key} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
      <span style={{ cursor: 'grab', marginRight: 8, color: '#ccc' }}>⋮⋮</span>
      <Checkbox
        checked={visibleColumnKeys.includes(col.key)}
        onChange={(e) => {
          const checked = e.target.checked;
          setVisibleColumnKeys((prev) =>
            checked ? [...prev, col.key] : prev.filter((k) => k !== col.key),
          );
        }}
      >
        {col.title}
      </Checkbox>
      <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
        <Tooltip title="固定在列首">
          <Button
            size="small"
            type={columnFixedState[col.key] === 'left' ? 'primary' : 'text'}
            icon={<span style={{ fontSize: 12 }}>⤒</span>}
            onClick={() =>
              setColumnFixedState((prev) => ({
                ...prev,
                [col.key]: prev[col.key] === 'left' ? undefined : 'left',
              }))
            }
          />
        </Tooltip>
        <Tooltip title="固定在列尾">
          <Button
            size="small"
            type={columnFixedState[col.key] === 'right' ? 'primary' : 'text'}
            icon={<span style={{ fontSize: 12 }}>⤓</span>}
            onClick={() =>
              setColumnFixedState((prev) => ({
                ...prev,
                [col.key]: prev[col.key] === 'right' ? undefined : 'right',
              }))
            }
          />
        </Tooltip>
      </div>
    </div>
  );

  const displayedColumns = useMemo(() => {
    const left: any[] = [],
      right: any[] = [],
      normal: any[] = [];
    columns.forEach((col) => {
      if (!visibleColumnKeys.includes(col.key)) return;
      const fixed = columnFixedState[col.key];
      const newCol = { ...col, fixed };
      if (fixed === 'left') left.push(newCol);
      else if (fixed === 'right') right.push(newCol);
      else normal.push(newCol);
    });
    return [...left, ...normal, ...right];
  }, [visibleColumnKeys, columnFixedState]);

  const densityMenu = (
    <Menu onClick={handleDensityChange} selectedKeys={[tableSize]}>
      <Menu.Item key="default">默认</Menu.Item>
      <Menu.Item key="middle">中等</Menu.Item>
      <Menu.Item key="small">紧凑</Menu.Item>
    </Menu>
  );

  return (
    <div style={{ padding: 24 }}>
      {tableData.length > 0 && (
        <Card
          bordered
          style={{ backgroundColor: '#f6ffed', borderColor: '#b7eb8f', marginBottom: 16 }}
        >
          <Text type="success">
            <ExclamationCircleOutlined style={{ marginRight: 8 }} />
            One of your tasks is about to expire, the project is called{' '}
            <strong>{tableData[0].eventName}</strong>,{' '}
            <Link onClick={() => history.push(`/events/eventdetail/${tableData[0].key}`)}>
              click to jump!
            </Link>
          </Text>
        </Card>
      )}

      <Card title="Today's Schedule" style={{ marginBottom: 24 }}>
        {scheduleData.map((item) => (
          <Flex vertical gap={12} key={item.key} style={{ padding: 12 }}>
            <Col span={24}>
              <Text strong>{item.title}</Text>
              <Text style={{ marginLeft: 8, color: '#888' }}>{item.time}</Text>
              {item.urgent && (
                <Tag color="red" style={{ marginLeft: 8 }}>
                  Urgent
                </Tag>
              )}
              <div>
                <Link onClick={() => history.push(`/events/eventdetail/${item.key}`)}>
                  {item.url}
                </Link>
              </div>
            </Col>
          </Flex>
        ))}
      </Card>

      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Title level={4} style={{ margin: 0 }}>
            Event Schedule
          </Title>
        </Col>
        <Col>
          <Space>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsEventModalVisible(true)}
            >
              Add Event
            </Button>
            <Button type="primary">Export</Button>
            <Tooltip title="刷新">
              <Button icon={<ReloadOutlined />} onClick={handleRefresh} />
            </Tooltip>
            <Dropdown overlay={densityMenu} trigger={['click']}>
              <Tooltip title="密度">
                <Button icon={<ColumnHeightOutlined />} />
              </Tooltip>
            </Dropdown>
            <Tooltip title="列设置">
              <Button icon={<SettingOutlined />} onClick={() => setColumnModalVisible(true)} />
            </Tooltip>
          </Space>
        </Col>
      </Row>

      <Table
        columns={displayedColumns}
        size={tableSize}
        rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
        dataSource={filteredData}
        rowKey="key"
        bordered
        pagination={false}
        scroll={{ x: 'max-content' }}
      />

      <Row justify="space-between" align="middle" style={{ marginTop: 16 }}>
        <Col>
          <Pagination defaultCurrent={1} total={50} pageSize={10} showSizeChanger />
        </Col>
        <Col>
          <Input.Search
            placeholder="Search"
            allowClear
            style={{ width: 200 }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onSearch={(value) => {
              const lower = value.toLowerCase();
              const filtered = tableData.filter((item) =>
                item.eventName.toLowerCase().includes(lower),
              );
              setFilteredData(filtered);
            }}
          />
        </Col>
      </Row>

      <ModalForm
        title="列设置"
        open={columnModalVisible}
        onOpenChange={setColumnModalVisible}
        submitter={false}
        modalProps={{ destroyOnClose: true }}
      >
        <div style={{ padding: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <Checkbox
              checked={visibleColumnKeys.length === columns.length}
              indeterminate={
                visibleColumnKeys.length > 0 && visibleColumnKeys.length < columns.length
              }
              onChange={(e) => {
                const checked = e.target.checked;
                setVisibleColumnKeys(checked ? columns.map((col) => col.key) : []);
              }}
            >
              列展示
            </Checkbox>
            <Link
              onClick={() => {
                setVisibleColumnKeys(columns.map((col) => col.key));
                setColumnFixedState({});
              }}
            >
              重置
            </Link>
          </div>
          <Divider style={{ margin: '8px 0' }} />
          {['left', undefined, 'right'].map((fixedType) => {
            const titleMap = {
              left: '固定在左侧',
              undefined: '不固定',
              right: '固定在右侧',
            } as const;

            return (
              <React.Fragment key={String(fixedType)}>
                {columns.some(
                  (col) =>
                    columnFixedState[col.key] === fixedType ||
                    (!columnFixedState[col.key] && fixedType === undefined),
                ) && (
                  <>
                    <Divider style={{ margin: '8px 0' }} />
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {titleMap[fixedType]}
                    </Text>
                    {columns.map((col) =>
                      columnFixedState[col.key] === fixedType ||
                      (!columnFixedState[col.key] && fixedType === undefined)
                        ? renderColumnSettingItem(col)
                        : null,
                    )}
                  </>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </ModalForm>

      <Modal
        title="Create New Event"
        open={isEventModalVisible}
        onCancel={() => setIsEventModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form
          layout="vertical"
          onFinish={(values) => {
            const newKey = Date.now();
            const newEventNumber = `EVT-${1000 + tableData.length + 1}`;

            const newItem = {
              key: newKey,
              eventNumber: newEventNumber,
              eventName: values.title || 'Untitled',
              assignees: values.assignees?.join(', ') || '',
              timeframe: values.timeframe
                ? `${values.timeframe[0].format('YYYY/MM/DD')} - ${values.timeframe[1].format(
                    'YYYY/MM/DD',
                  )}`
                : '',
              labels: values.labels || [],
              status: values.status?.length > 0 ? values.status : ['Pending'],
            };

            setTableData((prev) => {
              const updated = [newItem, ...prev];
              setFilteredData(updated); // ✅ 确保 UI 展示更新
              return updated;
            });
            setIsEventModalVisible(false);
          }}
        >
          <Row gutter={32}>
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

              <Space>
                <Button onClick={() => setIsEventModalVisible(false)}>Cancel</Button>
                <Button type="primary" htmlType="submit">
                  Create
                </Button>
              </Space>
            </Col>

            <Col span={8}>
              <Form.Item label="Assignees" name="assignees">
                <Select
                  mode="multiple"
                  placeholder="Select"
                  style={{ width: '100%' }}
                  options={[
                    { label: 'Tom', value: 'Tom' },
                    { label: 'Hermione', value: 'Hermione' },
                    { label: 'Harry', value: 'Harry' },
                  ]}
                />
              </Form.Item>
              <Form.Item label="Labels" name="labels">
                <Select
                  mode="multiple"
                  placeholder="Select"
                  style={{ width: '100%' }}
                  options={[
                    { label: 'Discussion', value: 'Discussion' },
                    { label: 'Meeting', value: 'Meeting' },
                  ]}
                />
              </Form.Item>

              <Form.Item label="Status" name="status">
                <Select
                  mode="multiple"
                  placeholder="Select"
                  style={{ width: '100%' }}
                  options={[
                    { label: 'Pending', value: 'Pending' },
                    { label: 'Doing', value: 'Doing' },
                    { label: 'Finished', value: 'Finished' },
                    { label: 'Overdue', value: 'Overdue' },
                  ]}
                />
              </Form.Item>

              <Form.Item label="Projects" name="projects">
                <Select mode="multiple" placeholder="Select" style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item label="Milestone" name="milestone">
                <Select mode="multiple" placeholder="Select" style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item label="Timeframe" name="timeframe">
                <RangePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default EventSchedulePage;

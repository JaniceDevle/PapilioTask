import { InfoCircleOutlined, MessageOutlined, TagOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Input, List, Row, Space, Tag, Tooltip, Typography } from 'antd';
import React, { useMemo, useState, useEffect } from 'react';
import { fetchLabelList, fetchIssueList } from './service';

const { Text } = Typography;

const LabelsPage: React.FC = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [allLabels, setAllLabels] = useState<any[]>([]);
  const [allIssues, setAllIssues] = useState<any[]>([]);

  useEffect(() => {
    fetchLabelList().then(setAllLabels);
    fetchIssueList().then(setAllIssues);
  }, []);

  const filteredLabels = useMemo(() => {
    return allLabels.filter((l) => l.name.toLowerCase().includes(searchKeyword.toLowerCase()));
  }, [searchKeyword, allLabels]);

  const filteredIssues = useMemo(() => {
    if (!selectedLabel) return [];
    return allIssues.filter((i) => i.labels.includes(selectedLabel));
  }, [selectedLabel, allIssues]);

  return (
    <div style={{ padding: 24 }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Space>
            <TagOutlined />
            <Typography.Title level={4} style={{ margin: 0 }}>
              Labels
            </Typography.Title>
          </Space>
        </Col>
        <Col>
          {!selectedLabel && (
            <Input.Search
              allowClear
              placeholder="Search all labels"
              style={{ width: 300 }}
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          )}
        </Col>
      </Row>

      {!selectedLabel ? (
        <>
          <Text type="secondary" style={{ display: 'block', marginBottom: 12 }}>
            {filteredLabels.length} labels
          </Text>
          <Card bordered style={{ borderRadius: 10 }}>
            {filteredLabels.map((label) => (
              <Row
                key={label.name}
                justify="space-between"
                align="middle"
                style={{ padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}
              >
                <Col flex="300px">
                  <Tag
                    color={label.color}
                    style={{ fontSize: 13, padding: '2px 10px', borderRadius: 12, cursor: 'pointer' }}
                    onClick={() => setSelectedLabel(label.name)}
                  >
                    {label.name}
                  </Tag>
                </Col>
                <Col flex="auto">
                  <Text type="secondary">{label.description}</Text>
                </Col>
                <Col>
                  <Tooltip title={`${label.count} open tasks`}>
                    <Space>
                      <InfoCircleOutlined />
                      <Text>{label.count}</Text>
                    </Space>
                  </Tooltip>
                </Col>
              </Row>
            ))}
          </Card>
        </>
      ) : (
        <Card
          title={`Issues tagged with "${selectedLabel}"`}
          extra={<a onClick={() => setSelectedLabel(null)}>← Back</a>}
        >
          <List
            dataSource={filteredIssues}
            itemLayout="vertical"
            renderItem={(item) => (
              <List.Item
                key={item.id}
                actions={[<Space><MessageOutlined /> {item.comments}</Space>]}
              >
                <List.Item.Meta
                  avatar={<Avatar>{item.author[0].toUpperCase()}</Avatar>}
                  title={<a>{item.title}</a>}
                  description={`#${item.id} opened ${item.time} by ${item.author}`}
                />
                <div>
                  {item.labels.map((l) => (
                    <Tag key={l}>{l}</Tag>
                  ))}
                </div>
              </List.Item>
            )}
          />
        </Card>
      )}
    </div>
  );
};

export default LabelsPage;

import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Input, message, Row, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { SearchEventModal } from './components/SearchEventModal';
import BoardColumnComponent from './components/BoardColumn';
import { BoardColumn, columnTypes } from './types';
import { fetchBoardData, addEventToBoard } from './service';

const ProjectBoardPage: React.FC = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchActive, setSearchActive] = useState(false);

  // Initialize board data
  const [boardData, setBoardData] = useState<BoardColumn[]>([
    { columnTitle: 'Team User Stories', count: 2, tasks: [] },
    { columnTitle: 'In Progress', count: 2, tasks: [] },
    { columnTitle: 'Urgent', count: 2, tasks: [] },
    { columnTitle: 'Performance', count: 1, tasks: [] },
    { columnTitle: 'Done', count: 2, tasks: [] },
  ]);

  const [filteredBoard, setFilteredBoard] = useState<BoardColumn[]>(boardData);

  // Modal state
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSelectEvent = async (eventId: number, columnType: string) => {
    try {
      await addEventToBoard(eventId, columnType);
      const data = await fetchBoardData();
      setBoardData(data);
      setFilteredBoard(data);
      setIsModalVisible(false);
      message.success('事件已添加到看板！');
    } catch (error) {
      message.error('添加事件失败');
    }
  };

  // Search functionality
  const handleSearch = () => {
    const keyword = searchKeyword.trim().toLowerCase();
    if (!keyword) {
      message.warning('Please enter a search keyword');
      return;
    }

    const filtered = boardData.map((col) => {
      const filteredTasks = col.tasks.filter((task) =>
        task.name.toLowerCase().includes(keyword),
      );
      return {
        ...col,
        tasks: filteredTasks,
        count: filteredTasks.length,
      };
    });

    setFilteredBoard(filtered);
    setSearchActive(true);
  };

  // Reset search
  const handleResetSearch = () => {
    setFilteredBoard(boardData);
    setSearchKeyword('');
    setSearchActive(false);
  };

  useEffect(() => {
    const loadBoardData = async () => {
      try {
        const data = await fetchBoardData();
        setBoardData(data);
        setFilteredBoard(data);
      } catch (error) {
        message.error('加载看板数据失败');
        console.error(error);
      }
    };

    loadBoardData();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      {/* Search and operation area */}
      <Card style={{ marginBottom: 24 }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Space style={{ width: '100%', justifyContent: 'space-between' }}>
            <Input.Search
              placeholder="Search event name"
              style={{ width: 300 }}
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onSearch={handleSearch}
              allowClear
              enterButton
            />
            <Space>
              <Button onClick={handleResetSearch} disabled={!searchActive}>
                Reset
              </Button>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setIsModalVisible(true)}
              >
                添加事件
              </Button>
            </Space>
          </Space>
        </Space>
      </Card>

      {/* Board list */}
      <Row gutter={16} wrap>
        {filteredBoard.map((column) => (
          <Col key={column.columnTitle} flex="1 0 220px">
            <BoardColumnComponent column={column} />
          </Col>
        ))}
      </Row>

      {/* Create event modal */}
      <SearchEventModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onSelect={handleSelectEvent}
        columnTypes={columnTypes}
      />
    </div>
  );
};

export default ProjectBoardPage;

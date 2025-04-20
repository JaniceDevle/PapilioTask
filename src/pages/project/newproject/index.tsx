import React from 'react';
import {
  Row,
  Col,
  Card,
  Typography,
  Input,
  Button,
  Space,
} from 'antd';
import { history } from 'umi';

const { Title, Paragraph } = Typography;

const CreateProjectPage: React.FC = () => {
  const [projectName, setProjectName] = React.useState("");

  const handleCreate = () => {
    console.log("Creating project:", projectName);
    // Redirect or API call can go here
    history.push('/project/board');
  };

  return (
    <div style={{ padding: 24 }}>
      <Card>
        <Row gutter={32}>
          {/* Left Panel */}
          <Col span={8}>
            <Title level={5}>New board</Title>
            <Paragraph>
              Start with a board to spread your issues and pull requests across customizable
              columns. Easily switch to a table or roadmap layout at any time.
            </Paragraph>
          </Col>

          {/* Right Panel */}
          <Col span={16}>
            <Title level={5}>Project name</Title>
            <Input
              placeholder="e.g. @yourname's awesome project"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              style={{ marginBottom: 24 }}
            />

            <div style={{ marginTop: 24, textAlign: 'right' }}>
              <Space>
                <Button onClick={() => history.back()}>Cancel</Button>
                <Button type="primary" onClick={handleCreate}>Create project</Button>
              </Space>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default CreateProjectPage;

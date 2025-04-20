import React, { useState } from 'react';
import {
  Card,
  Typography,
  Switch,
  Select,
  Button,
  Divider,
  Row,
  Col,
  Modal,
  message,
  Space
} from 'antd';

const { Title, Text, Paragraph, Link } = Typography;
const { Option } = Select;

const NotificationsPage: React.FC = () => {
  const [email, setEmail] = useState('n563212895131017@outlook.com');
  const [notifyWatching, setNotifyWatching] = useState<'github' | 'email'>('email');
  const [notifyParticipating, setNotifyParticipating] = useState<'github' | 'email'>('github');
  const [customizeUpdates, setCustomizeUpdates] = useState(false);

  const handleCustomRouting = () => {
    Modal.info({
      title: 'Custom Email Routing',
      content: (
        <div>
          <p>You can set custom email routes in your organization settings.</p>
        </div>
      ),
      onOk() {},
    });
  };

  const toggleNotification = (
    type: 'watching' | 'participating',
    channel: 'github' | 'email'
  ) => {
    if (type === 'watching') {
      setNotifyWatching(channel);
      message.success(`Watching notifications set to ${channel}`);
    } else {
      setNotifyParticipating(channel);
      message.success(`Participating notifications set to ${channel}`);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Notifications</Title>

      {/* Default notifications email */}
      <Card style={{ marginBottom: 24 }}>
        <Title level={5}>Default notifications email</Title>
        <Paragraph>
          Choose where you'd like emails to be sent. You can add more email addresses. Use custom routes to specify
          different email addresses to be used for individual organizations.
        </Paragraph>
        <Select value={email} style={{ width: 300 }} onChange={setEmail}>
          <Option value="n563212895131017@outlook.com">n563212895131017@outlook.com</Option>
          <Option value="other@example.com">other@example.com</Option>
        </Select>
        <Button type="default" style={{ marginLeft: 8 }} onClick={handleCustomRouting}>
          Custom routing
        </Button>
      </Card>

      {/* Subscriptions */}
      <Card title="Subscriptions" style={{ marginBottom: 24 }}>
        <Paragraph>
          <strong>Watching</strong>
          <br />
          Notifications for all repositories, teams, or conversations you're watching.{' '}
          <Link>View watched repositories</Link>.
        </Paragraph>
        <Space>
          <Button
            type={notifyWatching === 'github' ? 'primary' : 'default'}
            onClick={() => toggleNotification('watching', 'github')}
          >
            On GitHub
          </Button>
          <Button
            type={notifyWatching === 'email' ? 'primary' : 'default'}
            onClick={() => toggleNotification('watching', 'email')}
          >
            Email
          </Button>
        </Space>

        <Divider />

        <Paragraph>
          <strong>Participating, @mentions and custom</strong>
          <br />
          Notifications for the conversations you are participating in, or if someone cites you with an @mention.
        </Paragraph>
        <Space>
          <Button
            type={notifyParticipating === 'github' ? 'primary' : 'default'}
            onClick={() => toggleNotification('participating', 'github')}
          >
            On GitHub
          </Button>
          <Button
            type={notifyParticipating === 'email' ? 'primary' : 'default'}
            onClick={() => toggleNotification('participating', 'email')}
          >
            Email
          </Button>
        </Space>

        <Divider />

        <Paragraph>
          <strong>Customize email updates</strong>
          <br />
          Choose which additional events you'll receive emails for when participating or watching.
        </Paragraph>
        <Button type={customizeUpdates ? 'primary' : 'default'} onClick={() => {
          setCustomizeUpdates((prev) => !prev);
          message.success(`Customize email updates ${!customizeUpdates ? 'enabled' : 'disabled'}`);
        }}>
          {customizeUpdates ? 'Enabled: Reviews, Pushes, Comments' : 'Enable custom updates'}
        </Button>
      </Card>
    </div>
  );
};

export default NotificationsPage;

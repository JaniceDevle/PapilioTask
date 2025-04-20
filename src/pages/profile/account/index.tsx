import { LockOutlined } from '@ant-design/icons';
import { Button, Card, Divider, Input, message, Space, Typography, Modal } from 'antd';
import React, { useState } from 'react';

const { Title, Paragraph, Link, Text } = Typography;

const SettingsPage: React.FC = () => {
  const [successor, setSuccessor] = useState('');
  const [designatedSuccessor, setDesignatedSuccessor] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      message.warning('Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      message.error('New passwords do not match');
      return;
    }

    // 模拟请求
    message.success('Password changed successfully');
    setIsModalVisible(false);
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleAddSuccessor = () => {
    if (!successor) {
      message.warning('Please enter a valid name or email');
      return;
    }
    setDesignatedSuccessor(successor);
    message.success('Successor added');
    setSuccessor('');
  };

  const handleDeleteAccount = () => {
    message.error('Account deleted');
    // Perform deletion logic here
  };

  const [email, setEmail] = useState('');
  const [backupEmail, setBackupEmail] = useState('Allow all verified emails');
  const [keepPrivate, setKeepPrivate] = useState(true);
  const [blockPushes, setBlockPushes] = useState(false);

  const handleAddEmail = () => {
    if (!email) {
      message.warning('Please enter an email address');
      return;
    }
    message.success(`Email ${email} added successfully`);
    setEmail('');
  };

  return (
    <div style={{ padding: 24 }}>
      <Card style={{ marginBottom: 24 }}>
        <Title level={4}>Password</Title>
        <Paragraph>
          Strengthen your account by ensuring your password is strong.{' '}
          <Link href="https://github.com/settings/security#password" target="_blank">
            Learn more about creating a strong password
          </Link>
        </Paragraph>
        <Button type="primary" icon={<LockOutlined />} onClick={() => setIsModalVisible(true)}>
          Change password
        </Button>
      </Card>

      <Card>
        <Title level={4} style={{ color: 'red' }}>
          Delete account
        </Title>
        <Paragraph>
          Once you delete your account, there is no going back. Please be certain.
        </Paragraph>
        <Button danger onClick={handleDeleteAccount}>
          Delete your account
        </Button>
      </Card>

      <Modal
        title="Change Password"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleChangePassword}
        okText="Update Password"
        cancelText="Cancel"
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input.Password
            placeholder="Current Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <Input.Password
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Input.Password
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Space>
      </Modal>
    </div>
  );
};

export default SettingsPage;

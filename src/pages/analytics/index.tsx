import { Bar, Line, Pie } from '@ant-design/charts';
import { ProCard } from '@ant-design/pro-components';
import { Typography, Row, Col } from 'antd';

const { Title } = Typography;

const barConfig = {
  data: [
    { type: 'High Priority', value: 20 },
    { type: 'Medium Priority', value: 15 },
    { type: 'Low Priority', value: 30 },
  ],
  xField: 'value',
  yField: 'type',
  seriesField: 'type',
  height: 240,
};

const pieConfig = {
  data: [
    { type: 'Alice', value: 25 },
    { type: 'Bob', value: 20 },
    { type: 'Charlie', value: 30 },
    { type: 'David', value: 15 },
    { type: 'Eve', value: 10 },
  ],
  angleField: 'value',
  colorField: 'type',
  radius: 0.8,
  innerRadius: 0.5,
  statistic: { title: { content: 'Task Assignment' } },
  height: 240,
};

const lineConfig = {
  data: [
    { date: '01-01', value: 40 },
    { date: '01-02', value: 50 },
    { date: '01-03', value: 70 },
    { date: '01-04', value: 20 },
    { date: '01-05', value: 60 },
  ],
  xField: 'date',
  yField: 'value',
  point: { size: 5, shape: 'circle' },
  height: 240,
};

const AnalyticsSection = ({ title, charts }: { title: string; charts: React.ReactNode }) => (
  <ProCard
    title={title}
    style={{ marginBottom: 24 }}
    bordered
    headerBordered
  >
    <Row gutter={24}>{charts}</Row>
  </ProCard>
);

const AnalyticsOverviewPage: React.FC = () => {
  return (
    <div style={{ padding: 24 }}>
      <AnalyticsSection
        title="Event classification statistics"
        charts={
          <>
            <Col span={8}>
              <Title level={5}>Distribution of event priority</Title>
              <Bar {...barConfig} />
            </Col>
            <Col span={8}>
              <Title level={5}>Event types</Title>
              <Bar {...barConfig} />
            </Col>
            <Col span={8}>
              <Title level={5}>Completion statistics</Title>
              <Line {...lineConfig} />
            </Col>
          </>
        }
      />
      <AnalyticsSection
        title="Team Collaboration"
        charts={
          <>
            <Col span={8}>
              <Title level={5}>Members with the most tasks assigned</Title>
              <Pie {...pieConfig} />
            </Col>
            <Col span={8}>
              <Title level={5}>Team member response rate</Title>
              <Line {...lineConfig} />
            </Col>
            <Col span={8}>
              <Title level={5}>Frequency of task collaboration</Title>
              <Pie {...pieConfig} />
            </Col>
          </>
        }
      />
      <AnalyticsSection
        title="Event Processing Efficiency"
        charts={
          <>
            <Col span={8}>
              <Title level={5}>Average processing time</Title>
              <Line {...lineConfig} />
            </Col>
            <Col span={8}>
              <Title level={5}>Overdue event statistics</Title>
              <Line {...lineConfig} />
            </Col>
            <Col span={8}>
              <Title level={5}>Trend of incident completion rate</Title>
              <Line {...lineConfig} />
            </Col>
          </>
        }
      />
    </div>
  );
};

export default AnalyticsOverviewPage;

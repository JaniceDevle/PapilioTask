import { Card } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import IssuesList from './components/IssuesList';
import LabelsList from './components/LabelsList';
import PageHeader from './components/PageHeader';
import { fetchEventList, fetchLabelList } from './service';
import { Label } from './types';

// 主页面组件
const LabelsPage: React.FC = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [allLabels, setAllLabels] = useState<Label[]>([]);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [labels, events] = await Promise.all([
          fetchLabelList(),
          fetchEventList()
        ]);
        setAllLabels(labels);
        setAllEvents(events);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 过滤逻辑
  const filteredLabels = useMemo(() => {
    return allLabels.filter((l) =>
      l.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [searchKeyword, allLabels]);

  const filteredIssues = useMemo(() => {
    if (!selectedLabel) return [];
    return allEvents.filter((i) => i.labels.includes(selectedLabel));
  }, [selectedLabel, allEvents]);

  return (
    <div style={{ padding: 24 }}>
      <PageHeader
        selectedLabel={selectedLabel}
        searchKeyword={searchKeyword}
        onSearchChange={setSearchKeyword}
      />

      {loading ? (
        <Card loading={true} />
      ) : selectedLabel ? (
        <IssuesList
          issues={filteredIssues}
          selectedLabel={selectedLabel}
          onBackClick={() => setSelectedLabel(null)}
        />
      ) : (
        <LabelsList
          labels={filteredLabels}
          onSelectLabel={setSelectedLabel}
        />
      )}
    </div>
  );
};

export default LabelsPage;

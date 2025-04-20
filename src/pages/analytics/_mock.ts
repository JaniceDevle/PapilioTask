export default {
  'GET /api/analytics/priority-distribution': (_, res) => {
    res.json([
      { type: 'High Priority', value: 20 },
      { type: 'Medium Priority', value: 15 },
      { type: 'Low Priority', value: 30 },
    ]);
  },

  'GET /api/analytics/task-assignment': (_, res) => {
    res.json([
      { type: 'Alice', value: 25 },
      { type: 'Bob', value: 20 },
      { type: 'Charlie', value: 30 },
      { type: 'David', value: 15 },
      { type: 'Eve', value: 10 },
    ]);
  },

  'GET /api/analytics/timeline': (_, res) => {
    res.json([
      { date: '01-01', value: 40 },
      { date: '01-02', value: 50 },
      { date: '01-03', value: 70 },
      { date: '01-04', value: 20 },
      { date: '01-05', value: 60 },
    ]);
  },
};

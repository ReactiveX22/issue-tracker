'use client';
import { Card } from '@radix-ui/themes';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueChart = ({ open, inProgress, closed }: Props) => {
  const data = [
    {
      label: 'Open ',
      value: open,
      // fill: 'var(--gray-2)',
      // stroke: 'var(--gray-9)',
    },
    {
      label: 'In Progress',
      value: inProgress,
    },
    {
      label: 'Closed',
      value: closed,
    },
  ];

  return (
    <Card className=' p-2 text-xs'>
      <ResponsiveContainer width='100%' height={250} className='py-1'>
        <BarChart
          data={data}
          margin={{ top: 0, left: -35, right: 0, bottom: -10 }}
          barGap={0}
        >
          <CartesianGrid strokeDasharray='3 3' stroke='var(--accent-5)' />
          <XAxis dataKey='label' stroke='var(--accent-9)' />
          <YAxis stroke='var(--accent-9)' />
          <Bar
            dataKey='value'
            barSize={50}
            style={{ stroke: 'var(--accent-9)', fill: 'var(--accent-3)' }}
            radius={[5, 5, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;

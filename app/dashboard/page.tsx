import { Flex, Grid } from '@radix-ui/themes';
import LatestIssues from './LatestIssues';
import IssueSummary from './IssueSummary';
import prisma from '@/prisma/client';
import IssueChart from './IssueChart';
import { Metadata } from 'next';

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: 'OPEN' } });
  const inProgress = await prisma.issue.count({
    where: { status: 'IN_PROGRESS' },
  });
  const closed = await prisma.issue.count({ where: { status: 'CLOSED' } });

  const statusInfos: { open: number; inProgress: number; closed: number } = {
    open: open,
    inProgress: inProgress,
    closed: closed,
  };

  return (
    <Grid
      columns={{ initial: '1', md: '2' }}
      justify='between'
      className='gap-3 px-2.5'
    >
      <Flex direction='column' className='space-y-3 md:w-[80%]'>
        <IssueSummary {...statusInfos} />
        <IssueChart {...statusInfos} />
      </Flex>

      <LatestIssues />
    </Grid>
  );
}

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Issue Tracker - Dashboard',
  description: 'View a summary of project issues',
};

import prisma from '@/prisma/client';
import IssueActions from './IssueActions';
import Pagination from '@/app/components/Pagination';
import { Status } from '@prisma/client';
import IssueTable, { columnNames, IssueQuery } from './IssueTable';
import { Flex } from '@radix-ui/themes';
import { Metadata } from 'next';

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statues = Object.values(Status);
  const status = statues.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const where = {
    status,
  };

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: 'asc' }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where: where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where: where });
  return (
    <Flex direction='column' gap='3'>
      <IssueActions />

      <IssueTable issues={issues} searchParams={searchParams} />

      <Pagination
        currentPage={page}
        pageSize={pageSize}
        itemCount={issueCount}
      />
    </Flex>
  );
};

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Issue Tracker - Issues',
  description: 'View all issues',
};

export default IssuesPage;

import prisma from '@/prisma/client';
import { Avatar, Card, Flex, Heading, Table } from '@radix-ui/themes';
import { getSession } from 'next-auth/react';
import Link from 'next/link';
import { RxAvatar } from 'react-icons/rx';
import { IssueStatusBadge } from '../components';

const LatestIssues = async () => {
  const session = await getSession();
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: 'desc' },
    take: 4,
    include: {
      assignedToUser: true,
    },
  });
  return (
    <Card className='px-0 pb-0 pt-4 shadow-sm'>
      <Heading size='4' mb='5' className='px-4 leading-3'>
        Latest Issues
      </Heading>
      <Flex direction='column' className='space-y-5 px-4'>
        {issues.map((issue) => (
          <Flex key={issue.id} justify='between' align='center' className=''>
            <Flex direction='column' align='start' gap='2'>
              <Link
                className='text-gray-700 hover:text-[var(--accent-9)]'
                href={`/issues/${issue.id}`}
              >
                {issue.title}
              </Link>
              <IssueStatusBadge status={issue.status} />
            </Flex>
            {issue.assignedToUser && session ? (
              <Avatar
                src={issue.assignedToUser.image!}
                fallback='?'
                size='2'
                radius='full'
              />
            ) : (
              <RxAvatar size={20} />
            )}
          </Flex>
        ))}
      </Flex>
    </Card>
  );
};

export default LatestIssues;

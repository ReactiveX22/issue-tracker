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
    take: 5,
    include: {
      assignedToUser: true,
    },
  });
  return (
    <Card>
      <Heading size='4' mb='5' className='leading-3'>
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell key={issue.id}>
                <Flex justify='between' align='center'>
                  <Flex direction='column' align='start' gap='2'>
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
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
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;

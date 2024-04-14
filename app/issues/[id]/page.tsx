import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import prisma from '@/prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) || -1 },
  });

  !issue && notFound();

  return (
    issue && (
      <div>
        <Heading>{issue?.title}</Heading>
        <Flex gapX='3' my='2'>
          <IssueStatusBadge status={issue.status} />
          <Text>{issue?.createdAt.toDateString()}</Text>
        </Flex>
        <Card mt='4'>
          <Markdown className='prose'>{issue?.description}</Markdown>
        </Card>
      </div>
    )
  );
};

export default IssueDetailPage;

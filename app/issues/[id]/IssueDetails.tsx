import { IssueStatusBadge } from '@/app/components';
import { Issue } from '@prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import Markdown from 'react-markdown';

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue?.title}</Heading>
      <Flex gapX='3' my='2'>
        <IssueStatusBadge status={issue.status} />
        <Text size='2'>{issue?.createdAt.toDateString()}</Text>
      </Flex>
      <Card mt='4'>
        <Markdown className='prose'>{issue?.description}</Markdown>
      </Card>
    </>
  );
};

export default IssueDetails;

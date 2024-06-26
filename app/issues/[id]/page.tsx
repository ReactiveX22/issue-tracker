import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import DeleteIssueButton from './DeleteIssueButton';
import { getServerSession } from 'next-auth';
import AssigneeSelect from './AssigneeSelect';
import { cache } from 'react';
import ChangeStatus from './ChangeStatus';

interface Props {
  params: { id: string };
}

const fetchIssue = cache((issueId: number) =>
  prisma.issue.findUnique({
    where: { id: issueId },
  })
);

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession();
  const issue = await fetchIssue(parseInt(params.id));

  if (!issue) notFound();

  return (
    issue && (
      <Grid columns={{ initial: '1', sm: '5' }} gap='5'>
        <Box className='md:col-span-4'>
          <IssueDetails issue={issue} />
        </Box>
        {session && (
          <Box>
            <Flex direction='column' gap='4'>
              <AssigneeSelect issue={issue} />
              <ChangeStatus issue={issue} />
              <EditIssueButton issueId={issue.id} />
              <DeleteIssueButton issueId={issue.id} />
            </Flex>
          </Box>
        )}
      </Grid>
    )
  );
};

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props) {
  const issue = await fetchIssue(parseInt(params.id));

  return {
    title: issue?.title,
    description: 'Details of the issue',
  };
}

export default IssueDetailPage;

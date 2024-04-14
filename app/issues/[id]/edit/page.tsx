import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import prisma from '@/prisma/client';
import IssueFormSkeleton from '../../_components/IssueFormSkeleton';

const IssueForm = dynamic(() => import('@/app/issues/_components/IssueForm'), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) || -1 },
  });

  !issue && notFound();
  return issue && <IssueForm issue={issue} />;
};

export default EditIssuePage;

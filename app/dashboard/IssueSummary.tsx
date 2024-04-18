import { Status } from '@prisma/client';
import { Card, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const containers: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    { label: 'Open Issues', value: open, status: 'OPEN' },
    { label: 'In-Progress Issues', value: inProgress, status: 'IN_PROGRESS' },
    { label: 'Closed Issues', value: closed, status: 'CLOSED' },
  ];

  return (
    <Flex gap='4' justify='between'>
      {containers.map((container) => (
        <Card key={container.label} className='shadow-sm'>
          <Flex direction='column' gap='4'>
            <Link
              className='text-sm font-medium leading-3'
              href={`/issues?status=${container.status}`}
            >
              {container.label}
            </Link>
            <Text size='5' weight='bold' className='leading-3'>
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;

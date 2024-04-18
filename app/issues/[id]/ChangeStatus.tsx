'use client';
import { Issue, Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

const statuses: { label: string; value?: Status }[] = [
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' },
];

const ChangeStatus = ({ issue }: { issue: Issue }) => {
  const router = useRouter();
  const changeStatus = async (status: string) => {
    await axios
      .patch('/api/issues/' + issue.id, {
        status: status,
      })
      .catch(() => toast.error('Changed could not be saved.'));

    router.refresh();
  };

  return (
    <>
      <Select.Root onValueChange={changeStatus}>
        <Select.Trigger placeholder='Change Status...'></Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            {statuses?.map((status) => (
              <Select.Item key={status.value} value={status.value!}>
                {status.label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster></Toaster>
    </>
  );
};

export default ChangeStatus;

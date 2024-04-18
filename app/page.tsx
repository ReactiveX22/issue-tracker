'use client';
import { Flex, Heading } from '@radix-ui/themes';

export default function Home() {
  return (
    <Flex height='70vh' align='center' justify='center' direction='column'>
      <Heading size='5' weight='medium'>
        YOUR SIMPLE
      </Heading>
      <Heading size='7' weight='bold'>
        ISSUE TRACKER
      </Heading>
    </Flex>
  );
}

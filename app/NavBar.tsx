'use client';
import { cn } from '@/utils/cn';
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from '@radix-ui/themes';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BsBugFill } from 'react-icons/bs';

interface Links {
  label: string;
  href: string;
}

const NavBar = () => {
  const links: Links[] = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
  ];

  const currentPath = usePathname();
  const { status, data: session } = useSession();

  return (
    <nav className='mb-5 border-b px-5 py-3'>
      <Container>
        <Flex justify='between'>
          <Flex align='center' gap='3'>
            <Link href='/'>
              <BsBugFill />
            </Link>
            <ul className='flex space-x-6'>
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    className={cn(
                      'text-zinc-500 transition-colors hover:text-zinc-700',
                      { 'text-zinc-900': link.href === currentPath }
                    )}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {status === 'authenticated' && (
              <DropdownMenu.Root dir='rtl'>
                <DropdownMenu.Trigger>
                  <Avatar
                    className='cursor-pointer'
                    src={session.user!.image!}
                    fallback='?'
                    size='2'
                    radius='full'
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text size='2'>{session.user!.email}</Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <Link href='/api/auth/signout'>Signout</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {status === 'unauthenticated' && (
              <Link href='/api/auth/signin'>Sign In</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;

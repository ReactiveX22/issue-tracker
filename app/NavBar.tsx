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
import { Skeleton } from '@/app/components';

interface Links {
  label: string;
  href: string;
}

const NavBar = () => {
  return (
    <nav className='mb-5 border-b px-5 py-3'>
      <Container>
        <Flex justify='between'>
          <Flex align='center' gap='3'>
            <Link href='/'>
              <BsBugFill />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const links: Links[] = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Issues', href: '/issues' },
  ];

  const currentPath = usePathname();

  return (
    <ul className='flex space-x-6'>
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={cn('nav-link text-zinc-500', {
              'text-zinc-900': link.href === currentPath,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === 'loading') return <Skeleton width='3rem' />;

  if (status === 'unauthenticated')
    return (
      <Link className='nav-link font-medium' href='/api/auth/signin'>
        Sign In
      </Link>
    );

  return (
    <Box>
      <DropdownMenu.Root dir='rtl'>
        <DropdownMenu.Trigger>
          <Avatar
            className='cursor-pointer'
            src={session!.user!.image!}
            fallback='?'
            size='2'
            radius='full'
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size='2'>{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <Link href='/api/auth/signout'>
            <DropdownMenu.Item className='cursor-pointer'>
              Signout
            </DropdownMenu.Item>
          </Link>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default NavBar;

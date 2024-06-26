'use client';
import { Skeleton } from '@/app/components';
import { cn } from '@/utils/cn';
import {
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  DropdownMenu,
  Flex,
  Spinner,
  Text,
} from '@radix-ui/themes';
import { Bug } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { BiLogOut } from 'react-icons/bi';
import { BsBugFill } from 'react-icons/bs';
import { FaGoogle } from 'react-icons/fa';

interface Links {
  label: string;
  href: string;
}

const NavBar = () => {
  return (
    <nav className='border-b px-5 py-3 shadow-md'>
      <Container>
        <Flex justify='between'>
          <Flex align='center' gap='5'>
            <Link href='/'>
              <Bug size={22} strokeWidth={1.5} />
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
  const { status, data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const currentPath = usePathname();
  const router = useRouter();

  const links: Links[] = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Issues', href: '/issues' },
  ];

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn('google');
    } catch (error) {
      toast.error('Something went wrong with your login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ul className='flex space-x-6'>
      {links.map((link) => (
        <li key={link.href} className='flex items-center'>
          {status === 'unauthenticated' ? (
            <Dialog.Root>
              {link.label !== 'Dashboard' ? (
                <Dialog.Trigger>
                  <Button
                    variant='ghost'
                    className={cn('nav-link text-zinc-500', {
                      'text-zinc-900': link.href === currentPath,
                    })}
                  >
                    {link.label}
                  </Button>
                </Dialog.Trigger>
              ) : (
                <Button
                  variant='ghost'
                  className={cn('nav-link text-zinc-500', {
                    'text-zinc-900': link.href === currentPath,
                  })}
                  onClick={() => router.push(link.href)}
                >
                  {link.label}
                </Button>
              )}

              <Dialog.Content maxWidth='450px'>
                <Dialog.Title>Sign In</Dialog.Title>
                <Dialog.Description size='2' mb='4'>
                  Sign in with Google to get access.
                </Dialog.Description>

                <Flex gap='3' mt='4' justify='end'>
                  <Dialog.Close>
                    <Button variant='soft' color='gray'>
                      Cancel
                    </Button>
                  </Dialog.Close>

                  <Button
                    onClick={() => loginWithGoogle()}
                    disabled={isLoading}
                  >
                    {isLoading ? <Spinner /> : <FaGoogle />} Sign In
                  </Button>
                </Flex>
              </Dialog.Content>
            </Dialog.Root>
          ) : (
            <Button
              variant='ghost'
              className={cn('nav-link text-zinc-500', {
                'text-zinc-900': link.href === currentPath,
              })}
              onClick={() => router.push(link.href)}
            >
              {link.label}
            </Button>
          )}
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { status, data: session } = useSession();

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn('google');
    } catch (error) {
      toast.error('Something went wrong with your login');
    } finally {
      setIsLoading(false);
    }
  };

  const logoutWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signOut();
    } catch (error) {
      toast.error('Something went wrong with your login');
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading')
    return <Skeleton width='4.334rem' height='1.8rem' />;

  if (status === 'unauthenticated')
    return (
      <Dialog.Root>
        <Dialog.Trigger>
          <Button>Sign In</Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth='450px'>
          <Dialog.Title className='leading-none'>Sign In</Dialog.Title>
          <Dialog.Description size='2' mb='4'>
            Sign in with Google to get access.
          </Dialog.Description>

          <Flex gap='3' mt='4' justify='end'>
            <Dialog.Close>
              <Button variant='soft' color='gray'>
                Cancel
              </Button>
            </Dialog.Close>

            <Button onClick={() => loginWithGoogle()} disabled={isLoading}>
              {isLoading ? <Spinner /> : <FaGoogle />} Sign In
            </Button>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
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

          <DropdownMenu.Item
            className='cursor-pointer'
            disabled={isLoading}
            onClick={() => logoutWithGoogle()}
          >
            {isLoading && <Spinner />}
            <BiLogOut size={20} /> Log Out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default NavBar;

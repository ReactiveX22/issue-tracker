'use client';
import { cn } from '@/utils/cn';
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

  return (
    <nav className='mb-5 flex h-14 items-center space-x-6 border-b px-5'>
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
    </nav>
  );
};

export default NavBar;

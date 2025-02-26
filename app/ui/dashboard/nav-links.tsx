'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  CheckBadgeIcon,
  CakeIcon,
  UsersIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { FaBed } from "react-icons/fa";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', 
    href: '/dashboard', 
    icon: HomeIcon 
  },
  { 
    name: 'Meal Check-In', 
    href: '/dashboard/meal-checkin', 
    icon: CheckBadgeIcon 
  },
  {
    name: 'BulkBadge',
    href: '/dashboard/bulkbadge',
    icon: DocumentDuplicateIcon,
  },
  {
    name: 'Sync',
    href: '/dashboard/sync',
    icon: UsersIcon
  }
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx("flex h-[48px] grow items-center justify-center gap-2 rounded-md text-slate-200 bg-sidenav-color p-3 text-sm font-medium hover:bg-sidenav-color-hover md:flex-none md:justify-start md:p-2 md:px-3",
              {
                'bg-sidenav-color-hover': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}

import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';
import Image from 'next/image';
import { GAFirstLogoDark } from '../ga-first-logo';


export default function SideNav() {
  return (
    <div className=" flex h-full flex-col bg-[#1E2433] px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-18 items-end justify-start rounded-md bg-[#1E2433] p-4 md:h-38"
        href="/"
      >
        <div className="w-32 md:w-40">
          <GAFirstLogoDark/>
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-[#1E2433] md:block"></div>
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md text-slate-100 bg-[#1E2433] p-3 text-sm font-medium hover:bg-[#343A47] md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}

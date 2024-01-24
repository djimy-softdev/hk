import Link from 'next/link';
import NavLinks from '@/app/ui/common/nav-links';
import { LogoutBtn } from '../auth/buttons';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      {/* brand */}
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4"
        href="/"
      >
        <div className="text-white md:w-40">
          <h1 className="text-3xl font-bold">House MK</h1>
        </div>
      </Link>

      {/* navlinks */}
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />

        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>

        {/* sign out */}
        <LogoutBtn />
      </div>
    </div>
  );
}
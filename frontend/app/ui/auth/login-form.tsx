'use client';
import { SIGNIN_FIELDS } from '@/app/lib/common';
import { loginAction } from '@/app/lib/auth';
import Link from 'next/link';
import { Button } from '@/app/ui/common/button';
import { KeyIcon, UserIcon } from '@heroicons/react/24/outline';
import { ElementType } from 'react';
import { useFormState } from 'react-dom';

interface AuthInputProps {
  name: string;
  placeholder: string;
  type: string;
  Icon: ElementType;
  title: string;
  extraProps?: Record<string, unknown>;
}

const AuthFormInput = ({
  name,
  placeholder,
  type,
  Icon,
  title,
  extraProps = {},
}: AuthInputProps) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="mb-2 block text-sm font-medium">
        {title}
      </label>
      <div className="relative mt-2 rounded-md">
        <div className="relative">
          <input
            required
            id={name}
            name={name}
            placeholder={placeholder}
            type={type}
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            {...extraProps}
          />
          <Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
      </div>
    </div>
  );
};

export default async function LoginForm() {
  const [state, formAction] = useFormState(loginAction, {
    message: null,
  });

  return (
    <div className="flex flex-col">
      <form action={formAction}>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          {/* username */}
          <AuthFormInput
            name={SIGNIN_FIELDS.username}
            title="Username"
            placeholder="Username"
            type="text"
            Icon={UserIcon}
          />

          {/* password */}
          <AuthFormInput
            name={SIGNIN_FIELDS.password}
            title="Password"
            placeholder="Password"
            type="password"
            Icon={KeyIcon}
            extraProps={{ minLength: 8 }}
          />
          <p className=" font-medium  text-red-500">{state?.message}</p>
        </div>

        {/* buttons */}
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button type="submit">Login</Button>
        </div>
      </form>
    </div>
  );
}

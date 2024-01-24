import {
  HeartIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import {
  deletePropertyAction,
  toggleFavPropertyAction,
} from '@/app/lib/properties/actions';
import { ToggleFavBtnAction } from '@/app/lib/common';
import { routes } from '@/app/config/routes';
import clsx from 'clsx';

export function CreateProperty() {
  return (
    <Link
      href={`${routes.properties.path}/create`}
      className="pointer-events-none flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Property</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdatePropertyBtn({ id }: { id: string }) {
  return (
    <Link
      href={`${routes.properties.path}/${id}/edit`}
      className="pointer-events-none rounded-md border p-1 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeletePropertyBtn({ id }: { id: string }) {
  const deletePropertyWithId = deletePropertyAction.bind(null, id);

  return (
    <form action={deletePropertyWithId} name={`delete-form-${id}`}>
      <button className="rounded-md border p-1 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5  text-red-400" />
      </button>
    </form>
  );
}

export const FavBtn = ({
  id,
  fill = false,
}: {
  id: number | string;
  fill?: boolean;
}) => {
  const action = fill ? ToggleFavBtnAction.REMOVE : ToggleFavBtnAction.ADD;
  const toggleFav = toggleFavPropertyAction.bind(null, id, action);

  const favBtnClasses = clsx('stroke-gray-50', {
    'fill-blue-600': fill,
  });

  return (
    <form action={toggleFav} className="absolute right-1 top-0 h-8 w-8">
      <button type="submit">
        <HeartIcon height={32} width={32} className={favBtnClasses} />
      </button>
    </form>
  );
};

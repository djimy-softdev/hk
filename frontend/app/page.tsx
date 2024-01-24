import { routes } from '@/app/config';
import { redirect } from 'next/navigation';

export default function Page() {
  redirect(routes.properties.path);
}

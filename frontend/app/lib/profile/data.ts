import { unstable_noStore as noStore } from 'next/cache';
import { BackendClient } from '@/app/lib/backend';
import { UserProfile } from '@/app/lib/common';

export async function getUserProfile() {
  noStore();

  const backendClient = BackendClient.getInstance();

  const resp = await backendClient.getUserProfile();
  return resp.data as UserProfile;
}

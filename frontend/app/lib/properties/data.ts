import { unstable_noStore as noStore } from 'next/cache';

import { BackendClient } from '@/app/lib/backend/client';
import { handleHttpStatus } from '@/app/lib/common/utils';

export async function listProperties(filter: any) {
  noStore();
  const backendClient = BackendClient.getInstance();

  const resp = await backendClient.listProperties({ filter });
  handleHttpStatus(resp.status);

  return resp.data;
}

export async function listFavoriteProperties(params?: { page?: number }) {
  noStore();

  const backendClient = BackendClient.getInstance();

  const resp = await backendClient.listFavoriteProperties({
    page: params?.page,
  });
  handleHttpStatus(resp.status);

  return resp.data;
}

export async function getPropertyFilterConfig() {
  noStore();

  const backendClient = BackendClient.getInstance();

  const resp = await backendClient.getPropertyFilterConfig();
  handleHttpStatus(resp.status);

  return resp.data;
}

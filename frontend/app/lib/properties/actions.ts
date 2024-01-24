'use server';

import { BackendClient } from '@/app/lib/backend';
import { logoutAction } from '../auth/actions';
import { revalidatePath } from 'next/cache';
import { ToggleFavBtnAction } from '@/app/lib/common';

export const toggleFavPropertyAction = async (
  id: number | string,
  action: ToggleFavBtnAction,
) => {
  const backendClient = BackendClient.getInstance();
  const httpResp = await backendClient.toggleFavoriteProperty({
    property_id: id,
    action: action,
  });

  handleHttpStatus(httpResp.status);

  revalidatePath('/properties');
  revalidatePath('/favorites');
};

export const deletePropertyAction = async (id: number | string) => {
  const backendClient = BackendClient.getInstance();
  const httpResp = await backendClient.deleteProperty({
    id,
  });

  handleHttpStatus(httpResp.status);

  revalidatePath('/favorites');
  revalidatePath('/properties');
};

function handleHttpStatus(status: number) {
  if (status == 401) {
    return logoutAction({} as any);
  }

  if (status >= 500) {
    throw new Error('Server error, please try again!');
  }

  if (status > 299) {
    return { message: 'Request error' };
  }
}

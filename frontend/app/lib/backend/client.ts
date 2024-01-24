import 'server-only';

import axios, { AxiosResponse } from 'axios';
import { camelizeKeysInPlace } from 'fast-case';
import {
  PropertyListFilter,
  ToggleFavBtnAction,
  toQueryString,
} from '@/app/lib/common';
import { cookies } from 'next/headers';

interface BackendHttpResponse {
  status: number;
  data: any;
  headers: any;
}

function handleHttpError(error: any): BackendHttpResponse {
  let status: number = 500;
  let data: any = null;
  let headers: any = {};

  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    status = error.response?.status;
    data = error.response?.data;
    headers = error.response?.headers;
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(
      '[handleHttpError] RequestError: ',
      error.code,
      error.config?.baseURL,
      error.config?.url,
    );

    status = 500;
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('[handleHttpError] ConfigError', error.message);
    status = 500;
  }

  return {
    status,
    data,
    headers,
  };
}

function camelizeResponse(response: AxiosResponse) {
  const skip = response.request.path.includes('/properties/config');

  if (
    !skip &&
    response.data &&
    response.headers['content-type'] === 'application/json'
  ) {
    response.data = camelizeKeysInPlace(response.data);
  }

  return response;
}

function getHttpClient() {
  const api = axios.create({
    baseURL: process.env.BACKEND_API_URL,
    headers: {
      Authorization: cookies().get('auth-token')?.value, // convenient but not a good practice
    },
  });

  api.interceptors.response.use(camelizeResponse);

  return api;
}

export class BackendClient {
  private static client: BackendClient;
  private httpClient: ReturnType<typeof getHttpClient>;

  private constructor() {
    this.httpClient = getHttpClient();
  }

  public static getInstance(): BackendClient {
    if (!BackendClient.client) {
      BackendClient.client = new BackendClient();
    }

    return BackendClient.client;
  }

  public async listProperties({ filter }: { filter: PropertyListFilter }) {
    const queryString = toQueryString(filter);
    try {
      const { data, status, headers } = await this.httpClient.get(
        `/properties?${queryString}`,
      );

      return { status, data, headers };
    } catch (error) {
      return handleHttpError(error);
    }
  }

  public async listFavoriteProperties({ page }: { page?: number }) {
    const queryString = toQueryString({ page });

    try {
      const { data, status, headers } = await this.httpClient.get(
        `/favorite_properties?${queryString}`,
      );

      return { status, data, headers };
    } catch (error) {
      return handleHttpError(error);
    }
  }

  public async getPropertyFilterConfig() {
    try {
      const { data, status, headers } =
        await this.httpClient.get('/properties/config');

      return { status, data, headers };
    } catch (error) {
      return handleHttpError(error);
    }
  }

  public async getUserProfile() {
    try {
      const { data, status, headers } =
        await this.httpClient.get('/auth/profile');

      return { status, data, headers };
    } catch (error) {
      return handleHttpError(error);
    }
  }

  public async login({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<BackendHttpResponse> {
    try {
      const { data, status, headers } = await this.httpClient.post('/login', {
        user: {
          username,
          password,
        },
      });

      return { status, data, headers };
    } catch (error) {
      return handleHttpError(error);
    }
  }

  public async toggleFavoriteProperty({
    property_id,
    action,
  }: {
    property_id: number | string;
    action: ToggleFavBtnAction;
  }): Promise<BackendHttpResponse> {
    try {
      const { data, status, headers } = await this.httpClient.post(
        `/favorite_properties/${action}`,
        {
          property_id,
        },
      );

      return { status, data, headers };
    } catch (error) {
      return handleHttpError(error);
    }
  }

  public async deleteProperty({
    id,
  }: {
    id: number | string;
  }): Promise<BackendHttpResponse> {
    try {
      const { data, status, headers } = await this.httpClient.delete(
        `/properties/${id}/delete`,
      );

      return { status, data, headers };
    } catch (error) {
      return handleHttpError(error);
    }
  }
}

'use client';
import { useCallback, useRef } from 'react';

import {
  CurrencyDollarIcon,
  MapPinIcon,
  MapIcon,
  MegaphoneIcon,
  CalculatorIcon,
} from '@heroicons/react/24/outline';
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Button } from '@/app/ui/common/button';
import { PropertyFilterConfig } from '@/app/lib/common';

const QUERY_FIELDS = {
  city: 'city',
  district: 'district',
  mrt: 'mrt',
  bedrooms: 'bedrooms',
  rent: 'rent',
};

function getformStateFromQuery(params: ReadonlyURLSearchParams) {
  const city = params.get(QUERY_FIELDS.city) ?? '';
  const district = params.get(QUERY_FIELDS.district) ?? '';
  const mrt = params.get(QUERY_FIELDS.mrt) ?? '';
  const bedrooms = params.get(QUERY_FIELDS.bedrooms) ?? '';
  const rent = params.get(QUERY_FIELDS.rent) ?? '';

  return {
    city,
    district,
    mrt,
    bedrooms,
    rent,
  };
}

export default async function PropertyFilter({
  config,
}: {
  config: PropertyFilterConfig;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const ref = useRef<HTMLFormElement>(null);

  const handleSearch = useDebouncedCallback(
    (field: keyof typeof QUERY_FIELDS, value: any) => {
      const params = new URLSearchParams(searchParams);
      params.set('page', '1');
      if (value) {
        params.set(field, value);
      } else {
        params.delete(field);
      }

      if (field === 'city') {
        params.delete('district');
      }

      replace(`${pathname}?${params.toString()}`);
    },
    300,
  );

  const onChangeFunc = useCallback((e: any) => {
    handleSearch(e.target.name, e.target.value);
  }, []);

  const onResetFunc = useCallback((e: any) => {
    e.preventDefault();
    replace(pathname);
    ref.current?.reset();
  }, []);

  // the state of the form is in the query string
  const formState = getformStateFromQuery(searchParams);

  const cities = Object.keys(config.locations);
  const districts = config.locations[formState.city] || [];

  return (
    <form
      ref={ref}
      className="relative flex  flex-col flex-wrap gap-x-4 rounded-md bg-gray-50 p-4 md:flex-row md:p-6"
    >
      {/* City */}
      <div className="mb-4">
        <label
          htmlFor={QUERY_FIELDS.city}
          className="mb-2 block text-sm font-medium"
        >
          City
        </label>
        <div className="relative">
          <select
            id={QUERY_FIELDS.city}
            name={QUERY_FIELDS.city}
            className="  block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            defaultValue={formState.city}
            onChange={onChangeFunc}
          >
            <option value="">Select a city</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          <MapIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* District */}
      <div className="mb-4">
        <label htmlFor="district" className="mb-2 block text-sm font-medium">
          District
        </label>
        <div className="relative">
          <select
            disabled={!formState.city}
            id={QUERY_FIELDS.district}
            name={QUERY_FIELDS.district}
            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            defaultValue={formState.district}
            onChange={onChangeFunc}
          >
            <option value="">Select a district</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
          <MapPinIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* MRT */}
      <div className="mb-4">
        <label
          htmlFor={QUERY_FIELDS.mrt}
          className="mb-2 block text-sm font-medium"
        >
          MRT
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              defaultValue={formState.mrt}
              onChange={onChangeFunc}
              id={QUERY_FIELDS.mrt}
              name={QUERY_FIELDS.mrt}
              placeholder="Subway line"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <MegaphoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>
      </div>

      {/* Rent */}
      <div className="mb-4">
        <label
          htmlFor={QUERY_FIELDS.rent}
          className="mb-2 block text-sm font-medium"
        >
          Rent
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              defaultValue={formState.rent}
              onChange={onChangeFunc}
              id={QUERY_FIELDS.rent}
              name={QUERY_FIELDS.rent}
              type="number"
              step="10"
              placeholder="Enter NTD amount"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>
      </div>

      {/* Bedrooms */}
      <div className="mb-4">
        <label
          htmlFor={QUERY_FIELDS.bedrooms}
          className="mb-2 block text-sm font-medium"
        >
          Rooms
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              defaultValue={formState.bedrooms}
              onChange={onChangeFunc}
              id={QUERY_FIELDS.bedrooms}
              name={QUERY_FIELDS.bedrooms}
              type="number"
              step="1"
              placeholder="Max total bedrooms"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <CalculatorIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>
      </div>

      <div className="mb-4 flex items-end	">
        <Button onClick={onResetFunc}>Reset</Button>
      </div>
    </form>
  );
}

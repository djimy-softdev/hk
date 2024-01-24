import PropertyCards from '@/app/ui/properties/property-cards';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { CardsSkeleton } from '@/app/ui/common/skeletons';
import PropertyFilter from '@/app/ui/properties/property-filter';
import { PropertyListFilter } from '@/app/lib/common/interfaces';
import { listProperties } from '@/app/lib/properties/data';
import { routes } from '@/app/config/routes';
import { getPropertyFilterConfig, getUserProfile } from '@/app/lib';

export default async function Page({
  searchParams = {},
}: {
  searchParams?: PropertyListFilter;
}) {
  const currentUser = await getUserProfile();
  const permisssions = currentUser.permissions || [];

  const propertyList = await listProperties(searchParams);
  const sanitizedSearchParams = {
    ...searchParams,
    page: propertyList.metadata.page,
  };

  const propertyUrlGenerator = (pageNumber: number | string) => {
    const params = new URLSearchParams(
      sanitizedSearchParams as unknown as URLSearchParams,
    );
    params.set('page', pageNumber.toString());
    return `${routes.properties.path}?${params.toString()}`;
  };

  const config = await getPropertyFilterConfig();

  return (
    <main>
      {/* header */}
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Properties
      </h1>

      {/* filters */}
      <div className="mb-4">
        <PropertyFilter config={config} />
      </div>

      {/* properties */}
      <Suspense fallback={<CardsSkeleton />}>
        <PropertyCards
          propertyList={propertyList}
          urlGenerator={propertyUrlGenerator}
          permisssions={permisssions}
        />
      </Suspense>
    </main>
  );
}

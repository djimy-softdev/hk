import PropertyCards from '@/app/ui/properties/property-cards';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { CardsSkeleton } from '@/app/ui/common/skeletons';
import { getUserProfile } from '@/app/lib/profile';
import { listFavoriteProperties } from '@/app/lib/properties/data';
import { PropertyListFilter } from '@/app/lib/common';
import { routes } from '@/app/config/routes';

export default async function Page({
  searchParams = {},
}: {
  searchParams?: PropertyListFilter;
}) {
  const currentUser = await getUserProfile();
  const permisssions = currentUser.permissions || [];

  const page = Number(searchParams.page || 1);
  const propertyList = await listFavoriteProperties({ page });

  const favoritesUrlGenerator = (pageNumber: number | string) => {
    const params = new URLSearchParams({});
    params.set('page', pageNumber.toString());
    return `${routes.favorites.path}?${params.toString()}`;
  };

  return (
    <main>
      {/* header */}
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Favorites
      </h1>

      {/* properties */}
      <Suspense fallback={<CardsSkeleton />}>
        <PropertyCards
          propertyList={propertyList}
          urlGenerator={favoritesUrlGenerator}
          permisssions={permisssions}
        />
      </Suspense>
    </main>
  );
}

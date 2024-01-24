import { BanknotesIcon, MapPinIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { FavBtn, UpdatePropertyBtn } from './buttons';
import Pagination from '@/app/ui/common/pagination';
import {
  Property,
  PropertyList,
  UserProfilePermissions,
  formatCurrency,
} from '@/app/lib/common';
import clsx from 'clsx';
import DeleteForm from './delete-form';

export default async function PropertyCards({
  propertyList,
  permisssions = [],
  urlGenerator = (pageNumber: number | string) => '',
}: {
  propertyList: PropertyList;
  permisssions?: UserProfilePermissions[];
  urlGenerator?: (pageNumber: number | string) => string;
}) {
  const { data: properties, metadata } = propertyList;

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property, index) => (
          <PropertyCard
            key={index}
            property={property}
            permisssions={permisssions}
          />
        ))}
      </div>

      {/* pagination */}
      <div className="mt-5 flex w-full justify-center">
        <Pagination
          totalPages={metadata.totalPages}
          currentPage={metadata.page}
          urlGenerator={urlGenerator}
        />
      </div>
    </>
  );
}

const Box = ({
  children,
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLSpanElement>) => {
  return (
    <span className={`flex items-center ${className}`} {...props}>
      {children}
    </span>
  );
};

export function PropertyCard({
  property,
  permisssions = [],
}: {
  property: Property;
  permisssions?: UserProfilePermissions[];
}) {
  const rent = formatCurrency(property.rentAmount);
  const address = `${property.addressCity} ${property.addressDist} ${property.addressRoad}`;

  const canUpdateProperty = permisssions.includes(
    UserProfilePermissions.canUpdateProperty,
  );

  return (
    <div className=" flex max-w-xl flex-col gap-y-1 rounded-xl bg-gray-50 p-1 pt-0 shadow-sm">
      {/* thumbnail and favorite icon */}
      <div className=" relative">
        <FavBtn id={property.id} fill={property.isFavorite} />
        <Image
          src={property.thumbnailUrl}
          width={600}
          height={600}
          alt={property.title}
          className="h-full w-full rounded-xl object-cover"
        />
      </div>

      {/* details */}
      <div className=" flex flex-col gap-y-2">
        <Box>
          <BanknotesIcon className="h-5 w-5 text-gray-700" />
          <h3 className="ml-2 text-lg  text-blue-700">{rent}</h3>
        </Box>

        <Box>
          <h3 className="text-sm font-bold">Rooms:</h3>
          <h3 className="ml-2 text-sm font-medium">{property.bedrooms}</h3>
        </Box>

        <Box>
          <h3 className="text-sm font-bold">MRT:</h3>
          <h3 className="ml-2 text-sm font-medium">{property.mrt}</h3>
        </Box>

        <Box>
          <MapPinIcon className="h-5 w-5 text-gray-700" />
          <h3 className="ml-2  text-xs font-medium">{address}</h3>
        </Box>
      </div>

      {/* action buttons */}
      <div
        className={clsx(
          'mt-2 justify-end gap-x-4',
          canUpdateProperty ? 'flex' : 'hidden',
        )}
      >
        <UpdatePropertyBtn id={property.id} />
        <DeleteForm id={property.id} />
      </div>
    </div>
  );
}

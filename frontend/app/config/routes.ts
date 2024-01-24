import {
  BookmarkIcon,
  BuildingOfficeIcon,
  UserCircleIcon,
} from '@heroicons/react/16/solid';

export const routes = {
  properties: {
    name: 'Properties',
    path: '/properties',
    icon: BuildingOfficeIcon,
    order: 1,
  },
  favorites: {
    name: 'Favorites',
    path: '/favorites',
    icon: BookmarkIcon,
    order: 2,
  },
  profile: {
    name: 'Profile',
    path: '/profile',
    icon: UserCircleIcon,
    order: 3,
  },
};

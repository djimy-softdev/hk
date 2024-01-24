export type UserProfile = {
  id: string | number;
  username: string;
  roles: string[];
  permissions: UserProfilePermissions[];
};

export enum UserProfilePermissions {
  canUpdateProperty = 'can_update_property',
  canDeleteProperty = 'can_delete_property',
  canListProperties = 'can_list_properties',
}

# House Marketplace App Design Document

## Database Schema

### Users Table

| Column   | Type                 |
| -------- | -------------------- |
| id       | integer              |
| email    | string               |
| password | string (hashed)      |
| role     | string (admin, user) |

### PresetLocations Table

| Column   | Type    |
| -------- | ------- |
| id       | integer |
| district | string  |
| city     | string  |

### Addresses Table

| Column          | Type    |
| --------------- | ------- |
| id              | integer |
| preset_location | integer |
| street_address  | string  |

district and city together form a unique constraint.

### Metro Stations Table

| Column | Type    |
| ------ | ------- |
| id     | integer |
| name   | string  |

### Properties Table

| Column              | Type                  |
| ------------------- | --------------------- |
| id                  | integer               |
| thumbnail_url       | string                |
| title               | string                |
| price_amount        | numeric               |
| price_currency      | string                |
| address_id          | integer (foreign key) |
| num_rooms           | integer               |
| mrt_station         | string                |
| user_defined_fields | jsonb                 |

### Favorites Table

| Column      | Type                  |
| ----------- | --------------------- |
| id          | integer               |
| user_id     | integer (foreign key) |
| property_id | integer (foreign key) |

## Explanation

1. **Users Table:**

   - Contains user information with a unique `id`.
   - `email` stores the user's email address.
   - `password` stores the hashed password for security.
   - `role` determines whether the user is an admin or a regular user.

2. **Addresses Table:**

   - Holds district and city information for property addresses.

3. **Properties Table:**

   - Stores information about each property.
   - `thumbnail_url` contains the URL for the property's thumbnail image.
   - `price_amount` and `price_currency` together represent the property's rent.
   - `address_id` links to the Addresses table for the property's location.
   - `num_rooms` stores the number of rooms in the property.
   - `mrt_station` holds the name of the MRT station for the property.
   - `user_defined_fields` is a `jsonb` field containing additional properties.

4. **Favorites Table:**
   - Connects users with their favorite properties.
   - `user_id` references the Users table to associate a favorite with a user.
   - `property_id` references the Properties table to link a favorite to a specific property.

## Additional Notes

- Ensure proper foreign key relationships are established.
- When displaying property information, concatenate `price_amount` and `price_currency` for user-friendly representation.
- Implement necessary backend logic to handle CRUD operations and relationships.

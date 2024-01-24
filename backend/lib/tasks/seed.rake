require 'faker'

namespace :db do
  desc 'Seed the database with sample data'
  task seed: :environment do
    # clear the db
    Rails.logger.info 'Clearing the db ...'
    FavoriteProperty.destroy_all
    Property.destroy_all
    UserRole.destroy_all
    Address.destroy_all
    CityAddress.destroy_all
    Currency.destroy_all
    Role.destroy_all
    User.destroy_all

    # Seed Static data (role)
    Rails.logger.info 'Seeding roles ...'
    admin_password = 'uT8fFJATo8irUTaD'
    user_password = "Qp7M3e2NDavnR7J"

    users = [
      { username: 'hm.admin', password: admin_password }, 
      { username: 'hm.user', password: user_password }
    ]
    10.times do |n|
      users << { username:  Faker::Internet.username, password: user_password }
    end
    users = User.create!(users)

    # Seed Roles
    Rails.logger.info 'Seeding roles ...'
    roles = [
      { name: 'ADMIN' },
      { name: 'USER' }
    ]
    Role.create!(roles)

    Rails.logger.info 'Assigning roles to users ...'
    admin_user = User.find_by(username: 'hm.admin')
    regular_user = User.find_by(username: 'hm.user')
    admin_role = Role.find_by(name: 'ADMIN')
    user_role = Role.find_by(name: 'USER')
    all_role_ids = Role.all.pluck(:id)

    user_roles = [
      { role_id: admin_role.id, user_id: admin_user.id },
      { role_id: user_role.id, user_id: regular_user.id }
    ]

    # randomly assign roles to each user
    users.each do |user|
      next if [admin_user.id, regular_user.id].include?(user.id)

      current_user_roles_ids = all_role_ids.sample(rand(0..all_role_ids.length))
      current_user_roles_ids.each do |current_user_roles_id|
        user_roles << { role_id: current_user_roles_id, user_id: user.id }
      end
    end
    UserRole.create!(user_roles)

    # Seed Currencies
    Rails.logger.info 'Seeding currencies ...'
    currencies = [ { name: 'NTD', code: 'NTD' }]
    Currency.create!(currencies)

    # ==== Property ====
    # load property from json file tmp/properties.json
    raw_properties = JSON.parse(File.read('tmp/properties.json'), symbolize_names: true)  
    
    # Seed CityAddresses
    Rails.logger.info 'Seeding city addresses ...'
    city_districts = {}
    raw_properties.each do |raw_property|
      city_districts[raw_property[:city]] = [] unless city_districts[raw_property[:city]].present?
      city_districts[raw_property[:city]] = (city_districts[raw_property[:city]] << raw_property[:district])
    end

    city_locations = []
    city_districts.each do |city, districts|
      districts.uniq.each do |district|
        city_locations << {city: city, district: district}
      end
    end
    CityAddress.create!(city_locations)

    
    # Seed Properties
    Rails.logger.info 'Seeding properties ...'
    currency_id = Currency.find_by(code: 'NTD').id
    properties = []
    raw_properties.each do |raw_property|
      properties << {
        title: raw_property[:title],
        thumbnail_url: raw_property[:thumbnail_url],
        bedrooms: raw_property[:bedrooms],
        rent_amount: raw_property[:rent_amount],
        currency_id: currency_id,
        mrt: raw_property[:mrt],
        address_attributes: {
          city_address_id: CityAddress.find_by(city: raw_property[:city], district: raw_property[:district]).id,
          road_address: raw_property[:road]
        },
      }
    end
    Property.create!(properties)

    # Seed Favorite Properties
    Rails.logger.info 'Seeding favorite properties ...'
    user_ids = User.all.pluck(:id)
    property_ids = Property.all.pluck(:id)
    favorite_properties = []
    for user in user_ids
      user_property_ids = property_ids.sample(rand(0..10))
      user_property_ids.each do |property_id|
        favorite_properties << { user_id: user, property_id: property_id }
      end
    end
    FavoriteProperty.create!(favorite_properties)

    Rails.logger.info 'Database seeded successfully!'
  end
end

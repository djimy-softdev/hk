module API
  module Entities
    class Property < Grape::Entity
      expose :id
      expose :title
      expose :thumbnail_url
      expose :rent_amount
      expose :mrt
      expose :bedrooms
      expose :is_favorite do |property, options|
        options[:favorite_properties_id].include?(property.id)
      end

      expose :rent_currency_name do |property, options|
        property.currency.name
      end

      expose :rent_currency_code do |property, options|
        property.currency.code
      end

      expose :address_city do |property, options|
        property.address.city_address.city
      end
      
      expose :address_dist do |property, options|
        property.address.city_address.district
      end

      expose :address_road do |property, options|
        property.address.road_address
      end
    end
  end
end
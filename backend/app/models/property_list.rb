class PropertyList
  module Scopes
    def by_bedrooms(bedrooms)
      return self if bedrooms.blank?
      where('bedrooms <= ?', bedrooms)
    end

    def by_rent(rent)
      return self if rent.blank?
      where('rent_amount <= ?', rent)
    end

    def by_mrt(mrt)
      return self if mrt.blank?
      where(mrt: mrt)
    end

    def by_district(district)
      return self if district.blank?
      where(city_addresses: {district: district})
    end

    def by_city(city)
      return self if city.blank?
      where(city_addresses: {city: city})
    end

    def by_user_favorites(user_id)
      return self unless user_id.is_a?(Integer)
      
      joins(:favorite_properties)
      .where(favorite_properties: { user_id: user_id})
    end

    def with_favorite_status(user_id)
      return self unless user_id.is_a?(Integer)
      
      select('properties.*, CASE WHEN favorite_properties.user_id IS NOT NULL THEN true ELSE false END AS is_favorite')
      .joins("LEFT JOIN favorite_properties ON favorite_properties.property_id = properties.id AND favorite_properties.user_id = #{user_id}") # for some reason, the user_id can not be passed as a parameter
    end
  end

  def self.call(params = {})
    Property.includes(:currency, address: [:city_address])
      .extend(Scopes)
      .by_user_favorites(params[:user_favorites])
      .by_bedrooms(params[:bedrooms])
      .by_rent(params[:rent])
      .by_mrt(params[:mrt])
      .by_district(params[:district])
      .by_city(params[:city])
      # .with_favorite_status(params[:user_id]) # this is not working, so I have to use the is_favorite method in the Property entity
  end
end
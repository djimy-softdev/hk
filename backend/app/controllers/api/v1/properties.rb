module API
  module V1
    class Properties < Grape::API
      include API::V1::Defaults

      resource :properties do
        desc "Return all properties with optional filters"
        params do
          optional :page, type: Integer, desc: "Page number (if using pagination)"
          optional :per_page, type: Integer, desc: "Number of results per page (if using pagination)"
          
          optional :district, type: String, desc: "District"
          optional :city, type: String, desc: "City"
          optional :bedrooms, type: Integer, desc: "Number of bedrooms"
          optional :rent, type: Integer, desc: "Rent amount"
          optional :mrt, type: String, desc: "Metro station"
        end
        get "" do
          list_metadata = permitted_params.slice(:page, :per_page)
          filters = permitted_params.except(:page, :per_page)

          res = pagee(PropertyList.call(filters), list_metadata)
          favorite_properties_id = FavoriteProperty.where(user_id: current_user.id, property_id: res[:data].pluck(:id) ).pluck(:property_id)

          present res, with: API::Entities::PropertyList, favorite_properties_id: favorite_properties_id
        end

        get "config" do
          locations = {}
          city_districts = CityAddress.select(:city, 'array_agg(district) as districts').group(:city).all
          city_districts.reduce(locations) do |memo, city_district|
            memo[city_district.city] = city_district.districts.uniq
            memo
          end

          {locations: locations}
        end

        desc "Delete a property"
        params do
          requires :id, type: Integer, desc: "Property ID"
        end
        delete "/:id/delete" do
          error!('You are not authorized to delete properties', 403) unless current_user.is_admin?

          # this should be done in a service
          ActiveRecord::Base.transaction do
            FavoriteProperty.where(property_id: params[:id]).destroy_all
            property = Property.find_by(id: params[:id])
            property.destroy! if property.present?
          end
          
          
          {status: "ok"}
        end
      end

      resource :favorite_properties do
        desc "Return all favorite_properties for the current user"
        params do
          optional :page, type: Integer, desc: "Page number (if using pagination)"
          optional :per_page, type: Integer, desc: "Number of results per page (if using pagination)"
        end
        get "" do
          list_metadata = permitted_params.slice(:page, :per_page)
          filters = { user_favorites: current_user.id }

          res = pagee(PropertyList.call(filters), list_metadata)
          present res, with: API::Entities::PropertyList, favorite_properties_id: res[:data].pluck(:id)
        end


        desc "Create a favorite_property for the current user"
        params do
          requires :property_id, type: Integer, desc: "Property ID"
        end
        post "create" do
          FavoriteProperty.upsert({user_id: current_user.id, property_id: params[:property_id]})

          {status: "ok"}
        end

        desc "Delete a favorite_property for the current user"
        params do
          requires :property_id, type: Integer, desc: "Property ID"
        end
        post "delete" do
          FavoriteProperty.find_by(user: current_user, property: params[:property_id])&.destroy
          {status: "ok"}
        end
      end
    end
  end
end
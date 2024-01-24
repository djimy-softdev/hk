module API
  module Entities
    class PropertyList < Grape::Entity
      expose :metadata do |list, options|
        {
          page: list[:metadata][:page],
          per_page: list[:metadata][:per_page],
          total_pages: list[:metadata][:total_pages],
          total: list[:metadata][:total]
        }
      end
      
      expose :data, using: API::Entities::Property
    end
  end
end
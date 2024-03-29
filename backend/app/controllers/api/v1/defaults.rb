module API
  module V1
    module Defaults
      extend ActiveSupport::Concern


      included do
        prefix "api"
        version "v1", using: :path
        default_format :json
        format :json

        before do
          error!("Unauthorized", 401) unless current_user.present?
        end

        helpers do
          include Paginated
          
          def permitted_params
            @permitted_params ||= declared(params, include_missing: false)
          end

          def logger
            Rails.logger
          end
      
          def current_user
            warden = env["warden"]
            @current_user ||= warden.authenticate
          end
        end

        rescue_from ActiveRecord::RecordNotFound do |e|
          error_response(message: e.message, status: 404)
        end

        rescue_from ActiveRecord::RecordInvalid do |e|
          error_response(message: e.message, status: 422)
        end
      end
    end
  end
end

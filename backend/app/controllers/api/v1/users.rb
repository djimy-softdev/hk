module API
  module V1
    class Users < Grape::API
      include API::V1::Defaults

      resource :auth do
        desc "Return a user"
        get "profile" do
          present current_user, with: API::Entities::User
        end
      end
    end
  end
end
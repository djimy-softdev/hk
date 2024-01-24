module API
  module V1
    class Base < Grape::API
      mount API::V1::Properties
      mount API::V1::Users
    end
  end
end
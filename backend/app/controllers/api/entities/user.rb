module API
  module Entities
    class User < Grape::Entity
      expose :id
      expose :username
      expose :roles do |user, options|
        user.roles.map(&:name)
      end

      expose :permissions
    end
  end
end
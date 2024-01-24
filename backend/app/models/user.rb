class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :jwt_authenticatable, jwt_revocation_strategy: self
  validates :username, presence: true, uniqueness: true

  has_many :favorite_properties

  has_many :user_roles
  has_many :roles, through: :user_roles

  def self.jwt_revoked?(payload, user)
    false
  end
  
  def self.revoke_jwt(payload, user)
    ""
  end

  def is_admin?
    roles.where(name: "ADMIN").any?
  end

  def is_regular_user?
    roles.where(name: "USER").any?
  end

  def permissions
    user_permissions = [
      "can_list_properties",
    ]

    admin_permissions = [
      "can_update_property",
      "can_delete_property",
    ]

    perms = []
    perms.concat user_permissions if is_regular_user?
    perms.concat(admin_permissions, user_permissions) if is_admin?

    perms.uniq
  end
end

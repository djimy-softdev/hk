class FavoriteProperty < ApplicationRecord
  belongs_to :user
  belongs_to :property

  def self.upsert(attributes)
    model = find_or_initialize_by(user_id: attributes[:user_id], property_id: attributes[:property_id])

    # Save the record with conflict resolution using ON CONFLICT
    model.save! rescue ActiveRecord::RecordNotUnique

    model
  end
end

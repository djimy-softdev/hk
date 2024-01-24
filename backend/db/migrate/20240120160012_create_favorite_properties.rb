class CreateFavoriteProperties < ActiveRecord::Migration[7.1]
  def change
    create_table :favorite_properties do |t|
      t.references :user, null: false, foreign_key: true
      t.references :property, null: false, foreign_key: true
      t.unique_constraint [:user_id, :property_id], deferrable: :immediate

      t.timestamps
    end
  end
end

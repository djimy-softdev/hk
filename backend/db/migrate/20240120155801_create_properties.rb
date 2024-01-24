class CreateProperties < ActiveRecord::Migration[7.1]
  def change
    create_table :properties do |t|
      t.string :title
      t.string :thumbnail_url
      t.integer :bedrooms
      t.integer :rent_amount
      t.references :currency, null: false, foreign_key: true, comment: 'The currency of the rent amount'
      t.references :address, null: false, foreign_key: true
      t.string :mrt
      t.jsonb :user_defined_fields

      t.timestamps
    end
  end
end

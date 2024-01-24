class CreateAddresses < ActiveRecord::Migration[7.1]
  def change
    create_table :addresses do |t|
      t.references :city_address, null: false, foreign_key: true
      t.string :road_address

      t.timestamps
    end
  end
end

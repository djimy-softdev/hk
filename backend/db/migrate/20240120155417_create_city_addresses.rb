class CreateCityAddresses < ActiveRecord::Migration[7.1]
  def change
    create_table :city_addresses do |t|
      t.string :city, null: false
      t.string :district, null: false
      t.unique_constraint [:city, :district], deferrable: :immediate

      t.timestamps
    end
  end
end

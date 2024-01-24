class CreateCurrencies < ActiveRecord::Migration[7.1]
  def change
    create_enum :currency_code, %w[NTD]

    create_table :currencies do |t|
      t.string :name
      t.enum :code, enum_type: :currency_code, null: false, default: 'NTD', index: { unique: true }

      t.timestamps
    end
  end
end

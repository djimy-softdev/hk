class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :username,              null: false, default: ""
      t.string :encrypted_password, null: false, default: ""

      t.timestamps
    end
    
    add_index :users, :username, unique: true
  end
end


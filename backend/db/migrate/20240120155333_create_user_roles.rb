class CreateUserRoles < ActiveRecord::Migration[7.1]
  def change
    create_table :user_roles do |t|
      t.references :user, null: false, foreign_key: true
      t.references :role, null: false, foreign_key: true
      t.unique_constraint [:user_id, :role_id], deferrable: :immediate

      t.timestamps
    end
  end
end

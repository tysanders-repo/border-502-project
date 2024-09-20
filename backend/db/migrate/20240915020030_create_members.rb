class CreateMembers < ActiveRecord::Migration[7.2]
  def change
    create_table :members, id: false do |t| 
      t.integer :uin, null: false, primary_key: true
      t.string :first_name
      t.string :last_name
      t.string :role
      t.string :major
      t.integer :year
      t.string :email
      t.string :phone
      t.string :tshirt_size
      t.boolean :paid_dues
      t.datetime :join_date
      t.datetime :aggie_ring_day
      t.datetime :birthday
      t.datetime :graduation_day
      t.boolean :archived
      t.boolean :accepted
      t.jsonb :accomplishments, default: {}
      t.timestamps
    end
    add_index :members, :uin, unique: true
  end
end

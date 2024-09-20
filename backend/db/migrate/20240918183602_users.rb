class Users < ActiveRecord::Migration[7.2]
  def change
    create_table :users do |t|
      t.integer :uin
      t.string :name
      t.string :major
      t.string :tshirt_size

      t.timestamps
    end
  end
end

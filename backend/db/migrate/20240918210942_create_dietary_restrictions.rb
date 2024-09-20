class CreateDietaryRestrictions < ActiveRecord::Migration[7.2]
  def change
    create_table :dietary_restrictions do |t|
      t.string :item_name

      t.timestamps
    end
  end
end

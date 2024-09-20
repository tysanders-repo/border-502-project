class CreateMemberDiets < ActiveRecord::Migration[7.2]
  def change
    create_table :member_diets do |t|
      t.integer :uin
      t.integer :item_id

      t.timestamps
    end
  end
end

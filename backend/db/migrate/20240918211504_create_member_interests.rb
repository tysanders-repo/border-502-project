class CreateMemberInterests < ActiveRecord::Migration[7.2]
  def change
    create_table :member_interests do |t|
      t.integer :uin
      t.integer :interest_id

      t.timestamps
    end
  end
end

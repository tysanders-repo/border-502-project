class CreateProjectMembers < ActiveRecord::Migration[7.2]
  def change
    create_table :project_members do |t|
      t.integer :uin
      t.integer :project_id

      t.timestamps
    end
  end
end

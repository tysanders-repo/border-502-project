class CreateJoinTableMembersProjects < ActiveRecord::Migration[7.2]
  def change
    create_table :members_projects, id: false do |t|
      t.integer :uin, null: false
      t.integer :project_id, null: false

      t.index :uin
      t.index :project_id
      t.index [:uin, :project_id], unique: true
    end

    # Adding foreign key constraints
    add_foreign_key :members_projects, :members, column: :uin, primary_key: :uin
    add_foreign_key :members_projects, :projects
  end
end

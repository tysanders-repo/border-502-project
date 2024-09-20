class CreateProjects < ActiveRecord::Migration[7.2]
  def change
    create_table :projects do |t|
      t.string :title
      t.string :description
      t.datetime :date
      t.jsonb :pictures
      t.jsonb :timeline

      t.timestamps
    end
  end
end

class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.string :name
      t.boolean :processed

      t.timestamps null: false
    end
  end
end

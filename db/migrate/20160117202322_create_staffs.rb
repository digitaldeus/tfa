class CreateStaffs < ActiveRecord::Migration
  def change
    create_table :staffs do |t|
      t.string :name
      t.string :title
      t.text :description
      t.integer :establishment_id

      t.timestamps null: false
      t.belongs_to :establishment, index:true
    end
  end
end

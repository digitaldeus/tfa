class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.float :latitude
      t.float :longitude
      t.string :address
      t.integer :establishment_id

      t.timestamps null: false

      t.belongs_to :establishment, index:true
    end
  end
end

class AddFieldsToLocation < ActiveRecord::Migration
  def change
    add_column :locations, :city, :string
    add_column :locations, :state, :string
    add_column :locations, :country, :string
    add_column :locations, :place_id, :string, required: true
  end
end

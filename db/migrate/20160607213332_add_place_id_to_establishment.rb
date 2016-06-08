class AddPlaceIdToEstablishment < ActiveRecord::Migration
  def change
    add_column :establishments, :place_id, :string
  end
end

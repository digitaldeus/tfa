class AddYelpIdToEstablishment < ActiveRecord::Migration
  def change
    add_column :establishments, :yelp_id, :string
  end
end

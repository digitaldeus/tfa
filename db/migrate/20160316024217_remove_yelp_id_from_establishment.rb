class RemoveYelpIdFromEstablishment < ActiveRecord::Migration
  def change
    remove_column :establishments, :yelp_id, :string
  end
end

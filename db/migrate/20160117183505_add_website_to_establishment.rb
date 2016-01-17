class AddWebsiteToEstablishment < ActiveRecord::Migration
  def change
    add_column :establishments, :website, :string
  end
end

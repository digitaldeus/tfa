class AddLeaderToEstablishment < ActiveRecord::Migration
  def change
    add_column :establishments, :leader, :string
  end
end

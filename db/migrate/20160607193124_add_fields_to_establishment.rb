class AddFieldsToEstablishment < ActiveRecord::Migration
  def change
    add_column :establishments, :denomination, :string
    add_column :establishments, :pastor, :string
  end
end

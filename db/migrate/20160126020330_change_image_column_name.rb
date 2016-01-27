class ChangeImageColumnName < ActiveRecord::Migration
  def change
    rename_column :images, :name, :graphic
  end
end

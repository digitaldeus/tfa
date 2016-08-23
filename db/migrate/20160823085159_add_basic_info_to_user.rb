class AddBasicInfoToUser < ActiveRecord::Migration
  def change
  	change_table :users do |t|
  	  t.string :phone
  	  t.string :name
  	  t.text :description
  	end
  end
end

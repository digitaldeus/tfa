class CreateUserProfile < ActiveRecord::Migration
  def change
    create_table :user_profiles do |t|
    	t.integer :user_id
    	t.string :name
    	t.text :description
    end
  end
end

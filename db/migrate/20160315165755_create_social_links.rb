class CreateSocialLinks < ActiveRecord::Migration
  def change
    create_table :social_links do |t|
      t.string :facebook
      t.string :twitter
      t.string :yelp
      t.string :google_plus
      t.string :youtube
      t.string :instagram
      t.string :linkedin

      t.timestamps null: false
    end
  end
end

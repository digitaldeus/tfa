class RemoveSocialLinksTypeFromSocialLinks < ActiveRecord::Migration
  def change
    remove_column :social_links, :social_links_type
  end
end

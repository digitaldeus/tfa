class UpdateSocialLinkReference < ActiveRecord::Migration
  def change
    remove_reference :social_links, :social_links
    add_reference :social_links, :social, polymorphic: true, index: true
  end
end

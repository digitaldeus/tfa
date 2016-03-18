class UpdateSocialLinkPolymorphic < ActiveRecord::Migration
  def change
    remove_reference :social_links, :social
    remove_column :social_links, :social_type
    add_reference :social_links, :social_linkable, polymorphic: true, index: {name: 'social_linkable_index'}
  end
end

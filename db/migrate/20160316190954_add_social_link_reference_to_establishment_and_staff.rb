class AddSocialLinkReferenceToEstablishmentAndStaff < ActiveRecord::Migration
  def change
    add_reference :social_links, :social_links, polymorphic: true, index: true
  end
end

class SocialLink < ActiveRecord::Base
  belongs_to :social_linkable, polymorphic: true

  def yelp_id
    if self.yelp and self.yelp.index('/')
      self.yelp.split('/').last
    else
      nil
    end
  end
end

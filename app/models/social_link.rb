class SocialLink < ActiveRecord::Base
  def yelp_id
    if self.yelp and self.yelp.index('/')
      self.yelp.split('/').last
    else
      nil
    end
  end
end

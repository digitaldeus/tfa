class SocialLink < ActiveRecord::Base
  belongs_to :social_linkable, polymorphic: true
  validate :all_social_links_are_valid_url

  def yelp_id
    if self.yelp and self.yelp.index('/')
      self.yelp.split('/').last
    else
      nil
    end
  end

  def has_social
    self.facebook or self.twitter or self.instagram or self.youtube or self.linkedin or self.google_plus or self.yelp
  end

  def all_social_links_are_valid_url
    if facebook.present? 
      unless facebook =~ validate_url_regex("facebook")
        errors.add :facebook, "Facebook url was not valid"
      end
    end

    if twitter.present? 
      unless twitter =~ validate_url_regex("twitter")
        errors.add :twitter, "Twitter url was not valid"
      end
    end

    if instagram.present? 
      unless instagram =~ validate_url_regex("instagram")
        errors.add :instagram, "Instagram url was not valid"
      end
    end

    if linkedin.present? 
      unless linkedin =~ validate_url_regex("linkedin")
        errors.add :linkedin, "Linkedin url was not valid"
      end
    end

    if yelp.present? 
      unless yelp =~ validate_url_regex("yelp")
        errors.add :yelp, "Yelp url was not valid"
      end
    end

    if youtube.present? 
      unless youtube =~ validate_url_regex("youtube")
        errors.add :youtube, "Youtube url was not valid"
      end
    end

    if google_plus.present? 
      unless google_plus =~ validate_url_regex("plus.google")
        errors.add :google_plus, "Google+ url was not valid"
      end
    end
  end

  private
  def validate_url_regex(name)
    /^(?:(?:https?:\/\/)?(?:www\.)?)?#{name}.com\/.+/
  end
end

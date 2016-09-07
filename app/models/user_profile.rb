class UserProfile < ActiveRecord::Base
  belongs_to :user

  has_one :profile_image, -> {where imageable_type: 'UserProfileImage'},
    class_name: :Image, foreign_key: :imageable_id, 
    foreign_type: :imageable_type, dependent: :destroy
  has_one :banner_image, -> {where imageable_type: 'UserBannerImage'},
    class_name: :Image, foreign_key: :imageable_id, 
    foreign_type: :imageable_type, dependent: :destroy

  accepts_nested_attributes_for :banner_image
  accepts_nested_attributes_for :profile_image
end

class Establishment < ActiveRecord::Base
  validates :name, presence: true
  has_one :location, dependent: :destroy
  has_one :social_link, as: :social_linkable, dependent: :destroy
  has_many :staff, dependent: :destroy
  has_many :service_times, dependent: :destroy

  has_one :profile_image, -> {where imageable_type: 'ProfileImage'},
    class_name: :Image, foreign_key: :imageable_id, 
    foreign_type: :imageable_type, dependent: :destroy
  has_one :banner_image, -> {where imageable_type: 'BannerImage'},
    class_name: :Image, foreign_key: :imageable_id, 
    foreign_type: :imageable_type, dependent: :destroy

  accepts_nested_attributes_for :location
  accepts_nested_attributes_for :staff
  accepts_nested_attributes_for :service_times, allow_destroy: true, :reject_if => proc {|attrs| attrs['day'].blank? or attrs['start_time'].blank?}
  accepts_nested_attributes_for :social_link

  accepts_nested_attributes_for :banner_image
  accepts_nested_attributes_for :profile_image
end

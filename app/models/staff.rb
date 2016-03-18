class Staff < ActiveRecord::Base
  validates :name, presence: true
  belongs_to :establishment
  has_one :image, as: :imageable
  has_one :social_link, as: :social_linkable, dependent: :destroy

  accepts_nested_attributes_for :image

  # TODO: Remember to make the email field unique here
  # and also via a unique db index
end

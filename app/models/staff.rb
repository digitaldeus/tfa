class Staff < ActiveRecord::Base
  validates :name, presence: true
  belongs_to :establishment
  has_one :image, as: :imageable
  has_one :social_link, as: :social

  # TODO: Remember to make the email field unique here
  # and also via a unique db index
end

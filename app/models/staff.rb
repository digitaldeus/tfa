class Staff < ActiveRecord::Base
  validates :name, presence: true
  belongs_to :establishment

  # TODO: Remember to make the email field unique here
  # and also via a unique db index
end

class Establishment < ActiveRecord::Base
  validates :name, presence: true
  has_one :location, dependent: :destroy
  has_one :social_link, as: :social_linkable, dependent: :destroy
  has_many :staff, dependent: :destroy

  accepts_nested_attributes_for :location
  accepts_nested_attributes_for :staff
end

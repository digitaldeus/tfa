class Establishment < ActiveRecord::Base
  validates :name, presence: true
  validates :yelp_id, presence: true, uniqueness: true
  has_one :location

  accepts_nested_attributes_for :location
end

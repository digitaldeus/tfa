class Establishment < ActiveRecord::Base
  validates :name, presence: true
  has_one :location
  has_many :staff

  accepts_nested_attributes_for :location
  accepts_nested_attributes_for :staff
end

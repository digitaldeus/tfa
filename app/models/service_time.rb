class ServiceTime < ActiveRecord::Base
  validates :name, presence: true
  validates :time, presence: true
  validates :establishment, presence: true

  belongs_to :establishment
end

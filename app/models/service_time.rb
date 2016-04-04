class ServiceTime < ActiveRecord::Base
  validates :day, presence: true
  validates :start_time, presence: true
  validates :establishment, presence: true

  belongs_to :establishment
end

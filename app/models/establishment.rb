class Establishment < ActiveRecord::Base
  validates :name, presence: true
end

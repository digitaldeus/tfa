class Establishment < ActiveRecord::Base
  validates :name, :presence => true
  validates :yelp_id, :presence => true
end

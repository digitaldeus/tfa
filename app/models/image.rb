class Image < ActiveRecord::Base
  belongs_to :imageable, polymorphic: true
  validates :name, presence: true

  mount_uploader :name, ImageUploader

  #TODO: Add change name field to be not null
end

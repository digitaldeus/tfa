class Image < ActiveRecord::Base
  belongs_to :imageable, polymorphic: true

  mount_uploader :graphic, ImageUploader

  # after_save :enqueue_image

  def enqueue_image
    # ImageWorker.perform_async(id, key) if key.present?
  end

  class ImageWorker
    include Sidekiq::Worker

    def perform(id, key)
      image = Image.find(id)
      image.update_column(:processed, false)
      
      logger.info "Proccessing image for #{image.imageable_type}: #{image.graphic}"

      image.key = key
      image.remote_image_url = image.graphic.direct_fog_url(with_path: true)
      image.save!
      image.update_column(:processed, true)
    end
  end
end

class Image < ActiveRecord::Base
  belongs_to :imageable, polymorphic: true

  mount_uploader :graphic, ImageUploader

  after_save :enqueue_image

  def enqueue_image
    if key.present?
      logger.debug 'Running async task to process image' 
      ImageWorker.perform_async(id, key) if key.present?
    else
      logger.debug 'Not running image async task but model saved'
    end
  end

  class ImageWorker
    include Sidekiq::Worker
    sidekiq_options :retry => 5

    def perform(id, key)
      image = Image.find(id)

      unless image.processed
        # Need a signal to keep from firing again before we have finished processing
        image.update_column(:processed, false)
        image.key = key
        image.remote_graphic_url = image.graphic.direct_fog_url(with_path: true)
        logger.debug "Processing images for ${image.remote_graphic_url}"
        image.save!
        image.update_column(:processed, true)
      end
    end
  end
end

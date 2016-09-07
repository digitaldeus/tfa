class Image < ActiveRecord::Base
  belongs_to :imageable, polymorphic: true

  mount_uploader :graphic, ImageUploader

  def enqueue_image url
    # This also creats object if there was no ID before
    self.processed = false
    self.save!

    if url.present?
      logger.info 'Running async task to process image' 
      ImageWorker.perform_async(id, url)
    else
      logger.info 'Not running image async task but model saved'
    end
  end

  class ImageWorker
    include Sidekiq::Worker
    sidekiq_options :retry => false

    def perform(id, url)
      image = Image.find(id);

      begin
        logger.info "Processing image from #{url}"
        image.remote_graphic_url = "https:#{url}"
        image.processed = true
        image.save!
      rescue CarrierWave::DownloadError
        logger.info "Caught CarrierWave::DownloadError"
      rescue CarrierWave::IntegrityError
        logger.info "Caught CarrierWave::IntegrityError"
      end
      
    end
  end

end

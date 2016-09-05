class ImagesController < ApplicationController
  before_action :set_parent, only: [:index, :edit, :new]
  before_action :set_image, only: [:edit]

  def index
    # if we don't have an image, create a new one
    unless @image
      @parent.build_image
      @image = @parent.image
    end

    @uploader = @image.name

    if @staff
      if @image.id
        @uploader.success_action_redirect = edit_image_url(@image)
      else
        @uploader.success_action_redirect = new_staff_image_url(@staff)
      end
    end
  end

  def new
    @image = @staff.build_image
    process_image
  end
  
  def edit
    process_image
  end

  def presigned
    @s3_presigned = S3_BUCKET.presigned_post(
      key: "uploads/#{SecureRandom.uuid}/${filename}",
      success_action_status: '201',
      acl: 'public-read'
    )

    request.format = :json
  end

  private
  # process the passed in image parameters and saves it
  def process_image
    @image.key = params[:key]

    if @image.save
      if @staff
        redirect_to staff_url(@staff), notice: "Staff image updated succesffully"
      end
    else
      byebug
      redirect_to staff_images_url(@staff), notice: "Theres was an issue saving your image"
    end
  end

  def image_params
    params
    .permit(:image, :bucket, :key, :etag, :staff_id)
  end

  def set_parent
    staff_id = params[:staff_id]

    if staff_id
      @staff = Staff.find(staff_id)
      @parent = @staff
    end
  end

  def set_image
    if params[:id]
      @image = Image.find(params[:id])
    end
  end

end

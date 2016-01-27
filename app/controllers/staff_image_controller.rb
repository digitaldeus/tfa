class StaffImageController < ApplicationController
  before_action :set_staff, only: [:index]

  def index
    @image = @staff.image
    @uploader = @staff.image.graphic
    @uploader.success_action_redirect = staff_url(@staff)
  end

  private
  def set_staff
    @staff = Staff.find(params[:staff_id])

    unless @staff.image
      @staff.build_image
    end
  end
end

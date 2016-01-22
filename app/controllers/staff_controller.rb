class StaffController < ApplicationController
  before_action :set_establishment, only: [:new, :index, :create]
  before_action :set_staff, only: [:edit, :show, :update, :destroy]

  def edit
  end

  def index
    @staff = @establishment.staff
  end

  def show

  end

  def new
    @staff = @establishment.staff.build
    @staff.build_image
  end

  def create
    @staff = @establishment.staff.build(staff_params)

    if @staff.save
      redirect_to establishment_staff_index_path, notice: 'Staff was successfully created.'
    else
      render :new
    end
  end

  def update
    if @staff.update(staff_params)
      redirect_to @staff, notice: 'Staff has been updated successfully'
    else
      render :edit
    end
  end

  def destroy
    # destroy the staff
    @staff.destroy

    redirect_to establishment_staff_index_path(establishment_id: @staff.establishment_id), notice: 'Establishment was successfully destroyed.'
  end

  private
    def staff_params
      params.require(:staff)
        .permit(:name, :description, :title, 
                image_attributes: [:id, :name, :name_cache])
    end

    def set_establishment
      @establishment = Establishment.find(params[:establishment_id])
    end

    def set_staff
      @staff = Staff.find(params[:id])

      # build staff image if not available
      if not @staff.image
        @staff.build_image
      end
    end
end

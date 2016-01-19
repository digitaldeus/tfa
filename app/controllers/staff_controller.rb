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
  end

  def create
    @staff = @establishment.staff.build(staff_params)

    if (@staff.save)
      redirect_to establishment_staff_index_path, notice: 'Staff was successfully created.'
    else
      render 'new'
    end
  end

  def update
  end

  def destroy
    # destroy the staff
    @staff.destroy

    redirect_to establishment_staff_index_path(establishment_id: @staff.establishment_id), notice: 'Establishment was successfully destroyed.'
  end

  private
    def staff_params
      params.require(:staff).permit(:name, :description, :title)
    end

    def set_establishment
      @establishment = Establishment.find(params[:establishment_id])
    end

    def set_staff
      @staff = Staff.find(params[:id])
    end
end

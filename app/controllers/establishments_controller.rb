class EstablishmentsController < ApplicationController
  before_action :set_establishment, only: [:show, :edit, :update, :destroy]
  before_action :set_google_api_key, only: [:new, :edit]

  # GET /establishments
  # GET /establishments.json
  def index
    @establishments = Establishment.all
  end

  # GET /establishments/1
  # GET /establishments/1.json
  def show
  end

  # GET /establishments/new
  def new
    @establishment = Establishment.new
    @establishment.build_location
    @establishment.service_times.build()
  end

  # GET /establishments/1/edit
  def edit
    @establishment.service_times.build()
  end

  # POST /establishments
  # POST /establishments.json
  def create
    @establishment = Establishment.new(establishment_params)

    respond_to do |format|
      if @establishment.save
        if @establishment.profile_image
          @establishment.profile_image.save
        end

        if @establishment.banner_image
          @establishment.banner_image.save
        end

        format.html { redirect_to @establishment, notice: 'Establishment was successfully created.' }
        format.json { render :show, status: :created, location: @establishment }
      else
        format.html { render :new }
        format.json { render json: @establishment.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /establishments/1
  # PATCH/PUT /establishments/1.json
  def update
    respond_to do |format|
      # prevent errors with blank graphic image
      pia = params['establishment']['profile_image_attributes']
      if pia and (pia['graphic'].blank? and pia['graphic_cache'].blank?)
        params['establishment'].delete 'profile_image_attributes'
      end

      bia = params['establishment']['banner_image_attributes']
      if bia and (bia['graphic'].blank? and bia['graphic_cache'].blank?)
        params['establishment'].delete 'banner_image_attributes'
      end

      if @establishment.update(establishment_params)
        format.html { redirect_to @establishment, notice: 'Establishment was successfully updated.' }
        format.json { render :show, status: :ok, location: @establishment }
      else
        format.html { render :edit }
        format.json { render json: @establishment.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /establishments/1
  # DELETE /establishments/1.json
  def destroy
    @establishment.destroy
    respond_to do |format|
      format.html { redirect_to establishments_url, notice: 'Establishment was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_establishment
    @establishment = Establishment.find(params[:id])
    unless @establishment.location
      @establishment.build_location
    end

    unless @establishment.social_link
      @establishment.build_social_link
    end

    @social_link = @establishment.social_link

    unless @establishment.profile_image
      @establishment.build_profile_image
    end

    unless @establishment.banner_image
      @establishment.build_banner_image
    end

    # set_service_times()
  end

  def set_service_times
    # build our service times, 5 by default
    unless @establishment.service_times.count > 0
      @establishment.service_times.build()
    end
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def establishment_params
    params.require(:establishment)
    .permit(:name, :description, :website, :key, :phone, 
            :admin_phone, :email, :admin_email, :leader,
            location_attributes: [:id, :latitude, :longitude, :address],
            social_link_attributes: [:id, :facebook, :twitter, :instagram, :yelp, :google_plus, :youtube],
            profile_image_attributes: [:id, :graphic, :graphic_cache],
            banner_image_attributes: [:id, :graphic, :graphic_cache],
            service_times_attributes: [:id, :start_time, :day, :service_name, :_destroy]
           )
  end

  def set_google_api_key
    @google_api_key = ENV['GOOGLE_JS_AUTOCOMPLETE']
  end
end

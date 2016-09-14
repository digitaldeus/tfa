class UserProfilesController < ApplicationController
	before_filter :set_user_profile, only: [:show, :update, :add_photo, 
		:destroy_photo, :create_profile_image, :create_banner_image]

	def show
		render :show
	end

	def update
		if @user_profile.update(user_profile_params)
			render :show
		else
			render json: @user_profile.errors, status: :unprocessable_entity
		end
	end

	def create_profile_image
		if params['profile_image_url']
			@user_profile.profile_image.enqueue_image params['profile_image_url']
			render :show
		end
	end

	def create_banner_image
		if params['banner_image_url']
			@user_profile.banner_image.enqueue_image params['banner_image_url']
			render :show
		end
	end

	# Builds new photo and enqueue it for background processing
	def add_photo
		if params['photo_url']
			@user_profile.photos.build.enqueue_image params['photo_url']
			render :show
		end
	end

	# Destroys photo if it belongs to the user_profile,
	# graphic removal is done on background.
	def destroy_photo
	  # If photo to destory belongs to this user_profile
	  if @user_profile.photos.any? { |p| p.id == params[:photo_id] }
	    # Nullify image so we can send correct version of user_profile
	    # back to frontend
	    image = Image.find(params[:photo_id])
	    image.imageable_type = nil
	    image.imageable_id = nil
	    image.save

	    @user_profile.reload

	    # Now remove image
	    image.enqueue_removal
	    render :show
	  end
	end


	private

	def set_user_profile
		@user_profile = UserProfile.find(params[:id])

	  unless @user_profile.profile_image
	    @user_profile.build_profile_image
	    @user_profile.profile_image.processed = true
	  end

	  unless @user_profile.banner_image
	    @user_profile.build_banner_image
	    @user_profile.banner_image.processed = true
	  end
	end

	def user_profile_params 
		params.require(:user_profile).permit(
			:id, :name, :description,
			profile_image_attributes: [:id, :graphic],
			banner_image_attributes: [:id, :graphic]
		)
	end
end

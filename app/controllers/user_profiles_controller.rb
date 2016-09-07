class UserProfilesController < ApplicationController
	def update
		@user_profile = UserProfile.find(params[:id])

		if @user_profile.update(user_profile_params)
			render :show
		else
			render json: @user_profile.errors, status: :unprocessable_entity
		end
	end

	private

	def user_profile_params 
		params.require(:user_profile).permit(
			:id, :name, :description,
			profile_image_attributes: [:id, :graphic],
			banner_image_attributes: [:id, :graphic]
		)
	end
end

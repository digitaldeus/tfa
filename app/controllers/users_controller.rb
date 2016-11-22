class UsersController < ApplicationController

	def show
		@user = User.find(params[:id])
		# We are counting with at least nil images
		@user.user_profile.build_images
		gon.stores = ["AppUserStore"]
		gon.jbuilder
	end

	# PATCH/PUT /establishments/1
	# PATCH/PUT /establishments/1.json
	def update
	  @user = User.find(params[:id])

	  respond_to do |format|
	    if @user.update(user_params)
	      format.html { redirect_to @user, notice: 'User was successfully updated.' }
	      format.json { render :show, status: :ok, location: @user }
	    else
	      format.html { render :edit }
	      format.json { render json: @user.errors, status: :unprocessable_entity }
	    end
	  end
	end

	private

	def user_params
	end

end
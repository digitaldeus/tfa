json.extract! @user_profile, :id, :name, :description

json.profile_image do
	if @user_profile.profile_image.present?
		json.full @user_profile.profile_image.graphic.url
	else
		json.null!
	end
end

json.banner_image do
	if @user_profile.banner_image.present?
		json.full @user_profile.banner_image.graphic.url
	else
		json.null!
	end
end


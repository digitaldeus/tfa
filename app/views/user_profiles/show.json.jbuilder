json.extract! @user_profile, :id, :name, :description

json.profile_image do
	json.extract! @user_profile.profile_image, :id, :processed
	json.full @user_profile.profile_image.graphic.url
	json.medium @user_profile.profile_image.graphic.medium.url
end 

json.banner_image do
	json.extract! @user_profile.banner_image, :id, :processed
	json.full @user_profile.banner_image.graphic.url
	json.large @user_profile.banner_image.graphic.large.url
end

json.photos @user_profile.photos do |photo|
	json.extract! photo, :id, :processed, :width, :height 
	json.medium photo.graphic.medium.url
	json.large photo.graphic.large.url
end


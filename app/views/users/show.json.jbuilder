json.extract! @user, :id

json.user_profile do 
	json.partial! 'user_profiles/show', user_profile: @user.user_profile
end
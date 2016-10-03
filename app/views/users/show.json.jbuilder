json.user do
	json.extract! @user, :id
end

json.user_profile do 
	json.partial! 'user_profiles/show', user_profile: @user.user_profile
end
json.extract! @establishment, :id, :name, :description, :created_at, :updated_at, :phone

json.location @establishment.location, :id, :latitude, :longitude, :address, :place_id
json.service_times @establishment.service_times, :id, :service_name, :day, :start_time

json.profile_image do

	if !@establishment.profile_image.processed
		json.full "https://placeholdit.imgix.net/~text?txtsize=25&bg=dddddd&txt=Processing+Image&w=256&h=256"
	else
		json.full @establishment.profile_image.graphic.url
		json.medium @establishment.profile_image.graphic.medium.url
	end

end 

json.banner_image do

	if !@establishment.banner_image.processed
		json.full "https://placeholdit.imgix.net/~text?txtsize=25&bg=dddddd&txt=Processing+Image&w=1024&h=1024"
	else
		json.full @establishment.banner_image.graphic.url
		json.large @establishment.banner_image.graphic.large.url
	end
end 
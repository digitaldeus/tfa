json.extract! @establishment, :id, :name, :description, :created_at, :updated_at, :phone

json.location @establishment.location, :id, :latitude, :longitude, :address, :place_id
json.service_times @establishment.service_times, :id, :service_name, :day, :start_time

json.profile_image do
	json.full @establishment.profile_image.graphic.url

	if @establishment.profile_image.graphic.smedium.present?
		json.smedium @establishment.profile_image.graphic.smedium.url
	end

end 

json.banner_image do
	json.full @establishment.banner_image.graphic.url

	if @establishment.banner_image.graphic.smedium.present?
		json.large @establishment.banner_image.graphic.large.url
	end
end 
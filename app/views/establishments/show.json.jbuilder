json.extract! @establishment, :id, :name, :description, :created_at, :updated_at, :phone

json.location @establishment.location, :id, :latitude, :longitude, :address, :place_id
json.service_times @establishment.service_times, :id, :service_name, :day, :start_time

json.profile_image do
	json.extract! @establishment.profile_image, :id, :processed
	json.full @establishment.profile_image.graphic.url
	json.medium @establishment.profile_image.graphic.medium.url
end 

json.banner_image do
	json.extract! @establishment.banner_image, :id, :processed
	json.full @establishment.banner_image.graphic.url
	json.large @establishment.banner_image.graphic.large.url
end

json.photos @establishment.photos do |photo|
	json.extract! photo, :id, :processed 
	json.medium photo.graphic.medium.url
	json.full photo.graphic.url
end
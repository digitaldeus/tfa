json.extract! @establishment, :id, :name, :description, :created_at, :updated_at, :phone

json.location @establishment.location, :latitude, :longitude

json.array!(@establishments) do |establishment|
  json.extract! establishment, :id, :name, :description
  json.url establishment_url(establishment, format: :json)
end

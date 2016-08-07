# handle searching establishments
class Api::V1::SearchController < Api::V1::BaseController
  before_action 
  def index
    #TODO split google search into it's own class / gem
    my_params = search_params

    onemile = 1610
    radius = my_params[:radius] or (5 * onemile) # default to about 5 miles
    term = my_params[:term] or ''
    lat = my_params[:lat]
    long = my_params[:long]

    # call the google search with paramters
    url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=#{term}&location=#{lat},#{long}&rankby=distance&radius=#{radius}&types=church&key=#{ENV['GOOGLE_SERVER_KEY']}"
    # url = "https://maps.googleapis.com/maps/api/place/search/json?name=#{term}&rankby=distance&type=church&location=#{lat},#{long}&radius=80500&key=#{ENV['GOOGLE_SERVER_KEY']}"
    response = HTTParty.get(url).parsed_response
    results = response['results'] or []

    # iterate through the response and convert to our format
    results = results.map do |church|
      new_church = format_church church
      new_church['distance'] = distance_between(lat.to_f, long.to_f, new_church[:lat].to_f, new_church[:long].to_f)

      new_church
    end
    render json: {
      results: results,
      next_page: response['next_page_token']
    }
  end

  private
  def search_params
    # TODO Figure out how to use strong parameters
    params
  end

  def distance_between(lat1, lon1, lat2, lon2)
    rad_per_deg = Math::PI / 180
    rm = 6371000 # Earth radius in meters

    lat1_rad, lat2_rad = lat1 * rad_per_deg, lat2 * rad_per_deg
    lon1_rad, lon2_rad = lon1 * rad_per_deg, lon2 * rad_per_deg

    a = Math.sin((lat2_rad - lat1_rad) / 2) ** 2 + Math.cos(lat1_rad) * Math.cos(lat2_rad) * Math.sin((lon2_rad - lon1_rad) / 2) ** 2
    c = 2 * Math::atan2(Math::sqrt(a), Math::sqrt(1 - a))

    rm * c # Delta in meters
  end

  def format_church(church)
    retval = {
      name: church['name'],
      lat: church['geometry']['location']['lat'],
      long:church['geometry']['location']['lng'],
      place_id: church['place_id'],
      address: church['vicinity']
    }

    # add a phot refernece url if possible, end users will have to add their own key
    photos = church['photos']
    if photos and church['photos'].length > 0
      photo_ref = photos.first['photo_reference']
      photo_url = "https://maps.googleapis.com/maps/api/place/photo?photoreference=#{photo_ref}&maxwidth=400" 
      retval['photo_reference'] = photo_url
    end

    # return our retval
    retval
  end
end

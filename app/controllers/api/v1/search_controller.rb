# handle searching establishments
class Api::V1::SearchController < Api::V1::BaseController

  ONE_MILE  = 1610

  def index
    yc = Yelp.client

    term = search_params[:term]
    lat = search_params[:lat].to_f
    long = search_params[:long].to_f
    radius = search_params[:radius].to_f
    offset = search_params[:offset].to_i

    # minimum radius of 1 mile
    radius = ONE_MILE if radius < ONE_MILE

    # call the google search with paramters
    # url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=#{term}&location=#{lat},#{long}&radius=#{radius}&types=church&key=#{ENV['GOOGLE_SERVER_KEY']}"
    # url = "https://maps.googleapis.com/maps/api/place/search/json?name=#{term}&rankby=distance&type=church&location=#{lat},#{long}&radius=80500&key=#{ENV['GOOGLE_SERVER_KEY']}"

    coordinates = {latitude: lat, longitude: long}
    query_params = {
      category_filter: 'religiousorgs',
      radius_filter: radius
    }
    query_params[:offset] = offset if offset > 0

    yelp_results = yc.search_by_coordinates(coordinates, query_params)

    # iterate through the response and convert to our format
    results = yelp_results.businesses.map do |church|
      format_church church
    end

    #NOTE: Why not JBuilder?
    render json: {
      radius: radius,
      results: results,
      # yelp: yelp_results,
      count: yelp_results.businesses.length,
      total: yelp_results.total,
      offset: offset
    }
  end

  private
  def search_params
    # TODO Figure out how to use strong parameters
    params.permit([:term, :lat, :long, :radius, :offset])
  end

  #TODO: replace with https://github.com/alexreisner/geocoder#for-activerecord-models
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
    {
      name: church.name,
      lat: church.location.coordinate.latitude,
      long:church.location.coordinate.longitude,
      yelp_id: church.id,
      distance: church.distance,
      address: "#{church.location.address.join(', ')} #{church.location.city}, #{church.location.state_code}",
      photo: (church.image_url or '').gsub('ms.jpg', 'l.jpg')
    }
  end
end

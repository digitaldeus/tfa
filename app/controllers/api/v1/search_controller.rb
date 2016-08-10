# handle searching establishments
class Api::V1::SearchController < Api::V1::BaseController
  before_action

  def index
    yc = Yelp.client
    my_params = search_params

    onemile = 1610

    term = my_params[:term]
    lat = my_params[:lat]
    long = my_params[:long]
    radius = my_params[:radius] or 5 * onemile # default to about 5 miles

    # call the google search with paramters
    # url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=#{term}&location=#{lat},#{long}&radius=#{radius}&types=church&key=#{ENV['GOOGLE_SERVER_KEY']}"
    # url = "https://maps.googleapis.com/maps/api/place/search/json?name=#{term}&rankby=distance&type=church&location=#{lat},#{long}&radius=80500&key=#{ENV['GOOGLE_SERVER_KEY']}"

    coordinates = {latitude: lat.to_f, longitude: long.to_f}
    params = {
      radius_filter: 5 * onemile,
      category_filter: "religiousorgs"
    }

    params[:term] = term if term

    yelp_results = yc.search_by_coordinates(coordinates, params)

    # iterate through the response and convert to our format
    results = yelp_results.businesses.map do |church|
      format_church church
    end
    render json: {
      results: results,
      # yelp: yelp_results,
      count: yelp_results.businesses.length,
      total: yelp_results.total
      # results: results,
      # next_page: response['next_page_token']
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
      name: church.name,
      lat: church.location.coordinate.latitude,
      long:church.location.coordinate.longitude,
      yelp_id: church.id,
      distance: church.distance,
      address: "#{church.location.address.join(', ')} #{church.location.city}, #{church.location.state_code}",
      photo: (church.image_url or '').gsub('ms.jpg', 'l.jpg')
    }

    # return our retval
    retval
  end
end

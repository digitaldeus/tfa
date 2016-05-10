# handle searching establishments
class Api::V1::SearchController < Api::V1::BaseController
  before_action 
  def index
    #TODO split google search into it's own class / gem
    my_params = search_params

    client = GooglePlaces::Client.new(ENV['GOOGLE_SERVER_KEY'])
    radius = my_params[:radius] or 80500 # default to about 50 miles
    term = my_params[:term] or ''
    lat = my_params[:lat]
    long = my_params[:long]

    # call the google search with paramters
    url = "https://maps.googleapis.com/maps/api/place/search/json?name=#{term}&type=church&location=#{lat},#{long}&radius=80500&key=#{ENV['GOOGLE_SERVER_KEY']}"
    response = HTTParty.get(url).parsed_response
    results = response['results'] or []

    # iterate through the response and convert to our format
    results = results.map do |church|
      format_church church
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

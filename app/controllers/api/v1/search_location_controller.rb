# handle searching establishments
class Api::V1::SearchLocationController < Api::V1::BaseController
  before_action 
  def index
    #TODO split google search into it's own class / gem
    my_params = search_params

    term = my_params[:term] or ''

    # call the google search with paramters
    url = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=#{term}&key=#{ENV['GOOGLE_SERVER_KEY']}"
    response = HTTParty.get(url).parsed_response
    results = response['predictions'] or []

    # iterate through the response and convert to our format
    results = results.map do |location|
      format_location location
    end
    render json: {
      results: results
    }
  end

  private
  def search_params
    # TODO Figure out how to use strong parameters
    params
  end

  def format_location(location)
    # return location
    retval = {
      id: location['id'],
      place_id: location['place_id'],
      description: location['description']
    }

    # get the lat and long of this place
    url = "https://maps.googleapis.com/maps/api/place/details/json?key=#{ENV['GOOGLE_SERVER_KEY']}&placeid=#{location['place_id']}"
    response = HTTParty.get(url).parsed_response
    retval['lat'] = response['result']['geometry']['location']['lat']
    retval['long'] = response['result']['geometry']['location']['lng']

    # return our retval
    retval
  end
end

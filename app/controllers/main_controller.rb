class MainController < ApplicationController
  def index
    parameters = {term: 'Church', limit: 10, category: 'churches'}
    response = Yelp.client.search('Oakland, CA', parameters)
    @businesses = response.businesses
  end

  def find
    parameters = {term: params[:search], limit: 10, category: 'churches'}

    if params[:offset]
      parameters[:offset] = params[:offset]
    end

    response = Yelp.client.search('Oakland, CA', parameters)
    @businesses = response.businesses
  end
end

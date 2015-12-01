class WelcomeController < ApplicationController
  def index
    parameters = {term: 'Church', limit: 20, category: 'churches'}

    response = Yelp.client.search('Oakland, CA', parameters)
    @businesses = response.businesses
  end
end

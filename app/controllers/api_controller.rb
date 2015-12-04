class ApiController < ApplicationController
  def search
    parameters = {
        term: params[:term],
        category: 'churches',
        limit: 20}
    render json: Yelp.client.search(params[:location], parameters)
  end

  def default_search
    parameters = {term: 'Church', limit: 20, category: 'churches'}
    render json: Yelp.client.search('Oakland, CA', parameters)
  end

  def request_add

  end
end
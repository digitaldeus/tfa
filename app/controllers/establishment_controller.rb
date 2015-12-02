class EstablishmentController < ApplicationController
  def show
    given_id = params[:id]
    @establishment = Yelp.client.business(given_id).business
    @yelp_image = @establishment.image_url.sub('/ms.', '/l.')
  end
end

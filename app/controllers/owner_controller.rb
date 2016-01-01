class OwnerController < ApplicationController
  def index
    eid = params[:establishment_id]
    e = Establishment.find_by_yelp_id(eid)

    unless e
      e = Establishment.new
      yelp_e = Yelp.client.business(eid).business

      e.name = yelp_e.name
      e.yelp_id = yelp_e.id
      e.save
    end


  end
end

class LandingController < ApplicationController
  def index
  end

  def pricing
  end

  def about
  end

  def contact_us
    unless @contact_info
      @contact_info = CustomerContact.new
      @fresh_run = true
    end

    unless @fresh_run
      if @contact_info.save
        flash[:notice] = 'Your information has been sent, we will be in touch soon!'
      end
    end
  end

  def sign_up
  end

  def create_profile
  end
end

class ErrorsController < ApplicationController
  def not_found
  	if request.post?
  	  @contact_info = CustomerContact.new(contact_info_params)
  	  @contact_info.purpose = "contact_us"
  	  if @contact_info.save
  	    flash[:notice] = 'Your information has been sent, we will be in touch soon!'

  	    # serve via get to prevent double post
  	    redirect_to landing_contact_us_path
  	  end
  	else # GET request
  	  @contact_info = CustomerContact.new
  	end
  end

  private
  def contact_info_params
    params.require(:customer_contact)
      .permit(:first_name, :last_name, :email, :phone, :details)
  end
end

class User < ActiveRecord::Base
  before_create :build_default_user_profile

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :trackable, :validatable, 
    :omniauthable

  devise :omniauthable, :omniauth_providers => [:facebook, :google_oauth2, :linkedin]

  has_one :user_profile, dependent: :destroy

  def self.from_omniauth(auth)
    where(email: auth.info.email).first_or_create do |user|
      user.email = auth.info.email

      # create random password if no password found
      user.password = Devise.friendly_token[0,20]

      # user.name = auth.info.name   # assuming the user model has a name
      # user.image = auth.info.image # assuming the user model has an image
    end
  end

  private 

  def build_default_user_profile
    build_user_profile
    true
  end

end

require 'sidekiq/web'

Rails.application.routes.draw do

  match "/404", :to => "errors#not_found", :via => :all

  # You can have the root of your site routed with "root"
  root 'landing#index'

  # devise routes
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
 
  # root level routes
  get '/', to: 'landing#index', as: 'landing_index'
  get '/pricing', to: 'landing#pricing', as: 'landing_pricing'
  get '/about', to: 'landing#about', as: 'landing_about'
  match '/contact_us', to: 'landing#contact_us', via: [:get, :post], as: 'landing_contact_us'
  get '/sign_up', to: 'landing#sign_up', as: 'landing_sign_up'
  get '/create_profile', to: 'landing#create_profile', as: 'landing_create_profile'
  get '/search', to: 'landing#search', as: 'landing_search'

  mount Ckeditor::Engine => '/ckeditor'
  
  resources :establishments, shallow: true do
    member do
      delete :destroy_photo
    end
    
    resources :staff do
      member do
        get 'image'
        get 'image_done'
      end
    end
  end

  resources :users
  resources :user_profiles do
    member do
      post :add_photo
      post :create_profile_image
      post :create_banner_image
      delete :destroy_photo
    end
  end

  scope '/images' do
    get 'presigned', to: 'images#presigned'
  end

  # api
  namespace :api do
    namespace :v1 do
      resources :search, only: [:index]
      resources :search_location, only: [:index]
    end
  end

  mount Sidekiq::Web, at: '/sidekiq'
end

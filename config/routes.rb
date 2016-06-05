require 'sidekiq/web'

Rails.application.routes.draw do

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
    resources :staff do
      member do
        get 'image'
        get 'image_done'
      end
    end
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

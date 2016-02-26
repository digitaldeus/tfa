require 'sidekiq/web'

Rails.application.routes.draw do

  # root level routes
  get '/', to: 'landing#index', as: 'landing_index'
  get '/pricing', to: 'landing#pricing', as: 'landing_pricing'
  get '/about', to: 'landing#about', as: 'landing_about'
  match '/contact_us', to: 'landing#contact_us', via: [:get, :post], as: 'landing_contact_us'
  get '/sign_up', to: 'landing#sign_up', as: 'landing_sign_up'
  get '/create_profile', to: 'landing#create_profile', as: 'landing_create_profile'

  mount Ckeditor::Engine => '/ckeditor'
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'
  root 'landing#index'

  resources :establishments, shallow: true do
    resources :staff do
      member do
        get 'image'
        get 'image_done'
      end
    end
  end

  mount Sidekiq::Web, at: '/sidekiq'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end

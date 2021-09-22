Rails.application.routes.draw do
  # resources :hike_photos, only: [:index, :show, :create]
  resources :hike_lists, only: [:create, :destroy]
  get '/:id/hike_lists', to: 'hike_lists#user_list'

  resources :hikes
  # resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '/:id/hikes', to: "hikes#user_hikes"
  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get "/me", to: "users#show"
end

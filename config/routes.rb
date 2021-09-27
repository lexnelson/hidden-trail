Rails.application.routes.draw do
  resources :hike_photos, only: [:index, :show, :destroy, :create]
  post '/add_photos', to: 'hike_photos#add_more_photos'
  get '/:id/photos', to: 'hike_photos#get_photos'

  resources :hike_lists, only: [:create, :destroy]
  get '/:id/hike_lists/uncompleted', to: 'hike_lists#user_list_uncompleted'
  get '/:id/hike_lists/completed', to: 'hike_lists#user_list_completed'
  patch '/:username/hike_lists/:id', to: 'hike_lists#update_completed'
  patch '/:username/hike_lists/:id/false', to: 'hike_lists#set_false'

  resources :hikes
  # resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '/:id/hikes', to: "hikes#user_hikes"
  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get "/me", to: "users#show"
end

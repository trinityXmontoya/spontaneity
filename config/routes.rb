Rails.application.routes.draw do

  resources :adventures, except: [:new, :edit]
  resources :destinations
  resources :interests, only: [:index]
  resources :users, except: [:index]
  post '/users/verify' => 'users#verify_credentials'
  get '/user_logout' => 'users#logout'
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

end

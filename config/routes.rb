Rails.application.routes.draw do

  resources :adventures, except: [:new, :edit]
  resources :destinations
  resources :interests, only: [:index]
  resources :users, except: [:index]
  post '/users/verify' => 'users#verify_credentials'
  get '/user_logout' => 'users#logout'
  match "/*path" => redirect("/?goto=%{path}"), via: [:get, :post]

end

Rails.application.routes.draw do

  resources :adventures, except: [:new, :edit]
  resources :destinations
  resources :interests, only: [:index]
  resources :users, except: [:index]
  post '/sign_in' => 'users#sign_in'
  get '/validate_sign_up_uniqueness' => 'users#validate'
  delete '/logout/:user_id' => 'users#logout'
  match "/*path" => redirect("/?goto=%{path}"), via: [:get, :post]

end

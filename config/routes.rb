Rails.application.routes.draw do

  resources :adventures, except: [:new, :edit]
  resources :destinations
  resources :interests, only: [:index]
  resources :users, except: [:index]
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

end

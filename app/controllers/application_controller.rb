class ApplicationController < ActionController::API
  include ::ActionController::Cookies

  helper_method :current_user

  private
  def current_user
    User.find(session[:user_id]) if session[:user_id]
  end
end

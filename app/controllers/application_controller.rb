class ApplicationController < ActionController::API
  include ::ActionController::Cookies

  helper_method :current_user

  private
  def current_user
    session[:user_id] ? User.find(session[:user_id]) : nil
  end
end

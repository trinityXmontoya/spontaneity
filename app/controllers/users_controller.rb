class UsersController < ApplicationController

  def show
    user = User.find(params[:id])
    render json: user, :include => {:visited_destinations => {only: [:name,:lat,:long]}}
  end

  def create
    user = User.new(user_params)
    if user.save
      render json: user, status: :created, location: user
    else
      render json: user.errors, status: :unprocessable_entity
    end
  end

  def verify_credentials
    user = User.find_by_username(user_params["username"])
    if user && user.authenticate(user_params["password"])
      session[:user_id] = user.id
      puts "THE SESSION"
      puts session
      puts session[:user_id]
      render json: user
    else
      render json: self.status = 401
    end
  end

  def current_user
    if current_user
      render json: current_user
    else
      render json: self.status = 404
    end
  end

  def logout
    user = User.find(user_params["id"])
    puts user
    if user == current_user
      session[:user_id] == nil
      render json: self.status = 200
    else
      render json: self.status = 401
    end
  end

  def update
    user = User.find(params[:id])
    if user.update(user_params)
      head :no_content
    else
      render json: user.errors, status: :unprocessable_entity
    end
  end

  def destroy
    user = User.find(params[:id])
    user.destroy
  end

  private
  def user_params
    params.require(:user).permit(:interests, :email, :username, :password)
  end

end

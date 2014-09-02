class UsersController < ApplicationController

  def show
    user = User.find(params[:id])
    render json: user, :include => {:visited_destinations => {only: [:name,:lat,:long]}}
  end

  def new
    user = User.new
    render json: user
  end

  def create
    user = User.new(user_params)
    if user.save
      render json: user, status: :created, location: user
    else
      render json: user.errors, status: :unprocessable_entity
    end
  end

  def edit
    user = User.find(params[:id])
    render json: user
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

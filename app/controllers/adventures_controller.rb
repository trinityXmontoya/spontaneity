class AdventuresController < ApplicationController

  def show
    adventure = Adventure.where(user_id: params[:id])

    render json: adventure
  end

  def create
    adventure = Adventure.new(adventure_params)
    adventure.select_destination
    if adventure.save
      render json: adventure, status: :created, location: adventure
    else
      render json: adventure.errors, status: :unprocessable_entity
    end
  end

  def update
    adventure = Adventure.find(params[:id])

    if adventure.update(adventure_params)
      head :no_content
    else
      render json: adventure.errors, status: :unprocessable_entity
    end
  end

  def destroy
    adventure = Adventure.find(params[:id])
    adventure.destroy

    head :no_content
  end

  private
  def adventure_params
    params.require(:adventure).permit(:user_id,:destination_id,:status,:zipcode, :time_limit)
  end
end
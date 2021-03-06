class AdventuresController < ApplicationController

  def show
    adventure = Adventure.where(user_id: params[:id])
    render json: adventure
  end

  def create
    adventure = Adventure.new(adventure_params)
    adventure.user = current_user
    res = adventure.select_destination
    if adventure.destination && adventure.save
      render json: adventure.google_directions("walking")
    else
      render json: res, status: :unprocessable_entity
    end
  end

  def complete
    adventure = Adventure.find(params[:id])
    adventure.status = 'complete'
    if adventure.save!
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
    params.require(:adventure).permit(:user_id,:destination_id,:status,:start_location, :time_limit, :kind)
  end
end

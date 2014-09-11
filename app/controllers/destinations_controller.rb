class DestinationsController < ApplicationController

  def index
    destinations = Destination.all
    render json: destinations
  end

  def show
    destination = Destination.find(params[:id])
    render json: destination
  end

  def new
    destination = Destination.new
    render json: destination
  end

  def create
    destination = Destination.new(destination_params)
    destination.calculate_coords(destination_params[:address])
    if destination.save
      render json: destination, status: :created, location: destination
    else
      render json: destination.errors, status: :unprocessable_entity
    end
  end

  def edit
    destination = Destination.find(params[:id])
    render json: destination
  end

  def update
    destination = Destination.find(params[:id])

    if destination.update(destination_params)
      head :no_content
    else
      render json: destination.errors, status: :unprocessable_entity
    end
  end

  def destroy
    destination = Destination.find(params[:id])
    destination.destroy
  end

  private
  def destination_params
    params.require(:destination).permit(:address,:latitude,:longitude,:name,:rating, :kind, :user_id)
  end
end

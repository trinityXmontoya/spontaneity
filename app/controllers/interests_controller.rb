class InterestsController < ApplicationController

  def index
    render json: Interest.all
  end

end

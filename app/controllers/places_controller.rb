class PlacesController < ApplicationController

  def index
    latlng = params[:latlng]
    destination = HTTParty.get("https://api.foursquare.com/v2/venues/search?ll=#{latlng}&client_id=#{FOURSQUARE_ID}&client_secret=#{FOURSQUARE_SECRET}&v=20140826")

    # destination = HTTParty.get("https://api.foursquare.com/v2/venues/search?ll=#{latlng}&client_id=ODX041SVZD0HOKCUQTWTPW51PLJHPCDITK5L52BRWR2WKFCU&client_secret=SI2HU4HT0JAJNYWJZG3QA3BBSX3ZEVTSN1MJHD4HTIEWUIPU&v=20140826")


    render :json => destination
  end

  def show
  end

  def create
   destination = HTTParty.get('https://api.foursquare.com/v2/venues/search?ll=40.7,-74&client_id=FOURSQUARE_ID&client_secret=FOURSQUARE_SECRET&v=20140826')
    # destination = 'destination'
    # respond_with destination
    render :json => destination
  end

end

class Adventure < ActiveRecord::Base
  belongs_to :user
  belongs_to :destination

  AVG_MILE_TIME = 15

  def select_destination
    options = self.initial_filtering
    self.destination_id = options.first.id
    # options = foursquare_search if !options
    # google_filter(options)
  end


  def foursquare_search
    # Declans foursquare search
  end

  def initial_filtering
    Destination.near(coords(location), max_mile_range).limit(5)
    # Destination.joins(:adventures).limit(5).where('adventures.user_id != ?', user.id).near(coords(location),mile_range)
  end

  def max_mile_range
    time_limit/AVG_MILE_TIME
  end

  # get coordinates from user entered location (zipcode or address)
  def coords
    Geocoder.coordinates(location)
  end

  def google_filter
    # google directions matrix, for front-end
  end

end

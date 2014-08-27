class Adventure < ActiveRecord::Base
  belongs_to :user
  belongs_to :destination

  AVG_MILE_TIME = 15

  def select_destination
    options = self.intial_filtering
    options = foursquare_search if !options
    # google_filter(options)
  end

  def foursquare_search
    # Declans foursquare search
  end

  def initial_filtering
    Destination.near([42.3581, 71.0636], 21.2).limit(5)
    # Destination.joins(:adventures).limit(5).where('adventures.user_id = ?', 1).near(coords(zipcode),mile_range)
  end

  # calculate apprx num of miles that can be traveled based on time_limit given and the AVG_MILE_TIME
  def mile_range
    time_limit/AVG_MILE_TIME
  end

  # get coordinates from a zipcode
  def coords
    Geocoder.coordinates(zipcode)
  end

  def google_filter
    # google directions matrix, for front-end
  end

end

class Adventure < ActiveRecord::Base
  belongs_to :user, counter_cache: true
  belongs_to :destination

  AVG_MILE_TIME = 15
  GOOGLE_API_BASE = "https://maps.googleapis.com/maps/api/directions/json?"
  FOURSQUARE_API_BASE = "https://api.foursquare.com/v2/venues/explore?"

  def select_destination
    options = self.initial_filtering
    puts options
    # options = foursquare_search if !options
    # options = google_filter(options)
    self.destination_id = options.id
    self.user_id = 1
  end

  def foursquare_query
    query = FOURSQUARE_API_BASE +
            "client_id=#{ENV['FOURSQUARE_ID']}&" +
            "client_secret=#{ENV['FOURSQUARE_SECRET']}&" +
            "near=#{url_safe_addr}&" +
            #FourSquare API requires radius in meters
            "radius=#{max_mile_range*1600}&" +
            "section=topPicks&" +
            "limit=3&" +
            "openNow=1&" +
            "v=20140826&" +
            "m=foursquare"
  end

  def foursquare_search
    q = foursquare_query
    res = HTTParty.get(q)["response"]["groups"][0]["items"][0]["venue"]
    Destination.create(name: res["name"], lat: res["location"]["lat"], long:["location"]["lng"])
  end

  def initial_filtering
    Destination.near(coords, max_mile_range).first
    # Destination.joins(:adventures).limit(5).where('adventures.user_id != ?', user.id).near(coords(location),mile_range)
  end

  def max_mile_range
    time_limit/AVG_MILE_TIME
  end

  def coords
    Geocoder.coordinates(start_location)
  end

  def url_safe_addr
    self.start_location.downcase.gsub(" ", "+")
  end

  def url_safe_coords
    dest = self.destination
    "#{dest.lat},#{dest.long}"
  end

  def google_query(mode)

    query = GOOGLE_API_BASE +
            "key=#{ENV['GOOGLE_API_KEY']}&" +
            "origin=#{url_safe_addr}&" +
            "destination=#{url_safe_coords}&" +
            "mode=#{mode}"

    if mode == "transit"
      #Google API requires UNIX formatted time
      arrv_time = (Time.now + time_limit.minutes).to_time.to_i
      query += "&arrival_time=#{arrv_time}"
    end

    return query
  end

  def google_route_results(query)
    HTTParty.get(query)["routes"][0]["legs"][0]
  end

  def google_directions(mode)
    q = google_query(mode)
    directions = google_route_results(q)
    if directions["duration"]["value"] > time_limit.minutes
      google_directions("transit")
    end
    return directions
  end


  # COUNTER CACHE METHODS

  def after_save
    self.update_counter_cache
  end

  def after_destroy
    self.update_counter_cache
  end

  def update_counter_cache
    self.user.adventures_count = self.user.adventures.count( :conditions => ["status = completed"])
    self.user.save
  end

end

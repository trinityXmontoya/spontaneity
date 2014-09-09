class Adventure < ActiveRecord::Base
  belongs_to :user, counter_cache: true
  belongs_to :destination

  AVG_MILE_TIME = 14
  GOOGLE_API_BASE = "https://maps.googleapis.com/maps/api/directions/json?"
  FOURSQUARE_API_BASE = "https://api.foursquare.com/v2/venues/explore?"

  def select_destination
    options = self.initial_filtering
    options = foursquare_search_and_add if !options
    # options = google_filter(options)
    self.destination_id = options.id
  end

  def foursquare_query
    query = FOURSQUARE_API_BASE +
            "client_id=#{ENV['FOURSQUARE_ID']}&" +
            "client_secret=#{ENV['FOURSQUARE_SECRET']}&" +
            "ll=#{coords[0].to_s+","+coords[1].to_s}&" +
            #FourSquare API requires radius in meters
            "radius=#{max_mile_range*1600}&" +
            "section=#{kind}" +
            "limit=1&" +
            "openNow=1&" +
            "v=20140826&" +
            "m=foursquare"
  end

  def foursquare_search_and_add
    q = foursquare_query
    result = false
    counter = 0
    while !result
      res = HTTParty.get(q)["response"]["groups"][0]["items"][counter]["venue"]
      d = Destination.new(
        name: res["name"],
        lat: res["location"]["lat"],
        long: res["location"]["lng"],
        kind: kind
      )
      if d.save
        result = true
      elsif counter = 7
        kind = 'topPicks'
        foursquare_search_and_add
      else
        counter += 1
      end
    end
    return d
  end

  def initial_filtering
    # select a destination the user has not already been to
    # within the specified range
    d = Destination.where('id NOT IN (SELECT destination_id FROM adventures WHERE user_id = ? AND kind = ?)', user.id, kind).near(coords, max_mile_range).first
    return d
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
    res = google_route_results(q)
    if res["duration"]["value"] > time_limit.minutes
      google_directions("transit")
    end
    directions = {
      destination: self.destination.name,
      directions: res
    }
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

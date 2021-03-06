class Adventure < ActiveRecord::Base
  belongs_to :user
  belongs_to :destination

  AVG_MILE_TIME = 14
  GOOGLE_API_BASE = "https://maps.googleapis.com/maps/api/directions/json?"
  FOURSQUARE_API_BASE = "https://api.foursquare.com/v2/venues/explore?"

  def select_destination
    options = initial_filtering
    options = foursquare_search_and_add if !options
    if options.is_a? Hash
      return options["text"]
    else
      self.destination_id = options.id
    end
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
      res = HTTParty.get(q)["response"]
      if res["warning"]
        return res["warning"]
        break
      else
        res = res["groups"][0]["items"][counter]["venue"]
      end
      d = Destination.new(
        name: res["name"],
        latitude: res["location"]["lat"],
        longitude: res["location"]["lng"],
        kind: kind,
        user_id: 0
      )
      if d.save!
        puts 'i saved!'
        result = true
      elsif counter == 7
        puts 'too many'
        kind = 'topPicks'
        self.save
        foursquare_search_and_add
      else
        puts 'i didnt save!'
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
    "#{dest.latitude},#{dest.longitude}"
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
      adventure_id: id,
      destination: destination.name,
      directions: res
    }
    return directions
  end

end

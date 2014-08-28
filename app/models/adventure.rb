class Adventure < ActiveRecord::Base
  belongs_to :user
  belongs_to :destination

  AVG_MILE_TIME = 15

  def select_destination
    options = self.initial_filtering
    # options = foursquare_search if !options
    # options = google_filter(options)
    self.destination_id = options.first.id
    self.user_id = 1
  end

  def foursquare_search
    # Declans foursquare search
  end

  def initial_filtering
    Destination.near(coords, max_mile_range)
    # Destination.joins(:adventures).limit(5).where('adventures.user_id != ?', user.id).near(coords(location),mile_range)
  end

  def max_mile_range
    time_limit/AVG_MILE_TIME
  end

  def coords
    Geocoder.coordinates(start_location)
  end

  def escape_addr(addr)
    addr.downcase.gsub(" ", "+")
  end

  def build_google_query(mode)
    destination_coords = "#{destination.lat},#{destination.long}"
    query = "https://maps.googleapis.com/maps/api/directions/json?" +
            "origin=#{escape_addr(start_location)}&" +
            "destination=#{destination_coords}&" +
            "mode=#{mode}&" +
            "key=#{ENV['GOOGLE_API_KEY']}"

    query += "&arrival_time=#{(Time.now + time_limit.minutes).to_time.to_i}" if mode == "transit"
    puts query
    return query
  end

  def google_route_results(query)
    HTTParty.get(query)["routes"][0]["legs"][0]
  end

  def google_directions(mode)
    q = build_google_query(mode)
    directions = google_route_results(q)
    if directions["duration"]["value"] > time_limit.minutes
      google_directions("transit")
    end
    return directions
  end

end

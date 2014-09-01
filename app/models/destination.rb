class Destination < ActiveRecord::Base
  has_many :adventures
  validates :name, :lat, :long, presence: true
  geocoded_by :address, :latitude  => :lat, :longitude => :long

  def calculate_coords(address)
    coords = Geocoder.coordinates(address)
    self.lat = coords[0]
    self.long = coords[1]
  end

end

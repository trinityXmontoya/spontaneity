class Destination < ActiveRecord::Base
  has_many :adventures
  belongs_to :user
  validates :name, :lat, :long, :kind, :user_id, presence: true
  geocoded_by :address, :latitude  => :lat, :longitude => :long
  validates :lat, :uniqueness => { :scope => :long }

  def calculate_coords(address)
    coords = Geocoder.coordinates(address)
    self.lat = coords[0]
    self.long = coords[1]
  end

end

class Destination < ActiveRecord::Base
  has_many :adventures
  belongs_to :user
  validates :name, :latitude, :longitude, :kind, :user_id, presence: true
  geocoded_by :address
  validates :latitude, :uniqueness => { :scope => :longitude }

  def calculate_coords(address)
    coords = Geocoder.coordinates(address)
    self.latitude = coords[0]
    self.longitude = coords[1]
  end

end

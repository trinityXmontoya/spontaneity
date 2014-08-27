class Destination < ActiveRecord::Base
  has_many :adventures
  validates :name, :lat, :long, presence: true
  geocoded_by :address, :latitude  => :lat, :longitude => :long
end

class Destination < ActiveRecord::Base
  validates :name, :lat, :long, presence: true
end

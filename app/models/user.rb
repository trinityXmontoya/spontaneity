class User < ActiveRecord::Base
  # has_secure_password
  validates :email, uniqueness: true, presence: true
  has_many :adventures
  has_many :visited_destinations, ->{ where(adventures: {status: 'completed'}) }, through: :adventures, source: :destination
end

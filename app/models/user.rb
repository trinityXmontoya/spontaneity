class User < ActiveRecord::Base
  has_secure_password
  validates :email, uniqueness: true, presence: true
  validates :username, uniqueness: true, presence: true
  before_save :downcase_email_and_username
  has_many :adventures
  has_many :visited_destinations, ->{ where(adventures: {status: 'completed'}) }, through: :adventures, source: :destination
  has_many :submitted_destinations, foreign_key: 'user_id', class_name: 'Destination'

  def downcase_email_and_username
    self.email.downcase
    self.username.downcase
  end

  def self.validate_uniqueness(type,input)
    User.where("#{type} = ?", input.downcase).exists? ? false : true
  end
end

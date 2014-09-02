# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Destination.create(id: 1, name: "mountain", lat: 42.3485, long: 71.0826)
Destination.create(id: 2, name: "hill", lat: 42.3529, long: 71.1321)
Destination.create(id: 3, name: "beach", lat: 40.6892, long:74.0444)
user1= User.create(id: 1, email: "john@gmail.com", username: "john", password: "john")
user1.adventures.create(destination_id: 1, start_location: "02135", time_limit: 30, status: 'completed')
user1.adventures.create(destination_id: 2, start_location: "02135", time_limit: 30, status: 'completed')
user1.adventures.create(destination_id: 3, start_location: "02135", time_limit: 30, status: 'in-progress')

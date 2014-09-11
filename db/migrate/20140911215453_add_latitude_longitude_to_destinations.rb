class AddLatitudeLongitudeToDestinations < ActiveRecord::Migration
  def change
    remove_column :destinations, :lat, :float
    remove_column :destinations, :long, :float
    add_column :destinations, :latitude, :float
    add_column :destinations, :longitude, :float
  end
end

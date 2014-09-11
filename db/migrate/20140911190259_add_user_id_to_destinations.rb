class AddUserIdToDestinations < ActiveRecord::Migration
  def change
    add_reference :destinations, :user, index: true
  end
end

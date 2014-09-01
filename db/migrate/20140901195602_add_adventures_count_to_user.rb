class AddAdventuresCountToUser < ActiveRecord::Migration
  def change
    add_column :users, :adventures_count, :integer, default: 0

    User.reset_column_information
    User.all.each do |u|
      u.update_attribute :adventures_count, u.adventures.length
    end
  end
end

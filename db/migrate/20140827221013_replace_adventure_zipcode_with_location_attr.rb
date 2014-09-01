class ReplaceAdventureZipcodeWithLocationAttr < ActiveRecord::Migration
  def change
    remove_column :adventures, :zipcode, :integer
    add_column :adventures, :start_location, :string
  end
end

class AddKindToDestinations < ActiveRecord::Migration
  def change
     add_column :destinations, :kind, :string
  end
end

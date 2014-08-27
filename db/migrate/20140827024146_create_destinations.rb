class CreateDestinations < ActiveRecord::Migration
  def change
    create_table :destinations do |t|
      t.string :name
      t.integer :rating
      t.float :lat
      t.float :long

      t.timestamps
    end
  end
end

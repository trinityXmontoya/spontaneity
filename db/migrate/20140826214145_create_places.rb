class CreatePlaces < ActiveRecord::Migration
  def change
    create_table :places do |t|
      t.string :title
      t.string :description
      t.float :lat
      t.float :long

      t.timestamps
    end
  end
end

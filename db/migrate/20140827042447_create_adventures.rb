class CreateAdventures < ActiveRecord::Migration
  def change
    create_table :adventures do |t|
      t.references :user, index: true, null: false
      t.references :destination, index: true
      t.string :status, default: 'in-progress', null: false
      t.integer :zipcode, null: false
      t.integer :time_limit, null: false
      t.timestamps
    end
  end
end

class AddKindToAdventures < ActiveRecord::Migration
  def change
    add_column :adventures, :kind, :string
  end
end

class CreateHikeLists < ActiveRecord::Migration[6.1]
  def change
    create_table :hike_lists do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :hike, null: false, foreign_key: true
      t.boolean :completed

      t.timestamps
    end
  end
end

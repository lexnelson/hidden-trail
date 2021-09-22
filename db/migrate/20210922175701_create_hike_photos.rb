class CreateHikePhotos < ActiveRecord::Migration[6.1]
  def change
    create_table :hike_photos do |t|
      t.string :img_url
      t.string :caption
      t.belongs_to :hike, null: false, foreign_key: true

      t.timestamps
    end
  end
end

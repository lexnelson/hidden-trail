class CreateHikes < ActiveRecord::Migration[6.1]
  def change
    create_table :hikes do |t|
      t.string :title
      t.string :city
      t.string :state
      t.integer :length
      t.integer :elevation
      t.integer :difficulty
      t.text :directions
      t.boolean :pet_friendly
      t.text :extra_info
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end

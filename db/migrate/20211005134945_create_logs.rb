class CreateLogs < ActiveRecord::Migration[6.1]
  def change
    create_table :logs do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.string :weather
      t.integer :distance
      t.string :location
      t.text :notes
      t.date :date
      t.string :trail_name
      t.string :photo
      t.integer :rating

      t.timestamps
    end
  end
end

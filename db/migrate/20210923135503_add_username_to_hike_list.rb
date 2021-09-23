class AddUsernameToHikeList < ActiveRecord::Migration[6.1]
  def change
    add_column :hike_lists, :username, :string
  end
end

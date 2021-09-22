class Hike < ApplicationRecord
  belongs_to :user
  has_many :hike_photos
  has_many :hike_lists
end

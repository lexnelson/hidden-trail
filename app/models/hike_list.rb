class HikeList < ApplicationRecord
  belongs_to :user
  belongs_to :hike
end

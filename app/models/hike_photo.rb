class HikePhoto < ApplicationRecord
  belongs_to :hike
  # belongs_to :user, through: :hike
end

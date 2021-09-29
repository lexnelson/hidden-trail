class HikeSerializer < ActiveModel::Serializer
  attributes :id, :title, :city, :state, :length, :elevation, :difficulty, :directions, :pet_friendly, :extra_info
  # has_one :user
  has_many :hike_photos
  has_many :comments
end

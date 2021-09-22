class HikeSerializer < ActiveModel::Serializer
  attributes :id, :title, :city, :state, :length, :elevation, :difficulty, :directions, :pet_friendly, :extra_info
  has_one :user
end

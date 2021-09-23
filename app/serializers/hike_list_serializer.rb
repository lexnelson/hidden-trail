class HikeListSerializer < ActiveModel::Serializer
  attributes :id, :completed, :hike_id, :username
  # has_one :user
  has_one :hike
end

class HikeListSerializer < ActiveModel::Serializer
  attributes :id, :completed, :hike_id
  # has_one :user
  # has_one :hike
end

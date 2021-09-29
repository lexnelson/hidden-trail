class CommentSerializer < ActiveModel::Serializer
  attributes :id, :text
  # has_one :hike
  has_one :user
end

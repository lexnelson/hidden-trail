class HikePhotoSerializer < ActiveModel::Serializer
  attributes :id, :img_url, :caption
  has_one :hike
end

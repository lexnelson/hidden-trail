class LogSerializer < ActiveModel::Serializer
  attributes :id, :weather, :distance, :location, :notes, :date, :trail_name, :photo, :rating
  has_one :user
end

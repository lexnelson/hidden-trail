class User < ApplicationRecord
    has_secure_password
    validates :username, presence: true, uniqueness: true
    has_many :hikes
    has_many :hike_photos, through: :hikes
    has_many :hike_lists
    has_many :comments
    has_many :logs
end

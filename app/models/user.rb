class User < ApplicationRecord
    has_secure_password
    validates :username, presence: true, uniqueness: true
    has_many :hikes
    has_many :hike_photos, through: :hikes
end

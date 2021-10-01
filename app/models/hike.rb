class Hike < ApplicationRecord
  belongs_to :user
  has_many :hike_photos, dependent: :destroy
  has_many :hike_lists
  has_many :comments, dependent: :destroy

  validates :user_id, presence: true
  validates :title, presence: true
  validates :city, presence: true
  validates :state, presence: true
  validates :pet_friendly, inclusion: { in: [ true, false ] }
  # validates :pet_friendly, presence: true
  validates :length, presence: true, numericality: true
  validates :difficulty, presence: true, numericality: true
  validates :directions, presence: true
  #:user_id, :title, :city, :state, :pet_friendly, :length, :difficulty, :directions, :extra_info
end

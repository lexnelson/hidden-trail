class HikePhotosController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :not_valid

    def index
    end

    def create
        photo = HikePhoto.create!(photo_params)
        render json: photo, status: :created
    end

    def add_more_photos
        photo = HikePhoto.create!(photo_params)
        hike = Hike.find_by(id: photo.hike_id)
        render json: hike
    end

    def destroy
        photo=HikePhoto.find(params[:id])
        hike = hike = Hike.find_by(id: photo.hike_id)
        photo.destroy
        render json: hike
    end

    def get_photos
        photos = HikePhoto.where(hike_id: params[:id])
        render json: photos
    end

    def show
        photo=HikePhoto.find(params[:id])
        render json: photo
    end

    private

    def photo_params
        params.permit( :hike_id, :img_url, :caption)
    end
    def render_not_found
        render json: {error: "Photo Not Found"}, status: :not_found
    end
    def not_valid(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end
end

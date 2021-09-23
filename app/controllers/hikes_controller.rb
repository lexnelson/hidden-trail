class HikesController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :not_valid

    wrap_parameters format: []

    def index
        hikes = Hike.all
        render json: hikes
    end

    def create
        hike = Hike.create!(hike_params)
        hikes = Hike.all
        render json: hike, status: :created
    end

    def show
      hike = Hike.find(params[:id])
      render json: hike
    end

    def update
        hike = Hike.find(params[:id])
        hike.update(hike_params)
        render json: hike
    end

    def destroy
        hike = Hike.find(params[:id])
        hike.destroy
        head :no_content
    end

    def user_hikes
        user = User.find(params[:id])
        hikes = Hike.where(user_id: user.id)
        render json: hikes
    end

    private

    def hike_params
        params.permit(:user_id, :title, :city, :state, :pet_friendly, :length, :difficulty, :directions, :extra_info)
    end

    def render_not_found
        render json: {error: "Hike Not Found"}, status: :not_found
    end

    def not_valid(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end

end

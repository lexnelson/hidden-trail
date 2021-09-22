class HikesController < ApplicationController

    def index
        hikes = Hike.all
        render json: hikes
    end

    def create
        hike = Hike.create(hike_params)

    end

    def show
    
    end

    def update
    end

    def destroy
    end

    private

    def hike_params
        params.permit(:user_id, :title, :city, :state, :elevation, :length, :difficulty)
    end

    
end

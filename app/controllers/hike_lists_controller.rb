class HikeListsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :not_valid

    # def index
    #     hls = HikeList.all
    #     render json: hls
    # end

    def create 
        hl = HikeList.create!(hl_params)
        render json: hl, status: :created
    end


    def update
    end

    def destroy
        hl = HikeList.find(params[:id])
        hl.destroy
        head :no_content
    end

    def user_list
        user = User.find(params[:id])
        hls = HikeList.where(user_id: user.id)
        # hikes = {}
        # hls.each {|hl| hikes << hl.hike }
        render json: hls
    end

    private 

    def hl_params
        params.permit(:hike_id, :user_id, :completed)
    end

    def not_valid(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end
    def render_not_found
        render json: {error: "Hike Not Found"}, status: :not_found
    end

end

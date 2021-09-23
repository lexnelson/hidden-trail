class HikeListsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :not_valid

    def create 
        hl = HikeList.create!(hl_params)
        render json: hl, status: :created
    end


    def update_completed
        hl = HikeList.find(params[:id])
        hl.update(hl_params)
        hls = HikeList.where(username: params[:username]).where(completed: false)
        render json: hls
    end

    def set_false
        hl = HikeList.find(params[:id])
        hl.update(hl_params)
        hls = HikeList.where(username: params[:username]).where(completed: true)
        render json: hls
    end

    def destroy
        hl = HikeList.find(params[:id])
        hl.destroy
        head :no_content
    end

    def user_list_uncompleted
        user = User.find(params[:id])
        hls = HikeList.where(user_id: user.id).where(completed: false)
        render json: hls
    end

    def user_list_completed
        user = User.find(params[:id])
        hls = HikeList.where(user_id: user.id).where(completed: true)
        render json: hls
    end

    private 

    def hl_params
        params.permit(:hike_id, :user_id, :completed, :username)
    end

    def not_valid(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end
    def render_not_found
        render json: {error: "Hike Not Found"}, status: :not_found
    end

end

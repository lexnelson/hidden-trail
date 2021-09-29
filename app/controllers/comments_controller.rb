class CommentsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :not_valid

    wrap_parameters format: []

    def create_comment_for_hike
        comment = Comment.create!(comment_params)
        comments = Comment.all.where(hike_id: comment.hike_id)
        render json: comments
    end

    def hike_comments
        comments = Comment.all.where(hike_id: params[:id])
        render json: comments
    end

    def destroy
        comment = Comment.find_by(id: params[:id])
        comment.destroy
        head :no_content
    end

    private 

    def comment_params
        params.permit(:user_id, :hike_id, :text)
    end

    def render_not_found
        render json: {error: "Hike Not Found"}, status: :not_found
    end

    def not_valid(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end
end

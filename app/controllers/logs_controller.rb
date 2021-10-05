class LogsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :not_valid

    wrap_parameters format: []

    def diary
        logs = Log.all.where(user_id: params[:id]).order(date: :desc)
        render json: logs
    end



    def create
        log = Log.create!(log_params)
        logs = Log.where(user_id: params[:user_id]).order(date: :desc)
        render json: logs, status: :created
    end



    private

    def log_params
        params.permit(:user_id, :location, :weather, :distance, :notes, :date, :trail_name, :photo, :rating)
    end

    def render_not_found
        render json: {error: "Hike Not Found"}, status: :not_found
    end

    def not_valid(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end
end

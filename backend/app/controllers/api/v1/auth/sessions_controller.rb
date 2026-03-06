module Api
  module V1
    module Auth
      class SessionsController < Devise::SessionsController
        respond_to :json

        private

        def respond_with(resource, _opts = {})
          render json: {
            user: {
              id: resource.id.to_s,
              email: resource.email,
              name: resource.name
            }
          }, status: :ok
        end

        def respond_to_on_destroy
          if current_user
            render json: { message: "Logged out successfully" }, status: :ok
          else
            render json: { message: "No active session" }, status: :unauthorized
          end
        end
      end
    end
  end
end

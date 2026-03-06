module Api
  module V1
    module Auth
      class UsersController < ApplicationController
        before_action :authenticate_user!

        def me
          render json: {
            user: {
              id: current_user.id.to_s,
              email: current_user.email,
              name: current_user.name
            }
          }
        end
      end
    end
  end
end
